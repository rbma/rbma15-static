$ ->
	currentPos = 0
	#1
	getArtistInfo = ->
		$.ajax 'artists.json',
			success: (data,status,xhr) ->
				info = data.artists
				for artist, i in info
					name = info[i].name
					nickname = info[i].nickname
					lecture = info[i].lecture
					magazine = info[i].magazine
					radio = info[i].radio
					bio = info[i].bio
					website = info[i].website
		
					#add names to main page
					appendNameToCast(name, nickname)
					appendNamesToArtistBox(name,nickname,bio,lecture,radio,magazine,website)

			error: (xhr,status,err) ->
				console.log('fail')
			complete: (xhr, status) ->
				#set up binds for mouseover, mouseout, and click on artist names
				setUpBinds()

	#2a
	appendNameToCast = (name, nickname) ->
		castList = $('.artist-list ul')
		imageList = $('.artist-images')

		castList.append "<a data-name='#{name}' href='#' data-pic='#{nickname}'><li>#{name}</li></a>"
		imageList.append "<img data-pic='#{nickname}' class='#{nickname}' src='//d17vwh530ty7de.cloudfront.net/artist/#{nickname}.jpg' alt='#{name}'>"

		artistName = $('.artist-list ul a')

	#2b
	appendNamesToArtistBox = (name,nickname,bio,lecture,radio,magazine,website) ->
		$('#artist-info').append "<p class='bio #{nickname}-bio'>#{bio}</p>"
		$('#artist-info').append "<div class='links'><ul class='#{nickname}-links'></ul>"

		if (lecture)
			$("#artist-info .#{nickname}-links").append "<li><a href='#{lecture}' target='blank'>" +
				"<img src='//d17vwh530ty7de.cloudfront.net/play.gif' /></a>" +
				"<a href='#{lecture}' target='blank'>Watch Lecture</a></li>"

		if (radio)
			$("#artist-info .#{nickname}-links").append "<li><a href='#{radio}' target='blank'>" +
				"<img src='//d17vwh530ty7de.cloudfront.net/play.gif' /></a>" +
				"<a href='#{radio}' target='blank'>RBMA Radio Show</a></li>"

		if (magazine)
			$("#artist-info .#{nickname}-links").append "<li><a href='#{magazine}' target='blank'>" +
				"<img src='//d17vwh530ty7de.cloudfront.net/read.gif' /></a>" +
				"<a href='#{magazine}' target='blank'>RBMA Feature</a></li>"

		if (website)
			$("#artist-info .#{nickname}-links").append "<li><a href='#{website}' target='blank'>" +
				"<img src='//d17vwh530ty7de.cloudfront.net/www.svg' /></a>" +
				"<a href='#{website}' target='blank'>On The Web</a></li>"



	#3
	setUpBinds = ->
		artistName = $('.artist-list ul a')
		castList = $('.artist-list ul')
		nextArtist = $('#next-artist')
		prevArtist = $('#prev-artist')

		#on rollover, set up pictures
		artistName.bind 'mouseenter', ->
			getPics $(@)
		artistName.bind 'mouseleave', ->
			resetPics $(@)
		artistName.bind 'click', ->
			goToArtist($(@), artistName)
		nextArtist.bind 'click', ->
			goToNext()
		prevArtist.bind 'click', ->
			goToPrev()


	#4
	getPics = (elem) ->
		name = elem.data('name')
		pic = elem.data('pic')
		$('.artist-images').css
			display: 'block'
		#hide all pics
		setupPics pic

	#5
	setupPics = (pic) ->
		$('.artist-images img').each ->
			$(@).addClass 'hidden'
			if $(@).hasClass pic
				$(@).removeClass 'hidden'
				$(@).transition
					width: '101%'
					900

	#6
	resetPics = (elem) ->
		$('.artist-images img').each ->
			$(@).addClass 'hidden'
			$(@).css
				width: '100%'
		$('.artist-images').hide()

	#7
	goToArtist = (artist, list) ->
		currentPos = list.index( artist )
		#account for zero indexing
		currentPos++
		nextPos = currentPos + 1
		prevPos = currentPos - 1

		name = artist.data('name')
		pic = artist.data('pic')

		#grab initial values on artist selection
		nextArtist = $("#artist").find("ul :nth-child(#{nextPos})").data('name')
		nextId = $("#artist").find("ul :nth-child(#{nextPos})").data('pic')
		prevArtist = $("#artist").find("ul :nth-child(#{prevPos})").data('name')
		prevId = $("#artist").find("ul :nth-child(#{prevPos})").data('pic')

		#empty class and append next artist name
		$('#next-artist').removeClass().addClass(nextId)
		$('#prev-artist').removeClass().addClass(prevId)

		#empty default picture
		$('#artist-info').find('.assets img').empty()
		
		addInfo(name, pic)
		
		$('#artist-info').transition {
			left: 0
			},500,"ease", ->
				$('#go-home').fadeIn(500)

		#change class of next artist link
		updateNextArtistLink(nextId, currentPos)

		return currentPos

	#8
	addInfo = (name, pic) ->
		artistBox = $('#artist-info')
		links = $('#artist-info').find('.links ul')

		artistBox.find('.insert-name').text name
		artistBox.find('.exit').removeClass 'hidden'
		artistBox.find('.assets img').attr("src", "//d17vwh530ty7de.cloudfront.net/artist/#{pic}.jpg")

		#loop through ul's, hide them, then show the one that matches class of artist clicked
		links.each ->
			$(@).css
				display: 'none'

			$(@).addClass 'hidden'
			if ( $(@).hasClass("#{pic}-links"))
				$(@).removeClass 'hidden'
				$(@).css
					display: 'block'

		artistBox.find('p').each ->
			#make sure each one is hidden
			$(@).addClass 'hidden'
			if ( $(@).hasClass("#{pic}-bio"))
				$(@).removeClass 'hidden'

			#find p that matches class of clicked image
			# if ( $(@).hasClass "#{pic}-bio" )

	#9
	updateNextArtistLink = (next, currentPos) ->
		$('#next-artist').removeClass().addClass(next)

	#10
	goToNext = ->
		artist = $('#artist').find('.artist-list ul a')
		artistLength = artist.length

		if (currentPos < artistLength)
			ogId = $("#artist").find("ul :nth-child(#{currentPos})").data('pic')
			ogName = $("#artist").find("ul :nth-child(#{currentPos})").data('name')
			nextId = $("#artist").find("ul :nth-child(#{currentPos + 1})").data('pic')
			nextName = $("#artist").find("ul :nth-child(#{currentPos + 1})").data('name')
		else
			ogId = $("#artist").find("ul :nth-child(0)").data('pic')
			ogName = $("#artist").find("ul :nth-child(0)").data('name')
			nextId = $("#artist").find("ul :nth-child(1)").data('pic')
			nextName = $("#artist").find("ul :nth-child(1)").data('name')

			#reset current pos
			currentPos = 0

		addInfo(nextName, nextId)
		updateNextArtistLink(nextId)

		currentPos++

	#11
	goToPrev = ->
		artist = $('#artist').find('.artist-list ul a')
		artistLength = artist.length

		if (currentPos > 1)
			ogId = $("#artist").find("ul :nth-child(#{currentPos})").data('pic')
			ogName = $("#artist").find("ul :nth-child(#{currentPos})").data('name')
			prevId = $("#artist").find("ul :nth-child(#{currentPos - 1})").data('pic')
			prevName = $("#artist").find("ul :nth-child(#{currentPos - 1})").data('name')
		else
			prevId = $("#artist").find("ul :nth-child(#{artistLength})").data('pic')
			prevName = $("#artist").find("ul :nth-child(#{artistLength})").data('name')

			#reset current pos
			currentPos = artistLength + 1

		#pass in last artist, since they will be prev in this case
		addInfo(prevName, prevId)
		updateNextArtistLink(prevId)

		currentPos--








	getArtistInfo()