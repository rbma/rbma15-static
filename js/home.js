$(document).ready(function() {

 //GLOBAL VARIABLES
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

	//youtube
	var player, duration, i, videoId;
	//flags for GA youtube events
	var percentTwentyFive = 0;
	var percentFifty = 0;
	var percentSeventyFive = 0;

	var iOS = ( navigator.userAgent.match(/(Android|iPad|iPhone|iPod)/g) ? true : false );
	
	var hd = "https://d1cwrlyxfuylre.cloudfront.net/HD+What+Difference+Does+It+Make%3F+A+Film+About+Making+Music.mp4";
	var sd = "https://d1cwrlyxfuylre.cloudfront.net/SD-what-difference-does-it-make.mp4";
	
	var hd_jp = "https://d1cwrlyxfuylre.cloudfront.net/HD+JP+What+Difference+Does+It+Make%3F.mp4";
	var sd_jp = "https://d1cwrlyxfuylre.cloudfront.net/SD+JP+What+Difference+Does+It+Make%3F.mp4";


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





	findLocation();
	

	function findLocation(){
		try{
			//get ip for japan and choose links
			$.getJSON("http://freegeoip.net/json/",function(data){
				country = data.country_name;


			}).fail(function(textStatus){
				sd_download.attr('href', sd);
				hd_download.attr('href', hd);
				videoId = '_EDnMFJiv8U';
				init();

			}).success(function(textStatus){
				if (country === 'Japan'){
					sd_download.attr('href', sd_jp);
					hd_download.attr('href', hd_jp);
					videoId = 'HUUa-KNyqKk';
					init();
				}

				else {
					sd_download.attr('href', sd);
					hd_download.attr('href', hd);
					videoId = '_EDnMFJiv8U';
					init();
				}

			});
		}

		//defaults to OG video if country can't be detected
		catch (error){
			sd_download.attr('href', sd);
			hd_download.attr('href', hd);
			videoId = '_EDnMFJiv8U';
			init();
		}
	}





	function insertArtistInfo(){
		$.getJSON('./artists.json', function(data){
			var info = data.artists;
			for(var i=0; i < info.length; i++){
				var name = info[i].name;
				var nickname = info[i].nickname;
				var lecture = info[i].lecture;
				var magazine = info[i].magazine;
				var radio = info[i].radio;
				var bio = info[i].bio;
				var website = info[i].website;
				appendNamesToCast(name, nickname);
				appendNamesToArtistBox(name, nickname, bio, links, lecture, radio, magazine, website);
				
			}
		});
		initArtists();
	}


	function appendNamesToCast(name, nickname){
		//append names
		$('.artist-list ul').append(
			'<a data-name="' + name +'" href="#" data-pic="' + nickname + '"><li>' + name + '</li></a>'
		);
		//ready images
		$('.artist-images').append(
			'<img data-pic="' + nickname + '" class="' + nickname + '" src="//d17vwh530ty7de.cloudfront.net/artist/' + nickname + '.jpg" alt="'+name+'">'
			);
		}

	function appendNamesToArtistBox(name, nickname, bio, links, lecture, radio, magazine, website){
		$('#artist-info').append(
			'<p class="bio' + nickname +'-bio>' + bio + '</p>');

		$('#artist-info').append(
			'<div class="links"><ul class="' + nickname + '-links"');

		if (lecture){
			$('#artist-info .' + nickname + '-links').append(
				'<li><a href="' + lecture + '" target="blank"><img src="//d17vwh530ty7de.cloudfront.net/play.gif"/></a>' +
				'<a href="' + lecture + '" target="blank">Watch Lecture</a></li>'
				);
		}


	}

	        // <!-- Insert Artist Bio-->
        // <% _.each(artists, function(artist){ %>

        // <p class="bio <%= artist.nickname + '-bio' %>"><%- artist.bio %></p>

        // <div class="links">
        //     <ul class="<%= artist.nickname + '-links' %>">
        //         <% if (artist.lecture){ %>
        //         <li>
        //             <a href="<%= artist.lecture %>" target="blank"><img src="//d17vwh530ty7de.cloudfront.net/play.gif" /></a>

        //             <a href="<%= artist.lecture %>" target="blank">Watch Lecture</a>
        //         </li>
        //         <% } if (artist.radio) { %>
        //         <li>
        //             <a href="<%= artist.radio %>" target="blank"><img src="//d17vwh530ty7de.cloudfront.net/play.gif" /></a>
        //             <a href="<%= artist.radio %>" target="blank">RBMA Radio Show</a>
        //         </li>
        //         <% } if (artist.magazine) { %>
        //         <li>
        //             <a href="<%= artist.magazine %>" target="blank"><img src="//d17vwh530ty7de.cloudfront.net/read.gif" /></a>
        //             <a href="<%= artist.magazine %>" target="blank">RBMA Feature</a>
        //         </li>
        //         <% } if (artist.website) { %>
        //         <li>
        //             <a href="<%= artist.website %>" target="blank"><img src="//d17vwh530ty7de.cloudfront.net/www.svg" /></a>
        //             <a href="<%= artist.website %>" target="blank">On The Web</a>
        //         </li>
        //         <% } %>
        //     </ul>
        // </div> <!-- END LINKS -->
        // <% }) %> <!-- END EACH -->






	function initArtists(){
		var imageBlock = $('#artist').find('.artist-images');
		var artist = $('#artist').find('.artist-list ul a');
		function setDisplayOn(){
			$('#artist').find('.artist-images').css({
				display: 'block'
			});
		}

		function hideImages(){
			images.each(function(){
				$(this).addClass('hidden');
			});
			//get images ready to load
			setDisplayOn();
		}


		//SLIDE UP INFO WHEN CLICKED
		artist.on('click', function(){
			currentPos = artist.index( this );
			//account for zero indexing
			currentPos = currentPos + 1;
			//zero indexed, so we add 2
			nextPos = currentPos + 2;
			prevPos = currentPos - 1;


			var name = $(this).data('name');
			var pic = $(this).data('pic');

			//grab initial values on artist selection
			nextArtist = $("#artist").find('ul :nth-child(' + nextPos + ')').data('name');
			nextId = $("#artist").find('ul :nth-child(' + nextPos + ')').data('pic');

			prevArtist = $("#artist").find('ul :nth-child(' + prevPos + ')').data('name');
			prevId = $("#artist").find('ul :nth-child(' + prevPos + ')').data('pic');

			//set values
			//empty class
			$('#next-artist').removeClass();
			//append NEXT artist name
			$('#next-artist').addClass(nextId);

			$('#prev-artist').removeClass();
			$('#prev-artist').addClass(prevId);

			//empty out default picture
			$('#artist-info').find('.assets img').empty();
			addInfo(name, pic);
			$('#artist-info').transition({
				left: 0
			}, 500, "ease", function(){
				$('#go-home').fadeIn(100);
			});

			//change class of next artist link
			updateNextArtistLink(nextId, currentPos);
			return currentPos;
		});


	//EXIT INFO BOX
	$('#go-home').on('click', function(){
		artistBox.transition({
			left: '100%'
		}, 500, "ease");
		$(this).hide();
	});

	//ADD INFO TO SLIDE BOX
	function addInfo(name, pic){
		artistBox.find('.insert-name').text(name);
		artistBox.find('.exit').removeClass('hidden');
		artistBox.find('.assets img').attr('src', '//d17vwh530ty7de.cloudfront.net/artist/' + pic + '.jpg');

		

		//loop through ul's, hide them, then show only the one that matches the class of artist clicked
		links.each(function(){
			$(this).css({
				display: 'none'
			});
			$(this).addClass('hidden');
			if ($(this).hasClass(pic + '-links')){
				$(this).removeClass('hidden');
				$(this).css({
					display: 'block'
				});
			}
		});

		//loop through each p item (created via database)
		artistBox.find('p').each(function(){
			//make sure each one is hidden
			$(this).addClass('hidden');

			//find particular p that matches class of clicked image
			if ($(this).hasClass(pic + '-bio')){
				$(this).removeClass('hidden');
			}
		});
	}


	//GET NAME TITLES
	$('.artist-list ul a').on('mouseenter', function(){
		var name = $(this).data('name');
		var pic = $(this).data('pic');
		imageBlock.css({
			display: 'block'
		});


		//loop again through images and find matching one
		$('.artist-images img').each(function(){
			$(this).addClass('hidden');
			
			if ($(this).hasClass(pic)){
				$(this).removeClass('hidden');
				$(this).transition({
					width: '101%'
				}, 900);
			}
		});
	});

	$('.artist-list ul a').on('mouseleave', function(){
		hideImages();
		$('.artist-images img').each(function(){
			$(this).css({
				width: '100%'
			});
		});
		imageBlock.css({
			display: 'none'
		});
		artist.css({
			color: 'white',
			backgroundColor: 'transparent'
		});
	});


	//hide all images on load, makes callback to set images to display block
	hideImages();

	function updateNextArtistLink(next, currentPos){
		
		//currentPos += 1;

		//empty class
		$('#next-artist').removeClass();
		//append NEXT artist name
		$('#next-artist').addClass(next);
	}


	$('#next-artist').on('click', function(){
		var ogId,
			ogName,
			nextId,
			nextName;

		if (currentPos < artistLength){
			ogId = $("#artist").find('ul :nth-child(' + currentPos + ')').data('pic');
			ogName = $("#artist").find('ul :nth-child(' + currentPos + ')').data('name');
			nextId = $('#artist').find('ul :nth-child(' + (currentPos + 1) + ')').data('pic');
			nextName = $('#artist').find('ul :nth-child(' + (currentPos + 1) + ')').data('name');


		} else{
			ogId = $("#artist").find('ul :nth-child(0)').data('pic');
			ogName = $("#artist").find('ul :nth-child(0)').data('name');
			nextId = $('#artist').find('ul :nth-child(1)').data('pic');
			nextName = $('#artist').find('ul :nth-child(1)').data('name');

			//reset currentPos
			currentPos = 0;
		}

		//turn into object, so both parameters can be passed
			addInfo(nextName, nextId);
			updateNextArtistLink(nextId);

			currentPos++;

	});



	$('#prev-artist').on('click', function(){
		var ogId,
			ogName,
			prevId,
			prevName;

		if (currentPos > 1){
			ogId = $("#artist").find('ul :nth-child(' + currentPos + ')').data('pic');
			ogName = $("#artist").find('ul :nth-child(' + currentPos + ')').data('name');
			prevId = $('#artist').find('ul :nth-child(' + (currentPos - 1) + ')').data('pic');
			prevName = $('#artist').find('ul :nth-child(' + (currentPos - 1) + ')').data('name');


		} else{
			prevId = $("#artist").find('ul :nth-child('+ artistLength + ')').data('pic');
			prevName = $("#artist").find('ul :nth-child('+ artistLength + ')').data('name');

			//reset currentPos. adding one to account for decrement later in function
			currentPos = artistLength + 1;
		}

			//pass in last artist, since they will be previous in this case
			addInfo(prevName, prevId);
			updateNextArtistLink(prevId);

			currentPos--;

	});

	}











	// MAIN PAGE INIT
	function init(){
		
		loadYouTube();
		insertArtistInfo();



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
				e.preventDefault();
				$(this).fadeOut();
				//iOS not supporting autoplay, so skip for those devices
				if( !iOS ){
					player.playVideo();
				}
				$('#embed').css({
					zIndex: '99',
					opacity: '1'
				});
				//check player every 10 seconds for video position
				i = setInterval(checkPlayer, 10000);
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

			//slide out book
			else if(clk.hasClass('booklink')){
				//BOOK IFRAME
				$('#bookframe').html('<iframe src="/book" width="100%" height="100%" border="0"></iframe>');
				$('#bookframe').transition({
					left: 0,
					top: 0
				}, 1000,function(){
					//make sure exit button is visible
					exit.removeClass('hidden').fadeIn();
				});
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

		//REFACTOR TO FUNCTIONS!!!	
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
			e.preventDefault();
			smoothScroll($(this));
			
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

		//if book iframe is open, allow exit button to close iframe
		exit.on('click', function(e){
			e.preventDefault();
			if (!(exit.hasClass('hidden'))){
				if (win_width > 768){
					$('#bookframe').transition({
						left: '100%',
						top: '-100%'
					}, 1000);
					$(this).addClass('hidden');
					//set back to none, so we can fade in when re-opened
					$(this).css({
						display: 'none'
					});
				}
				else{
					$('#bookframe').transition({
						left: '100%',
						top: '0'
					}, 1000);
					$(this).addClass('hidden');
					//set back to none, so we can fade in when re-opened
					$(this).css({
						display: 'none'
					});
				}
				
			}
		});

	} //end init
}); //end doc ready



