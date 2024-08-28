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

// Function to map hex color codes to color names
function getColorName(hexColor) {
    hexColor = hexColor.toLowerCase().replace('#', '');

    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);

    if (r > 200 && g < 50 && b < 50) {
        return "red";
    } else if (r < 50 && g > 200 && b < 50) {
        return "green";
    } else if (r < 50 && g < 50 && b > 200) {
        return "blue";
    } else if (r > 240 && g > 240 && b < 100) {
        return "yellow";
    } else if (r > 200 && g < 50 && b > 200) {
        return "magenta";
    } else if (r < 50 && g > 200 && b > 200) {
        return "cyan";
    } else if (r > 230 && g > 150 && b < 50) {
        return "orange";
    } else if (r > 240 && g < 180 && b < 200) {
        return "pink";
    } else if (r > 150 && g > 240 && b > 190) {
        return "teal";
    } else if (r > 150 && g < 50 && b < 50) {  // Corrected this line
        return "dark red";
    } else if (r < 100 && g < 100 && b < 100) {  // Corrected this line
        return "black";
    } else {
        return "a unique color";
    }
}

// Endpoint to handle LLM requests
app.get('/generate', async (req, res) => {
    const color1Hex = req.query.color1;
    const color2Hex = req.query.color2;
    const temperature = req.query.temperature;

    const color1 = getColorName(color1Hex);
    const color2 = getColorName(color2Hex);

    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            temperature: parseFloat(temperature), // Use the dynamic temperature value
            max_tokens: 100,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
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


// node server.js
// http://localhost:3000

