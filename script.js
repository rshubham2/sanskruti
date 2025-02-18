//script.js
const next = document.querySelector('#next');
        const play = document.querySelector('#play');
        const prev = document.querySelector('#prev');
        const progressBar = document.querySelector('#progress-bar');
        const musicTitle = document.querySelector('.music-name');
        const musicCard = document.querySelector('.music-card');
        const musicArtist = document.querySelector('.music-artist');
        const musicCover = document.querySelector('.music-image');
        const musicCurrentTime = document.querySelector('.music-current-time');
        const musicDurationTime = document.querySelector('.music-duration-time');
        const backgroundImage = document.querySelector('#backgroundImage');
        const music = document.querySelector('audio');
        const progressZone = document.querySelector('.music-progress');

        let isPlaying = false;
        // default select first music
        let selectedMusic = 1;

        play.addEventListener('click', () => {
            isPlaying ? pauseMusic() : playMusic()
        });

        const playList = [{
            musicName: 'Tum Bin',
            cover: 'assets/image/tumMIle.jpeg',
            artist: 'Before you, My world was Silent',
            musicPath: 'assets/audio/Tum Mile - Tum Mile 320 Kbps (mp3cut.net) (1).mp3'
        }, {
            musicName: 'Dilkashi',
            cover: 'assets/image/raanjhana.jpeg',
            artist: 'The First Glimpse',
            musicPath: 'assets/audio/raanjhanaa_theme.mp3'
        }, {
            musicName: 'Tum Tak',
            cover: 'assets/image/tumTak.jpeg',
            artist: 'Ranjhanaa',
            musicPath: 'assets/audio/Tum Tak - Raanjhanaa 320 Kbps (mp3cut.net).mp3'
        }, {
            musicName: 'Diwangi',
            cover: 'assets/image/teraFitoor.jpeg',
            artist: 'Secretly Falling for you',
            musicPath: 'assets/audio/Tera Fitoor Genius 320 Kbps (mp3cut.net).mp3'
        }, {
            musicName: 'खिडकीतून डोकावुनि',
            cover: 'assets/image/hrydayatVajeSomething.jpeg',
            artist: 'Seeking you',
            musicPath: 'assets/audio/hrydayat vaje something.m4a'
        }, {
            musicName: 'स्वप्नरंग',
            cover: 'assets/image/chimbBhijlele.jpg',
            artist: 'Love in a Monsoon Melody',
            musicPath: 'assets/audio/Chimb-Bhijlele (mp3cut.net).mp3'
        }, {
            musicName: 'खुलता कळी खुलेना',
            cover: 'assets/image/khultaKali.jpg',
            artist: 'Confusion & Emotional Struggle',
            musicPath: 'assets/audio/Khulta-Kali-Khulena (mp3cut.net).mp3'
        }, {
            musicName: 'अव्यक्त',
            cover: 'assets/image/tuhire.jpeg',
            artist: 'More than Friendship?',
            musicPath: 'assets/audio/tu hi re maza mitwa.m4a'
        }, {
            musicName: 'प्रेम',
            cover: 'assets/image/tumala.jpg',
            artist: 'Realizing Love❤️',
            musicPath: 'assets/audio/Tu Mala Mi Tula  Lyrical  Marathi Lyrics (mp3cut.net).mp3'
        }, {
            musicName: 'माझ्या संस्कृतीला प्रीत कळेना',
            cover: 'assets/image/maztapreyala.jpg',
            artist: 'The Struggle to Express',
            musicPath: 'assets/audio/Maziya Priyala Preet Kalena Full Song(Rare,Original) (mp3cut.net).mp3'
        }];

        

        const playMusic = () => {
            music.play();
            document.querySelector('.play-icon').classList.replace('fa-play', 'fa-pause')
            isPlaying = true;
            fadeInCover();
            musicCard.classList.add('middle-weight');
            setTimeout(() => {
                musicCard.classList.remove('middle-weight');
            }, 200)
        }

        const pauseMusic = () => {
            music.pause();
            document.querySelector('.play-icon').classList.replace('fa-pause', 'fa-play')
            isPlaying = false;
            fadeInCover();
            musicCard.classList.add('middle-weight');
            setTimeout(() => {
                musicCard.classList.remove('middle-weight');
            }, 200)
        }

        const nextMusic = () => {
            // Only increment if we haven't reached the end
            if (selectedMusic < playList.length - 1) {
                selectedMusic++;
            } else {
                // Loop back to the first song if we're at the end
                selectedMusic = 0;
            }
            loadMusic(playList[selectedMusic]);
            music.duration = 0;
            if (isPlaying) {
                music.play();
            }
            musicCard.classList.add('right-weight');
            progressBar.style.width = `0%`;
            setTimeout(() => {
                musicCard.classList.remove('right-weight');
            }, 200);
        }

        const prevMusic = () => {
            // Only decrement if we're not at the first song
            if (selectedMusic > 0) {
                selectedMusic--;
            } else {
                // Loop to the last song if we're at the beginning
                selectedMusic = playList.length - 1;
            }
            loadMusic(playList[selectedMusic]);
            if (isPlaying) {
                music.play();
            }
            musicCard.classList.add('left-weight');
            progressBar.style.width = `0%`;
            setTimeout(() => {
                musicCard.classList.remove('left-weight');
            }, 200);
        }

        const loadMusic = (playList) => {
            musicArtist.textContent = playList.artist;
            musicTitle.textContent = playList.musicName;
            music.src = playList.musicPath;
            musicCover.src = `${playList.cover}`;
            backgroundImage.src = `${playList.cover}`;
            backgroundImage.animate([{
                opacity: 0,
            }, {
                opacity: 1,
            }], {
                duration: 400,
            });
            fadeInCover();
        }

        const fadeInCover = () => {
            musicCover.classList.add('animate')
            setTimeout(() => {
                musicCover.classList.remove('animate')
            }, 300)
        }

        // Update progress
        const updateProgress = (e) => {
            const {
                duration,
                currentTime
            } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100
            progressBar.style.width = `${progressPercent}%`

            if (progressPercent == 100) {
                setTimeout(() => {
                    nextMusic()
                }, 500);
            }
        }

        // Set progress
        function setProgress(e) {
            const width = this.clientWidth;
            const setPoint = e.offsetX;
            const duration = music.duration;
            music.currentTime = (setPoint / width) * duration;
        }

        // Set time area
        const setMusicTime = (e) => {
            const {
                duration,
                currentTime
            } = e.srcElement;
            calcSongTime(duration, musicDurationTime);
            calcSongTime(currentTime, musicCurrentTime);
        }

        const calcSongTime = (time, selectTime) => {
            time = Number(time);
            const m = Math.floor(time % 3600 / 60);
            const s = Math.floor(time % 3600 % 60);
            if (m < 10) {
                minute = "0" + m;
            } else minute = m
            if (s < 10) {
                second = "0" + s;
            } else second = s

            return selectTime.textContent = `${minute}:${second}`;
}
        
            // When a song ends, play the next one in sequence
            music.addEventListener('ended', () => {
                nextMusic();
            });

            // Initialize the player with the first song
            window.onload = function() {
                selectedMusic = 0;  // Start with the first song
                loadMusic(playList[selectedMusic]);
            }



        next.addEventListener('click', nextMusic);
        prev.addEventListener('click', prevMusic);
        music.addEventListener('timeupdate', updateProgress);
        music.addEventListener('timeupdate', setMusicTime);
        progressZone.addEventListener('click', setProgress)

        function cardAnimate(e) {
            this.querySelectorAll('.music-card').forEach(function(boxMove) {
                const x = -((window.innerWidth) / 3 - e.pageX) / 90
                const y = ((window.innerHeight) / 3 - e.pageY) / 30
                boxMove.style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)"
            });
}
        // Add this at the beginning of your script.js
        function getSongNumberFromURL() {
            const params = new URLSearchParams(window.location.search);
            const songParam = params.get('song');
            
            // Convert to number and subtract 1 for zero-based array index
            const songNumber = songParam ? parseInt(songParam) - 1 : 0;
            
            // Validate the song number
            if (songNumber >= 0 && songNumber < playList.length) {
                return songNumber;
            }
            return 0; // Default to first song if invalid parameter
        }

        // Initialize the player with the song from URL
        window.onload = function() {
            selectedMusic = getSongNumberFromURL();
            loadMusic(playList[selectedMusic]);
            
            // Update URL when song changes (optional)
            const updateURL = (songIndex) => {
                const newURL = `${window.location.pathname}?song=${songIndex + 1}`;
                window.history.pushState({ path: newURL }, '', newURL);
            };
            
            // Add URL update to next/prev functions
            const originalNextMusic = nextMusic;
            const originalPrevMusic = prevMusic;
            
            nextMusic = function() {
                originalNextMusic();
                updateURL(selectedMusic);
            };
            
            prevMusic = function() {
                originalPrevMusic();
                updateURL(selectedMusic);
            };
        }

        // Optional: Handle browser back/forward buttons
        window.onpopstate = function() {
            selectedMusic = getSongNumberFromURL();
            loadMusic(playList[selectedMusic]);
            if (isPlaying) {
                music.play();
            }
        };