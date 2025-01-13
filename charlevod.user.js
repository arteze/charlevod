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
	, counts: []
	, restart_scroll: function restart_scroll(element) {
		var style_default = document.querySelector("link[href*=default]")
		style_default && style_default.remove()
		var f = ( fetch("https://st1.chatovod.com/widget/css/default.css")
			.then(x=>x.text())
			.then(x=>{
				var y = x
					.replace(/url\(\.\.\/i\//g,"url\(https://st1.chatovod.com/widget/i/")
					.replace(/div(.|\s){8}scrollbar-width(.|\s){413}/gm,"")
				var style = document.createElement("style")
				style.innerHTML = y
				document.head.appendChild(style)
			})
		)
	}
	, program: function program(){
		document.onreadystatechange = (function ready(){
			++window.i.i
			if(window.i.i==2){
				// Parte 1
				window.ol = function ol(a, b, c, d, e) {
					// console.trace("ol",{ a: a, b: b, c: c, d: d, e: e })
					e = { limit: 900 };
					null != d && (e.toTime = d);
					"room" == b ? e.roomId = c : "private" == b && (e.nick = c);
					var devuelve = window.jh(a.qa, "loadLastMessages", e, !0)
					return devuelve
				}

				// Parte 2
				window.i.restart_scroll();
			}
		})
		setInterval( function interval(){
			var container = document.querySelector(".chatMessages")
			if(container){
				var count = container = document.querySelector(".chatMessages").childNodes.length
				window.i.counts.push(count)
				if( window.i.counts[window.i.counts.length-1] > window.i.counts[window.i.counts.length-2] + 800 ){
					console.log("Subida detectada")
					var container_scroll = document.querySelector(".chatMessagesContainer")
					if(container_scroll.scrollTo){
						setTimeout(function scroll_to(){
							var container_scroll = document.querySelector(".chatMessagesContainer")
							console.log("timeout container_scroll.scrollTo",container_scroll.scrollTo)
							container_scroll.scrollTo(0, 100); // x: 0, y: 100
						},500)
					}
				}
			}
		}, 100 )
	}
}
window.i.program()
