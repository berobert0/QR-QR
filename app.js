const API_URL = "https://script.google.com/macros/s/AKfycbxVsk37ktR2baptg0YCBgQKqZn1Vcyep5mQHVM5h9_kSWYw1Vxaj4d8OoZ-PDThXztO/exec";

function cargar(){

  fetch(API_URL + "?tipo=panel")
  .then(r=>r.json())
  .then(data=>{

    let html = "";

    data.reverse().forEach(d=>{

      let clase = "";

      if(d.estado.includes("ASISTENCIA")) clase="asistencia";
      else if(d.estado.includes("TARDANZA")) clase="tardanza";
      else if(d.estado.includes("FALTA")) clase="falta";
      else if(d.estado.includes("DUPLICADO")) clase="duplicado";

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
  .catch(()=>{
    alert("Error conexión con Apps Script");
  });
}

// 🔥 AUTO ACTUALIZA
setInterval(cargar, 5000);

cargar();
