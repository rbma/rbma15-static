// $(document).ready(function(){
// 	var start = 1; //initialize start counter

// 	$('.title').on('mousewheel', function(event, delta){
// 		var orgPositionAta = -300; //og left position
// 		var centerAta = 0; //move div to middle, align to left
// 		var orgPositionTrevor = 20 + '%'; //og left position
// 		var centerTrevor = 0; //og left position of trevor
// 		var width = 100 + '%'; //set 100% width of container


// 		if (start === 1){ //set flag
// 			if (delta < -1){
// 				// make sure delta value doesn't go past -1, otherwise will cause wild animations
// 				delta = -1;
// 			}
// 			if(delta < 0){
// 				delta = Math.abs(delta); //make sure is positive integer
// 				//cycle animation. stop all previous animations.
// 				$('.title-ata').stop(true, false).animate({left: centerAta}, 1000);
// 				$('.title-trevor').stop(true, false).animate({left: centerTrevor}, 1000);
// 				start = 2;
// 			}
			
// 			else{
// 				start = 1; //flag
// 			}
// 		} //end start 1 if

// 		else if (start === 2){
// 			if (delta > 1){
// 				delta = 1;
// 			}
// 			if(delta > 0){
// 				$('.title-ata').stop(true, false).animate({left: orgPositionAta}, 1000);
// 				$('.title-trevor').stop(true, false).animate({left: orgPositionTrevor}, 1000);
// 				start = 1;
// 			}

// 			else{
// 				start = 2;

// 			}
// 		}

// 	}); //end mousewheel event

// 	$('#social').find('a.fb-like-icon').on('click', function(e){
// 		e.preventDefault();
// 		$(this).parent().find('iframe').slideToggle();
// 	});
  
// }); //end doc ready
 