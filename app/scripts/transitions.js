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
		smoothScroll.init();
		[].forEach.call(document.querySelectorAll('[class*=scroll]'), function (item, index) {
			item.onclick = function () {
				var target = this.hash;
				smoothScroll.scrollTo(document.querySelector(target));
			}
		});

		initCarousel();
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


// Define barba properties
Barba.transitionLength = 1500;

// Define transition
var Transition = Barba.BaseTransition.extend({
	start: function () {
		this.newContainerLoading.then(this.runTransition.bind(this));
	},

	runTransition: function () {

		document.body.style.overflow = 'hidden';

		////////////////////////////
		// Setup
		////////////////////////////
		var transitionLength = parseInt(Barba.transitionLength),
			transitionTimeout = 100,
			transitionLengthSeconds = (transitionLength / 1000) + 's',
			transitionSelector = 'data-transition';
		////////////////////////////

		// Set the animation time on all elements
		var allAnimationElements = document.querySelectorAll('[' + transitionSelector + ']');
		for (var i = 0; i < allAnimationElements.length; i++) {
			element = allAnimationElements[i];

			// Set styles
			element.style.animationDuration = transitionLengthSeconds;
			element.style.animationDelay = transitionLengthSeconds;
			element.style.animationName = element.dataset.transition;
			element.style.animationFillMode = 'forwards';
		}

		// Get all old elements with transitions
		var oldElements = this.oldContainer.querySelectorAll('[' + transitionSelector + ']');
		for (var i = 0; i < oldElements.length; i++) {
			element = oldElements[i];

			// Remove style tag
			element.removeAttribute('style');
		}

		// Trigger out transitions
		setTimeout(function () {

			for (var i = 0; i < oldElements.length; i++) {
				element = oldElements[i];

				// Set styles
				element.style.animationDuration = transitionLengthSeconds;
				element.style.animationDelay = '0s';
				element.style.animationName = element.dataset.transition;
				element.style.animationFillMode = 'forwards';
				element.style.animationDirection = 'alternate-reverse';
			}

		}, transitionTimeout);

		var x = this;

		function done(x) {

			// Remove old container and add new one
			x.oldContainer.style.visibility = 'hidden';
			x.newContainer.style.visibility = 'visible';

			// Remove style tag at the end of the animation
			setTimeout(function () {
				document.body.style.overflow = 'visible';
				for (var i = 0; i < allAnimationElements.length; i++) {
					element = allAnimationElements[i];
					element.removeAttribute('style');
				}
			}, transitionLength);

			// Scroll to top
			document.body.scrollTop = 0;

			// Done
			x.done();

		}

		// Mark as done
		setTimeout(function () {
			done(x);
		}, transitionLength + transitionTimeout);

	}
});

document.addEventListener("DOMContentLoaded", function () {

	Barba.Pjax.Dom.wrapperId = "main";
	Barba.Pjax.Dom.containerClass = "main_container";
	Barba.Pjax.getTransition = function () {
		return Transition;
	};
	Barba.Pjax.init();
	Barba.Prefetch.init();

	var Home = Barba.BaseView.extend({
		namespace: "home",
		onEnter: function () {
			document.body.removeAttribute("class");
			document.body.classList.add("page-home");
		},
		onEnterCompleted: function () {
			animateHome();
		},
		onLeave: function () {
			animateOutHome();
		},
		onLeaveCompleted: function () {}
	});

	Home.init();

	var Inner = Barba.BaseView.extend({
		namespace: "inner",
		onEnter: function () {
			document.body.removeAttribute("class");
			document.body.classList.add("page-population");
		},
		onEnterCompleted: function () {
			animateHome();
		},
		onLeave: function () {
			animateOutHome();
		},
		onLeaveCompleted: function () {}
	});

	Inner.init();
});

window.onload = function () {
	Barba.Pjax.start();
}
