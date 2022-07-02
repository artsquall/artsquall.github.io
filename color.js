'use script';
function hexToRGB(hex) {
  return [parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5), 16)];
}

function rgbToHex(rgb) {
  let hex = '#';

  for(let r of rgb)
    hex += (r < 16 ? '0' : '') + r.toString(16);

  return hex;
}

function hexToHSV(hex) {
  let H, S, V;
  let [R, G, B] = hexToRGB(hex);
      R /= 255; G /= 255; B /= 255;
  let max = Math.max(R, G, B);
  let min = Math.min(R, G, B);
  let delta = max - min;

  // hue
  if(delta === 0) {
    H = 0;
  } else {
    switch(max) {
      case R: H = (G - B) / delta % 6; break;
      case G: H = (B - R) / delta + 2; break;
      case B:
      default: H = (R - G) / delta + 4;
    }
    H = numToDeg(H * 60);
  }
  // saturation
  S = (max === 0) ? 0 : delta / max;
  // value
  V = max;

  return [H, S, V];
}

function hsvToHex(hsv) {
  let rgb;
  let [H, S, V] = hsv;
  let chroma = V * S;
  let value = chroma * (1 - Math.abs(H / 60 % 2 - 1));
  let match = V - chroma;

  switch(true) {
    case (0 <= H && H < 60): rgb = [chroma, value, 0]; break;
    case (60 <= H && H < 120): rgb = [value, chroma, 0]; break;
    case (120 <= H && H < 180): rgb = [0, chroma, value]; break;
    case (180 <= H && H < 240): rgb = [0, value, chroma]; break;
    case (240 <= H && H < 300): rgb = [value, 0, chroma]; break;
    case (300 <= H && H < 360):
    default: rgb = [chroma, 0, value];
  }
  for(let i = 0; i < rgb.length; i++)
    rgb[i] = Math.round((rgb[i] + match) * 255);
  
  return rgbToHex(rgb);
}

function numToDeg(num) {
  return (num < 0) ? 360 + num : num % 360;
}
