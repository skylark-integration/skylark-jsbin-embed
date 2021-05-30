/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds"],function(e){"use strict";return e.hookMessaging=function(e){window.addEventListener("message",function(n){n||(n=window.event),e.style.height=1*n.data.height+2+"px"})}});
//# sourceMappingURL=sourcemaps/hookMessaging.js.map
