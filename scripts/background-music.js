// Background Music System
class BackgroundMusicPlayer {
    constructor() {
        this.playlist = [
            'assets/audio/background/ambient1.mp3',
            'assets/audio/background/ambient2.mp3',
            'assets/audio/background/ambient3.mp3',
            'assets/audio/background/ambient4.mp3',
            'assets/audio/background/ambient5.mp3'
        ];
        
        this.currentTrackIndex = 0;
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3; // Low ambient volume
        this.shuffledPlaylist = [];
        
        this.initializePlayer();
        this.shufflePlaylist();
    }
    
    initializePlayer() {
        this.audio = new Audio();
        this.audio.volume = this.volume;
        this.audio.loop = false;
        
        // Auto-play next track when current ends
        this.audio.addEventListener('ended', () => {
            this.playNextTrack();
        });
        
        // Handle loading errors gracefully
        this.audio.addEventListener('error', () => {
            console.log('Audio file not found, playing next track');
            this.playNextTrack();
        });
        
        // Fade in when track starts
        this.audio.addEventListener('canplay', () => {
            this.fadeIn();
        });
    }
    
    shufflePlaylist() {
        // Create a copy and shuffle
        this.shuffledPlaylist = [...this.playlist];
        for (let i = this.shuffledPlaylist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledPlaylist[i], this.shuffledPlaylist[j]] = 
                [this.shuffledPlaylist[j], this.shuffledPlaylist[i]];
        }
        this.currentTrackIndex = 0;
    }
    
    async startMusic() {
        if (this.isPlaying) return;
        
        try {
            this.audio.src = this.shuffledPlaylist[this.currentTrackIndex];
            await this.audio.play();
            this.isPlaying = true;
            this.createVolumeControl();
        } catch (error) {
            console.log('Autoplay blocked - user interaction required');
            this.showPlayButton();
        }
    }
    
    playNextTrack() {
        this.currentTrackIndex++;
        
        // If we've played all tracks, reshuffle and start over
        if (this.currentTrackIndex >= this.shuffledPlaylist.length) {
            this.shufflePlaylist();
        }
        
        if (this.isPlaying) {
            this.audio.src = this.shuffledPlaylist[this.currentTrackIndex];
            this.audio.play();
        }
    }
    
    fadeIn() {
        this.audio.volume = 0;
        const fadeInInterval = setInterval(() => {
            if (this.audio.volume < this.volume) {
                this.audio.volume = Math.min(this.volume, this.audio.volume + 0.02);
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50);
    }
    
    showPlayButton() {
        // Create a subtle play button for browsers that block autoplay
        const playButton = document.createElement('div');
        playButton.className = 'music-play-prompt';
        playButton.innerHTML = `
            <div class="play-prompt-content">
                <span class="play-icon">🎵</span>
                <span class="play-text">Click to enable ambient music</span>
            </div>
        `;
        
        playButton.addEventListener('click', () => {
            this.startMusic();
            playButton.remove();
        });
        
        document.body.appendChild(playButton);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (playButton.parentNode) {
                playButton.remove();
            }
        }, 10000);
    }
    
    createVolumeControl() {
        // Create subtle volume control
        const volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';
        volumeControl.innerHTML = `
            <div class="volume-icon" onclick="backgroundMusic.toggleMute()">🔊</div>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="${this.volume}" 
                   onchange="backgroundMusic.setVolume(this.value)">
        `;
        
        document.body.appendChild(volumeControl);
    }
    
    toggleMute() {
        if (this.audio.volume > 0) {
            this.previousVolume = this.audio.volume;
            this.audio.volume = 0;
            document.querySelector('.volume-icon').textContent = '🔇';
        } else {
            this.audio.volume = this.previousVolume || this.volume;
            document.querySelector('.volume-icon').textContent = '🔊';
        }
    }
    
    setVolume(newVolume) {
        this.volume = parseFloat(newVolume);
        this.audio.volume = this.volume;
        
        // Update icon based on volume
        const icon = document.querySelector('.volume-icon');
        if (icon) {
            icon.textContent = this.volume === 0 ? '🔇' : this.volume < 0.5 ? '🔉' : '🔊';
        }
    }
}

// Initialize background music player
let backgroundMusic;

// Start music when constellation page becomes active
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic = new BackgroundMusicPlayer();
    
    // Start music after login or when constellation page becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const constellationPage = document.getElementById('constellationPage');
                if (constellationPage && constellationPage.classList.contains('active')) {
                    setTimeout(() => {
                        backgroundMusic.startMusic();
                    }, 2000); // Start after constellation transition
                }
            }
        });
    });
    
    const constellationPage = document.getElementById('constellationPage');
    if (constellationPage) {
        observer.observe(constellationPage, { attributes: true });
    }
});