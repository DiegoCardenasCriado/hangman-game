// HANGMAN GAME BUTTONS
let btnNewGame = document.getElementById('btn-newGame');
let btnExitGame = document.getElementById('btn-exit-game');

btnNewGame.addEventListener('click', () => {
    txtKeyboardUsers.focus();
    canvasHangman.clearRect(0, 0, 1200, 860);
    totalLives = 7;
    incorrectLetterPosition = 0;
    correctLettersCount = 0;
    winner = false;
    letters = [];
    moveTo = 250;
    lineTo = 300;
    star();
});

btnExitGame.addEventListener('click', () => {
    location.reload();
});

// DRAW THE LINES ON THE CANVAS.
function drawTheLines() {
    let cantWord = secretWord.length;
    // LINES SPACING
    let lineSpacing = 60;
    // SET LINES SPACING
    if ( cantWord < 4 ) {
        moveTo += 130;
        lineTo += 130;
    } else if ( cantWord == 4 ) {
        moveTo += 90;
        lineTo += 90;
    } else if ( cantWord == 5 ) {
        moveTo += 75;
        lineTo += 75;
    } else if ( cantWord == 6 ) {
        moveTo += 50;
        lineTo += 50;
    }

    // ONE LINE IS PAINTED AT EACH ITERATION - ( cantWord ).
    for (let i = 0; i < cantWord; i++) {

        canvasHangman.strokeStyle = "#0A3871";
        canvasHangman.lineWidth = 6;
        canvasHangman.beginPath();
        // HORIZONTAL LINE OF LETTERS.
        canvasHangman.moveTo((moveTo + ( lineSpacing * i )), 580);
        canvasHangman.lineTo((lineTo + ( lineSpacing * i )), 580);
        // BOTTOM HORIZONTAL LINE.
        if ( i == (cantWord - 1) ) {
            canvasHangman.moveTo(290, 500);
            canvasHangman.lineTo(650, 500);
        }
        canvasHangman.stroke();
    }
}

// CHECK IF YOU HAVE LOST.
function validateLost(letter) {
    
    // DRAWING THE GALLOWS
    drawTheGallows();

    // WHEN THE NUMBER OF LIVES EQUALS 0, THE GAME IS OVER.
    if ( totalLives <= 0 ) {
        showMessage('error', '😢😒You have lost!', `The secret word is "${secretWord}"`);
        letters = [];
    }

    // WRITE THE WRONG LETTER IF "TOTAL LIVES" IS >= 0
    if ( totalLives >=0 ) {
        // WE ADD SPACING TO THE INCORRECT LETTERS.
        incorrectLetterPosition += 60;
        
        // WRITE THE WRONG LETTER.
        writingLetters('30px sans-serif', letter, ( incorrectLetterPosition + 210 ), 630);        
    }
}

// CHECK IF YOU HAVE WON.
function validateWin(letter) {
    // CORRECT LETTER SPACING
    let correctLetterPosition = 5;
    
    // ONE LETTER IS PAINTED AT EACH ITERATION - ( secretWord.length ).
    for (let i = 0; i < secretWord.length; i++) {
        // WE ADD SPACING TO THE CORRECT LETTERS.
        if ( i >= 1) {
            correctLetterPosition +=60;
        }
        if ( letter === secretWord[i] ) {
            correctLettersCount +=1;
            if ( correctLettersCount <= secretWord.length ) {
                // WRITING THE LETTER.
                writingLetters('50px sans-serif', letter, ( correctLetterPosition + moveTo ), 570);
            }
        }
    }

    // WHEN THE NUMBER OF CORRECT LETTERS EQUALS THE NUMBER OF LETTERS IN THE SECRET WORD, THE GAME ENDS.
    if ( correctLettersCount >= secretWord.length ) {
        winner = true;
        showMessage('success', '😎🥳You have Won!', `The secret word is "${secretWord}"`);
        letters = [];
    }
}

// DRAW THE GALLOWS ON THE CANVAS.
function drawTheGallows() {
    totalLives -= 1;
    
    canvasHangman.strokeStyle = "#0A3871";
    canvasHangman.lineWidth = 5;
    canvasHangman.beginPath();

    // GALLOWS
    if (totalLives === 6) {
        // VERTICAL LINE.
        canvasHangman.moveTo(310, 500);
        canvasHangman.lineTo(310, 5);
        // TOP HORIZONTAL LINE.
        canvasHangman.moveTo(540, 5);
        canvasHangman.lineTo(310, 5);
        // ROPE.
        canvasHangman.moveTo(540, 5)
        canvasHangman.lineTo(541, 100);
    }
    // HEAD.
    else if (totalLives === 5) {
        canvasHangman.arc(540, 150, 50, 0, Math.PI * 2);
    }
    // TRUNK
    else if (totalLives === 4) {
        canvasHangman.moveTo(540, 200);
        canvasHangman.lineTo(540, 300);
    }
    // RIGHT LEG
    else if (totalLives === 3) {
        canvasHangman.moveTo(540, 300);
        canvasHangman.lineTo(600, 350);
    }
    // LEFT LEG
    else if (totalLives === 2) {
        canvasHangman.moveTo(540, 300);
        canvasHangman.lineTo(480, 350);
    }
    // RIGHT ARM
    else if (totalLives === 1) {
        canvasHangman.moveTo(540, 200);
        canvasHangman.lineTo(600, 249);
    }
    // LEG ARM
    else if (totalLives === 0) {
        canvasHangman.moveTo(540, 200);
        canvasHangman.lineTo(490, 249);
    }
    canvasHangman.stroke();
}

// WRITE THE LETTERS ON THE CANVAS.
function writingLetters( font, letter, x, y) {
    canvasHangman.font = font;
    canvasHangman.fillStyle = "#0A3871";
    canvasHangman.fillText(letter, x, y);
}

function showMessage( icon, title, text ) {
    Swal.fire({
        icon,
        title,
        text,
        position: 'top-end',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        showConfirmButton: false,
        timer: 2500
    });
}