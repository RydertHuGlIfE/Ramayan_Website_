let currentAudio = null;
let isPlaying = false;
let backgroundAudio = document.getElementById('backgroundAudio');
let isBackgroundPlaying = false;



function toggleBackgroundAudio() {
    const backgroundAudioControl = document.getElementById('backgroundAudioControl');

    if (isBackgroundPlaying) {
        backgroundAudio.pause();
        backgroundAudioControl.classList.remove('playing');
    } else {
        backgroundAudio.volume = 0.3;
        const playPromise = backgroundAudio.play();
        if (playPromise) {
            playPromise.catch(error => {
                console.error('Background audio playback failed:', error);
                isBackgroundPlaying = false;
                backgroundAudioControl.classList.remove('playing');
            });
        }
        backgroundAudioControl.classList.add('playing');
    }

    isBackgroundPlaying = !isBackgroundPlaying;
}

function toggleAudio() {
    const audioControl = document.getElementById('audioControl');

    if (!currentAudio) {
        currentAudio = new Audio(audioFiles[currentPage]);
        currentAudio.onerror = () => {
            console.error('Error loading audio file');
            isPlaying = false;
            updateAudioUI(false);
        };
        currentAudio.onended = () => {
            isPlaying = false;
            updateAudioUI(false);
        };
    }

    if (isPlaying) {
        currentAudio.pause();
        updateAudioUI(false);
    } else {
        const playPromise = currentAudio.play();
        if (playPromise) {
            playPromise.catch(error => {
                console.error('Playback failed:', error);
                isPlaying = false;
                updateAudioUI(false);
            });
        }
        updateAudioUI(true);
    }

    isPlaying = !isPlaying;
}

function updateAudioUI(isPlaying) {
    const audioControl = document.getElementById('audioControl');
    audioControl.classList.toggle('playing', isPlaying);

    audioControl.innerHTML = isPlaying ? `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>` : `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>`;
}

function updateAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = new Audio(audioFiles[currentPage]);
        if (isPlaying) {
            const playPromise = currentAudio.play();
            if (playPromise) {
                playPromise.catch(error => {
                    console.error('Playback failed:', error);
                    isPlaying = false;
                    updateAudioUI(false);
                });
            }
        }
    }
}




let currentPage = 0;

function updateHeading() {
    let heading = document.getElementById("heading");

    if (currentPage >= 37) {
        heading.innerText = "लंका कांड";
    } else if (currentPage >= 31) {
        heading.innerText = "सुन्दर कांड";
    } else if (currentPage >= 26) {
        heading.innerText = "किष्किंधा कांड";
    } else if (currentPage >= 21) {
        heading.innerText = "अरण्य कांड";
    } else if (currentPage >= 10) {
        heading.innerText = "अयोध्या कांड";
    } else {
        heading.innerText = "बाल कांड";
    }

}

function updatePages() {
    const leftPage = document.getElementById('leftPage');
    const rightPage = document.getElementById('rightPage');

    leftPage.innerHTML = "<p>" + pages[currentPage][0] + "</p>";
    rightPage.innerHTML = "<p>" + pages[currentPage][1] + "</p>";
    updateHeading();
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
        updateAudio();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
        updateAudio();
    }
}

function jumpToPage() {
    let pageNum = parseInt(document.getElementById("pageInput").value);
    if (pageNum >= 1 && pageNum <= pages.length) {
        currentPage = pageNum - 1;
        updatePages();
        updateAudio();
    }
}

function startReading() {
    document.getElementById("cover").style.display = "none";
    document.querySelector(".book").style.display = "flex";
    document.querySelector(".heading").style.display = "block";
    document.getElementById('audioControl').style.display = 'flex';
    document.getElementById('backgroundAudioControl').style.display = 'flex';

    updatePages();

    // Automatically start background music
    if (!isBackgroundPlaying) {
        backgroundAudio.volume = 0.05;
        const playPromise = backgroundAudio.play();
        if (playPromise) {
            playPromise.catch(error => {
                console.error('Background audio playback failed:', error);
            });
        }
        isBackgroundPlaying = true;
        document.getElementById('backgroundAudioControl').classList.add('playing');
    }
}
