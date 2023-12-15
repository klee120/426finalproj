import { AudioListener, Audio, AudioLoader } from 'three';
import { SceneManager } from 'managers';
import {
    BackgroundAudio,
    DeathAudio,
    WinAudio,
    SwordAudio,
    SplatAudio,
} from 'audio';

class AudioManager {
    constructor() {
        this.audioListener = new AudioListener();

        this.backgroundMusic = new Sound(
            this.audioListener,
            BackgroundAudio,
            true
        );
        this.backgroundMusic.audio.autoplay = true;
        this.backgroundMusic.audio.setVolume(0.5);

        this.deathMusic = new Sound(this.audioListener, DeathAudio, true);
        this.deathMusic.audio.setVolume(0.5);

        this.winMusic = new Sound(this.audioListener, WinAudio, true);
        this.winMusic.audio.setVolume(0.5);

        this.swordSound = new Sound(this.audioListener, SwordAudio, false);
        this.splatSound = new Sound(this.audioListener, SplatAudio, false);

        this.sounds = [this.backgroundMusic, this.swordSound, this.splatSound];
    }

    init() {
        this.audioListener.position.set(SceneManager.camera.position);
    }

    playSword() {
        this.swordSound.play(1, 0.8);
    }

    playSplat() {
        this.splatSound.play(1, 0.8);
    }

    update(time) {
        for (const sound of this.sounds) {
            sound.update(time);
        }
    }

    normalBackgroundMusic(fromDeath) {
        this.backgroundMusic.play(-1, 0.5);
        if (fromDeath) {
            this.deathMusic.stop();
        } else {
            this.winMusic.stop();
        }
    }

    switchBackgroundMusic(death) {
        if (death) {
            this.backgroundMusic.stop();
            this.deathMusic.play(-1, 0.5);
        } else {
            this.backgroundMusic.stop();
            this.winMusic.play(-1, 0.2);
        }
    }
}

class Sound {
    constructor(audioListener, audioUrl, isLoop) {
        this.audio = this.createAudio(audioListener, audioUrl, isLoop);
        this.timeStart = -1;
        this.isPlaying = false;
        this.duration = -1;
        this.updateTimeStart = false;
        this.isLoop = isLoop;

        return this;
    }

    createAudio(audioListener, audioUrl, isLoop) {
        const audio = new Audio(audioListener);
        const audioLoader = new AudioLoader();
        audioLoader.load(audioUrl, function (buffer) {
            audio.setBuffer(buffer);
            audio.setLoop(isLoop);
        });

        return audio;
    }

    play(duration, volume) {
        this.updateTimeStart = true;
        this.duration = duration;
        this.audio.setVolume(volume);
        if (this.isPlaying) {
            if (!this.isLoop) {
                this.audio.stop();
                this.audio.play();
            }
            return;
        }

        this.audio.play();
        this.isPlaying = true;
    }

    stop() {
        // if (!this.isPlaying) return;
        this.audio.stop();
        this.isPlaying = false;
    }

    update(time) {
        if (this.updateTimeStart) {
            this.timeStart = time;
            this.updateTimeStart = false;
        }

        if (
            this.duration > 0 &&
            this.isPlaying &&
            time - this.timeStart > this.duration
        ) {
            this.stop();
        }
    }
}

// Singleton pattern in modern JS
const instance = new AudioManager();

export default instance;
