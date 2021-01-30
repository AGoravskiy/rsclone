function createDivElem(mainDiv, content, style) {
  const elem = document.createElement('div');
  elem.classList.add(style);
  elem.innerHTML = content;
  mainDiv.appendChild(elem);
  return elem;
}

function getDay(str) {
  const regexpDay = /\d{4}-\d{2}-\d{2}/;
  return str.match(regexpDay);
}
function getMinutes(str) {
  const regexpMin = /\d{2}:\d{2}/;
  return str.match(regexpMin);
}

export function createGameResult(name, array, mainDiv) {
  array.forEach((game, index) => {
    const date = `${getDay(game.date)} ${getMinutes(game.date)}`;
    const row = document.createElement('div');
    row.classList.add('stat-row');
    createDivElem(row, index + 1, 'stat-row-elem');
    createDivElem(row, name, 'stat-row-elem');
    createDivElem(row, date, 'stat-row-elem');
    createDivElem(row, game.map, 'stat-row-elem');
    createDivElem(row, game.car, 'stat-row-elem');
    createDivElem(row, game.bestLapTime, 'stat-row-elem');
    mainDiv.appendChild(row);
  });
}

function createOption(select, value, text) {
  const option = document.createElement('option');
  option.classList.add('parameter');
  option.value = value;
  option.innerHTML = text;
  select.appendChild(option);
  return option;
}

function createDropDown() {
  const select = document.createElement('select');
  select.classList.add('maps-parameters');
  createOption(select, 'adelaidemap', 'Adelaide');
  createOption(select, 'algarvemap', 'Algarve');
  createOption(select, 'brandshatchmap', 'Brandshatch');
  createOption(select, 'catalunyamap', 'Catalunya');
  createOption(select, 'detroitmap', 'Detroit');
  return select;
}

const dropDownMap = `
<select class="maps-parameters">
<option class="parameter" value="all">All track</option>
<option class="parameter" value="adelaidemap">Adelaide</option>
<option class="parameter" value="algarvemap">Algarve</option>
<option class="parameter" value="brandshatchmap">Brandshatch</option>
<option class="parameter" value="catalunyamap">Catalunya</option>
<option class="parameter" value="detroitmap">Detroit</option>
            </select>
            `;

export function createTitle(mainDiv) {
  const title = document.createElement('div');
  title.classList.add('stat-title');
  createDivElem(title, 'Position', 'stat-title-elem');
  createDivElem(title, 'Nickname', 'stat-title-elem');
  createDivElem(title, 'Date', 'stat-title-elem');
  createDivElem(title, dropDownMap, 'stat-title-elem');
  createDivElem(title, 'Car', 'stat-title-elem');
  createDivElem(title, 'Best Lap', 'stat-title-elem');
  mainDiv.appendChild(title);
}

export function changeGameResultByMap() {
  let selectedMap = '';
  const select = document.querySelector('.maps-parameters');
  const result = document.querySelector('.stat-result');
  const options = [...document.querySelectorAll('.parameter')];
  console.log(selectedMap);
  select.addEventListener('change', () => {
    // result.innerHTML = '';
    selectedMap = options[select.selectedIndex].value;
    console.log(selectedMap);
  });
  return selectedMap;
}
