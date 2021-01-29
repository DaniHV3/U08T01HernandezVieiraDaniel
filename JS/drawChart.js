var elements = [
  ["Task", "Hours per Day"],
  ["inicialize", 0],
];
/**
 *
 */
export function startDrawChart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
}

/**
 * Calculamos las veces que se ha añadido el parámetro por entrada y hacemos un incremento para poder mostrarlo
 * @param {*} data Parámetro que se añadirá a la gráfica circular
 */
export function addDataDrawChart(data) {
  var existenceValidator = false;
  for (var acct = 0; acct < elements.length; acct++) {
    if (elements[acct][0] == data[0]) {
      elements[acct] = [data[0], data[1] + 1];
      existenceValidator = true;
    }
  }

  if (!existenceValidator) {
    elements.push(data);
  }
  addDataToChart(elements);
}

/**
 * Añadimos un elemento a la gráfica circular
 * @param {*} elementsUpdate elemento que se añadirá a la gráfica circular
 */
function addDataToChart(elementsUpdate) {
  var data = google.visualization.arrayToDataTable(elementsUpdate);

  data.If.push();
  var options = {
    title: "Ocurrencias de Países",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

/**
 * Inicializamos la gráfica circular con parámetros predeterminados
 */
function drawChart() {
  var data = google.visualization.arrayToDataTable(elements);

  data.If.push();
  var options = {
    title: "Ocurrencias de Países",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
