define([
  "skylark-langx-urls/getQuery",
  "./embeds",
  "./inview",
  "./hookMessaging"
],function(getQuery,embeds,inview,hookMessaging){
  'use strict';
  
  function embed(link) {
    var iframe = document.createElement('iframe');
    var url = link.href.replace(/edit/, 'embed');

    iframe.className = link.className; // inherit all the classes from the link
    iframe.id = link.id; // also inherit, giving more style control to the user
    iframe.style.border = '1px solid #aaa';

    var query = getQuery(link.search);
    iframe.style.width = query.width || '100%';
    iframe.style.minHeight = query.height || '300px';
    if (query.height) {
      iframe.style.maxHeight = query.height;
    }

    // track when it comes into view and reload
    if (inview(link, 100)) {
      // the iframe is full view, let's render it
      iframe.src = url.split('&')[0];
      iframe._src = url.split('&')[0]; // support for google slide embed
      hookMessaging(iframe);
    } else {
      iframe.setAttribute('data-url', url);
      iframe.src = 'https://jsbin.com/embed-holding';

      pending.push(iframe);
    }

    link.parentNode.replaceChild(iframe, link);
  }

  return embeds.embed = embed;
});