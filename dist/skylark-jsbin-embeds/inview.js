/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds"],function(t){"use strict";var n=document&&document.documentElement;return t.inview=function(t,e){var i,o,r=function(t,n){var e={};return n=+n||0,e.width=(e.right=t.right+n)-(e.left=t.left-n),e.height=(e.bottom=t.bottom+n)-(e.top=t.top-n),e}(t.getBoundingClientRect(),e);return!!r&&r.bottom>=0&&r.right>=0&&r.top<=(i=n.clientHeight,o=window.innerHeight,i<o?i:o)&&r.left<=function(){var t=n.clientWidth,e=window.innerWidth;return t<e?e:t}()}});
//# sourceMappingURL=sourcemaps/inview.js.map
