// Check name function
function checkName() {
    const nameInput = document.getElementById('nameInput');
    const errorMessage = document.getElementById('errorMessage');
    const loginContainer = document.getElementById('loginContainer');
    const constellationPage = document.getElementById('constellationPage');
    
    const enteredName = nameInput.value.toLowerCase().trim();
    const correctName = 'priyangi';
    
    if (enteredName.includes(correctName)) {
        // Name is correct, transition to constellation page
        errorMessage.classList.remove('show');
        
        setTimeout(() => {
            loginContainer.style.opacity = '0';
            loginContainer.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                loginContainer.style.display = 'none';
                constellationPage.classList.add('active');
                
                // Auto-reveal message after 3 seconds
                setTimeout(() => {
                    revealMessage();
                }, 3000);
            }, 500);
        }, 200);
        
    } else {
        // Wrong name
        errorMessage.classList.add('show');
        nameInput.style.borderColor = '#ff6b6b';
        nameInput.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
        
        setTimeout(() => {
            nameInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            nameInput.style.boxShadow = 'none';
        }, 2000);
    }
}

// Allow Enter key to submit
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkName();
    }
});