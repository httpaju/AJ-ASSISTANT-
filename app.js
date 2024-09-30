const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.getElementById('start-recording');
const transcriptDisplay = document.getElementById('transcript');
const siriResponseDisplay = document.getElementById('siri-response');

startBtn.addEventListener('click', () => {
  recognition.start();
});

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
  const assistantReply = data.reply;
  siriResponseDisplay.textContent = `Siri: ${assistantReply}`;

  // Speak the assistant's reply
  const utterance = new SpeechSynthesisUtterance(assistantReply);
  window.speechSynthesis.speak(utterance);
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

