var data;
var options;

/**
 * Inicializamos la gráfica con unos parámetros predeterminados
 */
export function startDrawBasic() {
  google.charts.load("current", { packages: ["corechart", "line"] });
  google.charts.setOnLoadCallback(drawBasic);

  function drawBasic() {
    data = new google.visualization.DataTable();
    data.addColumn("number", "X");
    data.addColumn("number", "Tiempos");

    options = {
      title: "Tiempo por partida",
      hAxis: {
        title: "Intentos",
      },
      curveType: "function",
      vAxis: {
        title: "Tiempo",
      },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }
}

/**
 * Añadimos parámetros nuevos a la gráfica
 * @param {*} newRow Nuevo parámetro
 */
export function insertDataDrawBasic(newRow) {
  data.addRows([[newRow[0], newRow[1]]]);
  var chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
