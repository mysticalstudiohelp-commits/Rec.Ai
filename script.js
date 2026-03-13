// Use the API_KEY variable defined in config.js
async function sendMessage() {
    console.log("Button clicked!");
    const input = document.getElementById('user-input');
    const text = input.value;
    if (!text) return;

    // ... (rest of your logic from before) ...
    // Use this URL format:
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    // ... (fetch call using 'url') ...
}
