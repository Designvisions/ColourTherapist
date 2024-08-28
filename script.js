// Select relevant DOM elements
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var emotionDescription = document.getElementById("emotionDescription");
var generateEmotionButton = document.getElementById("generateEmotion");

console.log("Script loaded and elements selected."); // Confirm script is running

// Function to set the background gradient
function setGradient() {
    body.style.background = 
        "linear-gradient(to right, " 
        + color1.value 
        + ", " 
        + color2.value 
        + ")";
    console.log("Gradient set to: " + body.style.background); // Log gradient
}

// Function to map slider value (0-100) to temperature (0.0-1.0)
function mapSliderValueToTemperature(value) {
    return value / 100;
}

// Event listener to update the slider label and temperature dynamically
document.getElementById("temperatureSlider").addEventListener("input", function() {
    const sliderValue = this.value;
    const label = document.getElementById("sliderValue");
    const level = Math.ceil((sliderValue / 100) * 10); // Calculate the level 1-10
    label.textContent = `Creativity Level: ${level}`;
    
    // Call the function to update the temperature value
    const temperature = mapSliderValueToTemperature(sliderValue);
    console.log(`Updated Temperature: ${temperature}`); // Log the dynamic temperature
});

// Function to get emotion description from the server
async function getEmotionDescription(colors) {
    const temperatureSlider = document.getElementById("temperatureSlider");
    const temperature = mapSliderValueToTemperature(temperatureSlider.value);

    console.log(`Temperature: ${temperature}`); // Log the temperature value

    const response = await fetch(`/generate?color1=${encodeURIComponent(colors[0])}&color2=${encodeURIComponent(colors[1])}&temperature=${temperature}`);
    
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const description = await response.text();
    return description.trim();
}

generateEmotionButton.addEventListener("click", async function() {
    try {
        console.log("Button clicked"); // Log button click
        const colors = [color1.value, color2.value];
        const description = await getEmotionDescription(colors);
        emotionDescription.textContent = ` ${description}`; 
        console.log("Description set: " + description); // Log the description
    } catch (error) {
        emotionDescription.textContent = `Error: ${error.message}`;
        console.error("Error occurred: ", error); // Log any errors
    }
});

// Event listeners for color inputs to update the gradient in real-time
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);

// Initial gradient setup
setGradient();
