import { gsap } from "gsap";

if(document.querySelectorAll(`[data-video]`)) {
    document.querySelectorAll(`[data-video]`).forEach(video => {

        const videoEl = video.querySelector(`[data-video-el]`);
        const progress = video.querySelector(`[data-video-progress]`);
        const seek = video.querySelector(`[data-video-seek]`);
        const timeCurrent = video.querySelector(`[data-video-time-current]`);
        const timeDuration = video.querySelector(`[data-video-time-duration]`);
        const audioControls = video.querySelector(`[data-video-audio]`);
        const unmuteIcon = audioControls.querySelector(`[data-video-unmute]`);
        const muteIcon = audioControls.querySelector(`[data-video-mute]`);
        const audioText = audioControls.querySelector(`[data-video-audio-label]`);

        function formatTime(timeInSeconds) {
            const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
            return {
                minutes: result.substr(3, 2),
                seconds: result.substr(6, 2),
            };
        };

        function initVideo() {
            const videoDuration = Math.round(videoEl.duration);
            seek.setAttribute('max', videoDuration);
            progress.setAttribute('max', videoDuration);
            const time = formatTime(videoDuration);
            timeDuration.innerText = `${time.minutes}:${time.seconds}`;
            timeDuration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
        }

        videoEl.addEventListener('loadedmetadata', initVideo);

        function updateTime() {
            const time = formatTime(Math.round(videoEl.currentTime));
            timeCurrent.innerText = `${time.minutes}:${time.seconds}`;
            timeCurrent.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
        }

        function updateProgress() {
            seek.value = Math.floor(videoEl.currentTime);
            progress.value = Math.floor(videoEl.currentTime);
        }

        function skipAhead(event) {
            const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
            videoEl.currentTime = skipTo;
            progress.value = skipTo;
            seek.value = skipTo;
        }

        seek.addEventListener('input', skipAhead);
        videoEl.addEventListener('timeupdate', updateTime);
        videoEl.addEventListener('timeupdate', updateProgress);

        const btn = video.querySelector(`[data-video-btn]`);
        const shadow = video.querySelector(`[data-video-btn-shadow]`);
        const overlay = video.querySelector(`[data-video-overlay]`);

        function hideOverlay() { gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: "linear"}); }
        function showOverlay() { gsap.to(overlay, { autoAlpha: 1, duration: 0.25, ease: "linear"}); }
        function hideShadow()  { gsap.to(shadow,  { autoAlpha: 0, duration: 0.25, ease: "linear"}); }
        function showShadow()  { gsap.to(shadow,  { autoAlpha: 1, duration: 0.25, ease: "linear"}); }
        function hideBtn()     { gsap.to(btn,     { autoAlpha: 0, duration: 0.25, ease: "linear"}); }
        function showBtn()     { gsap.to(btn,     { autoAlpha: 1, duration: 0.25, ease: "linear"}); }
        function hideSeek() { seek.setAttribute(`hidden`, true); }
        function showSeek() { seek.removeAttribute(`hidden`); }
        function hideAudio() { seek.setAttribute(`hidden`, true); }
        function showAudio() { seek.removeAttribute(`hidden`); }

        overlay.addEventListener(`click`, function() {
            hideOverlay();
            hideShadow();
            hideBtn();
            showAudio();
            showSeek();
            videoEl.play();
        });

        btn.addEventListener(`click`, function() {
            hideOverlay();
            hideShadow();
            hideBtn();
            showSeek();
            videoEl.play();
        });

        videoEl.addEventListener(`click`, function(){
            if(videoEl.paused) {
                hideOverlay();
                hideShadow();
                hideBtn();
                showSeek();
                videoEl.play();
                console.log(`video will play`)
            } else {
                showBtn();
                videoEl.pause();
                console.log(`video will pause`)
            }
        })

        videoEl.addEventListener(`ended`, function() {
            showOverlay();
            showShadow();
            showBtn();
            hideSeek();
            hideAudio();
        })

        function stopAudio() {
            audioText.innerHTML = `Unmute Video`;
            muteIcon.setAttribute(`hidden`, true);
            unmuteIcon.removeAttribute(`hidden`);
            videoEl.muted = true;
        }

        function startAudio() {
            audioText.innerHTML = `Mute Video`
            unmuteIcon.setAttribute(`hidden`, true);
            muteIcon.removeAttribute(`hidden`);
            videoEl.muted = false;
        }

        audioControls.addEventListener(`click`, function() {
            if(videoEl.muted) {
                startAudio();
            } else {
                stopAudio();
            }
        });

        // Play video when hero button is clicked
        if(document.querySelector(`[data-hero-video-link]`)) {
            document.querySelector(`[data-hero-video-link]`).addEventListener(`click`, function() {
                hideOverlay();
                hideShadow();
                hideBtn();
                showSeek();
                videoEl.play();
            })
        }

    })
}