import { statisticsSceneLang } from '../itemDescription';

const dropDownMap = `
<select id="select-map" class="maps-parameters">
<option class="parameter all-maps-parameter" value="all">All tracks</option>
<option class="parameter" value="adelaidemap">Adelaide</option>
<option class="parameter" value="algarvemap">Algarve</option>
<option class="parameter" value="brandshatchmap">Brandshatch</option>
<option class="parameter" value="catalunyamap">Catalunya</option>
<option class="parameter" value="detroitmap">Detroit</option>
            </select>
            `;

// сортировка массива в листе по убыванию в зависимости от выбранного показателя
function sortArrByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

export function createDivElem(mainDiv, content, style) {
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

function filterArr(arr, parameter, value) {
  return arr.filter((elem) => elem[parameter] === value);
}

export function createTitle(mainDiv, lang) {
  const title = document.createElement('div');
  title.classList.add('stat-title');
  createDivElem(title, '#', 'stat-title-elem');
  createDivElem(title, `${statisticsSceneLang.driver[lang]}`, 'stat-title-elem');
  createDivElem(title, `${statisticsSceneLang.date[lang]}`, 'stat-title-elem');
  createDivElem(title, dropDownMap, 'stats-dropdown');
  createDivElem(title, `${statisticsSceneLang.car[lang]}`, 'stat-title-elem');
  createDivElem(title, `${statisticsSceneLang.bestLap[lang]}`, 'stat-title-elem');
  mainDiv.appendChild(title);
}

export function createGameResult(name, array, mainDiv, parameter, value) {
  let filteredArrByMap = [];
  if (value === 'all' || !value) {
    filteredArrByMap = array;
  } else {
    filteredArrByMap = filterArr(array, parameter, value);
  }
  filteredArrByMap.sort(sortArrByField('bestLapTime'));
  filteredArrByMap.forEach((game, index) => {
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
