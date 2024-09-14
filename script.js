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
            artist: 'Saathiya',
            cover: 'assets/sanskruti.jpg',
            musicName: 'Hasti Rahe tu, Hasti Rahe, \n Haya ki lali khilti rahe...',
            musicPath: `assets/hansti_rahe_tu.mp3`
        }, {
            artist: 'Mumbai Pune Mumbai',
            cover: 'assets/sanskruti3.jpg',
            musicName: 'Kadhi tu..., Rim Jhim Jharnari Barsat \n Kadhi tu..., Cham Cham Karnari Chandnya',
            musicPath: `assets/kadhi_tu.mp3`
        }, {
            artist: 'RHTDM',
            cover: 'assets/sanskruti4.jpg',
            musicName: 'Kaise kahu main tujhse, Rehna hai tere dil main..',
            musicPath: `assets/kaise-mein-kahun-tujhse-13500.mp3`
        }, {
            artist: 'Lil Nas X',
            cover: 'assets/sanskruti5.jpg',
            musicName: 'Ha tum bilkul vaisi ho, jaisa maine socha tha \n चाँद सी महबूबा हो मेरी कब ऐसा मैंने सोचा ',
            musicPath: `assets/Ha-Tum-Bilkul-Waisi-Ho-Jaisa-Maine-Socha-Tha-Chand-Si-Mehbooba-Hindi-1.mp3`
        }, {
            artist: 'Post Malone',
            cover: 'assets/sanskruti6.jpg',
            musicName: 'Sangu kashya me, sakhya tula re, Mazya hya bhavna, Mazya sanskruti la preet kalena',
            musicPath: `assets/maziya_priyala_preet.mp3`
        }]

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
            selectedMusic = (selectedMusic + 1) % playList.length
            loadMusic(playList[selectedMusic]);
            music.duration = 0;
            if (isPlaying) {
                music.play()
            }
            musicCard.classList.add('right-weight');
            progressBar.style.width = `0%`
            setTimeout(() => {
                musicCard.classList.remove('right-weight');
            }, 200)
        }

        const prevMusic = () => {
            selectedMusic = (selectedMusic - 1 + playList.length) % playList.length
            loadMusic(playList[selectedMusic]);
            if (isPlaying) {
                music.play()
            }
            musicCard.classList.add('left-weight');
            progressBar.style.width = `0%`
            setTimeout(() => {
                musicCard.classList.remove('left-weight');
            }, 200)
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