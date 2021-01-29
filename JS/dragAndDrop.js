import { flyTo } from "./map.js";
import { objectFinder, gameData } from "./questions.js";
import { addDataDrawChart } from "./drawChart.js";
import { insertDataDrawBasic } from "./drawBasic.js";
import { timeracct, timer } from "./main.js";

var gameAcct = 1;
var correctFields = 0;
var data = gameData.countries;
var startButton = document.getElementById("start");

/**
 * Asignamos propiedades drag y drop a elementos que contengan las clases ".draggable" y ".droppable"
 */
export function asignAllowItem() {
  $(".draggable").draggable({
    stop: function () {
      var droppable = $(".droppable");
      for (var acct = 0; acct < droppable.length; acct++) {
        if (droppable[acct].className == "droppable ui-droppable") {
          droppable[acct].style.backgroundColor = "white";
        }
      }
    },
    revert: true,
  });
  $(".droppable").droppable({
    over: function (event) {
      if (!$(this).hasClass("success")) {
        event.target.style.backgroundColor = "whitesmoke";
      }
    },
    out: function (event) {
      if (!$(this).hasClass("success")) {
        event.target.style.backgroundColor = "white";
      }
    },

    drop: function (eDroppable, eDraggable) {
      if (
        eDroppable.target.dataset.countryCode ==
        eDraggable.draggable[0].dataset.countryCode
      ) {
        $(this).css("background-color", "lightgreen");
        $(this).addClass("success");
        correctFields++;
        if (correctFields == 5) {
          startButton.disabled = false;
          insertDataDrawBasic([gameAcct, timeracct]);
          gameAcct++;
          correctFields = 0;
          clearInterval(timer);
        }
        $(eDraggable.draggable).draggable("option", "revert", false);
        $(eDraggable.draggable).draggable("disable");
        var city = eDraggable.draggable[0].innerHTML;
        var country = eDroppable.target.innerHTML;
        var countryObject = objectFinder(data, country);
        var cityObject = countryObject[0].cities.filter((e) => e.name == city);
        flyTo(cityObject[0].location[0], cityObject[0].location[1], city);
        addDataDrawChart([country, 1]);
      }
    },
  });
}

/**
 * Creamos un elemento Drop y lo mostramos
 * @param {*} nameField nombre del campo
 * @param {*} dataContent contenido para "countryCode"
 * @param {*} contDropElements contenedor del DropElements
 */
export function createDropElement(nameField, dataContent, contDropElements) {
  var dropElements = document.getElementsByTagName("template")[1];
  var country = document.createTextNode(nameField);
  var dropClon = dropElements.content.cloneNode(true);
  dropClon.childNodes[1].appendChild(country);
  dropClon.childNodes[1].dataset.countryCode = dataContent;
  contDropElements.appendChild(dropClon);
}
