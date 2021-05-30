define([
  "./embeds"
],function(embeds){
  'use strict';

  function hookMessaging(iframe) {
    var onmessage = function (event) {
      if (!event) { event = window.event; }
      // * 1 to coerse to number, and + 2 to compensate for border
      iframe.style.height = (event.data.height * 1 + 2) + 'px';
    };

    window.addEventListener('message', onmessage);
  }

  return embeds.hookMessaging = hookMessaging;

});