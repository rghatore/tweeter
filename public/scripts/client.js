/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

const createTweetElement = (tweet) => {
  let output = "";
  output += `<article class = "tweet">`
  output += `<header>`
  output += `<p>${tweet.user.name}</p>`
  output += `<p class="handle">${tweet.user.handle}</p>`
  output += `</header>`
  output += `<p class="content">${tweet.content.text}</p>`
  output += `<footer>`
  output += `<date>${tweet.created_at}</date>`
  output += `<button>buttons</button>`
  output += `</footer></article>`

  // const $tweet = $(`<article class="tweet">
  //                     <header>
  //                       <p>${tweet.user.name}</p>
  //                       <p id="user-id">${tweet.user.handle}</p>
  //                     </header>
  //                     <p>${tweet.content.text}</p>
  //                     <footer>
  //                       <date>${tweet.created_at}</date>
  //                       <button>buttons</button>
  //                     </footer>`);

  // return $tweet;
  return output;
}

const renderTweets = (tweets) => {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetBox = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.container .tweets').prepend(tweetBox);
  }
}




// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(() => {
  
  // const $tweet = createTweetElement(tweetData);
  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('.container .tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
  // renderTweets(data);

  // submitting new tweets using Ajax POST request to the server
  $('.container .new-tweet form').submit((event) => {

    event.preventDefault();
    // form validation
    const textLength = $('#tweet-text').val().length;
    console.log(textLength);
    if (textLength <= 0) {
      alert('Please note that empty tweets are not allowed.')
    } else if (textLength > 140) {
      alert('Please note that the tweet exceeds the character limit.')
    } else {
      // console.log(event);
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(event.target).serialize()
      }).then(() => {
        // console.log(text);
        $('.tweets .tweet').remove();
        // console.log($('.tweets'));
        loadTweets();
      })
    }
  })
  
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((tweets) => {
      // console.log(tweets);
      renderTweets(tweets);
    })
  }
      
  loadTweets();

})
