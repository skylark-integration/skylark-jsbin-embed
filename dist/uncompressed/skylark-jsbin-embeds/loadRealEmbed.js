define([
  "./embeds",
  "./hookMessaging"
],function(embeds,hookMessaging){

  function loadRealEmbed(iframe) {
    var clone = iframe.cloneNode();
    var url = clone.getAttribute('data-url');

    clone.src = url.split('&')[0];
    clone._src = url.split('&')[0]; // support for google slide embed
    iframe.parentNode.replaceChild(clone, iframe);
    hookMessaging(clone);
  }

  return embed.loadRealEmbed = loadRealEmbed;  
});