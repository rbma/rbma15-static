$(document).ready(function() {
 
 	//GLOBALS
	var nav = $('nav a');
	var bottom = $('#nav-bottom a');
	var win_height = $(window).height();
	var win_width = $(window).width();
	var elementHeight = 0; //used for call bounding rect to measure element
	var exit = $('#wrapper').find('#exit');

	//number of content screens - 1
	var scrollBottom = $(window).scrollTop() + (win_height * 4.5);
	var scrollSpeed = 500;
	var country;
	var sd_download = $('#download').find('.download-left a');
	var hd_download = $('#download').find('.download-right a');

	//YOUTUBE
	var player, duration, i, videoId;
	//flags for GA youtube events
	var percentTwentyFive = 0;
	var percentFifty = 0;
	var percentSeventyFive = 0;

	var iOS = ( navigator.userAgent.match(/(Android|iPad|iPhone|iPod)/g) ? true : false );
	


	//ARTIST SHIT
	
	var artistList = $('#artist').find('.artist-list ul');
	var artistLength = artist.length;
	var nextArtist, next, nextId;
	var prevArtist, prev, prevId, prevPic;
	var currentPos, nextPos;
	var images = $('.artist-images img');
	
	var artistBox = $('#artist-info');
	var links = $('#artist-info').find('.links ul');
	var cast = $('#insert-name').text();
	var title = $('#insert-name');


	// findLocation();

	init();
	

	// function findLocation(){
	// 	console.log('location called');
	// 	try{
	// 		//get ip for japan and choose links
	// 		$.getJSON("http://freegeoip.net/json/",function(data){
	// 			country = data.country_name;


	// 		}).fail(function(textStatus){
	// 			sd_download.attr('href', sd);
	// 			hd_download.attr('href', hd);
	// 			videoId = '_EDnMFJiv8U';
	// 			console.log('location failed');
	// 			init();

	// 		}).success(function(textStatus){
	// 			if (country === 'Japan'){
	// 				sd_download.attr('href', sd_jp);
	// 				hd_download.attr('href', hd_jp);
	// 				videoId = 'HUUa-KNyqKk';
	// 				console.log('japan location success');
	// 				init();
	// 			}

	// 			else {
	// 				sd_download.attr('href', sd);
	// 				hd_download.attr('href', hd);
	// 				videoId = '_EDnMFJiv8U';
	// 				console.log('global location success');
	// 				init();
	// 			}
	// 		});
	// 	}

	// 	//defaults to OG video if country can't be detected
	// 	catch (error){
	// 		sd_download.attr('href', sd);
	// 		hd_download.attr('href', hd);
	// 		videoId = '_EDnMFJiv8U';
	// 		console.log('catch location failed');
	// 		init();
	// 	}
	// }


	// MAIN PAGE INIT
	function init(){
		//set up download links
		sd_download.attr('href', '#');
		hd_download.attr('href', '#');
		videoId = '_EDnMFJiv8U';
		loadYouTube();

		function loadYouTube(){
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}



		window.onYouTubeIframeAPIReady = function(playerId){
			var height = (measureVideo());
			var width = ($(window).width());

			player = new YT.Player('embed',{
				height: height,
				width: width,
				//use video id determined by ip geo
				videoId: videoId,
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
		};


		function onPlayerReady(){
			$('#play-button').on('click', function(e){
				return null;
			});
		}



		function onPlayerStateChange(event){
			if (event.data === 1){
				//if video is playing, get duration of video (video won't load 
				//duration on iOS until it has started playing)
				duration = player.getDuration();
			}
			if (event.data === 2){
				//video is paused
			}
			if (event.data === 0){
				//when video is over, clear counter
				clearInterval(i);
			}
		}


		function checkPlayer(){
			var position = player.getCurrentTime();
			var uglyPercent = (position / duration) * 100;
			//round percent to whole number
			var percent = Math.round(uglyPercent);
			
			if (percent >= 25 && percentTwentyFive === 0 ){
				percentTwentyFive = 1;
				ga('send', 'event', 'RBMA15', 'Film', '25perc');
			}
			if (percent >= 50 && percentFifty === 0 ){
				percentFifty = 1;
				ga('send', 'event', 'RBMA15', 'Film', '50perc');
			}
			if (percent >= 75 && percentSeventyFive === 0 ){
				percentSeventyFive = 1;
				ga('send', 'event', 'RBMA15', 'Film', '75perc');
			}
		}
		

		//USED TO MESAURE SCREEN SIZE TO BE USED FOR VIDEO SIZE
		function measureVideo(){
			var rect = document.getElementById("stream").getBoundingClientRect();
			if (rect.height){
				elementHeight = rect.height;
			}
			else{
				elementHeight = rect.bottom - rect.height; //derive height
			}

			return elementHeight;
		}

		//grabs class of link and scrolls accordingly
		function smoothScroll(clk){
			if (clk.hasClass('filmlink')){
				$('#wrapper').animate({
					scrollTop: win_height
				},scrollSpeed);
				$('#pointer').fadeOut();
			}


			//ABOUT CLICK
			else if(clk.hasClass('aboutlink')){
				$('#wrapper').animate({
					scrollTop: $('#aboutlink').offset().top
				}, scrollSpeed * 2);
				$('#pointer').fadeOut();
			}
			//TITLE CLICK
			else if(clk.hasClass('titlelink')){
				$('#wrapper').animate({
					scrollTop: 0
				}, scrollSpeed);
			}
		}


		//used for video
		function getElementLeftTop(thiselement){
			var rect = thiselement.getBoundingClientRect();
			return [rect.left];
		}

		function scrollDown(){
			var scrolltop = $('#wrapper').scrollTop();
			winheight = $(window).height();
			$('#pointer').fadeOut();

			//top screen
			if (scrolltop < (winheight / 2)){
				$('#wrapper').animate({
					//scroll to movie
					scrollTop: (win_height)
				}, scrollSpeed);
			}

			//film screen
			if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
				$('#wrapper').animate({
					//scroll to download
					scrollTop: (win_height * 2)
				}, scrollSpeed);
			}
			//download screen
			if (scrolltop >= (winheight * 2 ) && (scrolltop < (winheight * 2.5) - 1)){
				$('#wrapper').animate({
					//scroll to artists
					scrollTop: (win_height * 2.5)
				}, scrollSpeed);
			}

			//artist screen
			if (scrolltop >= ((winheight * 2.5) - 10 ) && (scrolltop < (winheight * 3.5) - 1)){
				$('#wrapper').animate({
					//scroll to about
					scrollTop: (win_height * 3.5)
				}, scrollSpeed);
			}
			//go to the bottom of the about screen
			if (scrolltop >= ((winheight * 3.5) - 1)){
				$('#wrapper').animate({
					//scroll to bottom of page
					scrollTop: (win_height * 6)
				}, scrollSpeed * 1.5);
			}
		}

		function scrollUp(){
			var scrolltop = $('#wrapper').scrollTop();
			winheight = $(window).height();

			//if on movie page
			if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
				$('#wrapper').animate({
					//scroll to top
					scrollTop: 0
				}, scrollSpeed);
			}
			//if on download page
			if (scrolltop >= ( winheight * 2 ) &&  scrolltop < (winheight * 2.5) - 1){
				$('#wrapper').animate({
					//scroll back to movie page
					scrollTop: win_height
				}, scrollSpeed);
			}
			//if on artist page
			if (scrolltop >= ((winheight * 2.5) - 1) && scrolltop < (win_height * 3.5) - 1){
				$('#wrapper').animate({
					//scroll back to download page
					scrollTop: (win_height * 2)
				}, scrollSpeed);
			}

			//if on about screen
			if (scrolltop >= (winheight * 3.5 - 1 ) && (scrolltop < winheight * 4.5)){
				$('#wrapper').animate({
					//scroll back to artist page
					scrollTop: (win_height * 2.5) //allow extra padding
				}, scrollSpeed);
			}

			//if partway down about screen
			if (scrolltop >= (win_height * 4.5) - 1){
				$('#wrapper').animate({
					scrollTop: (win_height * 3.5)
				}, scrollSpeed);
			}
		}


		
		//STARTUP EVENT LISTENERS AND FUNCTIONS

		//TO-DO: REFACTOR TO FUNCTIONS!!!	
		$('#download').find('.download-left img').on('mouseenter', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/standard_def_back.svg');
		});

		$('#download').find('.download-left img').on('mouseleave', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/standard_def_b.svg');
		});

		$('#download').find('.download-right img').on('mouseenter', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/high_def_back.svg');
		});

		$('#download').find('.download-right img').on('mouseleave', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/high_def_b.svg');
		});


		//on nav bar click, grab link class and pass to smooth scroll
		$('nav').on('click', 'a.scroll', function(e){
			if ( $(this).hasClass('booklink')){
				return;
			}
			else{
				e.preventDefault();
				smoothScroll($(this));
			}
			
			
		});

		$('#nav-bottom').on('click', 'a.scroll', function(e){
			e.preventDefault();
			smoothScroll($(this));
			$('#pointer').fadeOut();
		});


		//slide to next screen with arrow up/down
		$(document).keydown(function(e){
			e.stopPropagation();
			if (e.keyCode === 40) {
				scrollDown();
			} else if (e.keyCode === 38) {
				scrollUp();
			}
		});


		//use css animated arrow on hero page to scroll down one page
		$('#pointer').on('click', function(e){
			e.preventDefault();
			var scrollAmount = $(window).height();
			$('#wrapper').animate({
					scrollTop: (scrollAmount)
				}, 700, function(){
					$('#pointer').fadeOut();
				});
		});
	} //end init
}); //end doc ready

