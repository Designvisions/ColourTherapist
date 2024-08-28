// colorRange.js

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
    } else if (r > 200 && g > 200 && b < 50) {
        return "yellow";
    } else if (r > 200 && g < 50 && b > 200) {
        return "magenta";
    } else if (r < 50 && g > 200 && b > 200) {
        return "cyan";
    } else if (r > 230 && g > 150 && b < 50) {
        return "orange";
    } else if (r > 240 && g < 150 && b > 150) {
        return "pink";
    } else if (r > 150 && g > 240 && b > 190) {
        return "teal";
    } else if (r > 150 && g < 50 && b < 50) {
        return "dark red";
    } else if (r < 100 && g < 100 && b < 100) {
        return "black";
    } else if (r > 200 && g > 200 && b > 200) {
        return "white";
    } else if (r > 150 && g > 150 && b > 150) {
        return "gray";
    } else if (r < 100 && g < 100 && b > 100) {
        return "dark blue";
    } else if (r > 100 && g > 50 && g < 150 && b > 50 && b < 150) {
        return "brown";
    } else if (r > 100 && g > 100 && b < 50) {
        return "gold";
    } else {
        return "a unique color";
    }
}

module.exports = getColorName;
