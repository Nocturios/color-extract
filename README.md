# Color-extractor.js
##### Version 1.0.0

This module allows to extract colors from an image, sort them by frequency, convert them into different color formats, and detect color palettes in the image and group them into categories (such as warm colors, cool colors, etc.).

## Limited Image Processing Module

Functions
getColors(c)
This function takes in a canvas and returns an object containing the colors of the image and their frequency of appearance.

sortColorsByFrequency(c)
This function takes in a canvas and uses the getColors(c) function to extract the colors of the image, then sorts the colors by decreasing frequency.

hexToRgb(hex)
This function takes in a hexadecimal string (ex: "#ff0000") and returns an object containing the red, green and blue components.

maincolor(c)
This function takes in a canvas and returns the most frequent color in the image.

rgbToHex(rgb)
This function takes in the red, green, and blue components (between 0 and 255) and returns the color in hexadecimal format.

detectColorPalette(c)
This function takes in a canvas and uses a color clustering approach to detect color palettes in the image, grouping them into warm and cool categories.

# License #

Copyright (c) 2023 Nocturios <nocturios.shadow@gmail.com>
