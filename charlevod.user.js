// ==UserScript==
// @name        Chabot
// @description Chabot
// @version     0.1
// @author      ArtEze
// @match       *://*.chatovod.com/*
// @grant       none
// @run-at     document-start
// ==/UserScript==

window.i = {
	i: 0
}
document.onreadystatechange = (function(){
	++window.i.i
	if(window.i.i==2){
		// Parte 0
		var chatMessagesWrapper = document.querySelector(".chatMessagesWrapper")
		chatMessagesWrapper && (chatMessagesWrapper.style["overflow-y"] = "scroll")

		// Parte 1
		window.ol = function ol(a, b, c, d, e) {
			// console.trace("ol",{ a: a, b: b, c: c, d: d, e: e })
			e = { limit: 900 };
			null != d && (e.toTime = d);
			"room" == b ? e.roomId = c : "private" == b && (e.nick = c);
			var devuelve = window.jh(a.qa, "loadLastMessages", e, !0)
			chatMessagesWrapper && chatMessagesWrapper.scrollTo(0, 100);
			return devuelve
		}
	}
})
