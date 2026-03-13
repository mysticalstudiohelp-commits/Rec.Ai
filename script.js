let chatHistory = []; 

async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const status = document.getElementById('status');
    const text = input.value.trim();

    if (!text) return;

    // Update UI
    history.innerHTML += `<div class="message user">${text}</div>`;
    chatHistory.push({ role: "user", parts: [{ text: text }] });
    input.value = '';
    status.innerText = "Gemini is thinking...";

    try {
        // CHANGED TO v1beta and ensures correct model name
        const apiKey = "AIzaSyDuF-Tyobn5i-0wAU3XCfuYYrPYyRkTrMM"; 
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const aiText = data.candidates[0].content.parts[0].text;

        // Add AI response to UI
        history.innerHTML += `<div class="message ai">${aiText}</div>`;
        chatHistory.push({ role: "model", parts: [{ text: aiText }] });

    } catch (error) {
        console.error("Fetch Error:", error);
        history.innerHTML += `<div class="message ai">Error: ${error.message}</div>`;
    } finally {
        status.innerText = "";
        history.scrollTop = history.scrollHeight;
    }
}
