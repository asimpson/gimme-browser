# When you change APP, be sure to update it in mylibs/util.js
window.APP =
  Gimme:
    setStorage: (collection) ->
      tags = []
      previous = store.get(APP.Gimme.userVal)
      tags.push previous
      tags.push collection
      console.log tags
      store.set(APP.Gimme.userVal, tags)

    processGimme: (data) ->
      if APP.Gimme.collectionVal.length > 0
        APP.Gimme.setStorage(APP.Gimme.collectionVal)

      orderNum = parseInt(APP.Gimme.$moreButton.attr("data-order"), 10)
      APP.Gimme.$moreButton.attr("data-order", orderNum+10)

      APP.Gimme.$moreButton.show()

      $(data.records).each (index, Element) ->
        if Element.asset_type is "image"
          imgSrc = Element.content.resized_images.full
          imgMarkup = "<div class=\"img-module\"><img src=\""+imgSrc+"\" alt=\""+Element.title+"\"><input value=\""+imgSrc+"\"></div>"
          $(".content").append(imgMarkup)

        if Element.asset_type is "text"
          textContent = Element.content.text
          textTitle = Element.title
          textMarkup = "<div class=\"text-module\"><h2>"+textTitle+"</h2>"+"<p>"+textContent+"</p></div>"
          $(".content").append(textMarkup)

    trackSkip: ->
      APP.Gimme.$moreButton.attr("data-order", "0");

    gimmeRequest: (user, collection) ->
      encodedCollection = encodeURIComponent(collection).replace(/%20/g, '-')

      if APP.Gimme.$moreButton.attr("data-order") is "0"
        skip = 0
      else
        skip = parseInt(APP.Gimme.$moreButton.attr("data-order"), 10)

      if collection.length is 0
        url = "https://gimmebar.com/api/v1/public/assets/"+user+"?skip="+skip+"&jsonp_callback=?"
      else
        url = "https://gimmebar.com/api/v1/public/assets/"+user+"/"+encodedCollection+"?skip="+skip+"&jsonp_callback=?"

      $.getJSON url, (data) ->
        APP.Gimme.processGimme(data)

    init: ->
      APP.Gimme.$moreButton = $(".more")

      $(document).on "submit", (e) ->
        e.preventDefault()
        APP.Gimme.userVal = $(".gimmeUser").val()
        APP.Gimme.collectionVal = $(".gimmeCollection").val()
        $('input:focus').blur();
        $(".content").empty()
        APP.Gimme.trackSkip()
        APP.Gimme.gimmeRequest(APP.Gimme.userVal, APP.Gimme.collectionVal)

      APP.Gimme.$moreButton.on "click", (e) ->
        e.preventDefault()
        APP.Gimme.gimmeRequest(APP.Gimme.userVal, APP.Gimme.collectionVal)

      APP.Gimme.$moreButton.hide()

  # Initializers
  common:
    init: ->
      APP.Gimme.init()


$(document).ready UTIL.loadEvents