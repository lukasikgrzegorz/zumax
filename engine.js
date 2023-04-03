//------MOWA------

const synth = window.speechSynthesis;
const zuFace = document.querySelector(".zuFace");
const zuSmile = document.querySelector(".zuSmile");
const zuEye1 = document.querySelector(".zuEye1");
const zuEye2 = document.querySelector(".zuEye2");

let voices;
let defaultVoice = null;

window.speechSynthesis.onvoiceschanged = function () {
	voices = window.speechSynthesis.getVoices();
	defaultVoice = voices.filter((voice) => voice.name === "Google polski")[0];
	console.log(defaultVoice);
};

const zuSpeak = (text) => {
	if (synth.speaking) {
		console.error("speechSynthesis.speaking");
		return;
	}
	const sentence = new SpeechSynthesisUtterance(text);
	if (defaultVoice) sentence.voice = defaultVoice;
	sentence.pitch = 1.5;
	sentence.rate = 1;
	synth.speak(sentence);
};

zuSmile.addEventListener("end", (event) => {
	zuEar.start();
});

//------SŁUCH------

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let zuEar = new SpeechRecognition();
zuEar.lang = "pl-PL";
zuEar.interimResults = false;
zuEar.maxAlternatives = 1;
let earResult = null;
zuEar.onresult = function (event) {
	earResult = event.results[0][0].transcript;
	zuSpeak(earResult);
	mode = 0;
};

zuEar.onspeechend = function () {
	zuEar.stop();
	mode = 0;
};

zuEar.onnomatch = function (event) {
	mode = 0;
};

zuEar.onerror = function (event) {
	mode = 0;
};

//------REKURENCJA------

let mode = 0;
let hello = 0;

function start() {
	setTimeout(function () {
		if (synth.speaking && !zuSmile.classList.contains("zuSmileAnim")) {
			zuSmile.classList.add("zuSmileAnim");
		}
		if (!synth.speaking && zuSmile.classList.contains("zuSmileAnim")) {
			zuSmile.classList.remove("zuSmileAnim");
		}
		if (mode === 1) {
			zuEye1.classList.add("zuFocusEye");
			zuEye2.classList.add("zuFocusEye");
		}
		if (mode === 0) {
			zuEye1.classList.remove("zuFocusEye");
			zuEye2.classList.remove("zuFocusEye");
		}
		start();
	}, 500);
}
start();

zuFace.addEventListener("click", () => {
	if (mode === 0) {
		if (hello === 0)
			zuSpeak("Cześć Zuziu. Jestem zumaks. Potrafię po Tobie powtarzać. Spróbujemy?");
		zuEar.start();
		mode = 1;
		hello = 1;
	}
});
