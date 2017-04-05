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

	initCarousel();
});

function initCarousel() {
	const slider = new Siema({
		selector: '.slider',
		duration: 200,
		easing: 'ease-out',
		draggable: false
	});

	// Add a function that generates pagination to prototype
	Siema.prototype.addPagination = function () {
		var pagination = document.createElement('div');
		pagination.classList.add('pagination');
		this.selector.appendChild(pagination);
		for (let i = 0; i < this.innerElements.length; i++) {
			var btn = document.createElement('button');
			btn.classList.add('slider_page');
			btn.addEventListener('click', () => {
				getSiblings(btn);
				this.goTo(i);
				document.querySelector(".slider_page:nth-child(" + (i+1) + ")").classList.add('active');
			});
			pagination.appendChild(btn);
			document.querySelector(".slider_page:first-child").classList.add('active');
		}
	}

	// Trigger pagination creator
	slider.addPagination();
}

function getSiblings(el) {
	var siblings = [];
	el = el.parentNode.firstChild;
	do {
		el.classList.remove("active");
		siblings.push(el);
	} while (el = el.nextSibling);
	return siblings;
}

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
