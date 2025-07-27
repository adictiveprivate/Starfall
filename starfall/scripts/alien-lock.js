const colors = ['purple', 'red', 'blue', 'yellow', 'green'];
const correctSequence = ['blue', 'green', 'yellow', 'yellow', 'red', 'purple', 'blue', 'blue'];
let currentSequence = new Array(8).fill('purple'); // Start with all purple

// Initialize alien symbols background
function initializeAlienSymbols() {
    const alienSymbols = document.getElementById('alienSymbols');
    const symbols = ['◊', '◈', '◇', '◎', '◐', '◑', '◒', '◓', '☆', '★', '⬟', '⬢', '⬡', '▲', '▼', '◆'];
    
    // Clear existing symbols
    alienSymbols.innerHTML = '';
    
    // Create floating symbols
    for (let i = 0; i < 25; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'alien-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.top = Math.random() * 100 + '%';
        symbol.style.animationDelay = Math.random() * 6 + 's';
        symbol.style.animationDuration = (Math.random() * 4 + 4) + 's';
        alienSymbols.appendChild(symbol);
    }
    
    // Initialize scroll wheels
    initializeScrollWheels();
}

// Initialize scroll wheels
function initializeScrollWheels() {
    const scrollWheelsContainer = document.getElementById('scrollWheels');
    scrollWheelsContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const wheel = document.createElement('div');
        wheel.className = 'scroll-wheel';
        
        wheel.innerHTML = `
            <button class="scroll-up" onclick="scrollColor(${i}, 1)">▲</button>
            <div class="color-display color-${currentSequence[i]}" id="color-${i}"></div>
            <button class="scroll-down" onclick="scrollColor(${i}, -1)">▼</button>
            <div class="wheel-number">${i + 1}</div>
        `;
        
        scrollWheelsContainer.appendChild(wheel);
    }
}

// Scroll color function
function scrollColor(wheelIndex, direction) {
    const currentColorIndex = colors.indexOf(currentSequence[wheelIndex]);
    let newColorIndex = currentColorIndex + direction;
    
    // Wrap around
    if (newColorIndex >= colors.length) newColorIndex = 0;
    if (newColorIndex < 0) newColorIndex = colors.length - 1;
    
    currentSequence[wheelIndex] = colors[newColorIndex];
    
    // Update display
    const colorDisplay = document.getElementById(`color-${wheelIndex}`);
    colorDisplay.className = `color-display color-${colors[newColorIndex]}`;
    
    // Add a little animation
    colorDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        colorDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Check sequence
function checkSequence() {
    const isCorrect = currentSequence.every((color, index) => color === correctSequence[index]);
    
    if (isCorrect) {
        // Show success message
        document.getElementById('successMessage').classList.add('show');
    } else {
        // Wrong sequence - shake the lock container
        const lockContainer = document.querySelector('.lock-container');
        lockContainer.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            lockContainer.style.animation = '';
        }, 500);
    }
}

// Download song function
function downloadSong() {
    // You can replace this with actual file download logic
    const link = document.createElement('a');
    link.href = 'assets/audio/your-song.mp3'; // Put your song file here
    link.download = 'If_You_Were_A_Tune.mp3';
    link.click();
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) translateX(0); }
        25% { transform: translate(-50%, -50%) translateX(-10px); }
        75% { transform: translate(-50%, -50%) translateX(10px); }
    }
`;
document.head.appendChild(style);