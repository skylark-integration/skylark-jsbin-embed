/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-jsbin-embeds/jsbin',[
	"skylark-langx-ns"
],function(skylark){
	var jsbin =  skylark.attach("intg.jsbin");

	return jsbin;
});
define('skylark-jsbin-embeds/embeds',[
	"./jsbin"
],function(jsbin){
	return jsbin.embeds = {};
});
define('skylark-jsbin-embeds/embed',[
  "skylark-domx-iframes",
  "./embeds"
],function(iframes,embeds){
  'use strict';
  
  /*
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
  */

  return embeds.embed = iframes.replace;
});
define('skylark-jsbin-embeds/findCode',[
  "./embeds"
],function(embeds){
  'use strict';

  // ---- here begins the jsbin embed - based on the embedding doc: https://github.com/jsbin/jsbin/blob/master/docs/embedding.md

  var innerText = document.createElement('i').innerText === undefined ? 'textContent' : 'innerText';


  function findCodeInParent(element) {
    var match = element;

    while (match = match.previousSibling) { // jshint ignore:line
      if (match.nodeName === 'PRE') {
        break;
      }
      if (match.getElementsByTagName) {
        match = match.getElementsByTagName('pre');
        if (match.length) {
          match = match[0]; // only grabs the first
          break;
        }
      }
    }

    if (match) {
      return match;
    }

    match = element.parentNode.getElementsByTagName('pre');

    if (!match.length) {
      if (element.parentNode) {
        return findCodeInParent(element.parentNode);
      } else {
        return null;
      }
    }

    return match[0];
  }

  function findCode(link) {
    var rel = link.rel,
        element,
        code;

    if (rel && (element = document.getElementById(rel.substring(1)))) {
      code = element[innerText];
    // else - try to support multiple targets for each panel...
    // } else if (query.indexOf('=') !== -1) {
    //   // assumes one of the panels points to an ID
    //   query.replace(/([^,=]*)=([^,=]*)/g, function (all, key, value) {
    //     code = document.getElementById(value.substring(1))[innerText];

    //   });
    } else {
      // go looking through it's parents
      element = findCodeInParent(link);
      if (element) {
        code = element[innerText];
      }
    }

    return code;
  }

  return embeds.findCode = findCode;

});
define('skylark-jsbin-embeds/hookMessaging',[
  "skylark-domx-iframes",
  "./embeds"
],function(iframes,embeds){
  'use strict';
  /*
  function hookMessaging(iframe) {
    var onmessage = function (event) {
      if (!event) { event = window.event; }
      // * 1 to coerse to number, and + 2 to compensate for border
      iframe.style.height = (event.data.height * 1 + 2) + 'px';
    };

    window.addEventListener('message', onmessage);
  }
  */

  return embeds.hookMessaging = iframes.hookSizing;

});
define('skylark-jsbin-embeds/inview',[
  "skylark-domx-geom",
  "./embeds"
],function(geom,embeds){
  'use strict';

  /*
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
  */
  return embeds.inview = geom.inview;
});
define('skylark-jsbin-embeds/loadRealEmbed',[
  "skylark-domx-iframes",
  "./embeds"
],function(iframes,embeds){

  /*
  function loadRealEmbed(iframe) {
    var clone = iframe.cloneNode();
    var url = clone.getAttribute('data-url');

    clone.src = url.split('&')[0];
    clone._src = url.split('&')[0]; // support for google slide embed
    iframe.parentNode.replaceChild(clone, iframe);
    hookMessaging(clone);
  }
  */
  return embed.loadRealEmbed = iframes.loadReal;  
});
define('skylark-jsbin-embeds/scoop',[
  "./embeds"
],function(embeds){

  function detectLanguage(code) {
    var htmlcount = (code.split('<').length - 1),
        csscount = (code.split('{').length - 1),
        jscount = (code.split('.').length - 1);

    if (htmlcount > csscount && htmlcount > jscount) {
      return 'html';
    } else if (csscount > htmlcount && csscount > jscount) {
      return 'css';
    } else {
      return 'javascript';
    }
  }


  function scoop(link) {
    var code = findCode(link),
        language = detectLanguage(code),
        query = link.search.substring(1);

    if (language === 'html' && code.toLowerCase().indexOf('<html') === -1) {
      // assume this is an HTML fragment - so try to insert in the %code% position
      language = 'code';
    }

    if (query.indexOf(language) === -1) {
      query += ',' + language + '=' + encodeURIComponent(code);
    } else {
      query = query.replace(language, language + '=' + encodeURIComponent(code));
    }

    link.search = '?' + query;
  }

  return embeds.scoop = scoop;
});
define('skylark-jsbin-embeds/init',[
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

  /*
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
  */
  return embeds.init = init;

});
define('skylark-jsbin-embeds/main',[
	"./embeds",
	"./embed",
	"./findCode",
	"./hookMessaging",
	"./inview",
	"./loadRealEmbed",
	"./scoop",
	"./init"
],function(embeds){
	return embeds;
});
define('skylark-jsbin-embeds', ['skylark-jsbin-embeds/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-jsbin-embeds.js.map
