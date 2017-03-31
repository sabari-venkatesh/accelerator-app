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

function animateHome() {
	/* homepage animate after loading */

	var tl = new TimelineLite({
		paused: true,
	});

	tl.staggerFromTo(['.logo', '.banner_text', '.banner_text .button'], 0.8, {
		x: "-75%",
		autoAlpha: 0
	}, {
		x: "0%",
		autoAlpha: 1,
		ease: Power4.easeInOut
	}, 0.1, '+=0.5', function () {
		typewrite();
		loadMap();
	});
	tl.play();
}

function preloaderTimeline(cb) {
	new TimelineLite({
		onStart: function () {
			cb();
		}
	}).add("start");
}

document.addEventListener("DOMContentLoaded", function () {

	Barba.Pjax.Dom.wrapperId = "main";
	Barba.Pjax.Dom.containerClass = "main_container";
	Barba.Pjax.init();
	Barba.Prefetch.init();

	var Home = Barba.BaseView.extend({
		namespace: "home",
		onEnter: function () {
			document.body.removeAttribute("class");
			document.body.classList.add("page-home");
		},
		onEnterCompleted: function () {
			preloaderTimeline(animateHome)
		},
		onLeave: function () {

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
			preloaderTimeline(animateHome)
		},
		onLeave: function () {

		},
		onLeaveCompleted: function () {}
	});

	Inner.init();

	var InfoTransitionRight = Barba.BaseTransition.extend({
		start: function () {
			Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
		},
		fadeOut: function () {
			var _this = this;
			var deferred = Barba.Utils.deferred();
			/*if ($(".navigation").hasClass("navigation--open")) {
				$(".navigation__trigger").trigger("click");
			}*/
			if (document.body.scrollTop > 0) {
				TweenMax.to("html,body", 1, {
					scrollTop: 0,
					ease: Power4.easeInOut,
					onComplete: function () {
						/*_this.oldContainer.querySelector(".controls").fadeOut(400);
						$(_this.oldContainer).find(".navigation__trigger").fadeOut(400);*/
						_this.oldContainer.classList.add("move");
						deferred.resolve();
					}
				});
			} else {
				/*$(_this.oldContainer).find(".controls").fadeOut(400);
				$(_this.oldContainer).find(".navigation__trigger").fadeOut(400);*/
				_this.oldContainer.classList.add("move");
				deferred.resolve();
			}
			return deferred.promise;
		},

		fadeIn: function () {
			var _this = this;
			var deferred = Barba.Utils.deferred();
			_this.newContainer.classList.add("show");
			/*var elem = $(_this.newContainer).find(".about").find(".elements__action"),
				desc = $(_this.newContainer).find(".elements__desc"),
				details = $(_this.newContainer).find(".layer--details"),
				portrait = $(_this.newContainer).find(".p-info .portrait"),
				lContent = $(_this.newContainer).find(".p-info .layer--content");*/

			new TimelineLite({
				force3d: true,
				onComplete: function () {
					_this.newContainer.removeAttribute("style");
					_this.done();
				}
			}).add("start").fromTo(_this.newContainer, 1, {
				x: "-100%"
			}, {
				x: "0%",
				ease: Power3.easeInOut
			});

			/*.fromTo(lContent, 1.2, {
	x: "-45%",
	autoAlpha: 0
}, {
	ease: DAnimation.bezier(0.333, 0, 0, 1),
	autoAlpha: 1,
	x: "0%"
}, "-=0.5").fromTo(portrait, 1.2, {
	x: "-30%",
	autoAlpha: 0
}, {
	x: "0%",
	autoAlpha: 1,
	ease: Power4.easeOut
}, "-=0.7").to(elem, 0.9, {
	x: "0%",
	opacity: 1,
	ease: Power4.easeOut
}, "-=1").to(desc, 0.9, {
	opacity: 1,
	ease: Power3.easeOut
}, "-=0.8").to(details, 0.8, {
	opacity: 1,
	x: "0%",
	ease: Power3.easeOut
}, "-=0.8")*/

		}
	});

	var InfoTransitionLeft = Barba.BaseTransition.extend({
		start: function () {

			Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
		},

		fadeOut: function () {
			var _this = this;
			var deferred = Barba.Utils.deferred();
			if (document.body.scrollTop > 0) {
				TweenMax.to("html,body", 1, {
					scrollTop: 0,
					ease: Power4.easeInOut,
					onComplete: function () {
						/*_this.oldContainer.querySelector(".controls").fadeOut(400);
						$(_this.oldContainer).find(".navigation__trigger").fadeOut(400);*/
						_this.oldContainer.classList.add("move");
						deferred.resolve();
					}
				});
			} else {
				_this.oldContainer.classList.add("move");
				deferred.resolve();
			}
			return deferred.promise;
		},

		fadeIn: function () {
			var _this = this;
			var deferred = Barba.Utils.deferred();

			_this.newContainer.classList.add("show");

			new TimelineLite({
					force3d: true,
					onComplete: function () {
						_this.newContainer.removeAttribute("style");
						_this.done();
					}
				}).add("start").fromTo(_this.newContainer, 1, {
					x: "100%"
				}, {
					x: "0%",
					ease: Power3.easeInOut
				})
				/*.fromTo(lContent, 1.2, {
					x: "45%",
					autoAlpha: 0
				}, {
					ease: DAnimation.bezier(0.333, 0, 0, 1),
					autoAlpha: 1,
					x: "0%"
				}, "-=0.5").fromTo(portrait, 1.2, {
					x: "30%",
					autoAlpha: 0
				}, {
					x: "0%",
					autoAlpha: 1,
					ease: Power4.easeOut
				}, "-=0.7").to(elem, 0.9, {
					x: "0%",
					opacity: 1,
					ease: Power4.easeOut
				}, "-=1").to(desc, 0.9, {
					opacity: 1,
					ease: Power3.easeOut
				}, "-=0.8").to(details, 0.8, {
					opacity: 1,
					x: "0%",
					ease: Power3.easeOut
				}, "-=0.8")*/
			;

		}
	});

	Barba.Dispatcher.on('linkClicked', function (anchor) {

		if (anchor.classList.contains("arrow_right-trigger")) {
			Barba.Pjax.getTransition = function () {
				return InfoTransitionLeft;
			}
		} else if (anchor.classList.contains("arrow_left-trigger")) {
			Barba.Pjax.getTransition = function () {
				return InfoTransitionRight;
			}
		}
	});







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
