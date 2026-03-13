// 1. Declare the history array at the top so it's "global"
let chatHistory = []; 

async function sendMessage() {
    console.log("Button clicked!");
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const status = document.getElementById('status');
    const text = input.value;

    if (!text) return;

    // 2. Now 'chatHistory' will be recognized here
    history.innerHTML += `<div class="message user">${text}</div>`;
    chatHistory.push({ role: "user", parts: [{ text: text }] });
    
    // ... rest of your code
}
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
