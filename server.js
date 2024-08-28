const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const { getLLMParameters, updateLLMConfig } = require('./llmConfig');
const getColorName = require('./colorRange');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle LLM requests
app.get('/generate', async (req, res) => {
    const color1Hex = req.query.color1;
    const color2Hex = req.query.color2;
    const color1 = getColorName(color1Hex);
    const color2 = getColorName(color2Hex);
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const llmParameters = getLLMParameters(color1, color2);

        const response = await axios.post('https://api.openai.com/v1/chat/completions', llmParameters, {
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

// Endpoint to update LLM config
app.post('/update-config', (req, res) => {
    updateLLMConfig(req.body);
    res.json({ message: 'Configuration updated successfully!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
