'use strict';
function generatePalette() {
  let num = getFormVal('Size');
  let hex = getFormVal('HexCode');
  let [H, S, V] = hexToHSV(hex);
  let hueIncr = getFormVal('HueIncr');
  let satIncr = getFormVal('SatIncr') / 100;
  let valDecr = getFormVal('ValDecr') / 100;
  let hueDecr = getFormVal('HueDecr');
  let satDecr = getFormVal('SatDecr') / 100;
  let valIncr = getFormVal('ValIncr') / 100;
  let hues = [], sats = [], vals = [], hexes = [];

  // shades
  for (let i = 0; i < num; i++) {
    let newH = H + hueIncr * i;
    let newS = S + satIncr * i;
    let newV = V - valDecr * i;

    if (newS > 1) newS = 1;
    else if (newS < 0) newS = 0;

    if (newV > 1) newV = 1;
    else if (newV < 0) newV = 0;

    let c = hsvToHex([newH, newS, newV]);

    hues.push(numToDeg(Math.round(newH)));

    newS = Math.round(newS * 100);
    sats.push(newS);

    newV = Math.round(newV * 100);
    vals.push(newV);

    hexes.push(c);
  }

  // make table
  d3.selectAll('table').remove();

  let name = hex.substring(1);
  let tableShades = d3.select('.table').append('table').attr('id', 'shades' + name);
  tableShades.append('tr').attr('id', 'rowColors' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowColors' + name).append('td')
      .attr('style', 'background-color: ' + hexes[col]);
  }
  tableShades.append('tr').attr('id', 'rowHexes' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowHexes' + name).append('td')
      .text(hexes[col]);
  }
  tableShades.append('tr').attr('id', 'rowHues' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowHues' + name).append('td')
      .text(hues[col]);
  }
  tableShades.append('tr').attr('id', 'rowSat' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowSat' + name).append('td')
      .text(sats[col]);
  }
  tableShades.append('tr').attr('id', 'rowVal' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowVal' + name).append('td')
      .text(vals[col]);
  }

  

  hues = [], sats = [], vals = [], hexes = [];
  // tints
  for (let i = 0; i < num; i++) {
    let newH = H - hueDecr * i;
    let newS = S - satDecr * i;
    let newV = V + valIncr * i;

    if (newS > 1) newS = 1;
    else if (newS < 0) newS = 0;

    if (newV > 1) newV = 1;
    else if (newV < 0) newV = 0;

    let c = hsvToHex([newH, newS, newV]);

    hues.push(numToDeg(Math.round(newH)));

    newS = Math.round(newS * 100);
    sats.push(newS);

    newV = Math.round(newV * 100);
    vals.push(newV);

    hexes.push(c);
  }

  let tableTints = d3.select('.table').append('table').attr('id', 'shades' + name);
  tableTints.append('tr').attr('id', 'rowColors2' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowColors2' + name).append('td')
      .attr('style', 'background-color: ' + hexes[col]);
  }
  tableTints.append('tr').attr('id', 'rowHexes2' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowHexes2' + name).append('td')
      .text(hexes[col]);
  }
  tableTints.append('tr').attr('id', 'rowHues2' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowHues2' + name).append('td')
      .text(hues[col]);
  }
  tableTints.append('tr').attr('id', 'rowSat2' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowSat2' + name).append('td')
      .text(sats[col]);
  }
  tableTints.append('tr').attr('id', 'rowVal2' + name);
  for (let col = 0; col < num; col++) {
    d3.select('#rowVal2' + name).append('td')
      .text(vals[col]);
  }
}

function getFormVal(form) {
  return d3.select('#form' + form).property('value');
}
