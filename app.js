let escaneado = false;
const API_URL = "https://script.google.com/macros/s/AKfycbxBCQXgS1zMqGgsnXonAnNhfMSxJfCLC0D9HggetywaqjXsRJQbeqz8tIvb3H2w4J36Jg/exec";
window.onload = iniciar;

function iniciar(){

  const qr = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices => {

    if(devices.length === 0){
      document.getElementById("mensaje").innerHTML = "❌ No hay cámara";
      return;
    }

    let camara = devices[devices.length - 1];

    qr.start(
      camara.id,
      { fps:10, qrbox:250 },
      (texto) => {

        if(escaneado) return;
        escaneado = true;

        document.getElementById("mensaje").innerHTML = "⏳ Registrando...";

fetch(API_URL + "?codigo=" + texto)
.then(r=>r.text())
.then(data=>{
  document.getElementById("mensaje").innerHTML = data;
  setTimeout(()=> escaneado=false, 3000);
})
.catch(()=>{
  document.getElementById("mensaje").innerHTML = "❌ Error conexión";
  escaneado=false;
});

        setTimeout(()=> escaneado=false, 3000);
      }
    );

  }).catch(()=>{
    document.getElementById("mensaje").innerHTML = "❌ Permiso denegado";
  });
}
