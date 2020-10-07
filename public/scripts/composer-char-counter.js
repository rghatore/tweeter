$(document).ready(() => {
  console.log("Document is ready!");
  $(".new-tweet #tweet-text").on('input', function(event) {
    // console.log('Keydown: ', event);
    // console.log(event.ctrlKey);
    // console.log(event.altKey);
    // console.log(event.shiftKey);
    // console.log(event.metaKey);
    // console.log(this);
    // console.log($('.new-tweet #tweet-text').val());
    // console.log($(this).val());
    let tweetLength = $(this).val().length;
    const limit = 140;
    // console.log('tweetLength: ', tweetLength);
    // console.log($(this).parent().find(".counter").val());
    let counter = $(this).parent().find(".counter");
    // console.log('counter value: ', counter.val());
    let remaining = limit - tweetLength;
    // console.log('remaining :', remaining);
    counter.val(remaining);

    // change counter colour to red if text is over limit
    if (remaining < 0) {
      counter.css( {"color": "red"})
    } else {
      counter.css( {"color": "black"})
    }

  })
})