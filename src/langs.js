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
			"thanks lolchick!":
				"obrigado lolchick!",
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
			"Trans rights are human rights!":
				"Direitos trans são direitos humanos!",
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
			"saves":
				"salvos",
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
	{
		name: 'es',
		filename: 'index-es.html',
		strsHTML: {
			"See other profile's likes on Bluesky":
				"Ver los me gusta de otros perfiles en Bluesky",
			"Wanna view the Bluesky likes of another user? This website will allow you to check that using the official Bluesky API.":
				"Te gustaría ver los me gusta de otro usuario? Ésta página te permitirá hacerlo usando el API oficial de Bluesky.",
			"About":
				"Acerca de",
			"handle":
				"usuario",
			"Infinite scroll":
				"Scroll infinito",
			"Oldest first":
				"Antiguos primeiro",
			"Show adult/hidden":
				"Mostrar contenido adulto/oculto",
			"Method to use to display posts.":
				"Método a usar para mostrar posteos.",
			"Use embeded iframes from Bluesky. Slow.":
				"Usar iframes incorporados de Bluesky. Lento.",
			"Embed":
				"Incorp.",
			"Use my custom renderer. Faster, but may not accurately display some posts.":
				"Usar renderizador customizado. Más veloz, pero puede que no muestre correctamente algunos posts.",
			"Custom":
				"Custom.",
			"Show likes":
				"Mostrar me gustas",
			"Usage:":
				"Uso:",
			"In the main text box, input the profile you want. It can be a handle, a bsky.app profile URL or a DID. \"https://\" isn't needed. Select \"Oldest first\" if you want to see likes in reverse order. Select \"Show adult/hidden\" if you want labeled content to be shown by default (only in the custom method). Use the dropdown to select the method to display posts. \"Embed\" loads iframes from Bluesky that contain the posts, which can be very slow. \"Custom\" may not show all posts correctly, but it is faster, can show more information and can play videos directly on the page. Finally, click \"Show likes\" to apply all settings and load them up.":
				"En la caja de texto, escribe el perfil que quieras. Puede ser un handle, un perfil bsky.app URL o un DID' \"https://\" no es necesario. Seleccione \"Antiguos primeiro\" si quieres ver los me gusta en orden al revez. Seleccione \"Mostrar adulto/ocult.\" si quieres que el contenido etiquetado aparezca por predeterminado (sólamente en el método customizado). Use el menú desplegable para seleccionar el método para mostrar posteos. \"Incorp.\" carga los iframes de Bluesky que contienen los posteos, lo que puede ser muy lento. \"Custom.\" puede que no muestre todos los posteos correctamente, pero es más rápido, puede mostrar más información y reprudcir videos diréctamente en la página. Finalmente, haga click en \"Mostrar me gustas\" para aplicar todas las configuraciones y aplicarlas.",
			"You can use query parameters to link directly to some profile's likes with some options: <code>profile</code> is the profile, <code>method</code> can be set to <code>embed</code> or <code>custom</code>, <code>showhidden</code> and <code>reverse</code> can be <code>true</code>. Example: <code>https://luizzeroxis.github.io/bluesky-likes?profile=luizzeroxis.bsky.social&method=custom&showhidden=true&reverse=true</code>":
				"Puedes utilizar parámetros de consulta para conectar directamente con los me gusta de algunos perfiles con algunas opciones: <code>profile</code> (perfil) es el perfil, <code>method</code> (método) puede ser definido como <code>embed</code> (incorporado) o <code>custom</code> (customizado), <code>showhidden</code> y <code>reverse</code> puede ser <code>true</code>. Ejemplo: <code>https://luizzeroxis.github.io/bluesky-likes?profile=luizzeroxis.bsky.social&method=custom&showhidden=true&reverse=true</code>",
			"About:":
				"Acerca de:",
			"This website exists because for some reason the Bluesky official website doesn't show likes from other profiles, only your own, even though this is information that can be gathered using the API. There didn't seem to exist any website that used the API to show you that in a user interface, so I made it myself. I wonder what will happen to this website if they decide to add a likes tab on Bluesky?":
				"Ésta página existe porque por alguna razón la página oficial de Bluesky no muestra los me gusta de otros perfiles, solo los tuyos, apesar de que ésta información pueda ser obtenida utilizando el API. No parecía existir ninguna página que utilizara el API para mostrarte eso en la interfaz de usuario, así que lo hice yo mismo. Me pregunto qué le sucederá a ésta página si deciden añadir una pestaña de me gustas en Bluesky?",
			"Source code: <a href=\"https://github.com/luizzeroxis/bluesky-likes/\">https://github.com/luizzeroxis/bluesky-likes/</a>. Licensed under the GNU General Public License Version 3. Uses <a href=\"https://github.com/video-dev/hls.js\">hls.js</a>.":
				"Código fuente: <a href=\"https://github.com/luizzeroxis/bluesky-likes/\">https://github.com/luizzeroxis/bluesky-likes/</a>. Licenciado sob GNU General Public License Version 3. Usa <a href=\"https://github.com/video-dev/hls.js\">hls.js</a>.",
			"Visit my website for contact information: <a href=\"https://luizzeroxis.github.io/\">https://luizzeroxis.github.io/</a>":
				"Visite my página para más información de contacto: <a href=\"https://luizzeroxis.github.io/\">https://luizzeroxis.github.io/</a>",
			"thanks lolchick!":
				"gracias lolchick!",
		},
		strsJS: {
			"hidden":
				"oculto",
			"has warning":
				"tiene advertencia",
			"don't show to logged-out users":
				"no mostrar a usuarios que no hayan iniciado sesión",
			"adult content":
				"contenido adulto",
			"sexually suggestive":
				"sexualmente sugestivo",
			"graphic media":
				"contenido gráfico",
			"non-sexual nudity":
				"desnudez no-sexual",
			"sexually suggestive (cartoon)":
				"sexualmente sugestivo (dibujos o similar)",
			"Trans rights are human rights!":
				"Derechos trans son derechos humanos!",
			"Request cancelled":
				"Solicitud cancelada",
			"Loading...":
				"Cargando...",
			"Could not find service endpoint":
				"No fue posible encontrar endpoint de servicio",
			"Error when fetching likes:":
				"Error al buscar me gustas:",
			"Load more likes":
				"Cargar más me gustas",
			"End of likes":
				"Fin de los me gustas",
			"Liked on":
				"Me gusta dado un",
			"Post not found, it may have been deleted.":
				"Post no encontrado, puede que haya sido borrado.",
			"Unsupported collection type":
				"Tipo de 'collection' no compatible",
			"Reload embed":
				"Recargar incorporación",
			"Open on bsky.app":
				"Abrir en bsky.app",
			"Verified":
				"Verificado",
			"replies":
				"respuestas",
			"reposts and quotes":
				"reposteos y citas",
			"likes":
				"me gustas",
			"saves":
				"guardados",
			"Show post":
				"Mostrar posteo",
			"Replying to post":
				"Respondiendo a posteo",
			"Video":
				"Video",
			"Unsupported embed type":
				"Tipo de 'embed' no compatible",
			"Quoted post":
				"Posteo citado",
			"Not found":
				"No encontrado",
			"Blocked":
				"Bloqueado",
			"Detached":
				"Separado",
			"Unsupported record view type":
				"Tipo de 'record view' no compatible",
			"Loading ~1 embed...":
				"Cargando incorporación de ~1...",
			"Request failed":
				"Solicitud fallida",
			"Unknown time":
				"Tiempo desconocido",
			"Unsupported facet":
				"'facet' no compatible",
			"Profile: ":
				"Perfil: ",
		},
	},
];
