// llmConfig.js

let config = {
    temperature: 0.7,
    top_p: 0.9,
    frequency_penalty: 0.5,
    presence_penalty: 0.5
};

function getLLMParameters(color1, color2) {
    return {
        model: "gpt-3.5-turbo",  // Fixed model
        temperature: config.temperature,
        max_tokens: 100,
        top_p: config.top_p,
        frequency_penalty: config.frequency_penalty,
        presence_penalty: config.presence_penalty,
        messages: [
            {
                role: "system",
                content: "Your name is Lumina. You are a gentle and empathetic color therapist. You describe the healing properties and emotional effects of color gradients with warmth and sensitivity."
            },
            {
                role: "user",
                content: `Imagine a healing journey through the intricate dance of colors, starting with the serene embrace of ${color1} and gently transitioning into the grounding warmth of ${color2}. Use descriptive language to express the feelings these colors might evoke.`
            }
        ]
    };
}

function updateLLMConfig(newConfig) {
    config = { ...config, ...newConfig };
}

module.exports = { getLLMParameters, updateLLMConfig };
