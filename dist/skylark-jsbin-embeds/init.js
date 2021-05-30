/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds","./embed","./scoop","./inview","./loadRealEmbed"],function(e,n,i,t,a){"use strict";var s=document&&document.documentElement;function r(){for(var e=function(){var e,n,i=[],t=0;for(n=(e=document.getElementsByTagName("a")).length;t<n;t++)-1!==(" "+e[t].className).indexOf(" jsbin-")&&i.push(e[t]);return i}(),t=0,a=e.length,s="";t<a;t++)-1!==(s=" "+e[t].className+" ").indexOf(" jsbin-scoop ")?i(e[t]):-1!==s.indexOf(" jsbin-embed ")&&(e[t].className=e[t].className.replace(/jsbin\-embed/,""),n(e[t]))}function o(){var e=0,n=[];for(e=0;e<c.length;e++)t(c[e],400)&&n.unshift({iframe:c[e],i:e});for(e=0;e<n.length;e++)c.splice(n[e].i,1),a(n[e].iframe)}var c=[];return e.init=function(){r();var e=null;function n(){c.length&&(cancelAnimationFrame(e),e=requestAnimationFrame(o))}s.addEventListener("scroll",n,!0),window.addEventListener("scroll",n,!0)}});
//# sourceMappingURL=sourcemaps/init.js.map
