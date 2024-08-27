const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (like your HTML, CSS, and JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle LLM requests
app.get('/generate', async (req, res) => {
    const color1 = req.query.color1;
    const color2 = req.query.color2;
    const temperature = req.query.temperature || 0.7;

    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            temperature: parseFloat(temperature),
            max_tokens: 100,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            messages: [
                { role: "system", content: "Your name is Lumina. You are a gentle and empathetic color therapist. You describe the healing properties and emotional effects of color gradients with warmth and sensitivity." },
                { role: "user", content: `In a soothing and natural tone, describe the healing energy and mood evoked by a gradient that starts with the revitalizing color ${color1} and gently transitions into the grounding warmth of ${color2}. Use descriptive language to express the feelings these colors might evoke.` }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.send(response.data.choices[0].message.content.trim());
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
