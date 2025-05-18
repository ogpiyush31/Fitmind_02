const Sentiment = require('sentiment');

module.exports = function analyzeSentiment(text) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);

    return {
        polarity: result.score,
        subjectivity: result.comparative
    };
};
;
