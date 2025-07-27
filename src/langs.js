module.exports = [
	{
		name: 'en',
		filename: 'index.html',
		strsHTML: {
			//
		},
		strsJS: {
			//
		},
	},
	{
		name: 'pt-br',
		filename: 'index-pt-br.html',
		strsHTML: {
			"See other profile's likes on Bluesky":
				"Ver curtidas de outros perfis no Bluesky",
			"Wanna view the Bluesky likes of another user? This website will allow you to check that using the official Bluesky API.":
				"Quer visualizar as curtidas de algum outro usuário? Esse site permite você ver isso usando a API oficial do Bluesky.",
			"About":
				"Sobre",
			"handle":
				"usuario",
			"Infinite scroll":
				"Rolagem infinita",
			"Oldest first":
				"Antigos primeiro",
			"Show adult/hidden":
				"Mostrar adulto/ocult.",
			"Method to use to display posts.":
				"Método para usar para mostrar postagens.",
			"Use embeded iframes from Bluesky. Slow.":
				"Usar iframes incorporados do Bluesky. Lento.",
			"Embed":
				"Incorp.",
			"Use my custom renderer. Faster, but may not accurately display some posts.":
				"Usar meu renderizador customizado. Mais rápido, mas pode não mostrar alguns postagens corretamente.",
			"Custom":
				"Custom.",
			"Show likes":
				"Mostrar curtidas",
			"Usage:":
				"Uso:",
			"In the main text box, input the profile you want. It can be a handle, a bsky.app profile URL or a DID. \"https://\" isn't needed. Select \"Oldest first\" if you want to see likes in reverse order. Select \"Show adult/hidden\" if you want labeled content to be shown by default (only in the custom method). Use the dropdown to select the method to display posts. \"Embed\" loads iframes from Bluesky that contain the posts, which can be very slow. \"Custom\" may not show all posts correctly, but it is faster, can show more information and can play videos directly on the page. Finally, click \"Show likes\" to apply all settings and load them up.":
				"Na caixa de texto principal, insira o perfil que você quer. Pode ser um usuário, uma URL bsky.app de perfil, ou um DID. \"https://\" não é necessário. Selecione \"Antigos primeiro\" se você quer ver as curtidas em ordem reversa. Selecione \"Mostrar adulto/ocult.\" se você quer que conteúdo rotulado seja mostrado por padrão (apenas no método customizado). Use o menu suspenso para selecionar o método para mostrar postagens. \"Incorp.\" carrega iframes do Bluesky que contém as postagens, o que pode ser muito devagar. \"Custom.\" pode não mostrar todas as postagens corretamente, mas é mais rápido, pode mostrar mais informações e pode reproduzir vídeos diretamente na página. Finalmente, clique \"Mostrar curtidas\" para aplicar todas as configurações e carregá-las.",
			"You can use query parameters to link directly to some profile's likes with some options: <code>profile</code> is the profile, <code>method</code> can be set to <code>embed</code> or <code>custom</code>, <code>showhidden</code> and <code>reverse</code> can be <code>true</code>. Example: <code>https://luizzeroxis.github.io/bluesky-likes?profile=luizzeroxis.bsky.social&method=custom&showhidden=true&reverse=true</code>":
				"Você pode usar parâmetros de consulta para vincular diretamente às curtidas de algum perfil com algumas opções: <code>profile</code> (perfil) é o perfil, <code>method</code> (método) pode ser definido como <code>embed</code> (incorporado) ou <code>custom</code> (customizado), <code>showhidden</code> e <code>reverse</code> podem ser <code>true</code>. Exemplo: <code>https://luizzeroxis.github.io/bluesky-likes?profile=luizzeroxis.bsky.social&method=custom&showhidden=true&reverse=true</code>",
			"About:":
				"Sobre:",
			"This website exists because for some reason the Bluesky official website doesn't show likes from other profiles, only your own, even though this is information that can be gathered using the API. There didn't seem to exist any website that used the API to show you that in a user interface, so I made it myself. I wonder what will happen to this website if they decide to add a likes tab on Bluesky?":
				"Esse site existe pois por alguma razão o site oficial do Bluesky não mostra curtidas de outros perfis, apenas suas próprias, apesar de que essa é uma informação que pode ser coletada usando a API. Não parecia que nenhum site existia que usasse a API para mostrar a você isso numa interface de usuário, então eu fiz eu mesmo. Eu me pergunto, o que ocorrerá com esse site se eles decidirem adicionar uma aba de curtidas no Bluesky?",
			"Source code: <a href=\"https://github.com/luizzeroxis/bluesky-likes/\">https://github.com/luizzeroxis/bluesky-likes/</a>. Licensed under the GNU General Public License Version 3. Uses <a href=\"https://github.com/video-dev/hls.js\">hls.js</a>.":
				"Código fonte: <a href=\"https://github.com/luizzeroxis/bluesky-likes/\">https://github.com/luizzeroxis/bluesky-likes/</a>. Licenciado sob GNU General Public License Version 3. Usa <a href=\"https://github.com/video-dev/hls.js\">hls.js</a>.",
			"Visit my website for contact information: <a href=\"https://luizzeroxis.github.io/\">https://luizzeroxis.github.io/</a>":
				"Visite meu site para informações de contato: <a href=\"https://luizzeroxis.github.io/\">https://luizzeroxis.github.io/</a>",
		},
		strsJS: {
			"hidden":
				"ocultado",
			"has warning":
				"com aviso",
			"don't show to logged-out users":
				"não mostrar para usuários desconectados",
			"adult content":
				"conteúdo adulto",
			"sexually suggestive":
				"sexualmente sugestivo",
			"graphic media":
				"conteúdo gráfico",
			"non-sexual nudity":
				"nudez não-erótica",
			"sexually suggestive (cartoon)":
				"sexualmente sugestivo (desenho)",
			"Request cancelled":
				"Requisição cancelada",
			"Loading...":
				"Carregando...",
			"Could not find service endpoint":
				"Não foi possível encontrar o endpoint do serviço",
			"Error when fetching likes:":
				"Erro ao buscar curtidas:",
			"Load more likes":
				"Carregar mais curtidas",
			"End of likes":
				"Fim das curtidas",
			"Liked on":
				"Curtida em",
			"Post not found, it may have been deleted.":
				"Postagem não encontrada, ela pode ter sido deletada.",
			"Unsupported collection type":
				"Tipo de 'collection' não suportado",
			"Reload embed":
				"Recarregar incorporação",
			"Open on bsky.app":
				"Abrir em bsky.app",
			"Verified":
				"Verificado",
			"replies":
				"respostas",
			"reposts and quotes":
				"repostagens e citações",
			"likes":
				"curtidas",
			"Show post":
				"Mostrar postagem",
			"Replying to post":
				"Respondendo à postagem",
			"Video":
				"Vídeo",
			"Unsupported embed type":
				"Tipo de 'embed' não suportado",
			"Quoted post":
				"Postagem citada",
			"Not found":
				"Não encontrado",
			"Blocked":
				"Bloqueado",
			"Detached":
				"Desanexado",
			"Unsupported record view type":
				"Tipo de 'record view' não suportado",
			"Loading ~1 embed...":
				"Carregando incorporação de ~1...",
			"Request failed":
				"Requisição falhou",
			"Unknown time":
				"Tempo desconhecido",
			"Unsupported facet":
				"'facet' não suportado",
			"Profile: ":
				"Perfil: ",
		},
	},
];