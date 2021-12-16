$(document).ready(function() {

    // Updating counter based on text input
    const $tweetText = $('#tweet-text');
    $tweetText.on('input', function () {
        const input = $tweetText.val();
        // Using jquery to get counter element
        const $counter = $('#counter');

        // Making counter appear red or not
        if (input.length > 140) {
            $counter.addClass('red-text')
        } else {
            $counter.removeClass('red-text')
        };
        $counter.html(140 - input.length);
    });
});

