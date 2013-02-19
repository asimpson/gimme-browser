# When you change APP, be sure to update it in mylibs/util.js
window.APP =
  Gimme:
    processGimme: (data) ->
      orderNum = parseInt($('.more').attr("data-order"), 10)
      $('.more').attr("data-order", orderNum+10)

      $(".more").show()

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

    gimmeRequest: (user) ->
      if $(".more").attr("data-order") is "0"
        skip = 0
      else
        skip = parseInt($(".more").attr("data-order"), 10)

      url = "https://gimmebar.com/api/v1/public/assets/"+user+"?skip="+skip+"&jsonp_callback=?"
      $.getJSON url, (data) ->
        APP.Gimme.processGimme(data)

    init: ->
      $(document).on "submit", (e) ->
        e.preventDefault()
        user = $(".gimmeUser").val()
        $('input:focus').blur();
        $(".content").empty()
        APP.Gimme.gimmeRequest(user)

      $(".more").on "click", (e) ->
        e.preventDefault()
        user = $(".gimmeUser").val()
        APP.Gimme.gimmeRequest(user)

      $(".more").hide()

  # Initializers
  common:
    init: ->
      APP.Gimme.init()


$(document).ready UTIL.loadEvents