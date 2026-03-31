const API="https://script.google.com/macros/s/AKfycbwZKYugFQQjO6sb9MLSkMhETq4v-nHqgYzs45J4tRdYWW3AGIThbmW2TAPl1xv7X8z-SQ/exec";

let bloqueado=false;
let sonido;

// 🔊 SONIDO (CORREGIDO)
document.body.addEventListener("click", ()=>{
  sonido = new Audio("https://drive.google.com/file/d/1ech4VhO76WcQtg_yJH8zU-PIUCbQSqiv/view?usp=sharing");
});

// 📷 ESCÁNER QR
const qr=new Html5Qrcode("reader");

qr.start(
{facingMode:"environment"},
{fps:10,qrbox:200},
(texto)=>{

if(bloqueado) return;
bloqueado=true;

// 🔊 sonido
if(sonido){
  sonido.currentTime=0;
  sonido.play().catch(()=>{});
}

// 📳 vibración
if(navigator.vibrate){
  navigator.vibrate(200);
}

// 🔍 consulta API
fetch(API+"?codigo="+texto)
.then(r=>r.json())
.then(d=>{

document.getElementById("nombre").innerHTML=d.nombre || "";
document.getElementById("mensaje").innerHTML=d.mensaje || "";

let estado=document.getElementById("estado");

if(d.estado==="ASISTENCIA"){
  estado.innerHTML="🟢 ASISTENCIA";
  estado.style.color="#22c55e";
}
else if(d.estado==="TARDANZA"){
  estado.innerHTML="🟡 TARDANZA";
  estado.style.color="#facc15";
}
else if(d.estado==="FALTA"){
  estado.innerHTML="🔴 FALTA";
  estado.style.color="#ef4444";
}
else{
  estado.innerHTML="⚠️ DUPLICADO";
  estado.style.color="#f97316";
}

// 🧑 FOTO
let foto=document.getElementById("foto");

if(d.foto && d.foto.startsWith("http")){
  foto.src=d.foto;
  foto.style.display="block";
}else{
  foto.src="";
  foto.style.display="none";
}

// 🔓 desbloqueo
setTimeout(()=>bloqueado=false,3000);

})
.catch(()=>{
  document.getElementById("mensaje").innerHTML="Error conexión";
  bloqueado=false;
});

}
);
