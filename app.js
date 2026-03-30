const API="https://script.google.com/macros/s/AKfycbzATWa2odLGXc8j_92SWX3RShyDXCyI8Nx8CqVl-LjU0MRrGPEqf-kGsrEIt8yEmgIuWg/exec";

let bloqueado=false;

let sonido;

document.body.addEventListener("click", ()=>{
  sonido = new Audio("https://drive.google.com/file/d/1ech4VhO76WcQtg_yJH8zU-PIUCbQSqiv/view?usp=sharing");
});
const qr=new Html5Qrcode("reader");

qr.start(
{facingMode:"environment"},
{fps:10,qrbox:200},
(texto)=>{

if(bloqueado) return;
bloqueado=true;

// 🔊 sonido
if(sonido){
  sonido.currentTime = 0;
  sonido.play().catch(()=>{});
}

// 📳 vibración
if(navigator.vibrate){
  navigator.vibrate(200);
}

fetch(API+"?codigo="+texto)
.then(r=>r.json())
.then(d=>{

document.getElementById("nombre").innerHTML=d.nombre || "";
document.getElementById("mensaje").innerHTML=d.mensaje || "";

// 🎨 estado
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

// 🖼️ FOTO
let foto=document.getElementById("foto");

if(d.foto){
  foto.src=d.foto;
  foto.style.display="block";
}else{
  foto.style.display="none";
}

setTimeout(()=>bloqueado=false,3000);

});

}
);
