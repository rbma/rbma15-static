$ ->
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
					appendNamesToCast(name, nickname)
				setUpBinds()
			error: (xhr,status,err) ->
				console.log('fail')
			complete: (xhr, status) ->
				console.log('comp')
	

	getPics = (elem) ->
		name = elem.data('name')
		pic = elem.data('pic')
		$('.artist-images').css
			display: 'block'
		#hide all pics
		setupPics pic

	resetPics = (elem) ->
		$('.artist-images img').each ->
			$(@).addClass 'hidden'
			$(@).css
				width: '100%'
		$('.artist-images').hide()	

	setupPics = (pic) ->
		$('.artist-images img').each ->
			$(@).addClass 'hidden'
			if $(@).hasClass pic
				$(@).removeClass 'hidden'
				$(@).transition
					width: '101%'
					900

	
	appendNamesToCast = (name, nickname) ->
		castList = $('.artist-list ul')
		imageList = $('.artist-images')

		castList.append "<a data-name='#{name}' href='#' data-pic='#{nickname}'><li>#{name}</li></a>"
		imageList.append "<img data-pic='#{nickname}' class='#{nickname}' src='//d17vwh530ty7de.cloudfront.net/artist/#{nickname}.jpg' alt='#{name}'>"

		artistName = $('.artist-list ul a')
		
		
	#not currently getting correct index. end for day :)
	goToArtist = (elem, artist) ->
		console.log artist
		currentPos = elem.index( elem )

	setUpBinds = ->
		artistName = $('.artist-list ul a')
		castList = $('.artist-list ul')
		#on rollover, set up pictures
		artistName.bind 'mouseenter', ->
			getPics $(@)
		artistName.bind 'mouseleave', ->
			resetPics $(@)
		castList.bind 'click', ->
			goToArtist($(@), castList)





	

	getArtistInfo()