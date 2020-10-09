/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // create a span for errors to be shown above the form
  $(`<span></span>`).insertBefore('.container .new-tweet form');
  $('.container .new-tweet span').hide();

  // submitting new tweets using Ajax POST request to the server
  $('.container .new-tweet form').submit((event) => {

    event.preventDefault();
    // form validation
    const textLength = $('#tweet-text').val().length;
    console.log(textLength);
    if (textLength <= 0) {
      // add error message to html and slidedown
      const message = 'Please note that empty tweets are not allowed.';
      $('.container .new-tweet span').html(message);
      $('.container .new-tweet span').slideDown();
    } else if (textLength > 140) {
      // add error message to html and slidedown
      const message = 'Please note that the tweet exceeds the character limit.';
      $('.container .new-tweet span').html(message);
      $('.container .new-tweet span').slideDown();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(event.target).serialize()
      }).then(() => {
        $('.container .new-tweet span').hide();  // hide the error message
        $('#tweet-text').val("");  // empty the textarea
        $('.new-tweet form div .counter').val(140);  // set counter back to 140
        loadTweets();
      });
    }
  });

  // load tweets using ajax get request
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((tweets) => {
      $('.tweets .tweet').remove();
      renderTweets(tweets);
    });
  };
  
  // default page with saved tweets
  loadTweets();

});