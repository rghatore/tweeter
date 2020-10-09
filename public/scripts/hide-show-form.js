$(document).ready(() => {
  
  $('.new-tweet form').hide(); 
  let click = 1;
  
  $('nav .extra img, nav .extra p').click(() => {
    if(click % 2 !== 0) {
      $('.new-tweet form').slideDown();
      $('.new-tweet #tweet-text').focus();
      click++;
    } else if(click % 2 === 0) {
      $('.new-tweet form').hide(); 
      click++;
    }
  })

});