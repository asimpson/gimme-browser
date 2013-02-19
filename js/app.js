(function() {

  window.APP = {
    Gimme: {
      processGimme: function(data) {
        var orderNum;
        orderNum = parseInt($('.more').attr("data-order"), 10);
        $('.more').attr("data-order", orderNum + 10);
        $(".more").show();
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
      gimmeRequest: function(user) {
        var skip, url;
        if ($(".more").attr("data-order") === "0") {
          skip = 0;
        } else {
          skip = parseInt($(".more").attr("data-order"), 10);
        }
        url = "https://gimmebar.com/api/v1/public/assets/" + user + "?skip=" + skip + "&jsonp_callback=?";
        return $.getJSON(url, function(data) {
          return APP.Gimme.processGimme(data);
        });
      },
      init: function() {
        $(document).on("submit", function(e) {
          var user;
          e.preventDefault();
          user = $(".gimmeUser").val();
          $('input:focus').blur();
          $(".content").empty();
          return APP.Gimme.gimmeRequest(user);
        });
        $(".more").on("click", function(e) {
          var user;
          e.preventDefault();
          user = $(".gimmeUser").val();
          return APP.Gimme.gimmeRequest(user);
        });
        return $(".more").hide();
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
