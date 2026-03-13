let chatHistory = []; 

async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const status = document.getElementById('status');
    const text = input.value.trim();

    if (!text) return;

    // 1. Display user message
    history.innerHTML += `<div class="message user">${text}</div>`;
    chatHistory.push({ role: "user", parts: [{ text: text }] });
    input.value = '';
    status.innerText = "Gemini is thinking...";

    try {
        // 2. Setup API details
        const apiKey = "AIzaSyA0AZCTgvrigqcZda6iR0BvP8s-a8VtQLA"; 
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // 3. Make the request
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();

        // 4. Handle API errors
        if (data.error) {
            throw new Error(data.error.message);
        }

        // 5. Extract AI text and update UI
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            history.innerHTML += `<div class="message ai">${aiText}</div>`;
            chatHistory.push({ role: "model", parts: [{ text: aiText }] });
        } else {
            throw new Error("No response from AI.");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        history.innerHTML += `<div class="message ai">Error: ${error.message}</div>`;
    } finally {
        // 6. Reset status and scroll to bottom
        status.innerText = "";
        history.scrollTop = history.scrollHeight;
    }
}
