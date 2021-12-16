/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Runs when all HTML elements have been loaded in
$(document).ready(function () {
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
        $('.all-tweets').html('');
        for (const tweet of tweets) {
            let $tweet = createTweetElement(tweet);
            // Using jquery to prepend tweets into the relevant section
            $('.all-tweets').prepend($tweet)
        };

        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
    };


    // Test / driver code (temporary). Eventually will get this from the server.
    const tweetData = [{
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    }]

    renderTweets(tweetData);

});