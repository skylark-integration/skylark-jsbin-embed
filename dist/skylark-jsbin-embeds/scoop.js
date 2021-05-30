/**
 * skylark-jsbin-embeds - A version of jsbin-embed that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-embeds/
 * @license MIT
 */
define(["./embeds"],function(e){return e.scoop=function(e){var n=findCode(e),t=function(e){var n=e.split("<").length-1,t=e.split("{").length-1,o=e.split(".").length-1;return n>t&&n>o?"html":t>n&&t>o?"css":"javascript"}(n),o=e.search.substring(1);"html"===t&&-1===n.toLowerCase().indexOf("<html")&&(t="code"),-1===o.indexOf(t)?o+=","+t+"="+encodeURIComponent(n):o=o.replace(t,t+"="+encodeURIComponent(n)),e.search="?"+o}});
//# sourceMappingURL=sourcemaps/scoop.js.map
