(function() {

  window.APP = {
    Gimme: {
      processGimme: function(data) {
        var orderNum;
        console.log(data);
        orderNum = parseInt(APP.Gimme.$moreButton.attr("data-order"), 10);
        APP.Gimme.$moreButton.attr("data-order", orderNum + 10);
        APP.Gimme.$moreButton.show();
        return $(data.records).each(function(index, Element) {
          var imgMarkup, imgSrc, textContent, textMarkup, textTitle;
          if (Element.asset_type === "image") {
            imgSrc = Element.content.resized_images.full;
            imgMarkup = "<div class=\"img-module\"><img src=\"" + imgSrc + "\" alt=\"" + Element.title + "\"><input value=\"" + imgSrc + "\"></div>";
            $(".content").append(imgMarkup);
          }
          if (Element.asset_type === "text") {
            textContent = Element.content.text;
            textTitle = Element.title;
            textMarkup = "<div class=\"text-module\"><h2>" + textTitle + "</h2>" + "<p>" + textContent + "</p></div>";
            return $(".content").append(textMarkup);
          }
        });
      },
      gimmeRequest: function(user, collection) {
        var encodedCollection, skip, url;
        encodedCollection = encodeURIComponent(collection);
        console.log(collection);
        console.log(encodedCollection);
        if (APP.Gimme.$moreButton.attr("data-order") === "0") {
          skip = 0;
        } else {
          skip = parseInt(APP.Gimme.$moreButton.attr("data-order"), 10);
        }
        if (collection.length === 0) {
          url = "https://gimmebar.com/api/v1/public/assets/" + user + "?skip=" + skip + "&jsonp_callback=?";
        } else {
          url = "https://gimmebar.com/api/v1/public/assets/" + user + "/" + encodedCollection + "?skip=" + skip + "&jsonp_callback=?";
        }
        return $.getJSON(url, function(data) {
          return APP.Gimme.processGimme(data);
        });
      },
      init: function() {
        APP.Gimme.$moreButton = $(".more");
        $(document).on("submit", function(e) {
          e.preventDefault();
          APP.Gimme.userVal = $(".gimmeUser").val();
          APP.Gimme.collectionVal = $(".gimmeCollection").val();
          $('input:focus').blur();
          $(".content").empty();
          return APP.Gimme.gimmeRequest(APP.Gimme.userVal, APP.Gimme.collectionVal);
        });
        APP.Gimme.$moreButton.on("click", function(e) {
          e.preventDefault();
          return APP.Gimme.gimmeRequest(APP.Gimme.userVal);
        });
        return APP.Gimme.$moreButton.hide();
      }
    },
    common: {
      init: function() {
        return APP.Gimme.init();
      }
    }
  };

  $(document).ready(UTIL.loadEvents);

}).call(this);
