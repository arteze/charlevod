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
		if(window.chatMenu){
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
	}
	, create_limit_input: function(){
		var menubar = document.querySelector("#menubar")
		if(menubar){
			var a = document.createElement("a")
			var input = document.createElement("input")
			input.id = "limit_messages"
			if(window.localStorage.i){
				window.i.count_messages = JSON.parse(window.localStorage.i).count_messages
			}else{
				window.i.count_messages = 800
			}
			input.value = window.i.count_messages
			a.appendChild(input)
			document.querySelector("#menubar").appendChild(a)
		}
	}
	, program: function program(){
		document.onreadystatechange = (function ready(){
			++window.i.i
			if(window.i.i==2){
				// Parte 1
				window.ol = function ol(a, b, c, d, e) {
					// console.trace("ol",{ a: a, b: b, c: c, d: d, e: e })
					e = { limit: window.i.count_messages };
					null != d && (e.toTime = d);
					"room" == b ? e.roomId = c : "private" == b && (e.nick = c);
					var devuelve = window.jh(a.qa, "loadLastMessages", e, !0)
					return devuelve
				}

				// Parte 2
				window.i.restart_scroll();
				
				// Parte 3: Entrada para el límite
				window.i.create_limit_input()
			}
		})
		setInterval( function interval(){
			if( window.limit_messages && window.limit_messages.value>20 ){
				var ls = {count_messages: window.i.count_messages}
				window.i.count_messages = +window.limit_messages.value
				window.localStorage.i = JSON.stringify(ls)
			}
			var container = document.querySelector(".chatMessages")
			if(container){
				var count = container = document.querySelector(".chatMessages").childNodes.length
				window.i.counts.push(count)
				if( window.i.counts[window.i.counts.length-1] >
					window.i.counts[window.i.counts.length-2] + window.i.count_messages - 15 ){
					var container_scroll = document.querySelector(".chatMessagesContainer")
					if(container_scroll.scrollTo){
                        container_scroll = document.querySelector(".chatMessagesContainer")
                        container_scroll.scrollTo(0, 100); // x: 0, y: 100
					}
				}
			}
		}, 100 )
	}
}
window.i.program()
