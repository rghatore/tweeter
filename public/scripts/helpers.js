// Safe HTML escape function
const escape = (text) => {
  let element = document.createElement('div');
  let content = document.createTextNode(text);
  element.appendChild(content);
  return element.innerHTML;
};

// this function returns how many days ago the tweet was posted
// or returns hours < 1 day or returns minutes < 1 hour
const timePosted = (time) => {
  const milliseconds = Date.now() - time; // in milliseconds
  const minutesPassed = Math.floor((milliseconds / 1000) / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);
  const yearsPassed = Math.floor(daysPassed / 365);
  if (minutesPassed < 1) {
    return "a few moments ago";
  } else if (minutesPassed < 60) {
    return `${minutesPassed} minute${ (minutesPassed !== 1) ? 's' : '' } ago`;
  } else if (hoursPassed < 24) {
    return `${hoursPassed} hour${ (hoursPassed !== 1) ? 's' : '' } ago`;
  } else if (daysPassed < 365) {
    return `${daysPassed} day${ (daysPassed !== 1) ? 's' : '' } ago`;
  } else {
    return `${yearsPassed} year${ (yearsPassed !== 1) ? 's' : '' } ago`;
  }
};

// this function creates an html article for saved tweets
const createTweetElement = (tweet) => {
  let output = "";
  output += `<article class="tweet">`;
  output += `<header>`;
  output += `<div class="avatar">`;
  output += `<img src="${escape(tweet.user.avatars)}">`;
  output += `<p>${escape(tweet.user.name)}</p>`;
  output += `</div>`;
  output += `<p class="handle">${escape(tweet.user.handle)}</p>`;
  output += `</header>`;
  output += `<p class="content">${escape(tweet.content.text)}</p>`;
  output += `<footer>`;
  output += `<date>${timePosted(tweet.created_at)}</date>`;
  output += `<span class="icons">`;
  output += `<i class="fas fa-flag"></i>`;
  output += `<i class="fas fa-retweet"></i>`;
  output += `<i class="fas fa-heart"></i>`;
  output += `</span>`;
  output += `</footer></article>`;

  return output;
};

const renderTweets = (tweets) => {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetBox = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.container .tweets').prepend(tweetBox);
  }
};