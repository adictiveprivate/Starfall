let solvedPuzzles = new Set();

// Reveal sparkly message
function revealMessage() {
    const message = document.getElementById('sparklyMessage');
    const container = message.parentElement;
    const secretButton = document.getElementById('secretButton');
    
    if (!message.classList.contains('revealed')) {
        message.classList.add('revealed');
        
        // Add sparkles around the message
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            container.appendChild(sparkle);
        }
        
        // Show secret button after 2 seconds
        setTimeout(() => {
            secretButton.classList.add('show');
        }, 2000);
    }
}

// Open puzzle function
function openPuzzle(puzzleNumber) {
    // Much smaller, centered windows
    const windowWidth = 600;
    const windowHeight = 500;
    const left = (window.screen.availWidth - windowWidth) / 2;
    const top = (window.screen.availHeight - windowHeight) / 2;
    
    // Open puzzle in smaller window
    const puzzleWindow = window.open(
        `puzzle${puzzleNumber}.html`,
        `puzzle${puzzleNumber}`,
        `width=${windowWidth},height=${windowHeight},left=${left},top=${top},scrollbars=no,resizable=no,status=no,toolbar=no,menubar=no`
    );
    
    if (!puzzleWindow) {
        alert('Please allow popups to open the puzzle!');
    }
}

// Mark puzzle as solved (keep for functionality but remove visual feedback)
function solvePuzzle(puzzleNumber) {
    solvedPuzzles.add(puzzleNumber);
    
    // Visual feedback - change star color
    const star = document.querySelector(`.star-${puzzleNumber}`);
    if (star) {
        star.style.background = '#4caf50';
        star.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.8)';
    }
}

// Show alien lock page - direct access, no puzzle requirement
function showAlienLock() {
    const constellationPage = document.getElementById('constellationPage');
    const alienLockPage = document.getElementById('alienLockPage');
    
    constellationPage.style.opacity = '0';
    setTimeout(() => {
        constellationPage.classList.remove('active');
        alienLockPage.classList.add('active');
        initializeAlienSymbols();
    }, 500);
}