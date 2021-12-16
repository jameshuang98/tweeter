/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Runs when all HTML elements have been loaded in
$(document).ready(function () {

    $('#tweet-form').submit(function(event) {
        event.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: 'http://localhost:8080/tweets',
            method:'POST',
            data: data
        })
        .then((response) => {
            console.log("data was posted")
        })
        .catch((error) => {
            console.log(error)
        });
    });

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
                <p class="tweet-body">${tweet.content.text}</p>
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
    }

    // Rendering tweets loaded in from an array of tweets
    const renderTweets = function (tweets) {
        // clearing the .all-tweets section between rendering the array of tweets
        $('.all-tweets').html('');
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        for (const tweet of tweets) {
            let $tweet = createTweetElement(tweet);
            // Using jquery to prepend tweets into the relevant section
            $('.all-tweets').prepend($tweet)
        };
    };

    // Implementing function to make an AJAX GET request and run renderTweets using the JSON response
    const loadTweets = function() {
        $.ajax('http://localhost:8080/tweets', { method:'GET'})
            .then(function(tweets) {
                renderTweets(tweets)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadTweets();


    // // Test / driver code (temporary). Eventually will get this from the server.
    // const tweetData = [{
    //     "user": {
    //         "name": "Newton",
    //         "avatars": "https://i.imgur.com/73hZDYK.png",
    //         "handle": "@SirIsaac"
    //     },
    //     "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //     },
    //     "created_at": 1461116232227
    // }]

    // renderTweets(tweetData);

});