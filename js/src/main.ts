// Working on This project :
// Mohammad Abdullah => N01516727
// Mohammad Saad => N01453014


const container: HTMLElement = document.querySelector(".container");
const trackStatus: HTMLElement = document.querySelector(".track-status");
const trackName: HTMLElement = document.querySelector(".track-name");
const progressBar: HTMLElement = document.querySelector(".progress");
const progress: HTMLElement = document.querySelector(".progress > div");
const music: HTMLAudioElement = document.querySelector("#audio");
const prevButton: HTMLElement = document.querySelector("#prev");
const playButton: HTMLElement = document.querySelector("#play");
const nextButton: HTMLElement = document.querySelector("#next");
const cover: HTMLImageElement = document.querySelector("#cover");

const songs: string[] = ["backplate", "barkbot-2000", "beautiful-ann", "mirrors"];

let songIndex: number = 0;

loadSong(songs[songIndex]);

function loadSong(song: string) {
	trackName.innerText = song.toUpperCase();
	music.src = `music/${song}.mp3`;
	cover.src = `img/${song}.jpg`;
}

function playSong() {
	playButton.classList.remove("fa-play");
	playButton.classList.add("fa-pause");
	container.classList.add("play");
	music.play();
}

function pauseSong() {
	container.classList.remove("play");
	playButton.classList.remove("fa-pause");
	playButton.classList.add("fa-play");
	music.pause();
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent: number = (currentTime / duration) * 100;
	progress.style.cssText = `width: ${progressPercent}%`;
}

function jumpTo(e) {
	const width: number = this.clientWidth;
	const clickPosition: number = e.offsetX;
	const duration: number = music.duration;

	music.currentTime = (clickPosition / width) * duration;
}

playButton.addEventListener("click", () => {
	const isPlaying: boolean = container.classList.contains("play");

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

prevButton.addEventListener("click", () => {
	prevSong();
});

nextButton.addEventListener("click", () => {
	nextSong();
});

music.addEventListener("timeupdate", updateProgress);

progressBar.addEventListener("click", jumpTo);

music.addEventListener("ended", nextSong);
