const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const statusElement = document.getElementById('status');
const resultElement = document.getElementById('result');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

let recognizing = false;

// Start voice recognition
startButton.addEventListener('click', () => {
    if (recognizing) return;
    recognition.start();
    statusElement.textContent = 'Listening...';
    recognizing = true;
});

// Stop voice recognition
stopButton.addEventListener('click', () => {
    if (!recognizing) return;
    recognition.stop();
    statusElement.textContent = 'Click "Start" to speak';
    recognizing = false;
});

// Handle speech recognition results
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultElement.textContent = `You said: ${transcript}`;
    speak(`You said ${transcript}`);
};

// Handle speech recognition errors
recognition.onerror = (event) => {
    statusElement.textContent = `Error: ${event.error}`;
};

// Speak out a response
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Handle end of speech recognition
recognition.onend = () => {
    if (recognizing) {
        recognition.start();
    }
};
