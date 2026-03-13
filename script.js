// Use the API_KEY variable defined in config.js
async function sendMessage() {
    console.log("Button clicked!");
    const input = document.getElementById('user-input');
    const text = input.value;
    if (!text) return;

    // ... (rest of your logic from before) ...
    // Use this URL format:
    // Replace the entire fetch line with this
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDZO_SKyKMTazgtGQxWxlZq7CH1_8ykypk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: chatHistory })
});
    
    // ... (fetch call using 'url') ...
}
