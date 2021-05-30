/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds"],function(e){"use strict";var n=void 0===document.createElement("i").innerText?"textContent":"innerText";return e.findCode=function(e){var t,r,a=e.rel;return a&&(t=document.getElementById(a.substring(1)))?r=t[n]:(t=function e(n){for(var t=n;(t=t.previousSibling)&&"PRE"!==t.nodeName;)if(t.getElementsByTagName&&(t=t.getElementsByTagName("pre")).length){t=t[0];break}return t||((t=n.parentNode.getElementsByTagName("pre")).length?t[0]:n.parentNode?e(n.parentNode):null)}(e))&&(r=t[n]),r}});
//# sourceMappingURL=sourcemaps/findCode.js.map
