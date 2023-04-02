const synth = window.speechSynthesis;
const zuFace = document.querySelector(".zuFace");
const zuSmile = document.querySelector(".zuSmile");
let voices, defaultVoice;

window.speechSynthesis.onvoiceschanged = function () {
	voices = window.speechSynthesis.getVoices();
	defaultVoice = voices.filter((voice) => voice.name === "Google polski")[0];
};

const zuSpeak = (text) => {
	if (synth.speaking) {
		console.error("speechSynthesis.speaking");
		return;
	}
	const sentence = new SpeechSynthesisUtterance(text);
	sentence.voice = defaultVoice;
	sentence.pitch = 1.5;
	sentence.rate = 1;
	synth.speak(sentence);
};

function start() {
	setTimeout(function () {
		if (synth.speaking && !zuSmile.classList.contains("zuSmileAnim")) {
			zuSmile.classList.add("zuSmileAnim");
		}
		if (!synth.speaking && zuSmile.classList.contains("zuSmileAnim")) {
			zuSmile.classList.remove("zuSmileAnim");
		}
		start();
	}, 500);
}

start();

console.log(zuSmile);

zuFace.addEventListener("click", () => {
	zuSpeak("Cześć Zuziu. Jestem zumaks, w co się dzisiaj bawimy");
});
