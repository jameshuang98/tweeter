/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Runs when all HTML elements have been loaded in
$(document).ready(function() {

  // Making the Tweet Form toggable
  $(".nav-bar").on('click', function() {
    $(".new-tweet").slideToggle();
  });


  // Initializing variable for error message tag
  const $errorContainer = $("#error-message");
  $errorContainer.hide();

  // Event handler for tweet submission
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const $tweetText = $('#tweet-text');
    const $counter = $('#counter');
    const input = $tweetText.val();

    // form validation for tweets over 140 characters or 0 characters
    if (input.length > 140) {
      $errorContainer.text("Tweet cannot be over 140 characters!");
      $errorContainer.slideDown();
    } else if (input.length === 0) {
      $errorContainer.text("Tweet cannot be empty!");
      $errorContainer.slideDown();
    } else {
      $errorContainer.slideUp();

      let $data = $(this).serialize();
      // AJAX post request to /tweets/
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method:'POST',
        data: $data
      })
        .then((response) => {
          loadTweets();
          // Resetting form and character counter
          $tweetText.val('');
          $counter.html(140);
        })
        .catch((error) => {
          const message = (error.responseJSON && error.responseJSON.error) || error.statusText;
          $errorContainer.text(message);
          $errorContainer.slideDown();
          console.log(error);
        });
    }
  });

  // Creating HTML article element with tweet data
  const createTweetElement = (tweet) => {
    const $tweet = $(`
            <article>
                <header class="tweet-head">
                    <div class="left-header">
                        <img src="${tweet.user.avatars}" alt="male avatar" width="50" height="50"> 
                        <div class="tweet-author">${tweet.user.name}</div>
                    </div>
                    <div class="username">${tweet.user.handle}</div>
                </header>
                <p class="tweet-body">${escape(tweet.content.text)}</p>
                <footer class="tweet-foot">
                    <div class="time-ago">${timeago.format(tweet.created_at)}</div>
                    <div>
                        <i class="fas fa-thumbs-up"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                    </div>
                </footer>
            </article>`);
    return $tweet;
  };

  // Rendering tweets loaded in from an array of tweets
  const renderTweets = function(tweets) {

    // clearing the .all-tweets section between rendering the array of tweets
    $('.all-tweets').html('');

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      // Using jquery to prepend tweets into the relevant section
      $('.all-tweets').prepend($tweet);
    }
  };

  // Implementing function to make an AJAX GET request and run renderTweets using the JSON response
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method:'GET'})
      .then(function(tweets) {
        renderTweets(tweets);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Helper function that escapes text
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
});