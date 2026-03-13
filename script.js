// Keep history at the very top
let chatHistory = []; 

async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const status = document.getElementById('status');
    const text = input.value.trim(); // .trim() prevents sending empty spaces

    // 1. Check if input is empty
    if (!text) {
        console.log("Input is empty, not sending.");
        return;
    }

    // 2. Clear input and show status
    input.value = '';
    history.innerHTML += `<div class="message user">${text}</div>`;
    status.innerText = "Thinking...";

    // 3. Update history in the exact format Gemini requires
    chatHistory.push({
        role: "user",
        parts: [{ text: text }]
    });

    try {
        // Replace YOUR_KEY with a FRESH key from AI Studio
        const apiKey = "AIzaSyDuF-Tyobn5i-0wAU3XCfuYYrPYyRkTrMM"; 
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();

        // Check if the API returned an error message inside the successful response
        if (data.error) {
            throw new Error(data.error.message);
        }

        const aiText = data.candidates[0].content.parts[0].text;

        // 4. Update UI and History with AI response
        history.innerHTML += `<div class="message ai">${aiText}</div>`;
        chatHistory.push({
            role: "model",
            parts: [{ text: aiText }]
        });

    } catch (error) {
        console.error("Fetch Error:", error);
        history.innerHTML += `<div class="message ai">Error: ${error.message}</div>`;
    } finally {
        status.innerText = "";
        history.scrollTop = history.scrollHeight;
    }
}
