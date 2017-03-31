(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.smoothScroll = factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	var smoothScroll = {};
	var settings, scrollToPosition = 0;

	var defaults = {
		'amount': 400,
		'speed': 500
	};

	var stopScroll = function () {
		/* if (typeof this.scrollInterval !== 'undefined') {
		            clearInterval(this.scrollInterval);
		            this.scrollInterval = undefined;
		        }*/
	};

	var easeInOutCubic = function (t) {
		return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	}

	var getTop = function (element, start) {
		if (element.nodeName === 'HTML')
			return -start
		return element.getBoundingClientRect().top + start
	};

	var position = function (start, end, elapsed, duration) {
		if (elapsed > duration)
			return end;
		return start + (end - start) * easeInOutCubic(elapsed / duration);
	};

	smoothScroll.init = function (options) {
		console.log("destroyed before init");
		smoothScroll.destroy();
		console.log("init");
		settings = extend(defaults, options || {});

		window.addEventListener('wheel', this.scroll.bind(this));

	};

	smoothScroll.destroy = function () {
		settings = null;
	};

	smoothScroll.scrollTo = function (el, duration, callback, context) {
		duration = duration || 500;
		context = context || window;
		var start = context.scrollTop || window.pageYOffset;
		var self = this;

		if (typeof el === 'number') {
			var end = parseInt(el);
		} else {
			var end = getTop(el, start);
		}

		var clock = Date.now();
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
			window.setTimeout(fn, 15);
		};

		var step = function () {
			var elapsed = Date.now() - clock;
			if (context !== window) {
				context.scrollTop = position(start, end, elapsed, duration);
			} else {
				window.scroll(start, position(start, end, elapsed, duration));
			}

			if (elapsed > duration) {
				if (typeof callback === 'function') {
					callback(el);
				}
			} else {
				requestAnimationFrame(step);
			}
		}
		step();
	};

	smoothScroll.scroll = function (event) {

		var delta = event.wheelDelta ? -event.wheelDelta / 120 : (event.detail || event.deltaY) / 3,
			isDown = delta > 0,
			timestamp = event.timestamp;

		event = event || window.event;
		if (event.preventDefault) {
			event.preventDefault();
		}
		event.returnValue = false;

		if (isDown != this.isDown && typeof this.isDown !== 'undefined') {
			stopScroll();
		}

		this.isDown = isDown;
		this.startingSpeed = settings.amount;
		scrollToPosition = window.pageYOffset + (this.isDown ? 1 : -1) * this.startingSpeed;

		this.scrollTo(scrollToPosition, settings.speed);
	};

	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	var extend = function (defaults, options) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	return smoothScroll;

});
