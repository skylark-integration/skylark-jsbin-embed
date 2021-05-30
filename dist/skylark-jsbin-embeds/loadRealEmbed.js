/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds","./hookMessaging"],function(e,t){return embed.loadRealEmbed=function(e){var d=e.cloneNode(),n=d.getAttribute("data-url");d.src=n.split("&")[0],d._src=n.split("&")[0],e.parentNode.replaceChild(d,e),t(d)}});
//# sourceMappingURL=sourcemaps/loadRealEmbed.js.map
