(function (window, document) {

	'use strict';
	var classie = window.classie,
	body = document.body,
	triggerBttn = document.getElementById('btn__menu--toggle'),
	overlay = document.querySelector('.nav__overlay'),
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
	support = {
		transitions: Modernizr.csstransitions
	};

	function toggleOverlay() {
		if (classie.has(body, 'when-overlay')) {
			classie.remove(body, 'when-overlay');
			classie.remove(triggerBttn, 'close');
			var onEndTransitionFn = function (ev) {
				if (support.transitions) {
					if (ev.propertyName !== 'visibility') {
						return;
					}
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
			};
			if (support.transitions) {
				overlay.addEventListener(transEndEventName, onEndTransitionFn);
			} else {
				onEndTransitionFn();
			}
		} else {
			classie.add(triggerBttn, 'close');
			classie.add(body, 'when-overlay');
		}
	}

	// init
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave'
		}
	});

	// scrollmagic
	var slides = document.querySelectorAll('.region');

	//////////////////////////////////
	// create scene for every slide //
	//////////////////////////////////
	for (var i = 0; i < slides.length; i++) {
		new ScrollMagic.Scene({
			triggerElement: slides[i],
		})
		.setPin(slides[i])
		.addTo(controller);
	}

	function wheel(event) {
		event.preventDefault();
		var delta = event.wheelDelta / 120 || -event.detail / 3,
		scrollTime = 1.5,
		scrollDistance = 450,
		scrollTop = window.pageYOffset || document.body.scrollTop,
		scrollToPos = scrollTop - parseInt(delta * scrollDistance);

		TweenMax.to(window, scrollTime, {
			scrollTo: {
				y: scrollToPos,
				autoKill: true
			},
			//ease: Power1.easeOut,
			overwrite: 2
		});
		event.returnValue = false;
	}

	function ajaxify(url, args) {
		return new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (request.readyState == 4 && request.status == 200) {
					var response = JSON.parse(request.responseText);
					resolve(response);
				}
			};
			request.onerror = reject;
			request.open('GET', url, true);
			request.send();
		});
	}

	ajaxify('assets/js/data/locations.json', '').then(function (locations) {
		var mapselect = document.querySelector('.map__dropdown select');
		for (var country in locations) {
			if (locations.hasOwnProperty(country)) {
				var optionNode = document.createElement('option');
				var textnode = document.createTextNode(country);
				optionNode.appendChild(textnode);
				mapselect.appendChild(optionNode);
			}
		}
		
		//http://jsfiddle.net/coxb9so4/
		/*[].forEach.call(document.querySelectorAll('#trends :checked'), function (elm) {
			alert(elm.value);
		})*/
	});

	triggerBttn.addEventListener('click', toggleOverlay);
	window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;
	//window.onload = loadMap;
})(window, document);

function loadMap() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(13, 80),
		zoom: 8,
		mapTypeId: 'roadmap',
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	});
}
