define([
  "./embeds",
  "./embed",
  "./scoop",
  "./inview",
  "./loadRealEmbed"
],function(embeds,embed,scoop,inview,loadRealEmbed){
  'use strict';

  var docElem = document && document.documentElement;

  // 1. find all links with class=jsbin
  function getLinks() {
    var links = [], alllinks, i = 0, length;
    alllinks = document.getElementsByTagName('a');
    length = alllinks.length;
    for (; i < length; i++) {
      if ((' ' + alllinks[i].className).indexOf(' jsbin-') !== -1) {
        links.push(alllinks[i]);
      }
    }

    return links;
  }


  function readLinks() {
    var links = getLinks(),
        i = 0,
        length = links.length,
        className = '';

    for (; i < length; i++) {
      className = ' ' + links[i].className + ' ';
      if (className.indexOf(' jsbin-scoop ') !== -1) {
        scoop(links[i]);
      } else if (className.indexOf(' jsbin-embed ') !== -1) {
        links[i].className = links[i].className.replace(/jsbin\-embed/, '');
        embed(links[i]);
      }
    }
  }

  function checkForPending() {
    var i = 0;
    var todo = [];
    for (i = 0; i < pending.length; i++) {
      if (inview(pending[i], 400)) {
        todo.unshift({ iframe: pending[i], i: i });
      }
    }

    for (i = 0; i < todo.length; i++) {
      pending.splice(todo[i].i, 1);
      loadRealEmbed(todo[i].iframe);
    }
  }

  var pending = [];

  // this supports early embeding - probably only applies to Google's slides.js
  //readLinks();

  // try to read more links once the DOM is done
  function init () {
    readLinks();
    var id = null;
    function handler() {
      if (pending.length) {
        cancelAnimationFrame(id);
        id = requestAnimationFrame(checkForPending);
      } else {
        // detatch the scroll handler
      }
    }
    docElem.addEventListener('scroll', handler, true);
    window.addEventListener('scroll', handler, true);
  }

  return embeds.init = init;

});