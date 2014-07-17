$(document).ready(function(){
	
	$('#social-links').find('.fb-like-icon').on('click', function(e){
		e.preventDefault();
		$(this).parent().find('iframe').slideToggle();
	});

	$('#social-end').find('.fb-icon-end').on('click', function(e){
		e.preventDefault();
		$(this).parent().find('iframe').slideToggle();
	});

}); //end doc ready

