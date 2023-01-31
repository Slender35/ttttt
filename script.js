const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");

fileInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.onload = function() {
    const data = reader.result;
    const rows = data.split("\n");
    const processedData = {};
    for (const row of rows) {
      const columns = row.split(",");
      const id = columns[0];
      const unit = columns[1];
      const date = columns[2];

      if (!processedData[id]) {
        processedData[id] = {
          unit: unit,
          date: date
        };
      } else {
        if (date > processedData[id].date) {
          processedData[id].unit = unit;
          processedData[id].date = date;
        }
      }
    }

    let outputHTML = "";
    for (const id in processedData) {
      outputHTML += `<p>ID: ${id} | Unit: ${processedData[id].unit} | Date: ${processedData[id].date}</p>`;
    }
    output.innerHTML = outputHTML;
  };
  reader.readAsText(fileInput.files[0]);
});
