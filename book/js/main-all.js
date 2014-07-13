	//start progress bar on window load
	NProgress.start();

	var windowWidth;


$(document).ready(function(){

	//GLOBAL VARIABLES
	var convoArtist = $("#conversation-list");
	var aboutVideo = $('#about-design');
	var aboutBook = $('.about-the-book a');
	var owl = $("#slider-desk").data('owlCarousel');
	var owlTab = $("#slider-tab").data('owlCarousel');
	var spanNav = $('#left-nav').find('span');
	var conversations = $('#conversations');
	var arrows = $('#arrows');
	windowWidth = $(window).width();
	var extraArticle = $('#extras').children('.extras-images-box').children('div');
	var preview;
	var iframe1 = $('#player1')[0];
	var player1 = $f(iframe1);

	//FROOGALOOP
	var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
!1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();


	//NPROGRESS
	/*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */

;(function(factory) {

  if (typeof module === 'function') {
    module.exports = factory(this.jQuery || require('jquery'));
  } else {
    this.NProgress = factory(this.jQuery);
  }

})(function($) {
  var NProgress = {};

  NProgress.version = '0.1.2';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    $.extend(Settings, options);
    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var $progress = NProgress.render(!started),
        $bar      = $progress.find('[role="bar"]'),
        speed     = Settings.speed,
        ease      = Settings.easing;

    $progress[0].offsetWidth; /* Repaint */

    $progress.queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();
      
      // Add transition
      $bar.css(barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        $progress.css({ transition: 'none', opacity: 1 });
        $progress[0].offsetWidth; /* Repaint */

        setTimeout(function() {
          $progress.css({ transition: 'all '+speed+'ms linear', opacity: 0 });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return $("#nprogress");
    $('html').addClass('nprogress-busy');

    var $el = $("<div id='nprogress'>")
      .html(Settings.template);

    var perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0);

    $el.find('[role="bar"]').css({
      transition: 'all 0 linear',
      transform: 'translate3d('+perc+'%,0,0)'
    });

    if (!Settings.showSpinner)
      $el.find('[role="spinner"]').remove();

    $el.appendTo(document.body);

    return $el;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    $('html').removeClass('nprogress-busy');
    $('#nprogress').remove();
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return ($("#nprogress").length > 0);
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  return NProgress;
});



	//OWL

	/*
 *	jQuery OwlCarousel v1.26
 *
 *	Copyright (c) 2013 Bartosz Wojciechowski
 *	http://www.owlgraphic.com/owlcarousel/
 *
 *	Licensed under MIT
 *
 */

if ( typeof Object.create !== "function" ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}
(function( $, window, document, undefined ) {

	var Carousel = {
		init :function(options, el){
			var base = this;
			base.options = $.extend({}, $.fn.owlCarousel.options, options);
			base.userOptions = options;
			var elem = el;
			var $elem = $(el);
			base.$elem = $elem;
			base.loadContent();
		},

		loadContent : function(){
			var base = this;

			if (typeof base.options.beforeInit === "function") {
				base.options.beforeInit.apply(this,[base.$elem]);
			}

			if (typeof base.options.jsonPath === "string") {
				var url = base.options.jsonPath;

				function getData(data) {
					if (typeof base.options.jsonSuccess === "function") {
						base.options.jsonSuccess.apply(this,[data]);
					} else {
						var content = "";
						for(var i in data["owl"]){
							content += data["owl"][i]["item"];
						}
						base.$elem.html(content);
					}
					base.logIn();
				}
				$.getJSON(url,getData);
			} else {
				base.logIn();
			}
		},

		logIn : function(action){
			var base = this;

			base.$elem.css({opacity: 0});
			base.orignalItems = base.options.items;
			base.checkBrowser();
			base.wrapperWidth = 0;
			base.checkVisible;
			base.setVars();
		},

		setVars : function(){
			var base = this;
			if(base.$elem.children().length === 0){return false}
			base.baseClass();
			base.eventTypes();
			base.$userItems = base.$elem.children();
			base.itemsAmount = base.$userItems.length;
			base.wrapItems();
			base.$owlItems = base.$elem.find(".owl-item");
			base.$owlWrapper = base.$elem.find(".owl-wrapper");
			base.playDirection = "next";
			base.prevItem = 0;//base.options.startPosition;
			base.currentItem = 0; //Starting Position
			base.customEvents();
			base.onStartup();
		},

		onStartup : function(){
			var base = this;
			base.updateItems();
			base.calculateAll();
			base.buildControls();
			base.updateControls();
			base.response();
			base.moveEvents();
			base.stopOnHover();
			base.owlStatus();

			if(base.options.transitionStyle !== false){
				base.transitionTypes(base.options.transitionStyle);
			}
			if(base.options.autoPlay === true){
				base.options.autoPlay = 5000;
			}
			base.play();

			base.$elem.find(".owl-wrapper").css("display","block")

			if(!base.$elem.is(":visible")){
				base.watchVisibility();
			} else {
				base.$elem.css("opacity",1);
			}
			base.onstartup = false;
			base.eachMoveUpdate();
			if (typeof base.options.afterInit === "function") {
				base.options.afterInit.apply(this,[base.$elem]);
			}
		},

		eachMoveUpdate : function(){
			var base = this;

			if(base.options.lazyLoad === true){
				base.lazyLoad();
			}
			if(base.options.autoHeight === true){
				base.autoHeight();
			}
			if(base.options.addClassActive === true){
				base.addClassActive();
			}
			if (typeof base.options.afterAction === "function") {
				base.options.afterAction.apply(this,[base.$elem]);
			}
		},

		updateVars : function(){
			var base = this;
			if(typeof base.options.beforeUpdate === "function") {
				base.options.beforeUpdate.apply(this,[base.$elem]);
			}
			base.watchVisibility();
			base.updateItems();
			base.calculateAll();
			base.updatePosition();
			base.updateControls();
			base.eachMoveUpdate();
			if(typeof base.options.afterUpdate === "function") {
				base.options.afterUpdate.apply(this,[base.$elem]);
			}
		},

		reload : function(elements){
			var base = this;
			setTimeout(function(){
				base.updateVars();
			},0)
		},

		watchVisibility : function(){
			var base = this;

			if(base.$elem.is(":visible") === false){
				base.$elem.css({opacity: 0});
				clearInterval(base.autoPlayInterval);
				clearInterval(base.checkVisible);
			} else {
				return false;
			}
			base.checkVisible = setInterval(function(){
				if (base.$elem.is(":visible")) {
					base.reload();
					base.$elem.animate({opacity: 1},200);
					clearInterval(base.checkVisible);
				}
			}, 500);
		},

		wrapItems : function(){
			var base = this;
			base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
			base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
			base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
			base.$elem.css("display","block");
		},

		baseClass : function(){
			var base = this;
			var hasBaseClass = base.$elem.hasClass(base.options.baseClass);
			var hasThemeClass = base.$elem.hasClass(base.options.theme);
			base.$elem.data("owl-originalStyles", base.$elem.attr("style"))
					  .data("owl-originalClasses", base.$elem.attr("class"));

			if(!hasBaseClass){
				base.$elem.addClass(base.options.baseClass);
			}

			if(!hasThemeClass){
				base.$elem.addClass(base.options.theme);
			}
		},

		updateItems : function(){
			var base = this;

			if(base.options.responsive === false){
				return false;
			}
			if(base.options.singleItem === true){
				base.options.items = base.orignalItems = 1;
				base.options.itemsDesktop = false;
				base.options.itemsDesktopSmall = false;
				base.options.itemsTablet = false;
				base.options.itemsTabletSmall = false;
				base.options.itemsMobile = false;
				return false;
			}

			var width = $(base.options.responsiveBaseWidth).width();

			if(width > (base.options.itemsDesktop[0] || base.orignalItems) ){
				 base.options.items = base.orignalItems
			}

			if(width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false){
				base.options.items = base.options.itemsDesktop[1];
			}

			if(width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false){
				base.options.items = base.options.itemsDesktopSmall[1];
			}

			if(width <= base.options.itemsTablet[0]  && base.options.itemsTablet !== false){
				base.options.items = base.options.itemsTablet[1];
			}

			if(width <= base.options.itemsTabletSmall[0]  && base.options.itemsTabletSmall !== false){
				base.options.items = base.options.itemsTabletSmall[1];
			}

			if(width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false){
				base.options.items = base.options.itemsMobile[1];
			}

			//if number of items is less than declared
			if(base.options.items > base.itemsAmount){
				base.options.items = base.itemsAmount;
			}
		},

		response : function(){
			var base = this,
				smallDelay;
			if(base.options.responsive !== true){
				return false
			}
			var lastWindowWidth = $(window).width();

			base.resizer = function(){
				if($(window).width() !== lastWindowWidth){
					if(base.options.autoPlay !== false){
						clearInterval(base.autoPlayInterval);
					}
					clearTimeout(smallDelay);
					smallDelay = setTimeout(function(){
						lastWindowWidth = $(window).width();
						base.updateVars();
					},base.options.responsiveRefreshRate);
				}
			}
			$(window).resize(base.resizer)
		},

		updatePosition : function(){
			var base = this;

			if(base.browser.support3d === true){
				if(base.positionsInArray[base.currentItem] > base.maximumPixels){
					base.transition3d(base.positionsInArray[base.currentItem]);
				} else {
					base.transition3d(0);
					base.currentItem = 0;
				}
			} else{
				if(base.positionsInArray[base.currentItem] > base.maximumPixels){
					base.css2slide(base.positionsInArray[base.currentItem]);
				} else {
					base.css2slide(0);
					base.currentItem = 0;
				}
			}
			if(base.options.autoPlay !== false){
				base.checkAp();
			}
		},

		appendItemsSizes : function(){
			var base = this;

			var roundPages = 0;
			var lastItem = base.itemsAmount - base.options.items;

			base.$owlItems.each(function(index){
				var $this = $(this);
				$this
					.css({"width": base.itemWidth})
					.data("owl-item",Number(index));

				if(index % base.options.items === 0 || index === lastItem){
					if(!(index > lastItem)){
						roundPages +=1;
					}
				}
				$this.data("owl-roundPages",roundPages)
			});
		},

		appendWrapperSizes : function(){
			var base = this;
			var width = 0;

			var width = base.$owlItems.length * base.itemWidth;

			base.$owlWrapper.css({
				"width": width*2,
				"left": 0
			});
			base.appendItemsSizes();
		},

		calculateAll : function(){
			var base = this;
			base.calculateWidth();
			base.appendWrapperSizes();
			base.loops();
			base.max();
		},

		calculateWidth : function(){
			var base = this;
			base.itemWidth = Math.round(base.$elem.width()/base.options.items);
		},

		max : function(){
			var base = this;
			base.maximumItem = base.itemsAmount - base.options.items;
			var maximum = (base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth;
				maximum = maximum * -1;
			base.maximumPixels = maximum;
			return maximum;
		},

		min : function(){
			return 0;
		},

		loops : function(){
			var base = this;

			base.positionsInArray = [0];
			var elWidth = 0;

			for(var i = 0; i<base.itemsAmount; i++){
				elWidth += base.itemWidth;
				base.positionsInArray.push(-elWidth);
			}
		},

		buildControls : function(){
			var base = this;
			if(base.options.navigation === true || base.options.pagination === true){
				base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
			}
			if(base.options.pagination === true){
				base.buildPagination();
			}
			if(base.options.navigation === true){
				base.buildButtons();
			}
		},

		buildButtons : function(){
			var base = this;
			var buttonsWrapper = $("<div class=\"owl-buttons\"/>");
			base.owlControls.append(buttonsWrapper);

			base.buttonPrev = $("<div/>",{
				"class" : "owl-prev",
				"html" : base.options.navigationText[0] || ""
				});

			base.buttonNext = $("<div/>",{
				"class" : "owl-next",
				"html" : base.options.navigationText[1] || ""
				});

			buttonsWrapper
			.append(base.buttonPrev)
			.append(base.buttonNext);

			buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function(event){
				event.preventDefault();
				if($(this).hasClass("owl-next")){
					base.next();
				} else{
					base.prev();
				}
			});
		},

		buildPagination : function(){
			var base = this;

			base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
			base.owlControls.append(base.paginationWrapper);

			base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(event){
				event.preventDefault();
				if(Number($(this).data("owl-page")) !== base.currentItem){
					base.goTo( Number($(this).data("owl-page")), true);
				}
			});
		},

		updatePagination : function(){
			var base = this;
			if(base.options.pagination === false){
				return false;
			}

			base.paginationWrapper.html("");

			var counter = 0;
			var lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

			for(var i = 0; i<base.itemsAmount; i++){
				if(i % base.options.items === 0){
					counter +=1;
					if(lastPage === i){
						var lastItem = base.itemsAmount - base.options.items;
					}
					var paginationButton = $("<div/>",{
						"class" : "owl-page"
						});
					var paginationButtonInner = $("<span></span>",{
						"text": base.options.paginationNumbers === true ? counter : "",
						"class": base.options.paginationNumbers === true ? "owl-numbers" : ""
					});
					paginationButton.append(paginationButtonInner);

					paginationButton.data("owl-page",lastPage === i ? lastItem : i);
					paginationButton.data("owl-roundPages",counter);

					base.paginationWrapper.append(paginationButton);
				}
			}
			base.checkPagination();
		},
		checkPagination : function(){
			var base = this;
			if(base.options.pagination === false){
				return false;
			}
			base.paginationWrapper.find(".owl-page").each(function(i,v){
				if($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages") ){
					base.paginationWrapper
						.find(".owl-page")
						.removeClass("active");
					$(this).addClass("active");
				}
			});
		},

		checkNavigation : function(){
			var base = this;

			if(base.options.navigation === false){
				return false;
			}
			if(base.options.rewindNav === false){
				if(base.currentItem === 0 && base.maximumItem === 0){
					base.buttonPrev.addClass("disabled");
					base.buttonNext.addClass("disabled");
				} else if(base.currentItem === 0 && base.maximumItem !== 0){
					base.buttonPrev.addClass("disabled");
					base.buttonNext.removeClass("disabled");
				} else if (base.currentItem === base.maximumItem){
					base.buttonPrev.removeClass("disabled");
					base.buttonNext.addClass("disabled");
				} else if(base.currentItem !== 0 && base.currentItem !== base.maximumItem){
					base.buttonPrev.removeClass("disabled");
					base.buttonNext.removeClass("disabled");
				}
			}
		},

		updateControls : function(){
			var base = this;
			base.updatePagination();
			base.checkNavigation();
			if(base.owlControls){
				if(base.options.items === base.itemsAmount){
					base.owlControls.hide();
				} else {
					base.owlControls.show();
				}
			}
		},

		destroyControls : function(){
			var base = this;
			if(base.owlControls){
				base.owlControls.remove();
			}
		},

		next : function(speed){
			var base = this;

			if(base.isTransition){
				return false;
			}

			base.storePrevItem = base.currentItem;

			base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
			if(base.currentItem > base.maximumItem + (base.options.scrollPerPage == true ? (base.options.items - 1) : 0)){
				if(base.options.rewindNav === true){
					base.currentItem = 0;
					speed = "rewind";
				} else {
					base.currentItem = base.maximumItem;
					return false;
				}
			}
			base.goTo(base.currentItem,speed);
		},

		prev : function(speed){
			var base = this;

			if(base.isTransition){
				return false;
			}

			base.storePrevItem = base.currentItem;

			if(base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items){
				base.currentItem = 0
			} else {
				base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
			}
			if(base.currentItem < 0){
				if(base.options.rewindNav === true){
					base.currentItem = base.maximumItem;
					speed = "rewind"
				} else {
					base.currentItem =0;
					return false;
				}
			}
			base.goTo(base.currentItem,speed);
		},

		goTo : function(position,speed,drag){
			var base = this;

			if(base.isTransition){
				return false;
			}
			base.getPrevItem();
			if(typeof base.options.beforeMove === "function") {
				base.options.beforeMove.apply(this,[base.$elem]);
			}
			if(position >= base.maximumItem){
				position = base.maximumItem;
			}
			else if( position <= 0 ){
				position = 0;
			}

			base.currentItem = base.owl.currentItem = position;
			if( base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true){
				base.swapSpeed(0)
				if(base.browser.support3d === true){
					base.transition3d(base.positionsInArray[position]);
				} else {
					base.css2slide(base.positionsInArray[position],1);
				}
				base.singleItemTransition();
				base.afterGo();
				return false;
			}
			var goToPixel = base.positionsInArray[position];

			if(base.browser.support3d === true){
				base.isCss3Finish = false;

				if(speed === true){
					base.swapSpeed("paginationSpeed");
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.paginationSpeed);

				} else if(speed === "rewind" ){
					base.swapSpeed(base.options.rewindSpeed);
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.rewindSpeed);

				} else {
					base.swapSpeed("slideSpeed");
					setTimeout(function() {
						base.isCss3Finish = true;
					}, base.options.slideSpeed);
				}
				base.transition3d(goToPixel);
			} else {
				if(speed === true){
					base.css2slide(goToPixel, base.options.paginationSpeed);
				} else if(speed === "rewind" ){
					base.css2slide(goToPixel, base.options.rewindSpeed);
				} else {
					base.css2slide(goToPixel, base.options.slideSpeed);
				}
			}
			base.afterGo();
		},

		getPrevItem : function(){
			var base = this;
			base.prevItem = base.owl.prevItem = base.storePrevItem === undefined ? base.currentItem : base.storePrevItem;
			base.storePrevItem = undefined;
		},

		jumpTo : function(position){
			var base = this;
			base.getPrevItem();
			if(typeof base.options.beforeMove === "function") {
				base.options.beforeMove.apply(this,[base.$elem]);
			}
			if(position >= base.maximumItem || position === -1){
				position = base.maximumItem;
			}
			else if( position <= 0 ){
				position = 0;
			}
			base.swapSpeed(0)
			if(base.browser.support3d === true){
				base.transition3d(base.positionsInArray[position]);
			} else {
				base.css2slide(base.positionsInArray[position],1);
			}
			base.currentItem = base.owl.currentItem = position;
			base.afterGo();
		},

		afterGo : function(){
			var base = this;
			base.checkPagination();
			base.checkNavigation();
			base.eachMoveUpdate();

			if(typeof base.options.afterMove === "function") {
				base.options.afterMove.apply(this,[base.$elem]);

			}
			if(base.options.autoPlay !== false){
				base.checkAp();
			}
		},

		stop: function(){
			var base = this;
			base.apStatus = "stop";
			clearInterval(base.autoPlayInterval);
		},

		checkAp : function(){
			var base = this;
			if(base.apStatus !== "stop"){
				base.play();
			}
		},

		play : function(){
			var base = this;
			base.apStatus = "play";
			if(base.options.autoPlay === false){
				return false;
			}
			clearInterval(base.autoPlayInterval);
			base.autoPlayInterval = setInterval(function(){
				base.next(true);
			},base.options.autoPlay);
		},

		swapSpeed : function(action){
			var base = this;
			if(action === "slideSpeed"){
				base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
			} else if(action === "paginationSpeed" ){
				base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
			} else if(typeof action !== "string"){
				base.$owlWrapper.css(base.addCssSpeed(action));
			}
		},

		addCssSpeed : function(speed){
			var base = this;
			return {
				"-webkit-transition": "all "+ speed +"ms ease",
				"-moz-transition": "all "+ speed +"ms ease",
				"-o-transition": "all "+ speed +"ms ease",
				"transition": "all "+ speed +"ms ease"
			};
		},

		removeTransition : function(){
			return {
				"-webkit-transition": "",
				"-moz-transition": "",
				"-o-transition": "",
				"transition": ""
			};
		},

		doTranslate : function(pixels){
			return {
				"-webkit-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-moz-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-o-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"-ms-transform": "translate3d("+pixels+"px, 0px, 0px)",
				"transform": "translate3d("+pixels+"px, 0px,0px)"
			};
		},

		transition3d : function(value){
			var base = this;
			base.$owlWrapper.css(base.doTranslate(value));
		},

		css2move : function(value){
			var base = this;
			base.$owlWrapper.css({"left" : value})
		},

		css2slide : function(value,speed){
			var base = this;

			base.isCssFinish = false;
			base.$owlWrapper.stop(true,true).animate({
				"left" : value
			}, {
				duration : speed || base.options.slideSpeed ,
				complete : function(){
					base.isCssFinish = true;
				}
			});
		},

		checkBrowser : function(){
			var base = this;

			//Check 3d support
			var	translate3D = "translate3d(0px, 0px, 0px)",
				tempElem = document.createElement("div");

			tempElem.style.cssText= "  -moz-transform:"    + translate3D +
								  "; -ms-transform:"     + translate3D +
								  "; -o-transform:"      + translate3D +
								  "; -webkit-transform:" + translate3D +
								  "; transform:"         + translate3D;
			var	regex = /translate3d\(0px, 0px, 0px\)/g,
				asSupport = tempElem.style.cssText.match(regex),
				support3d = (asSupport !== null && asSupport.length === 1);

			var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

			base.browser = {
				"support3d" : support3d,
				"isTouch" : isTouch
			}
		},

		moveEvents : function(){
			var base = this;
			if(base.options.mouseDrag !== false || base.options.touchDrag !== false){
				base.gestures();
				base.disabledEvents();
			}
		},

		eventTypes : function(){
			var base = this;
			var types = ["s","e","x"];

			base.ev_types = {};

			if(base.options.mouseDrag === true && base.options.touchDrag === true){
				types = [
					"touchstart.owl mousedown.owl",
					"touchmove.owl mousemove.owl",
					"touchend.owl touchcancel.owl mouseup.owl"
				];
			} else if(base.options.mouseDrag === false && base.options.touchDrag === true){
				types = [
					"touchstart.owl",
					"touchmove.owl",
					"touchend.owl touchcancel.owl"
				];
			} else if(base.options.mouseDrag === true && base.options.touchDrag === false){
				types = [
					"mousedown.owl",
					"mousemove.owl",
					"mouseup.owl"
				];
			}

			base.ev_types["start"] = types[0];
			base.ev_types["move"] = types[1];
			base.ev_types["end"] = types[2];
		},

		disabledEvents :  function(){
			var base = this;
			base.$elem.on("dragstart.owl", function(event) { event.preventDefault();});
			base.$elem.on("mousedown.disableTextSelect", function(e) {
				return $(e.target).is('input, textarea, select, option');
			});
		},

		gestures : function(){
			var base = this;

			var locals = {
				offsetX : 0,
				offsetY : 0,
				baseElWidth : 0,
				relativePos : 0,
				position: null,
				minSwipe : null,
				maxSwipe: null,
				sliding : null,
				dargging: null,
				targetElement : null
			}

			base.isCssFinish = true;

			function getTouches(event){
				if(event.touches){
					return {
						x : event.touches[0].pageX,
						y : event.touches[0].pageY
					}
				} else {
					if(event.pageX !== undefined){
						return {
							x : event.pageX,
							y : event.pageY
						}
					} else {
						return {
							x : event.clientX,
							y : event.clientY
						}
					}
				}
			}

			function swapEvents(type){
				if(type === "on"){
					$(document).on(base.ev_types["move"], dragMove);
					$(document).on(base.ev_types["end"], dragEnd);
				} else if(type === "off"){
					$(document).off(base.ev_types["move"]);
					$(document).off(base.ev_types["end"]);
				}
			}

			function dragStart(event) {
				var event = event.originalEvent || event || window.event;

				if(base.isCssFinish === false && !base.options.dragBeforeAnimFinish ){
					return false;
				}
				if(base.isCss3Finish === false && !base.options.dragBeforeAnimFinish ){
					return false;
				}

				if(base.options.autoPlay !== false){
					clearInterval(base.autoPlayInterval);
				}

				if(base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")){
					base.$owlWrapper.addClass("grabbing")
				}

				base.newPosX = 0;
				base.newRelativeX = 0;

				$(this).css(base.removeTransition());

				var position = $(this).position();
				locals.relativePos = position.left;
				
				locals.offsetX = getTouches(event).x - position.left;
				locals.offsetY = getTouches(event).y - position.top;

				swapEvents("on");

				locals.sliding = false;
				locals.targetElement = event.target || event.srcElement;
			}

			function dragMove(event){
				var event = event.originalEvent || event || window.event;

				base.newPosX = getTouches(event).x- locals.offsetX;
				base.newPosY = getTouches(event).y - locals.offsetY;
				base.newRelativeX = base.newPosX - locals.relativePos;	

				if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
					locals.dragging = true;
					base.options.startDragging.apply(this);
				}			

				if(base.newRelativeX > 8 || base.newRelativeX < -8 && base.browser.isTouch === true){
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					locals.sliding = true;
				}

				if((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false){
					$(document).off("touchmove.owl");
				}

				var minSwipe = function(){
					return  base.newRelativeX / 5;
				}
				var maxSwipe = function(){
					return  base.maximumPixels + base.newRelativeX / 5;
				}

				base.newPosX = Math.max(Math.min( base.newPosX, minSwipe() ), maxSwipe() );
				if(base.browser.support3d === true){
					base.transition3d(base.newPosX);
				} else {
					base.css2move(base.newPosX);
				}
			}

			function dragEnd(event){
				var event = event.originalEvent || event || window.event;
				event.target = event.target || event.srcElement;

				locals.dragging = false;

				if(base.browser.isTouch !== true){
					base.$owlWrapper.removeClass("grabbing");
				}

				if(base.newRelativeX !== 0){
					var newPosition = base.getNewPosition();
					base.goTo(newPosition,false,"drag");
					if(locals.targetElement === event.target && base.browser.isTouch !== true){
						$(event.target).on("click.disable", function(ev){
							ev.stopImmediatePropagation();
							ev.stopPropagation();
							ev.preventDefault();
							$(event.target).off("click.disable");
						});
						var handlers = $._data(event.target, "events")["click"];
						var owlStopEvent = handlers.pop();
						handlers.splice(0, 0, owlStopEvent);
					}
				}
				swapEvents("off");
			}
			base.$elem.on(base.ev_types["start"], ".owl-wrapper", dragStart); 
		},

		getNewPosition : function(){
			var base = this,
				newPosition;
			
			var newPosition = base.improveClosest();
			if(newPosition>base.maximumItem){
				base.currentItem = base.maximumItem;
				newPosition  = base.maximumItem;
			} else if( base.newPosX >=0 ){
				newPosition = 0;
				base.currentItem = 0;
			}
			return newPosition;
		},

		improveClosest : function(){
			var base = this;
			var array = base.positionsInArray;
			var goal = base.newPosX;
			var closest = null;
			$.each(array, function(i,v){
				if( goal - (base.itemWidth/20) > array[i+1] && goal - (base.itemWidth/20)< v && base.moveDirection() === "left") {
					closest = v;
					base.currentItem = i;
				} 
				else if (goal + (base.itemWidth/20) < v && goal + (base.itemWidth/20) > array[i+1] && base.moveDirection() === "right"){
					closest = array[i+1];
					base.currentItem = i+1;
				}
			});
			return base.currentItem;
		},

		moveDirection : function(){
			var base = this,
				direction;
			if(base.newRelativeX < 0 ){
				direction = "right"
				base.playDirection = "next"
			} else {
				direction = "left"
				base.playDirection = "prev"
			}
			return direction
		},

		customEvents : function(){
			var base = this;
			base.$elem.on("owl.next",function(){
				base.next();
			});
			base.$elem.on("owl.prev",function(){
				base.prev();
			});
			base.$elem.on("owl.play",function(event,speed){
				base.options.autoPlay = speed;
				base.play();
				base.hoverStatus = "play";
			});
			base.$elem.on("owl.stop",function(){
				base.stop();
				base.hoverStatus = "stop";
			});
			base.$elem.on("owl.goTo",function(event,item){
				base.goTo(item)
			});
			base.$elem.on("owl.jumpTo",function(event,item){
				base.jumpTo(item)
			});
		},
		
		stopOnHover : function(){
			var base = this;
			if(base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false){
				base.$elem.on("mouseover", function(){
					base.stop();
				});
				base.$elem.on("mouseout", function(){
					if(base.hoverStatus !== "stop"){
						base.play();
					}
				});
			}
		},

		lazyLoad : function(){
			var base = this;

			if(base.options.lazyLoad === false){
				return false;
			}
			for(var i=0; i<base.itemsAmount; i++){
				var $item = $(base.$owlItems[i]);

				if($item.data("owl-loaded") === "loaded"){
					continue;
				}

				var	itemNumber = $item.data("owl-item"),
					$lazyImg = $item.find(".lazyOwl"),
					follow;

				if( typeof $lazyImg.data("src") !== "string"){
					$item.data("owl-loaded","loaded");
					continue;
				}				
				if($item.data("owl-loaded") === undefined){
					$lazyImg.hide();
					$item.addClass("loading").data("owl-loaded","checked");
				}
				if(base.options.lazyFollow === true){
					follow = itemNumber >= base.currentItem;
				} else {
					follow = true;
				}
				if(follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length){
					base.lazyPreload($item,$lazyImg);
				}
			}
		},

		lazyPreload : function($item,$lazyImg){
			var base = this,
				iterations = 0;
				$lazyImg[0].src = $lazyImg.data("src");
				checkLazyImage();

			function checkLazyImage(){
				iterations += 1;
				if (base.completeImg( $lazyImg.get(0) )) {
					showImage();
				} else if(iterations <= 100){//if image loads in less than 10 seconds 
					setTimeout(checkLazyImage,100);
				} else {
					showImage();
				}
			}
			function showImage(){
				$item.data("owl-loaded", "loaded").removeClass("loading");
				$lazyImg.removeAttr("data-src");
				base.options.lazyEffect === "fade" ? $lazyImg.fadeIn(400) : $lazyImg.show();
			}
		},

		autoHeight : function(){
			var base = this;
			var $currentimg = $(base.$owlItems[base.currentItem]).find("img");

			if($currentimg.get(0) !== undefined ){
				var iterations = 0;
				checkImage();
			} else {
				addHeight();
			}
			function checkImage(){
				iterations += 1;
				if ( base.completeImg($currentimg.get(0)) ) {
					addHeight();
				} else if(iterations <= 100){ //if image loads in less than 10 seconds 
					setTimeout(checkImage,100);
				} else {
					base.wrapperOuter.css("height", ""); //Else remove height attribute
				}
			}

			function addHeight(){
				var $currentItem = $(base.$owlItems[base.currentItem]).height();
				base.wrapperOuter.css("height",$currentItem+"px");
				if(!base.wrapperOuter.hasClass("autoHeight")){
					setTimeout(function(){
						base.wrapperOuter.addClass("autoHeight");
					},0);
				}
			}
		},

		completeImg : function(img) {
		    if (!img.complete) {
		        return false;
		    }
		    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth == 0) {
		        return false;
		    }
		    return true;
		},

		addClassActive : function(){
			var base = this;
			base.$owlItems.removeClass("active");
			for(var i=base.currentItem; i<base.currentItem + base.options.items; i++){
				$(base.$owlItems[i]).addClass("active");
			}
		},

		transitionTypes : function(className){
			var base = this;
			//Currently available: "fade","backSlide","goDown","fadeUp"
			base.outClass = "owl-"+className+"-out";
			base.inClass = "owl-"+className+"-in";
		},

		singleItemTransition : function(){
			var base = this;
			base.isTransition = true;

			var outClass = base.outClass,
				inClass = base.inClass,
				$currentItem = base.$owlItems.eq(base.currentItem),
				$prevItem = base.$owlItems.eq(base.prevItem),
				prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
				origin = Math.abs(base.positionsInArray[base.currentItem])+base.itemWidth/2;

            base.$owlWrapper
	            .addClass('owl-origin')
	            .css({
	            	"-webkit-transform-origin" : origin+"px",
	            	"-moz-perspective-origin" : origin+"px",
	            	"perspective-origin" : origin+"px"
	            });
	        function transStyles(prevPos,zindex){
				return {
					"position" : "relative",
					"left" : prevPos+"px"
				};
			}

	        var animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

			$prevItem
			.css(transStyles(prevPos,10))
			.addClass(outClass)
			.on(animEnd, function() {
				base.endPrev = true;
				$prevItem.off(animEnd);
		    	base.clearTransStyle($prevItem,outClass);
			});

			$currentItem
			.addClass(inClass)
			.on(animEnd, function() {
				base.endCurrent = true;
				$currentItem.off(animEnd);
		    	base.clearTransStyle($currentItem,inClass);
		    });
		},

		clearTransStyle : function(item,classToRemove){
			var base = this;
			item.css({
					"position" : "",
					"left" : ""
				})
				.removeClass(classToRemove);
			if(base.endPrev && base.endCurrent){
				base.$owlWrapper.removeClass('owl-origin');
				base.endPrev = false;
				base.endCurrent = false;
				base.isTransition = false;
			}
		},

		owlStatus : function(){
			var base = this;
			base.owl = {
				"userOptions"	: base.userOptions,
				"baseElement" 	: base.$elem,
				"userItems"		: base.$userItems,
				"owlItems"		: base.$owlItems,
				"currentItem"	: base.currentItem,
				"prevItem"		: base.prevItem,
				"isTouch" 		: base.browser.isTouch,
				"browser"		: base.browser
			}
		},

		clearEvents : function(){
			var base = this;
			base.$elem.off(".owl owl mousedown.disableTextSelect");
			$(document).off(".owl owl");
			$(window).off("resize", base.resizer);
		},

		unWrap : function(){
			var base = this;
			if(base.$elem.children().length !== 0){
				base.$owlWrapper.unwrap();
				base.$userItems.unwrap().unwrap();
				if(base.owlControls){
					base.owlControls.remove();
				}
			}
			base.clearEvents();
			base.$elem
				.attr("style", base.$elem.data("owl-originalStyles") || "")
				.attr("class", base.$elem.data("owl-originalClasses"));
		},

		destroy : function(){
			var base = this;
			base.unWrap();
			base.$elem.removeData();
		},

		reinit : function(newOptions){
			var base = this;
			var options = $.extend({}, base.userOptions, newOptions);
		 	base.unWrap();
		 	base.init(options,base.$elem);
		},

		addItem : function(htmlString,targetPosition){
			var base = this,
				position;

			if(!htmlString){return false}

			if(base.$elem.children().length === 0){
				base.$elem.append(htmlString);
				base.setVars();
				return false;
			}
			base.unWrap();
			if(targetPosition === undefined || targetPosition === -1){
				position = -1;
			} else {
				position = targetPosition;
			}
			if(position >= base.$userItems.length || position === -1){
				base.$userItems.eq(-1).after(htmlString)
			} else {
				base.$userItems.eq(position).before(htmlString)
			}

			base.setVars();
		},

		removeItem : function(targetPosition){
			var base = this,
				position;

			if(base.$elem.children().length === 0){return false}
			
			if(targetPosition === undefined || targetPosition === -1){
				position = -1;
			} else {
				position = targetPosition;
			}

			base.unWrap();
			base.$userItems.eq(position).remove();
			base.setVars();
		}

	};

	$.fn.owlCarousel = function( options ){
		return this.each(function() {
			if($(this).data("owl-init") === true){
				return false;
			}
			$(this).data("owl-init", true);
			var carousel = Object.create( Carousel );
			carousel.init( options, this );
			$.data( this, "owlCarousel", carousel );
		});
	};

	$.fn.owlCarousel.options = {

		items : 3,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet: [768,2],
		itemsTabletSmall: false,
		itemsMobile : [479,1],
		singleItem:false,

		slideSpeed : 500,
		paginationSpeed : 800,
		rewindSpeed : 1000,

		autoPlay : false,
		stopOnHover : false,

		navigation : false,
		navigationText : ["prev","next"],
		rewindNav : true,
		scrollPerPage : false,

		pagination : true,
		paginationNumbers: false,

		responsive: true,
		responsiveRefreshRate : 200,
		responsiveBaseWidth: window,

		baseClass : "owl-carousel",
		theme : "owl-theme",

		lazyLoad : true,
		lazyFollow : true,
		lazyEffect : "fade",

		autoHeight : false,

		jsonPath : false,
		jsonSuccess : false,

		dragBeforeAnimFinish : true,
		mouseDrag : true,
		touchDrag : true,

		addClassActive : false,
		transitionStyle : false,

		beforeUpdate : false,
		afterUpdate : false,
		beforeInit : false,
		afterInit : false,
		beforeMove: false,
		afterMove: true,
		afterAction : false,
		startDragging : false
		
	};
})( jQuery, window, document );


//PLUGINS

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


	// Enable the API on each Vimeo video
    player1.addEvent('ready', ready);

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    }
    else {
        element.attachEvent(eventName, callback, false);
    }
}

function ready(player_id) {
	var froogaloop = $f(player_id);
	function onPause(){
		froogaloop.addEvent('pause', function(data){
			console.log('pause');
		});
	}

	onPause();

}
	


	//reinitialize owl slider to listen for touch events

   owl.reinit({
    afterMove: function(){
    //same thing for desktop
    adjustArtistSpan();

    }
});

      owlTab.reinit({
    afterMove: function(){
    //if tablet size, modify span artist names
    appendTabletTitles();
    
    }
});
   
	
	
	function addPics(){

		if ( $(window).width() < 1025 ){
			$('#slider-desk').addClass('hidden');
			$('#slider-tab').removeClass('hidden');
			owl.goTo(0);



			$('#nav-arrow-left').show();
			$('#nav-arrow-right').show();
			owl.stop();


			//stop progress bar
			NProgress.done();
		}

		else{
			
			
			$('#slider-desk').removeClass('hidden');
			$('#slider-tab').addClass('hidden');
			NProgress.done();
			owl.goTo(0);
			owl.stop();
		}
	}
	



	//main wizard
	function doctorChanges(i){
		//declare slideNumber to be used throughout function
		var slideNumber;

		//picId reset
		var picId = 0;

		//set picture ID to img attribute
		picId = i.attr('id'); //set goTo item # to picture id

		//make sure picture ID is integer
		picId = parseInt((picId), 10);

		//slide up conversation list
		i.parent().parent().stop().slideToggle().delay(500);

		//insert artist name in span tag
		insertName(i);


		//go to second slide position (array notation), keep book on slide 0 position
		owl.jumpTo(picId);

		//stop carousel
		owl.stop();
		arrowHideOrShow();
		return picId;
	}

		function adjustArtistSpan(){
		var insertText;
		var currentArtistNumber = (owl.currentItem);

		if ([1,5,9,13,17,21,25,29,33,37,41,45,49,53,57].indexOf(currentArtistNumber) > -1){
			insertText = $('#conversation-list').find('#' + currentArtistNumber).text();
			spanNav.fadeIn().text(insertText);
		}
		else if ([4,8,12,16,20,24,28,32,36,40,44,48,52,56].indexOf(currentArtistNumber) > -1){
			currentArtistNumber = (currentArtistNumber - 3);
			insertText = $('#conversation-list').find('#' + currentArtistNumber).text();
			spanNav.fadeIn().text(insertText);
		}

		else if( currentArtistNumber === 0 ){
			spanNav.text('');
		}

		

	}



	//inserts artist name based on initial artist selection click
	function insertName(n){
		//set variable to name of link for conversation
		var name = n.text();

		//append to span
		n.parent().parent().parent().find('span').empty().fadeIn(500).text(name);
	}


	function hideIt(z){
		//add class of hidden to item
		if(!z.hasClass('hidden')){
			z.addClass('hidden');
		}
	}

	function showIt(z){
		//remove class of hidden item
		if(z.hasClass('hidden')){
			z.removeClass('hidden');
		}
	}

	
	//erase pictures based on window size, accept intial resize screen width parameter
	
	function erasePics(previousWidth) {
			addPics();
			
			//reset window width
			windowWidth = 0;

			//set window width to current width
			windowWidth = $(window).width();
			
			//coming from tablet to desktop
			if ( (previousWidth <= 1024) && (windowWidth > 1024)){
				NProgress.start();
				$('#slider-tab').addClass('hidden');
				$('#slider-desk').removeClass('hidden');
				addPics();

				showIt( $('#slider'));
					

				//empty individual artist name from span under conversations
				if ( spanNav.length){
				spanNav.empty();
				}
			
				//move carousel to 0 pic
				owl.goTo(0);
				//stop progress bar
				NProgress.done();
		}

		//resize from desktop to tablet
		else if ( (previousWidth > 1024) && (windowWidth <= 1024)){
			NProgress.start();
				
			$('#slider-desk').addClass('hidden');
			$('#slider-tab').removeClass('hidden');
			

			//add the tablet pictures
			addPics();

			//show nav arrows
			owl.goTo(0);

			NProgress.done();
		}

		
		else{
			//do nothing
		}

	}



	//make sure all open elements from desktop view are hidden when switching to tablet
	function tabletLogic() {
		if ( $(window).width() < 1025){
			owl.goTo(0);
			showIt( $('#arrows'));
			hideIt( $('#book-details'));
			hideIt( $('#about-the-design'));
			hideIt( $('#extras'));
		}
		else{

			owl.stop();
		}

	}

	//arrow placement logic
	function arrowHideOrShow(){
		if (windowWidth < 1024){
			switch (owl.currentItem){
				//if first conversation screen, only display right arrow
				case 0:
				$('#nav-arrow-left').hide();
				$('#nav-arrow-right').show();
				break;

				case 16:
				$('#nav-arrow-right').hide();
				$('#nav-arrow-left').show();
				break;
	
				//display both arrows
				default:
				$('#nav-arrow-left').show();
				$('#nav-arrow-right').show();
			}
		}
		else{
			switch (owl.currentItem){
				case 0:
				$('#nav-arrow-left').fadeOut();
				$('#nav-arrow-right').fadeIn();
				break;

				//display both arrows
				default:
				$('#nav-arrow-left').show();
				$('#nav-arrow-right').show();
			}
		}
	}



	function arrowStatus(leftOrRight){
			if ( leftOrRight === 'nav-arrow-left'){
				if ( $(window).width() > 1024 ){
					owl.prev();
					adjustArtistSpan();
					arrowHideOrShow();
				}
				//if tablet size, disregard arrow logic and display bi-directional arrows always
				else {
					owlTab.prev();
				}
			}
			else if (leftOrRight === 'nav-arrow-right'){
				if ( $(window).width() > 1024 ){
					owl.next();
					adjustArtistSpan();
					arrowHideOrShow();
				}
				else{
					if ($(window).width() < 1024){
						if (owl.currentItem === 15 ){
							arrows.find('#nav-arrow-right').hide();
						}
					}
					owlTab.next();
				}
			}
		}


	function appendTabletTitles(){
		switch (owlTab.currentItem){

			case 0:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><span class="head-title">For The Record</span><br />Red Bull Music Academy presents a new book featuring' +
									' 15 Conversations with people who have shaped the way we listen to music</h1>');
			$('#tablet-preview').empty();
			break;

			case 1:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>Joao Barbosa x kalaf angelo x mulatu astake</strong></h1>');
			preview = $('#mobil-conversations').children('.joao').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 2:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>bernard purdie x jaki liebezeit</strong></h1>');
			preview = $('#mobil-conversations').children('.bernard').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 3:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>martyn ware x nile rodgers</strong></h1>');
			preview = $('#mobil-conversations').children('.nile').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 4:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>kerri chandler x patrick adams</strong></h1>');
			preview = $('#mobil-conversations').children('.kerri').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 5:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>gareth jones x metro area</strong></h1>');
			preview = $('#mobil-conversations').children('.gareth').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 6:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>carsten nicolai x olaf bender x uwe schmidt</strong></h1>');
			preview = $('#mobil-conversations').children('.carsten').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 7:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>benny ill x moritz von oswald</strong></h1>');
			preview = $('#mobil-conversations').children('.moritz').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 8:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>adrian sherwood x lee "scratch" perry</strong></h1>');
			preview = $('#mobil-conversations').children('.lee').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 9:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>matias aguayo x sly &amp; robbie</strong></h1>');
			preview = $('#mobil-conversations').children('.sly').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 10:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>ben ufo x dj harvey</strong></h1>');
			preview = $('#mobil-conversations').children('.harvey').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 11:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>cosey fanni tutti x nik void</strong></h1>');
			preview = $('#mobil-conversations').children('.cosey').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 12:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>modeselektor x mykki blanco</strong></h1>');
			preview = $('#mobil-conversations').children('.mykki').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 13:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>erykah badu x the underachievers</strong></h1>');
			preview = $('#mobil-conversations').children('.erykah').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 14:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>just blaze x paul riser</strong></h1>');
			preview = $('#mobil-conversations').children('.blaze').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 15:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1><strong>Robert henke x tom oberheim</strong></h1>');
			preview = $('#mobil-conversations').children('.oberheim').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 16:
			$('#tablet-title').empty();
			$('#tablet-preview').empty().html('<p></p>');
			break;
			

			//display both arrows
			default:
			$('#tablet-title').html('<h1>15 Conversations with people who have shaped the way we listen to music</h1>');

		}
	}




	//call initial function to test browser size and add pics
	addPics();



		//on window resize, call erasePics logic function and tablet function, which makes sure to hide open desktop elements
	$(window).resize(function() {
		var initialWidth = windowWidth;
		var resizeTimer;
		var resizeTablet;
		var resizeInfo;
		clearTimeout(resizeTimer);
		clearTimeout(resizeTablet);
		//send width of screen when first called
		resizeTimer = setTimeout(function(){
								erasePics(initialWidth);
								}, 250);
		resizeTablet = setTimeout(tabletLogic, 250);
		resizeInfo = setTimeout(emptyTabletPreview, 250);

	});



	


	//adjust slide carousel based on artist name selected
	convoArtist.on('click', 'a', function(e){
		e.preventDefault();
		hideIt($('.social'));

		//stop vimeo player
		player1.api('pause');

		//make sure arrows are available if resizing from tablet to desktop
		showIt($('#arrows'));
		arrows.fadeIn(1000);
		
		//call main carousel function
		doctorChanges($(this));
		owl.stop();
	});


	//return to main landing page when clicking '15 conversations'
	conversations.click(function(){
		//hide arrows
		arrows.find('#nav-arrow-left').fadeOut('fast');

		//roll back to slide position 0
		owl.jumpTo(0);


		//show list of conversations if hidden
		showIt(convoArtist);

		//make sure extra features are hidden
		$('#extras').hide();

		//show carousel
		showIt($('#slider-desk'));
		
		//hide book
		hideIt($('#book-details'));

		//show social icons
		showIt($('.social'));

		//fade in video player
		hideIt($('#about-the-design'));

		//stop vimeo player
		player1.api('pause');


		//make sure span tag holding individual artist name is empty
		var span = $(this).parent().next('span');
		if( span.length ){
			span.empty();
		}

		//slide down conversation list
		$(this).parent().parent().find('ul').stop().slideToggle();

	});

	//main book image click
	$('.book').click(function(e){
		e.stopPropagation();
		convoArtist.stop().slideToggle();
	});

	//video
	aboutVideo.on('click', function(e){
		e.preventDefault();
		
		//close navigation arrows
		arrows.fadeOut();

		//hide carousel
		hideIt($('#slider-desk'));

		//hide book details if open
		hideIt($('#book-details'));

		//hide navigation arrows
		hideIt($('#arrows'));

		//hide extra features if open
		hideIt($('#extras'));

		//make sure social icons are displayed
		showIt($('.social'));

		//slide up artist conversation list
		convoArtist.slideUp();

		//fade in video player
		if($('#about-the-design').hasClass('hidden')){
			$('#about-the-design').fadeIn().removeClass('hidden');
		}
		
		//empty individual artist name from span under conversations
		if ( spanNav.length){
			spanNav.empty();
		}

	}); //end video clicke

	
	//about book operations
	aboutBook.on('click',  function(e){
		e.preventDefault();
		//hide all other open elements
		arrows.fadeOut();
		hideIt($('#slider-desk'));
		hideIt($('#about-the-design'));
		hideIt($('#extras'));
		hideIt($('.social'));
		//stop vimeo player
		player1.api('pause');
		$('#book-details').fadeIn(1000).removeClass('hidden');

		if ( spanNav.length){
			spanNav.empty();
		}
		
		//use fade instead of normal hideIt function
		if(!$('#conversation-list').hasClass('hidden')){
			$('#conversation-list').fadeOut(1000).addClass('hidden');
		}
	});

	//click navigation arrows
	$('#arrows').on('click', 'a', function(){
		//store current arrow (L or R) in local variable
		var thisOne = $(this).children().attr('id');
		//call arrowStatus function, sending current arrow direction
		arrowStatus(thisOne);
		if ( windowWidth < 1024 ){
			//inject title and description for each slide
			appendTabletTitles();
		}
	});

	//extras page
	$('.extras').on('click', function(e){
		e.preventDefault();
		$('#extras').fadeIn().removeClass('hidden');
		convoArtist.slideUp();
		hideIt($('#slider-desk'));
		hideIt($('#about-the-design'));
		hideIt($('#book-details'));
		hideIt($('.social'));
		$('#arrows').hide();
		//stop vimeo player
		player1.api('pause');

		$('#extras').children('.extra-title').fadeIn();
	});


	extraArticle.on('mouseenter', function(e){
		e.stopPropagation();
		$(this).children().show();
		$(this).children().find('h2').show();
		$(this).children().find('p').show();
	});

	extraArticle.on('mouseleave', function(e){
		e.stopPropagation();
		$(this).children().find('h2').hide();
		$(this).children().find('p').hide();
	});



	//on mobile/tablet, when clicking info icon, slide out info page
	$('#mobi-info .info-button').on('click', function(e){
		e.preventDefault();
		//store current window width in local variable
		windowWidth = $(window).width();


		//set right value of overflow element to negative windowWidth
		$('#mobi-info-slider').css("left", windowWidth);

		//update number is negative, to cause item to be offscreen
		var negWidth = -Math.abs(windowWidth);

		//move window to the left by windowWidth amount, negative value moves right to left of course
		$('#mobi-info-slider').stop().transition({ x: negWidth}, 1000);
		
		//hide main images/text
		hideIt($('#mobil-conversations'), 1000);

		return windowWidth;

	});

	$('#mobi-info-slider a').on('click', function(){
		//recalculate window width, in case screen has resized while info page was open
		windowWidth = $(window).width();

		//make sure number is positive to slide back left to right
		var slideBackAmount = Math.abs(windowWidth);

		//transition slide back offscreen
		$('#mobi-info-slider').stop().transition({ x: slideBackAmount}, 1000);

		//show conversations
		showIt($('#mobil-conversations'), 1000);

	});



}); //end doc ready
