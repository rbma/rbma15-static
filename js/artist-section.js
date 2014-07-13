// ARTIST SECTION
var artist = $('#artist').find('.artist-list ul a');
var artistList = $('#artist').find('.artist-list ul');
var artistLength = artist.length;
var nextArtist, next, nextId;
var prevArtist, prev, prevId, prevPic;
var currentPos, nextPos;
var images = $('.artist-images img');
var imageBlock = $('#artist').find('.artist-images');
var artistBox = $('#artist-info');
var links = $('#artist-info').find('.links ul');
var cast = $('#insert-name').text();
var title = $('#insert-name');




function insertArtistInfo(){
	console.log('called');
	$.getJSON('./artists.json', function(data){
		var info = data.artists;
		for(var i=0; i < info.length; i++){
			console.log(info[i].name);
			var name = info[i].name;
			var nickname = info[i].nickname;
			//append names
			$('.artist-list ul').append(
				'<a data-name="' + name +'" href="#" data-pic="' + nickname + '"><li>' + name + '</li></a>'
				);
			//ready images
			$('.artist-images').append(
				'<img data-pic="' + nickname + '" class="' + nickname + '" src="//d17vwh530ty7de.cloudfront.net/artist/' + nickname + '.jpg" alt="'+name+'">'
				);
		}
	});
	artist.on('click', function(){
	alert('clci');
});
	initArtists();
}


function initArtists(){
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
		alert('click man');
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
artist.on('mouseenter', function(){
	alert('entered');
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	imageBlock.css({
		display: 'block'
	});


	//loop again through images and find matching one
	images.each(function(){
		$(this).addClass('hidden');
		
		if ($(this).hasClass(pic)){
			$(this).removeClass('hidden');
			$(this).transition({
				width: '101%'
			}, 900);
		}
	});
});

artist.on('mouseleave', function(){
	hideImages();
	images.each(function(){
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

insertArtistInfo();






