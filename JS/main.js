import { startMap } from "./map.js";
import { startDrawBasic } from "./drawBasic.js";
import {
  gameData,
  getCountries,
  getCities,
  objectFinder,
} from "./questions.js";
import { startDrawChart } from "./drawChart.js";
import { asignAllowItem, createDropElement } from "./dragAndDrop.js";

var data = gameData.countries;
var timeracct = 0;
var timer = null;

var contDragElements = document.getElementById("contDrag");
var contDropElements = document.getElementById("contDrop");
var startButton = document.getElementById("start");
startButton.addEventListener("click", addQuestElements);

startItems();

/**
 * Añadimos los elemenos "drag and drop" a sus contenedores
 */
function addQuestElements() {
  startButton.disabled = true;
  nullTest();
  var randomCountries = getCountries(data);
  var randomCities = getCities(data, randomCountries);
  var randomCountriesClon = randomCountries;

  for (var acct = 0; acct < randomCities.length; acct++) {
    var dragElements = document.getElementsByTagName("template")[0];
    var dragClon = dragElements.content.cloneNode(true);
    var city = document.createTextNode(randomCities[acct]);
    var countryObject = objectFinder(data, randomCountries[acct]);
    dragClon.childNodes[1].appendChild(city);
    dragClon.childNodes[1].dataset.countryCode = countryObject[0].code;
    contDragElements.appendChild(dragClon);
  }

  while (randomCountriesClon.length != 0) {
    var numRandom = getRandomArbitrary(0, randomCountriesClon.length);
    var countryObject = objectFinder(data, randomCountriesClon[numRandom]);
    createDropElement(
      randomCountriesClon[numRandom],
      countryObject[0].code,
      contDropElements
    );
    randomCountriesClon.splice(numRandom, 1);
  }
  asignAllowItem();
}

/**
 * Incrementamos el timer cada segundo y los mostramos
 */
function myTimer() {
  timeracct++;
  document.getElementById("timer").innerHTML = "Tiempo : " + timeracct + "s";
}

/**
 * Comprobamos si el formulario ya se está mostrando, si es así lo eliminamos y reiniciamos el tiempo
 */
function nullTest() {
  if (contDragElements.childElementCount != 0) {
    while (contDragElements.childElementCount != 0) {
      contDragElements.childNodes[0].remove();
    }
  }
  if (contDropElements.childElementCount != 0) {
    while (contDropElements.childElementCount != 0) {
      contDropElements.childNodes[0].remove();
    }
  }
  if (timer != null) {
    clearInterval(timer);
    timeracct = 0;
  }
  timer = setInterval(myTimer, 1000);
}

/**
 * Inicializamos los items
 */
function startItems() {
  startMap();
  startDrawBasic();
  startDrawChart();
}

/**
 * Nos devuelve un número aleatorio entre 2 intervalos
 * @param {*} min intervalo mínimo
 * @param {*} max intervalo máximo
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export { timeracct, timer };
