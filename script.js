const quoteConatainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading Spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteConatainer.hidden = true;
}

// Hide Loading Spinner
function hideLoadingSpinner() {
    quoteConatainer.hidden = false;
    loader.hidden = true;
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        let author = `${apiQuotes[0].bookname} ${apiQuotes[0].chapter}:${apiQuotes[0].verse} `;
        authorText.textContent = author;

        // Check Quote length to determine styling 
        if (apiQuotes[0].text.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.textContent = apiQuotes[0].text;
        hideLoadingSpinner();
       
    } catch (error) {
        console.log("whoops, there is no quote...", error);
        alert("whoops, there is no quote...")
        // Catch Error Here
    }
}

// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();