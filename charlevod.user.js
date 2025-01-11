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
		document.querySelector("#chatMessagesWrapper").style["overflow-y"] = "scroll"
		window.ol = function ol(a, b, c, d, e) {
			// console.trace("ol",{ a: a, b: b, c: c, d: d, e: e })
			e = { limit: 2000 };
			null != d && (e.toTime = d);
			"room" == b ? e.roomId = c : "private" == b && (e.nick = c);
			return window.jh(a.qa, "loadLastMessages", e, !0)
		}
	}
})
