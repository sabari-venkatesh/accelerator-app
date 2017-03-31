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

var animateHome = function () {
	/* homepage animate after loading */

	var tl = new TimelineLite({
		paused: true,
	});

	tl.staggerFromTo(['.banner_text', '.banner_text .button'], 0.8, {
		x: "-75%",
		autoAlpha: 0
	}, {
		x: "0%",
		autoAlpha: 1,
		ease: Power4.easeInOut
	}, 0.1, '+=0.5', function () {
		typewrite();
		loadMap();
		smoothScroll.init();
		[].forEach.call(document.querySelectorAll('[class*=scroll]'), function (item, index) {
			item.onclick = function () {
				var target = this.hash;
				smoothScroll.scrollTo(document.querySelector(target));
			}
		});
	});
	tl.play();
}

var animateOutHome = function () {
	var tl = new TimelineLite({
		paused: true,
	});

	tl.staggerFromTo(['.banner_text', '.banner_text .button'], 0.8, {
		x: "0",
		autoAlpha: 1,
	}, {
		x: "-75%",
		autoAlpha: 0,
		ease: Power4.easeInOut
	}, 0.1, '+=0.5', function () {

	});
	tl.play();
};

document.addEventListener("DOMContentLoaded", function () {

	var triggerBtn = document.querySelector('.nav_toggle');

	triggerBtn.addEventListener('click', toggleOverlay, false);

	var controller = new ScrollMagic.Controller();
	var sections = document.querySelectorAll(".content");

	sections.forEach(function (section, index) {

		var animatable = section.querySelectorAll('.content_block .col');
		var sectionScene = new ScrollMagic.Scene({
				triggerElement: section
			})
			.setTween(TweenMax.staggerFrom(animatable, 0.5, {
				y: '+=40',
				autoAlpha: 0,
				ease: Power0.easeNone
			}, 0.2))
			.on('enter', function (event) {
				console.log(event);
			})
			.addTo(controller);
	});

	smoothScroll.init();

	/* make foreach as utility function. Ref: foreachiteration in chrome snippets tab */
	[].forEach.call(document.querySelectorAll('[class*=scroll]'), function (item, index) {
		item.onclick = function () {
			var target = this.hash;
			smoothScroll.scrollTo(document.querySelector(target));
		}
	});

});

function toggleOverlay() {
	var body = document.body,
		overlay = document.querySelector('.nav_overlay');
	if (classie.has(body, 'when-overlay')) {
		classie.remove(body, 'when-overlay');
		classie.remove(this, 'close');
		var onEndTransitionFn = function (ev) {
			if (ev.propertyName !== 'visibility') {
				return;
			}
			this.removeEventListener(getEventName(), onEndTransitionFn);
		};
		overlay.addEventListener(getEventName(), onEndTransitionFn);
	} else {
		classie.add(this, 'close');
		classie.add(body, 'when-overlay');
	}
}

function getEventName() {
	var t,
		el = document.createElement('foo'),
		transitions = {
			'transition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		}

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}
