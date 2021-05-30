define([
  "./embeds"
],function(embeds){
  'use strict';

  var docElem = document && document.documentElement;

  function viewportW() {
    var a = docElem.clientWidth;
    var b = window.innerWidth;
    return a < b ? b : a;
  }

  function viewportH() {
    var a = docElem.clientHeight;
    var b = window.innerHeight;
    return a < b ? a : b;
  }

  function calibrate(coords, cushion) {
    var o = {};
    cushion = +cushion || 0;
    o.width = (o.right = coords.right + cushion) - (o.left = coords.left - cushion);
    o.height = (o.bottom = coords.bottom + cushion) - (o.top = coords.top - cushion);
    return o;
  }

  function inview(el, cushion) {
    var r = calibrate(el.getBoundingClientRect(), cushion);
    return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();
  }

  return embeds.inview = inview;
});