$ ->
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

			error: (xhr,status,err) ->
				console.log('fail')
			complete: (xhr, status) ->
				#set up binds for mouseover, mouseout, and click on artist names
				setUpBinds()

	#2
	appendNameToCast = (name, nickname) ->
		castList = $('.artist-list ul')
		imageList = $('.artist-images')

		castList.append "<a data-name='#{name}' href='#' data-pic='#{nickname}'><li>#{name}</li></a>"
		imageList.append "<img data-pic='#{nickname}' class='#{nickname}' src='//d17vwh530ty7de.cloudfront.net/artist/#{nickname}.jpg' alt='#{name}'>"

		artistName = $('.artist-list ul a')

	#3
	setUpBinds = ->
		artistName = $('.artist-list ul a')
		castList = $('.artist-list ul')
		#on rollover, set up pictures
		artistName.bind 'mouseenter', ->
			getPics $(@)
		artistName.bind 'mouseleave', ->
			resetPics $(@)
		artistName.bind 'click', ->
			goToArtist($(@), artistName)

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
		alert currentPos



	getArtistInfo()