
document.getElementById('chatbox').addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = document.getElementById('input');
    const questionText = input.value.trim();
    if (!questionText) return;
    input.value = '';

    const chatWindow = document.getElementById('chat-window');

    const question = document.createElement('p');
    question.className = 'quest';
    question.textContent = questionText;
    chatWindow.appendChild(question);

    const answer = document.createElement('p');
    answer.className = 'ans';
    answer.textContent = await getGeminiResponse
    (questionText);
    chatWindow.appendChild(answer);

    chatWindow.scrollTop = chatWindow.scrollHeight;
});

async function getGeminiResponse(text) {
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAlETNKq4cGJl2t-6JA50MQcQaStLaVsO4",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text }]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return `[Error ${response.status}]: ${errorText}`;
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[Unexpected response format]";
    } catch (err) {
        return `[Fetch Error]: ${err.message}`;
    }
}
