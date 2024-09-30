// Check for browser support of Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const startBtn = document.getElementById('start-recording');
const transcriptDisplay = document.getElementById('transcript');

// Set language and other parameters
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startBtn.addEventListener('click', () => {
  recognition.start();
});

// Handle recognition results
recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  transcriptDisplay.textContent = `You said: ${transcript}`;

  // Send the recognized speech to the backend for processing
  const response = await fetch('/process-speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: transcript })
  });

  const data = await response.json();
  const reply = data.reply;

  // Speak the reply from the server
  const utterance = new SpeechSynthesisUtterance(reply);
  window.speechSynthesis.speak(utterance);
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};
