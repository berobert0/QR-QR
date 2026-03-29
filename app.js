const API_URL = "https://script.google.com/macros/s/AKfycbxFSF6LFpaIOSoR3AUAYKqIV1lxG5Wz5b5lLMFRZQLi_HoXFrnslQgUffyNMJe03PZRYw/exec";

function cargar(){

  fetch(API_URL + "?tipo=panel")
  .then(r=>r.json())
  .then(data=>{

    let html = "";

    data.reverse().forEach(d=>{

      let clase = "";

      if(d.estado === "ASISTENCIA") clase="asistencia";
      else if(d.estado === "TARDANZA") clase="tardanza";
      else if(d.estado === "FALTA") clase="falta";

      html += `
      <tr>
        <td>${d.codigo}</td>
        <td>${d.nombre}</td>
        <td>${d.fecha}</td>
        <td>${d.hora}</td>
        <td class="${clase}">${d.estado}</td>
      </tr>`;
    });

    document.getElementById("tabla").innerHTML = html;

  })
  .catch(err=>{
    console.error(err);
    alert("Error conectando con Apps Script");
  });
}

// 🔥 ACTUALIZA SOLO
setInterval(cargar, 3000);

cargar();
