/**
 * BBB = Big Brother Buster
 * @version 1.9
 */

javascript: (function() {
  // classify the hyperlink
  var mobile = window.location.href;
  var desktop;
  var m;
  var s;
  // facebook
  if (mobile.includes("facebook.com")) {
    // facebook 01 story.php and permalink.php -> posts/
    if ((m = mobile.match(/(?:story|permalink)\.php.+\bstory_fbid=(\d+).+\bid=(\d+)/)) != null) {
      // eg. story.php?story_fbid=<post>&id=<user|page>
      desktop = "https://facebook.com/" + m[2] + "/posts/" + m[1];
        /* /posts/FBID is better than /FBID directly.
         * /posts/FBID stays in the post itself, but
         * /FBID redirects to theater mode / video player. */
        /* another scheme is "permalink.php", but "posts" is shorter */
    // facebook 02 photos/ -> posts/
    } else if ((m = mobile.match(/([\w.]+?)\/photos\/(?:a|pcb|gm)\.(\d+)\/(\d+)/)) != null) {
      // eg. <page-name>/photos/a.<album>/<photo>
      // eg. <page-name>/photos/pcb.<set-post>/<photo>
      // eg. <page-name>/photos/gm.<set-group>/<photo>
      desktop = "https://facebook.com/" + m[1] + "/posts/" + m[3];
    // facebook 03 photo.php with user/page id -> posts/
    // similar to facebook 01
    } else if ((m = mobile.match(/photo\.php.+\bfbid=(\d+).+\bid=(\d+)/)) != null) {
      // eg. photo.php?fbid=<photo>&id=<user|page>&set=pcb.<set-post>
      /* appears only in mobile browsers */
      desktop = "https://facebook.com/" + m[2] + "/posts/" + m[1];
    // facebook 04 photo.php without user/page id -> /FBID
    } else if ((m = mobile.match(/photo\.php.+\bfbid=(\d+).+\bset=(?:pcb|gm)\.(\d+)/)) != null) {
      // eg. photo.php?fbid=<photo>&set=pcb.<set-post>
      // eg. photo.php?fbid=<photo>&set=gm.<set-group>
      desktop = "https://facebook.com/" + m[2];
        // exclude set=a.<album> sincee it redirects to theater mode
    // facebook 05 view=permalink -> /FBID
    } else if ((m = mobile.match(/(?:groups|events).+\b(\d+).+\bview=permalink.+\bid=(\d+)/)) != null) {
      // eg. groups/<group>?view=permalink&id=<post>
      // eg. events/<event>?view=permalink&id=<post>
      desktop = "https://facebook.com/" + m[2];
    } else if (mobile.includes(s = "m.facebook.com")) {
      desktop = mobile.replace(s, s.replace("m.", "www."));
    }
  // case 01 // m. -> www.
  } else if ((m = mobile.match(/(.*)m\.((?:appledaily|cna|imdb|mobile01)\.(?:com).*)/)) != null) {
    desktop = m[1] + "www." + m[2];
  // case 02 // m. -> ""
  } else if ((m = mobile.match(/(.*)m\.(news\.(?:ebc|sina)\.(?:net|com))/) || mobile.match(/(.*)m\.((?:wikipedia)\.(?:org).*)/)) != null) {
    desktop = m[1] + m[2];
  // case 03 // m/ -> ""
  } else if (mobile.includes(s = "ltn.com.tw/m/news")) {
    desktop = mobile.replace(s, s.replace("m/", ""));
  // case 04 // m. -> news.
  } else if (mobile.includes(s = "m.ltn.com.tw/news")) {
    desktop = mobile.replace(s, s.replace("m.", "news."));
  // nownews
  } else if (mobile.includes(s = "https://m.nownews.com/news")) {
    desktop = mobile.replace(s, "http://www.nownews.com/n/1970/01/01");
  // douban movie
  } else if ((m = mobile.match(/(.*)m(\.douban\.com\/)(movie)\/(.*)/)) != null) {
    desktop = m[1] + m[3] + m[2] + m[4];
  }
  // redirect to desktop
  if (desktop !== undefined) {
    window.location.href = desktop;
  }
})();

/**
 * changelog
 *
 * @version 1.9 2018-09-05
 * + Supports Facebook permalink.php.
 * x Can leave Facebook photo.php theater mode if URL contains user/page ID.
 * x Now handles m.facebook.com correctly due to a change @since 1.8.
 *
 * @version 1.8 2018-09-04
 * x Support Facebook story.php new photo set FBID format.
 * - Cannot leave Facebook photo.php theater mode anymore due to URL change.
 * + Support Facebook view=permalink posts.
 *
 * @version 1.7 2018-07-28
 * x Declares local variables explicitly.
 *
 * @version 1.6 2018-06-18
 * + Support mobile01.com.
 *
 * @version 1.5 2018-06-13
 * + Support wikipedia.org.
 * + Add comments.
 * x Rewrite whole function for easier import to other projects.
 *
 * @version 1.4 2017-08-03
 * + Support imdb.com.
 *
 * @version 1.3 2017-06-03
 * + Support appledaily.com, douban.com, ebc.net, ltn.com, nownews.com, news.sina.com.
 *
 * @version 1.2 2017-02-04
 * + Support photo.php from groups with set = pcb. or gm.
 * x Redirect when matches only.
 * x Combine story.php and photo.php.
 * x Force id to be preceded by a word boundary.
 *
 * @version 1.1 2017-02-04
 * + Support photos/.
 * x Separate individual cases of story.php, photo.php, and photos/.
 * x Can leave photo.php theater mode.
 *
 * @version 1.0 2017-02-03
 * + Support story.php and photo.php using FBID.
 *
 * @version 0.1 2016-12-03
 */
