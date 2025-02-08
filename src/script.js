let abortController = null;

let langData;
let knownLabels;

let profile;
let did;
let endpoint;

let currentCursor = null;
let currentLoadMoreLikesElem = null;

let settings = {
	reverse: false,
	showHidden: false,
	useEmbeds: true,
	useCustom: false,
	infiniteScroll: false,
};

// Main

const main = () => {
	langData = JSON.parse($('.lang-data').textContent);

	knownLabels = {
		'!hide': t(`hidden`),
		'!warn': t(`has warning`),
		'!no-unauthenticated': t(`don't show to logged-out users`),
		'porn': t(`adult content`),
		'sexual': t(`sexually suggestive`),
		'graphic-media': t(`graphic media`),
		'nudity': t(`non-sexual nudity`),
		'sexual-figurative': t(`sexually suggestive (cartoon)`),
	}

	window.addEventListener('resize', e => {
		appendLikesWithMoreInfiniteScroll();
	});

	document.addEventListener('scroll', e => {
		appendLikesWithMoreInfiniteScroll();
	});

	$('.about').addEventListener('click', () => {
		$('.about-dialog').showModal();
	});

	$('.infinite-scroll').addEventListener('input', () => {
		updateSettings();
	})

	$('.reverse').addEventListener('input', () => {
		updateSettings();
	})

	$('.show-hidden').addEventListener('input', () => {
		updateSettings();
	})

	$('.display-method').addEventListener('change', () => {
		updateSettings();
	});

	$('.profile-form').onsubmit = e => {
		e.preventDefault();

		profile = parseProfile($('.profile').value);
		if (profile == null) return;

		load();
	};

	loadSettings();
	saveSettings();

	// Check query string
	if (location.search != "") {
		let searchParams = new URLSearchParams(location.search);

		const setSearchBool = (name, previousValue, trueValue = 'true', falseValue = 'false') => {
			let param = searchParams.get(name);
			return param == trueValue ? true
				: param == falseValue ? false
				: previousValue;
		}

		settings.infiniteScroll = setSearchBool('infinitescroll', settings.infiniteScroll);
		settings.reverse = setSearchBool('reverse', settings.reverse);
		settings.showHidden = setSearchBool('showhidden', settings.showHidden);
		settings.useEmbeds = setSearchBool('method', settings.useEmbeds, 'embed', 'custom');
		settings.useCustom = setSearchBool('method', settings.useCustom, 'custom', 'embed');

		if (searchParams.has('profile')) {
			profile = searchParams.get('profile');
			$('.profile').value = profile;

			profile = parseProfile(profile);
		}
	}

	applySettings();

	if (profile != null) {
		load();
	}
}

const t = (str, arg) => {
	let trans = str;

	if (langData.name != "en") {
		trans = langData.strs[str];

		if (!trans) {
			console.error(`No translation for string ${str} for language ${langData.name}`);
			trans = str;
		}
	}

	return trans.replaceAll('~1', arg);
}

const loadSettings = () => {
	let settingsStored = localStorage.getItem("settings");
	if (settingsStored) {
		settingsStored = JSON.parse(settingsStored);
		for (let key of Object.keys(settingsStored)) {
			settings[key] = settingsStored[key] ?? setings[key];
		}
	}
}

const updateSettings = () => {
	settings.infiniteScroll = $('.infinite-scroll').checked;
	settings.reverse = $('.reverse').checked;
	settings.showHidden = $('.show-hidden').checked;

	let displayMethod = $('.display-method').value;
	if (displayMethod == 'embed') {
		settings.useEmbeds = true;
		settings.useCustom = false;
	} else if (displayMethod == 'custom') {
		settings.useEmbeds = false;
		settings.useCustom = true;
	}

	updateDisplayMethodSelect();

	saveSettings();
}

const applySettings = () => {
	$('.infinite-scroll').checked = settings.infiniteScroll;
	$('.reverse').checked = settings.reverse;
	$('.show-hidden').checked = settings.showHidden;
	$('.display-method').value = settings.useEmbeds ? 'embed' : settings.useCustom ? 'custom' : null;

	updateDisplayMethodSelect();
}

const saveSettings = () => {
	// Save settings
	localStorage.setItem("settings", JSON.stringify(settings));
}

const updateDisplayMethodSelect = () => {
	// Show hidden does nothing on embed method
	if ($('.display-method').value == 'embed') {
		$('.show-hidden-label').style.setProperty('display', 'none');
	} else {
		$('.show-hidden-label').style.removeProperty('display');
	}
}

const parseProfile = (input) => {
	if (input.startsWith('http://') || input.startsWith('https://')) {
		input = input.split('//')[1];
	}
	if (input.startsWith('bsky.app/profile/')) {
		input = input.slice('bsky.app/profile/'.length);
	}
	if (input == "") return null;

	console.log(input);
	return input;
}

// Load

const load = async () => {
	await abortWrapper(async () => {
		abortController.signal.addEventListener('abort', e => {
			$('.final').textContent = t(`Request cancelled`);
		});

		currentCursor = null;
		currentLoadMoreLikesElem = null;

		$('.pages').replaceChildren();

		try {
			$('.final').textContent = t(`Loading...`);

			did = profile;
			if (!profile.startsWith('did:')) {
				let resolveHandleResult = await apiRequest("https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle", {
					handle: profile,
				});
				console.log(resolveHandleResult);

				did = resolveHandleResult.did;
			}

			let didInfo;
			if (did.startsWith('did:web:')) {
				didInfo = await apiRequest(`https://${did.slice('did:web:'.length)}/.well-known/did.json`);
			} else {
				didInfo = await apiRequest("https://plc.directory/" + did);
			}
			console.log(didInfo);

			if (!didInfo.service || !didInfo.service[0]) {
				throw new NotOkError(t(`Could not find service endpoint`));
			}

			endpoint = didInfo.service[0].serviceEndpoint;
			console.log(endpoint);

			await appendLikesWithMoreInternal();
		} catch (e) {
			if (e instanceof NotOkError) {
				$('.final').textContent = t(`Error when fetching likes:`) + ` ${e.message}`;
			} else {
				throw e;
			}
		}
	});
}

const appendLikesWithMore = async () => {
	await abortWrapper(async () => {
		abortController.signal.addEventListener('abort', e => {
			$('.final').textContent = t(`Request cancelled`);
		});

		try {
			await appendLikesWithMoreInternal();
		} catch (e) {
			if (e instanceof NotOkError) {
				$('.final').replaceChildren(
					currentLoadMoreLikesElem,
					t(`Error when fetching likes:`) + ` ${e.message}`
				);
			} else {
				throw e;
			}
		}
	});
}

const appendLikesWithMoreInternal = async () => {
	$('.final').textContent = t(`Loading...`);

	currentCursor = await appendLikes(currentCursor);

	if (currentCursor) {
		currentLoadMoreLikesElem = html('button', {}, t(`Load more likes`));
		currentLoadMoreLikesElem.onclick = async () => {
			await appendLikesWithMore();
		};
		$('.final').replaceChildren(currentLoadMoreLikesElem);
	} else {
		$('.final').textContent = t(`End of likes`);
	}
}

const appendLikesWithMoreInfiniteScroll = () => {
	if (!settings.infiniteScroll || currentCursor == null || abortController != null) return;

	if ((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 1000)) {
		console.log('Infinite scroll load');
		appendLikesWithMore();
	}
}

const appendLikes = async (cursor) => {
	// com.atproto.repo.listRecords
	let likes = await apiRequest(endpoint + "/xrpc/com.atproto.repo.listRecords", {
		repo: did,
		collection: "app.bsky.feed.like",
		...(cursor ? { cursor } : {}),
		limit: 25,
		reverse: settings.reverse,
	});

	console.log(likes);

	let pageElem = $('.pages').appendChild(html("div", { class: "page" }));

	let posts = [];
	if (settings.useCustom) {
		// likeRecord.value => app.bsky.feed.like
		let postUris = likes.records
			.map(likeRecord => likeRecord.value.subject.uri)
			.filter(uri => parseUri(uri).collection == "app.bsky.feed.post");

		console.log(postUris);

		// app.bsky.feed.getPosts
		// posts.posts[] => app.bsky.feed.defs#postView
		if (postUris.length > 0) {
			posts = await apiRequest("https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts", {
				uris: postUris,
			});
		}

		console.log(posts);
	}

	for (let likeRecord of likes.records) {
		let likeElem = pageElem.appendChild(html('div', { class: "like" }));

		let likeLine1 = likeElem.appendChild(html('div', { class: 'like-line-1' }, [
			html('div', { class: 'liked-at' }, t(`Liked on`) + ` ${toUserDate(likeRecord.value.createdAt)}:`),
		]));

		if (settings.useCustom) {
			let post = posts.posts.find(post => post.uri == likeRecord.value.subject.uri);
			let collection = parseUri(likeRecord.value.subject.uri).collection;

			if (collection == "app.bsky.feed.post") {
				if (post) {
					likeElem.append(makePostView(post));
				} else {
					likeElem.append(html('div', { class: 'post' },
						html('a', { href: toPostUri(likeRecord.value.subject.uri) }, t(`Post not found, it may have been deleted.`))));
				}
			} else {
				likeElem.append(html('div', { class: 'post' }, t(`Unsupported collection type`) + ` ${likeRecord.value.subject.uri}`));
			}
		}
		if (settings.useEmbeds) {
			let uri = parseUri(likeRecord.value.subject.uri);
			let embed = likeElem.appendChild(makeEmbed(likeRecord.value.subject));

			let reloadEmbedButton = html('button', { title: t(`Reload embed`) }, '🔄︎');
			reloadEmbedButton.addEventListener('click', () => {
				embed.replaceChildren(makeEmbed(likeRecord.value.subject));
			});

			likeLine1.append(
				html('a', { href: toPostUri(likeRecord.value.subject.uri) }, t(`Open on bsky.app`)),
				reloadEmbedButton,
			);
		}
	}

	return likes.cursor;
}

const makePostView = (postView) => {
	return makePost(postView, postView.record, postView.embed);
}

const makePost = (post, record, embeds, depth=0) => {
	let container1Elem = html('div', { class: 'container-1' }, [
		makeReplyInfo(record),

		html('div', { class: 'container-avatar-main' }, [
			html('div', { class: 'column-avatar' }, post.author.avatar ?
				html('a', { href: toProfileUri(post.author.did) },
					html('img', { class: 'avatar', src: post.author.avatar })) : null),

			html('div', { class: 'column-main' }, [
				html('div', { class: 'line-1' }, [
					html('a', { href: toProfileUri(post.author.did) },
						html('div', { class: 'display-name' }, post.author.displayName ?? t(`No display name`))),
					html('a', { href: toProfileUri(post.author.handle) },
						html('div', { class: 'handle' }, "@" + post.author.handle)),
					html('div', { class: 'created-at' },
						html('a', { href: toPostUri(post.uri) }, toUserDate(record.createdAt))),
				]),

				record.text != "" ? html('div', { class: 'text' }, toRichText(record.text, record.facets ?? [])) : null,
				...makePostEmbeds(embeds, post, depth),

				...makeLabels(post),

				html('div', { class: 'line-counts' }, [
					html('div', { title: `${post.replyCount} ` + t(`replies`) }, `💬 ${post.replyCount}`),
					html('div', { title: `${(post.repostCount + post.quoteCount)} ` + t(`reposts and quotes`) }, `🔁 ${(post.repostCount + post.quoteCount)}`),
					html('div', { title: `${post.likeCount} ` + t(`likes`) }, `❤️ ${post.likeCount}`),
				]),
			]),
		]),
	]);

	let labels = getPostLabels(post);
	let labelsToHide = getToHideLabels(labels);

	if (labelsToHide.length > 0) {
		container1Elem.style.setProperty('display', 'none');

		let buttonElem = html('button', { class: 'show-post' }, t(`Show post`)
			+ ` (${labelsToHide.map(x => getLabelDescription(x)).join(', ')})`);

		buttonElem.addEventListener('click', () => {
			container1Elem.style.removeProperty('display');
			buttonElem.remove();
		});

		return html('div', { class: 'post' }, [
			buttonElem,
			container1Elem,
		]);
	} else {
		return html('div', { class: 'post' }, container1Elem);
	}
}

const makeReplyInfo = (post) => {
	if (!post.reply) return;
	return html('a', { href: toPostUri(post.reply.parent.uri) }, '⤷ ' + t(`Replying to post`));
}

const makePostEmbeds = (postEmbeds, post, depth) => {
	if (!postEmbeds) return [];
	if (!Array.isArray(postEmbeds)) {
		postEmbeds = [postEmbeds]
	}

	return postEmbeds.flatMap(postEmbed => {
		if (postEmbed.$type == 'app.bsky.embed.images#view') {
			let sizeClassName =
				postEmbed.images.length == 1 ? 'size-1' :
				postEmbed.images.length == 2 ? 'size-2' :
				postEmbed.images.length == 3 ? 'size-3' :
				'size-4';

			return html('div', { class: 'embed-images ' + sizeClassName }, postEmbed.images.map(image =>
				html('a', { href: image.fullsize }, html('img', { class: 'embed-thumbnail', src: image.thumb, alt: image.alt, title: image.alt }))
			));
		} else if (postEmbed.$type == 'app.bsky.embed.video#view') {
			let thumbnailElem = html('div', { class: 'embed-video-thumbnail-wrapper' },
				html('img', { class: 'embed-thumbnail', src: postEmbed.thumbnail }));

			if (!Hls.isSupported()) {
				return html('div', { class: 'embed-video' },
					html('a', { href: toPostUri(post.uri), title: t(`Video`) }, thumbnailElem));
			}

			let embedVideoElem = html('div', { class: 'embed-video' }, thumbnailElem);

			thumbnailElem.addEventListener('click', () => {
				let hls = new Hls();
				hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
					console.log(hls.currentLevel, data.levels);
					hls.currentLevel = data.levels.length - 1;
				});
				hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
					console.log(event, data);
				});
				hls.loadSource(postEmbed.playlist);

				let videoElem = html('video', { controls: true, autoplay: true, poster: postEmbed.thumbnail });
				embedVideoElem.replaceChildren(videoElem);

				hls.attachMedia(videoElem);
			});

			return embedVideoElem;
		} else if (postEmbed.$type == 'app.bsky.embed.external#view') {
			return html('div', { class: 'embed-external' }, [
				postEmbed.external.thumb ? html('a', { href: postEmbed.external.uri },
					html('img', { class: 'embed-thumbnail', src: postEmbed.external.thumb })) : null,

				html('div', { class: 'embed-external-text' }, [
					html('a', { class: 'title', href: postEmbed.external.uri }, postEmbed.external.title || postEmbed.external.uri),

					postEmbed.external.description != "" ? html('div', { class: 'description' }, postEmbed.external.description) : null,

					html('a', { class: 'url', href: postEmbed.external.uri }, postEmbed.external.uri),
				]),
			]);
		} else if (postEmbed.$type == 'app.bsky.embed.record#view') {
			return makeEmbedRecordView(postEmbed.record, depth);
		} else if (postEmbed.$type == 'app.bsky.embed.recordWithMedia#view') {
			return [
				...makePostEmbeds(postEmbed.media, post, depth),
				// postEmbed.record => app.bsky.embed.record
				// postEmbed.record.record => app.bsky.embed.record#view (probably)
				makeEmbedRecordView(postEmbed.record.record, depth),
			];
		} else {
			return html('div', {}, t(`Unsupported embed type`) + ` ${postEmbed.$type}`);
		}
	});
}

const makeEmbedRecordView = (embedRecordView, depth) => {
	if (embedRecordView.$type == 'app.bsky.embed.record#viewRecord') {
		if (depth < 1) {
			return makePost(embedRecordView, embedRecordView.value, embedRecordView.embeds, depth+1);
		}
		return html('div', { class: 'post' },
			html('a', { href: toPostUri(embedRecordView.uri) }, t(`Quoted post`)));
	} else if (embedRecordView.$type == 'app.bsky.embed.record#viewNotFound') {
		return html('div', { class: 'post' },
			html('a', { href: toPostUri(embedRecordView.uri) }, t(`Not found`)));
	} else if (embedRecordView.$type == 'app.bsky.embed.record#viewBlocked') {
		return html('div', { class: 'post' },
			html('a', { href: toPostUri(embedRecordView.uri) }, t(`Blocked`)));
	} else if (embedRecordView.$type == 'app.bsky.embed.record#viewDetached') {
		return html('div', { class: 'post' },
			html('a', { href: toPostUri(embedRecordView.uri) }, t(`Detached`)));
	// } else if (embedRecordView.$type == 'app.bsky.feed.defs#generatorView') {
	// } else if (embedRecordView.$type == 'app.bsky.graph.defs#listView') {
	// } else if (embedRecordView.$type == 'app.bsky.labeler.defs#labelerView') {
	// } else if (embedRecordView.$type == 'app.bsky.graph.defs#starterPackViewBasic') {
	} else {
		return html('div', { class: 'post' }, t(`Unsupported record view type`) + ` ${embedRecordView.$type}`);
	}
}

const getPostLabels = (post) => {
	const parseLabels = (labels) => {
		let values = [];
		for (let label of labels) {
			if (!label.neg) {
				values.push(label.val);
			} else {
				values = values.filter(x => x != label.val);
			}
		}
		return values;
	}

	return [
		...(post.author.labels ? parseLabels(post.author.labels).map(label => ({ onProfile: true, name: label })) : []),
		...(post.labels ? parseLabels(post.labels).map(label => ({ onProfile: false, name: label })) : []),
	]
}

const makeLabels = (post) => {
	let labels = getPostLabels(post);

	if (labels.length > 0) {
		return [
			html('div', { class: 'line-labels' }, [
				...labels.map(label =>
					html('div', { class: 'label' }, getLabelDescription(label))
				),
			])
		];
	} else {
		return [];
	}
}

const getToHideLabels = (labels) => {
	return labels.filter(label => Object.keys(knownLabels).includes(label.name));
}

const makeEmbed = (post) => {
	return html('div', {class: 'post-embed'}, [
		html('blockquote', {
			'data-bluesky-uri': post.uri,
			'data-bluesky-cid': post.cid,
		}, t(`Loading ~1 embed...`, `${post.uri}`)),
		html('script', {
			src: "https://embed.bsky.app/static/embed.js",
			charset: "utf-8",
			async: "async",
		})
	]);
}

// Bluesky utils

const apiRequest = async (endpoint, args) => {
	if (args) {
		args = Object.entries(args).flatMap(([k, v]) => {
			if (Array.isArray(v)) {
				return v.map(x => [k, x]);
			}
			return [[k, v]];
		});
	}

	let url = endpoint + (args ? "?" + new URLSearchParams(args) : "");
	try {
		let res = await fetch(url, { signal: abortController.signal });
		if (!res.ok) throw new NotOkError(`${res.status}`);
		let json = await res.json();
		return json;
	} catch (e) {
		if (e instanceof TypeError) {
			console.log(e);
			throw new NotOkError(t(`Request failed`));
		}
		throw e;
	}
}

const toUserDate = (datetime) => datetime ? new Date(datetime).toLocaleString() : t(`Unknown time`);

const toRichText = (text, facets) => {
	let elems = [];
	let lastByte = 0;

	let array = new TextEncoder().encode(text);
	let textDecoder = new TextDecoder();

	const slice = (start, end) => textDecoder.decode(array.slice(start, end));

	for (let facet of facets) {
		// add in previous text only
		elems.push(slice(lastByte, facet.index.byteStart));

		// add current facet
		let current = slice(facet.index.byteStart, facet.index.byteEnd);
		for (let feature of facet.features) {
			if (feature.$type == "app.bsky.richtext.facet#mention") {
				elems.push(html('a', { href: toProfileUri(feature.did) }, current));
			} else if (feature.$type == "app.bsky.richtext.facet#link") {
				elems.push(html('a', { href: feature.uri, title: feature.uri }, current));
			} else if (feature.$type == "app.bsky.richtext.facet#tag") {
				elems.push(html('a', { href: toTagUri(feature.tag) }, current));
			} else {
				elems.push(html('span', { title: t(`Unsupported facet`) + ` ${feature.$type}` }, current));
			}
		}
		lastByte = facet.index.byteEnd;
	}

	elems.push(slice(lastByte, array.length));
	return elems;
}

const parseUri = (uri) => {
	return {
		repo: uri.split("/")[2],
		collection: uri.split("/")[3],
		rkey: uri.split("/")[4],
	};
}

const toProfileUri = (did) => {
	return `https://bsky.app/profile/${did}`;
}

const toPostUri = (uri) => {
	let at = parseUri(uri);
	let collection = (at.collection == "app.bsky.feed.post") ? "post" : "";
	return `https://bsky.app/profile/${at.repo}/post/${at.rkey}`;
}

const toTagUri = (tag) => {
	return `https://bsky.app/hashtag/${tag}`;
}

const getLabelDescription = (label) => {
	return (label.onProfile ? t(`Profile: `) : '') + (knownLabels[label.name] ?? label.name);
}

// Helpers

const $ = q => document.querySelector(q);

const html = (tag, attrs, contents) => {
	const e = document.createElement(tag);
	if (attrs) {
		for (let [attrName, attrValue] of Object.entries(attrs)) {
			e.setAttribute(attrName, attrValue);
		}
	}
	if (contents) {
		if (!Array.isArray(contents))
			contents = [contents];
		e.append(...contents.filter(x => x));
	}
	return e;
}

const abortWrapper = async (func) => {
	abortController?.abort();

	try {
		abortController = new AbortController();
		await func();
		abortController = null;
	} catch (e) {
		if (e.name == "AbortError") {
			// console.log("aborted", e);
		} else {
			throw e;
		}
	}
}

class NotOkError extends Error { }

main();