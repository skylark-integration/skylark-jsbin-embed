/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["skylark-langx-urls/getQuery","./embeds","./inview","./hookMessaging"],function(e,t,i,s){"use strict";return t.embed=function(t){var r=document.createElement("iframe"),a=t.href.replace(/edit/,"embed");r.className=t.className,r.id=t.id,r.style.border="1px solid #aaa";var d=e(t.search);r.style.width=d.width||"100%",r.style.minHeight=d.height||"300px",d.height&&(r.style.maxHeight=d.height),i(t,100)?(r.src=a.split("&")[0],r._src=a.split("&")[0],s(r)):(r.setAttribute("data-url",a),r.src="https://jsbin.com/embed-holding",pending.push(r)),t.parentNode.replaceChild(r,t)}});
//# sourceMappingURL=sourcemaps/embed.js.map
