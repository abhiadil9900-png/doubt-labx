async function askAI() {

    const question =
        document.getElementById("question").value;

    const result =
        document.getElementById("result");

    if (!question.trim()) {
        result.innerHTML =
            "Please type a question!";
        return;
    }

    result.innerHTML =
        "Thinking...";

    // Paste OpenRouter API key
    const API_KEY =
    "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";

    try {

        const response =
        await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Authorization":
                `Bearer ${API_KEY}`,

                "HTTP-Referer":
                "http://localhost:5500",

                "X-Title":
                "AI Doubt Lab",

                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                model:
                "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: question
                    }
                ]
            })
        });

        const data =
        await response.json();

        console.log(data);

        if(data.choices){

            result.innerHTML =
            data.choices[0]
            .message.content;

        } else {

            result.innerHTML =
            JSON.stringify(data);
        }

    } catch(error) {

        console.log(error);

        result.innerHTML =
        "Error connecting AI!";
    }
}