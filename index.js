/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/


const gamesContainer = document.getElementById("games-container");


function addGamesToPage(games) {
    for (let game of games) {
        
        const gameCard = document.createElement('div');

        
        gameCard.classList.add('game-card');

        
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        
        gamesContainer.appendChild(gameCard);
    }
}


addGamesToPage(GAMES_JSON);



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/


const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers; // add the number of backers for each game
}, 0);


contributionsCard.innerHTML = totalContributions.toLocaleString();








const raisedCard = document.getElementById("total-raised");


const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged; 
}, 0);


raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;





const gamesCard = document.getElementById("num-games");


const totalGames = GAMES_JSON.length;


gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);


   
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

   
    addGamesToPage(unfundedGames);

    


   

}


function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    
    addGamesToPage(fundedGames);
    

   
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

     // add all games from the JSON data to the DOM
     addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners for each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


document.addEventListener("DOMContentLoaded", function() {
    const firstGameContainer = document.getElementById("first-game");
    const secondGameContainer = document.getElementById("second-game");

    
    const sortedGames = GAMES_JSON.sort((item1, item2) => {
        return item2.pledged - item1.pledged;
    });

    // Use destructuring and spread operator to grab the first and second games
    const [firstGame, secondGame, ...restOfTheGames] = sortedGames;

    // Create a new element for the first game and append it to the firstGameContainer
    const firstGameElement = document.createElement("p");
    firstGameElement.textContent = `Top Funded Game: ${firstGame.name}`; 
    firstGameContainer.appendChild(firstGameElement);  

    // Create a new element for the second game and append it to the secondGameContainer
    const secondGameElement = document.createElement("p");
    secondGameElement.textContent = `Runner Up: ${secondGame.name}`;  
    secondGameContainer.appendChild(secondGameElement); 
});

