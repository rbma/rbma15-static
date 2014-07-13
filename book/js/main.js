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
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">Joao Barbosa x kalaf angelo x mulatu astatke</strong></h1>');
			preview = $('#mobil-conversations').children('.joao').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 2:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">bernard purdie x jaki liebezeit</strong></h1>');
			preview = $('#mobil-conversations').children('.bernard').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 3:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">martyn ware x nile rodgers</strong></h1>');
			preview = $('#mobil-conversations').children('.nile').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 4:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">kerri chandler x patrick adams</strong></h1>');
			preview = $('#mobil-conversations').children('.kerri').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 5:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">gareth jones x metro area</strong></h1>');
			preview = $('#mobil-conversations').children('.gareth').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 6:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">carsten nicolai x olaf bender x uwe schmidt</strong></h1>');
			preview = $('#mobil-conversations').children('.carsten').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 7:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">benny ill x moritz von oswald</strong></h1>');
			preview = $('#mobil-conversations').children('.moritz').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 8:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">adrian sherwood x lee "scratch" perry</strong></h1>');
			preview = $('#mobil-conversations').children('.lee').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 9:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">matias aguayo x sly &amp; robbie</strong></h1>');
			preview = $('#mobil-conversations').children('.sly').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 10:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">ben ufo x dj harvey</strong></h1>');
			preview = $('#mobil-conversations').children('.harvey').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 11:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">cosey fanni tutti x nik void</strong></h1>');
			preview = $('#mobil-conversations').children('.cosey').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 12:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">modeselektor x mykki blanco</strong></h1>');
			preview = $('#mobil-conversations').children('.mykki').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 13:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">erykah badu x the underachievers</strong></h1>');
			preview = $('#mobil-conversations').children('.erykah').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 14:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">just blaze x paul riser</strong></h1>');
			preview = $('#mobil-conversations').children('.blaze').find('p').html();
			$('#tablet-preview').empty().html('<p>' + preview + '</p>');
			break;

			case 15:
			$('#tablet-title').empty();
			$('#tablet-title').html('<h1 style="line-height: 1"><strong style="font-weight: 800; font-size: 1.3em">Robert henke x tom oberheim</strong></h1>');
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
		clearTimeout(resizeTimer);
		clearTimeout(resizeTablet);
		//send width of screen when first called
		resizeTimer = setTimeout(function(){
								erasePics(initialWidth);
								}, 250);
		resizeTablet = setTimeout(tabletLogic, 250);

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
		//slide up conversation list
		$('#conversation-list').slideUp('slow');
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

	$('#mobi-info-slider .mobi-close-button').on('click', function(e){
		e.preventDefault();
		//recalculate window width, in case screen has resized while info page was open
		windowWidth = $(window).width();

		//make sure number is positive to slide back left to right
		var slideBackAmount = Math.abs(windowWidth);

		//transition slide back offscreen
		$('#mobi-info-slider').stop().transition({ x: slideBackAmount}, 1000);

		//show conversations
		showIt($('#mobil-conversations'), 1000);

	});

	$('#mobi-info-slider').find('.mobi-social').on('click', '.facebook-button-mobile', function(e){
		e.preventDefault();
		$(this).parent().parent().find('iframe').slideToggle();
		
	});

	$('.social').children('.facebook-button').on('click', 'img', function(){
		$(this).parent().parent().find('iframe').slideToggle();
	});



}); //end doc ready
