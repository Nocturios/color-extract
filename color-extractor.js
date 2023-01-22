const KMeans = require('kmeans');

function getColors(c) {
    if (!c || c.tagName !== "CANVAS") {
        throw new Error("Invalid canvas object");
      }
    var col, colors = {};
    var pixels, r, g, b, a;
    r = g = b = a = 0;
    pixels = c.getImageData(0, 0, c.width, c.height);
    for (var i = 0, data = pixels.data; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3]; 
        if (a < (255 / 2))
            continue; 
        col = rgbToHex(r, g, b);
        if (!colors[col])
            colors[col] = 0;
        colors[col]++;
    }
    return colors;
}
function mainColor(c) {
    let colors = getColors(c);
    let mainColor = "";
    let maxFrequency = 0;
    for (let color in colors) {
      if (colors[color] > maxFrequency) {
        maxFrequency = colors[color];
        mainColor = color;
      }
    }
    return mainColor;
  }

  function rgbToHex(rgb) {
    if (!rgb || !rgb.r || !rgb.g || !rgb.b) {
      throw new Error("Invalid RGB values");
    }
    if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255) {
      throw new Error("Invalid color component");
    }
    let hexR = rgb.r.toString(16).padStart(2, "0");
    let hexG = rgb.g.toString(16).padStart(2, "0");
    let hexB = rgb.b.toString(16).padStart(2, "0");
    return "#" + hexR + hexG + hexB;
  }

  function hexToRgb(hex) {
    if (!hex || hex.length < 3) {
      throw new Error("Invalid hex value");
    }
    if (hex.length === 4) {
      hex = hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    } else if (hex.length === 7) {
      hex = hex.substring(1);
    }
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return {r, g, b};
  }
  function sortColorsByFrequency(c) {
    let colors = getColors(c);
    let colorArray = Object.entries(colors);
    colorArray.sort((a, b) => b[1] - a[1]);
    return colorArray;
  }

  function detectColorPalette(c) {
    let colors = getColors(c);
    let colorArray = Object.entries(colors);
    let kmeans = new KMeans();
    kmeans.cluster(colorArray, 2);
    let clusters = kmeans.clusters;
    let warmCluster = clusters[0];
    let coolCluster = clusters[1];
    let warmHue = 0;
    for (let i = 0; i < warmCluster.length; i++) {
      let color = warmCluster[i][0];
      let hsl = hexToHsl(color);
      warmHue += hsl[0];
    }
    warmHue /= warmCluster.length;
    let coolHue = 0;
    for (let i = 0; i < coolCluster.length; i++) {
      let color = coolCluster[i][0];
      let hsl = hexToHsl(color);
      coolHue += hsl[0];
      warmHue /= warmCluster.length;
      coolHue /= coolCluster.length;
      let palette = {};
      if (warmHue < 60 && coolHue > 180) {
        palette.warm = warmCluster;
        palette.cool = coolCluster;
      } else {
        palette.warm = coolCluster;
        palette.cool = warmCluster;
      }
      return palette;
    }
  }

export { getColors, mainColor, rgbToHex, hexToRgb, sortColorsByFrequency, detectColorPalette };
