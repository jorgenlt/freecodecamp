const quotes = {
    1: {
        author: 'Eleanor Roosevelt',
        quote: 'Remember no one can make you feel inferior without your consent.'
    },
    2: {
        author: 'Latin Proverb',
        quote: 'If the wind will not serve, take to the oars.'
    },
    3: {
        author: 'Oprah Winfrey',
        quote: 'If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.'
    },
    4: {
        author: 'Kevin Kruse',
        quote: 'Life isn’t about getting and having, it’s about giving and being.'
    },
    5: {
        author: 'Gloria Steinem',
        quote: 'Dreaming, after all, is a form of planning.'
    },
    6: {
        author: 'Kevin Kruse',
        quote: 'We must balance conspicuous consumption with conscious capitalism.'
    },
    7: {
        author: 'Vince Lombardi',
        quote: 'Winning isn’t everything, but wanting to win is.'
    },
    8: {
        author: 'Chinese Proverb',
        quote: 'The best time to plant a tree was 20 years ago. The second best time is now.'
    },
    9: {
        author: 'Bob Dylan',
        quote: 'What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.'
    },
    10: {
        author: 'Pablo Picasso',
        quote: 'Every child is an artist. The problem is how to remain an artist once he grows up.'
    },
}

const randNum = toNum => Math.floor(Math.random() * toNum) + 1;

let author = document.querySelector('#author');
let text = document.querySelector('#text');
let tweetQuote = document.querySelector('#tweet-quote');

const newQuoteBtn = document.querySelector('#new-quote');

const getNewQuote = () => {
    const randomNumber = randNum(10);
    const newAuthor = quotes[`${randomNumber}`].author;
    const newQuote = quotes[`${randomNumber}`].quote;
    const newTwitterLink = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${newQuote.split(' ').join('%20')}`;
    
    author.innerHTML = newAuthor;
    text.innerHTML = newQuote;
    tweetQuote.setAttribute('href', newTwitterLink);
};

newQuoteBtn.addEventListener('click', () => getNewQuote());

window.addEventListener("load", () => getNewQuote());

