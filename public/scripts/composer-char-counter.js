// event handler on input in the textarea
// keeps count of characters remaining based on a limit (140)

$(document).ready(() => {
  console.log("Document is ready!");
  $(".new-tweet #tweet-text").on('input', function(event) {
    let tweetLength = $(this).val().length;
    const limit = 140;
    let $counter = $(this).parent().find(".counter");
    let remaining = limit - tweetLength;
    $counter.val(remaining);
    if (remaining < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }

  });
});