// VARIABLES.
let secretWord = "";
let totalLives = 7;
let incorrectLetterPosition = 0;
let correctLettersCount = 0;
let winner = false;
let letters = [];
let moveTo = 250;
let lineTo = 300;
// GAME WORDS.
let words = ['ALURA', 'ORACLE', 'CSS', 'HTML', 'SCRIPT', 'MOUSE', 'SOFTWARE', 'DIEGO'];
// INVISIBLE-SECTION ( NEW-WORD AND HANGMAN).
document.querySelector('.new-word').style.display = 'none';
document.querySelector('.hangman').style.display = 'none';
// MOBILE USERS TEXTAREA.
let txtMobileUsers = document.getElementById('txt-mobile-users');
//CANVAS HANGMAN.
let canvasHangman = document.getElementById("hangman-canvas").getContext("2d");
// SECTION (HOME BUTTONS).
let btnStart = document.getElementById('btn-start');
let btnNewWord = document.getElementById('btn-new-word');
// WORDS SAVE IN LOCAL STORAGE.
let newWords = JSON.parse(localStorage.getItem('words'));

// NEW WORD SECTION
let txtNewWord      = document.getElementById('txt-new-word');
let btnSaveAndStart = document.getElementById('btn-saveAndStart');
let btnExitNewWord  = document.getElementById('btn-exit-newWord');
let notAlloweded    = new RegExp('[0-9a-zñáéíóúÑÁÉÍÓÚ~&@#%!¡¿?,._-})]');


// CHECK THE "LOCAL STORAGE" AND REASSIGN IF NECESSARY.
if ( newWords ) {
    words = newWords;
}

// GAME START
btnStart.addEventListener('click', () => {
    star();
    mobileUsers();
    listenToKeyboard();
});

// SET THE NEW WORD SECTION AS VISIBLE AND START BUTTONS AS INVISIBLE.
btnNewWord.addEventListener('click', () => {
    document.querySelector('.home-buttons').style.display = 'none';
    document.querySelector('.new-word').style.display = '';
});

txtNewWord.addEventListener('input', () => {
    let input = txtNewWord.value; 
    // Verify textarea
    if ( input.match( notAlloweded ) ) {
        // Show warning
        alert(`👀👉Enter only capital letters.👈👀`);
        // If the letter is not allowed, we remove it.
        txtNewWord.value = input.slice( 0, -1 );
    } else if ( input.length >=9 ) {
        alert(`👀👉Max. of letters 8.👈👀`);
        txtNewWord.value = input.slice( 0, -1 );
    }

});

btnSaveAndStart.addEventListener('click', () => {
    let newWord = txtNewWord.value;
    if ( words.includes(newWord) ) {
        alert('warning', '🧐', `👀👉"${newWord}". Word already exists!👈👀`);
    } else if ( newWord.length < 3 ) {
        alert('warning', '🧐', `👀👉"Min. of letters 3.👈👀`);
    } else {
        words.push(newWord);
        localStorage.setItem('words', JSON.stringify(words) );
        alert('success', '🥳', `"${newWord}". Added word`);
        document.querySelector('.new-word').style.display = 'none';
        star();
        mobileUsers();
        listenToKeyboard();
    }
});

btnExitNewWord.addEventListener('click', () => {
    location.reload();
});

// MOBILE USERS
function mobileUsers() {
    txtMobileUsers.addEventListener('input', () => {
        let input = txtMobileUsers.value; 
        // Verify textarea
        if ( input.match( notAlloweded ) ) {
            // Show warning
            alert(`👀👉Enter only capital letters.👈👀`);
            // If the letter is not allowed, we remove it.
            txtMobileUsers.value = input.slice( 0, -1 );
        } else if ( input.length <=1 ) {
            lettersValidate(txtMobileUsers.value);
            setTimeout(() => {
                txtMobileUsers.value = input.slice( 0, -1 );
            }, 500)
        }
    });   
}

function chooseSecretWord () {
    secretWord = words[Math.floor(Math.random()*words.length)];
}

// LISTEN TO THE KEYBOARD
function listenToKeyboard() {
    document.addEventListener('keydown', ( event ) => {
    // GET KEY(LETTER)
    let letter = event.key;
    lettersValidate( letter );
    });
}

function lettersValidate( letter ) {
    // VALIDATE IF THE LETTER HAS ALREADY BEEN ENTERED.
   if ( letters.includes(letter) ) {
    alert(`👀👉The letter "${letter}" has already been entered.👈👀`);
    } else {
        // IGNORE ""CapsLock"" and "Backspace".
        if ( event.keyCode === 20 || event.keyCode === 8 ) {
            return;
            
        // ALLOW ONLY CAPITAL LETTERS (ASCII CODE).
        } else if (event.keyCode >= 65 && event.keyCode <= 90 && letter === letter.toUpperCase()) {
            letters.push( letter );
            if ( (!secretWord.includes(letter) && !winner ) || totalLives <= 0 ) {
                // INCORRECT LETTER.
                validateLost(letter);
            } else {
                // CORRECT LETTER.
                validateWin(letter);
            }
            
        } else {
            alert(`👀👉Enter only capital letters.👈👀`);
        }
    }
}

// FUNCTION FOR GAME STARTUP
function star() {
    document.querySelector(".home-buttons").style.display = 'none';
    document.querySelector('.hangman').style.display = '';
    chooseSecretWord();
    drawTheLines();
}