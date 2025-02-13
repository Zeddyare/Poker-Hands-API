// Question 1: 
/* Using the Deck of Cards API (https://deckofcardsapi.com/), use a demonstrated method of AJAX data retrieval to retrieve a deck of cards that can be used by the application. Be sure to store the returned data in an appropriate way.*/ 

//Question 2:
/* Using the deck that was retrieved in REQ-001, ask the API for a hand of five cards from the deck. Store the given cards in an appropriate manner in your code so that you can evaluate its contents. */

//Question 3:
/* Display the cards in some manner that can be seen in the browser. This can be done by either
	
1)	Displaying the cards names in some manner using document.write to the web page
2)	Displaying the images of the cards on the web page by modifying the DOM. (ie Manipulate img tags defined on the page)
 */

//Question 4:
/* Write a function that will determine and output the highest poker hand based on the given five cards:
Hand rankings can be found here: https://www.cardplayer.com/rules-of-poker/hand-rankings
or here: https://www.unibet.com/poker/guides/poker-hand-rankings-with-cheat-sheet-1.784253
 */

//Question 5:
/* In order for the entire application to be contained within its own scope and to not pollute the global scope, wrap the entire contents of the file in an Independently Invoked Function Expression (IIFE) or Equivalent routine and be prepared to demonstrate how your script’s data is contained within its own local scope and not within the browser’s global scope (window). */

//Hand Rankings and Cards
//Royal Flush: 10, J, Q, K, A all of the same suit
//Straight Flush: Five cards in a sequence, all of the same suit
//Four of a Kind: Four cards of the same rank
//Full House: Three of a kind with a pair
//Flush: All cards of the same suit
//Straight: Five cards in a sequence
//Three of a Kind: Three cards of the same rank
//Two Pair: Two different pairs
//One Pair: Two cards of the same rank
//High Card: Highest card in hand

//IIFE 
(() => {

    const royalFlush = "https://prog2700.onrender.com/pokerhandtest/royalflush";
    const straightFlush = "https://prog2700.onrender.com/pokerhandtest/straightflush";
    const fourOfAKind = "https://prog2700.onrender.com/pokerhandtest/fourofakind";
    const fullHouse = "https://prog2700.onrender.com/pokerhandtest/fullhouse";
    const flush = "https://prog2700.onrender.com/pokerhandtest/flush";
    const straight = "https://prog2700.onrender.com/pokerhandtest/straight";
    const threeOfAKind = "https://prog2700.onrender.com/pokerhandtest/threeofakind";
    const twoPair = "https://prog2700.onrender.com/pokerhandtest/twopair";
    const onePair = "https://prog2700.onrender.com/pokerhandtest/onepair";
    const highCard = "https://prog2700.onrender.com/pokerhandtest/highcard";
    const randomHand = "https://prog2700.onrender.com/pokerhandtest/random";

    const turnAbsoluteValues = (values) => {
        switch (values) {
            case "JACK":
                return 11;
            case "QUEEN":
                return 12;
            case "KING":
                return 13;
            case "ACE":
                return 1;
            default:
                return parseInt(values);
        }
    }
    

    const isRoyalFlush = (values) => {
        let result = true;
        values = values.sort();
        let royalValues = ["10", "JACK", "QUEEN", "KING", "ACE"];
        royalValues.sort();
        for (let i = 0; i < values.length; i++) {
            if (values[i] !== royalValues[i]) {
                result = false;
            }
        }
        return result;
    }

    const isStraightFlush = (values) => {
        let result = true;
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] + 1 !== values[i + 1]) {
                result = false;
            }
        }
        return result; 
    }

    const bestHand = (hand) => {
        let suits = hand.cards.map(card => card.suit)
        console.log(suits);
        let values = hand.cards.map(card => card.value)
        console.log(values);
        let allSameSuit = suits.every(suit => suit === suits[0]);
        if (allSameSuit == true && isRoyalFlush(values) == true) {
                return "Royal Flush"; 
        } else if (allSameSuit == true && isRoyalFlush(values) == false){
            values = values.map(turnAbsoluteValues);
            values.sort((a, b) => a - b); //sort parameter found on W3Schools, don't fully understand how it works but it does :D
            console.log(values);
            if (isStraightFlush(values) == true) {
                return "Straight Flush";
            }
            else {
                return "Flush";
            }
        } else if (allSameSuit == false) {
            values = values.map(turnAbsoluteValues);
            values.sort((a, b) => a - b);
            console.log(values);
            if (isStraightFlush(values) == true) {
                return "Straight";
            } else {
                const pairs = {};
                values.forEach(value => {
                    pairs[value] = (pairs[value] || 0) +1;
                }); //Block borrowed from: https://www.geeksforgeeks.org/count-occurrences-of-all-items-in-an-array-in-javascript/
                //Creates an object, fills object with values from array, and counts the number of times each value appears
                console.log(pairs);
                let pairQty = Object.values(pairs); //Number of cards pulled into pairs object
                console.log(pairQty); //Pairs listed as anything greater than 1
                if (pairQty.includes(4)) {
                    return "Four of a Kind";
                } else if (pairQty.includes(3) && pairQty.includes(2)) {
                    return "Full House";
                } else if (pairQty.includes(3) && pairQty.includes(1)) {
                    return "Three of a Kind";
                } else if (pairQty.includes(2) && pairQty.length == 3) {
                    return "Two Pair";
                }  else if (pairQty.includes(2)) {
                    return "One Pair";
                } else {
                    return "High Card";
                }
            }

        
        } 
    }

    let deckId = "";
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id; //store deck id
            //fetch(royalFlush) //DONE
            //fetch(straightFlush) //DONE
            //fetch(fourOfAKind) //DONE
            //fetch(fullHouse) //DONE
            //fetch(flush) //DONE
            //fetch(straight) //DONE
            //fetch(threeOfAKind) //DONE
            //fetch(twoPair) //DONE
            //fetch(onePair) //DONE
            //fetch(highCard) //DONE
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`) //2nd fetch with shuffled deck
                .then(response => response.json())
                .then(dealt => {
                    console.log(dealt);
                    console.log(bestHand(dealt));
                    let cardImages = dealt.cards.map(card => card.image); //array of card images
                    document.querySelector(".div1").innerHTML = `<h1>${bestHand(dealt)}</h1>`;
                    document.querySelector(".div2").innerHTML = `<img src="${cardImages[0]}">`;
                    document.querySelector(".div3").innerHTML = `<img src="${cardImages[1]}">`;
                    document.querySelector(".div4").innerHTML = `<img src="${cardImages[2]}">`;
                    document.querySelector(".div5").innerHTML = `<img src="${cardImages[3]}">`;
                    document.querySelector(".div6").innerHTML = `<img src="${cardImages[4]}">`;
                })
        });

        

})();