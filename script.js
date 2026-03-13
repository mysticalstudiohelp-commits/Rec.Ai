// Global array to keep track of the conversation
let chatHistory = []; 

async function sendMessage() {
    console.log("Button clicked!");
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const status = document.getElementById('status');
    const text = input.value;

    if (!text) return;

    // Add user message to UI and history
    history.innerHTML += `<div class="message user">${text}</div>`;
    chatHistory.push({ role: "user", parts: [{ text: text }] });
    input.value = '';
    status.innerText = "AI is thinking...";

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDuF-Tyobn5i-0wAU3XCfuYYrPYyRkTrMM', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        // Add AI message to UI and history
        history.innerHTML += `<div class="message ai">${aiText}</div>`;
        chatHistory.push({ role: "model", parts: [{ text: aiText }] });
    } catch (error) {
        history.innerHTML += `<div class="message ai">Error: Could not connect to AI.</div>`;
    } finally {
        status.innerText = "";
        history.scrollTop = history.scrollHeight;
    }
}
