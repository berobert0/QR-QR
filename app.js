let escaneado = false;

const API_URL = "https://script.google.com/macros/s/AKfycbySEBUkBSjSlpnRTL5h54OQjwcvKZFprurDSMhBILYqc_FpdihEAYLH8Kk3Jk_plUprig/exec";

// 🔊 sonido
const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");

window.onload = iniciar;

function iniciar(){

  const qr = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices => {

    let camara = devices[devices.length - 1];

    qr.start(camara.id,{fps:10,qrbox:250},(texto)=>{

      if(escaneado) return;
      escaneado = true;

      // 🔊 sonido
      audio.play();

      // 📳 vibración
      if(navigator.vibrate){
        navigator.vibrate(200);
      }

      fetch(API_URL + "?codigo=" + texto)
      .then(r=>r.json())
      .then(data=>{

        document.getElementById("nombre").innerHTML = data.nombre;

        let estado = document.getElementById("estado");

        if(data.estado === "ASISTENCIA"){
          estado.innerHTML = "🟢 ASISTENCIA";
          estado.style.color="#22c55e";
        }
        else if(data.estado === "TARDANZA"){
          estado.innerHTML = "🟡 TARDANZA";
          estado.style.color="#facc15";
        }
        else if(data.estado === "FALTA"){
          estado.innerHTML = "🔴 FALTA";
          estado.style.color="#ef4444";
        }
        else{
          estado.innerHTML = "⚠️ YA MARCÓ HOY";
          estado.style.color="#f97316";
        }

        // 🖼️ FOTO
        const foto = document.getElementById("foto");

        if(data.foto){
          foto.src = data.foto;
          foto.style.display = "block";
        }else{
          foto.style.display = "none";
        }

        setTimeout(()=> escaneado=false, 3000);

      });

    });

  });

}
