/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // escape function for xss security
  const escape =  function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creating tweet element
  const createTweetElement = function(tweetObj) {
    const userInfo = tweetObj.user;
    const content = tweetObj.content.text;
    const timeStamp = tweetObj.created_at;
    const tweetBody = `<article class="tweet">
            <header>
            <div class="profileAndName">
              <img src=${userInfo.avatars}>
              <Span>${userInfo.name}</span>
            </div>
            <span id="username">${userInfo.handle}</span>
          </header>
          <p>
            ${escape(content)}
          </p>
          <footer>
            <span>${time2TimeAgo(timeStamp)}</span>
            <div class="userAction">
              <img src="/images/like.png" width="20px" height="20px">
              <img src="/images/retweet.png" width="20px" height="20px">
              <img src="/images/flag.png" width="20px" height="20px">
            </div>
          </footer> 
        </article>`;
    return tweetBody;
  };


   // load tweet function
   const loadtweets = function() {
    $("#tweetContainer").empty();
    // ajax GET request
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };