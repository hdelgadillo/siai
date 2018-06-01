const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const produccion = "http://adswsir.firebaseapp.com/";
const desarrollo = "http://127.0.0.1:8000/plataforma-fintech/";
var usandoURL = desarrollo;

auth.onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('btnIniciarSesion').style.display = 'none'; 
  } else {
    document.getElementById('btnIniciarSesion').style.display = 'block';
  }
});

proyectosExistentes = document.getElementById('proyectosExistentes');



var table = '<thead><th>Inversionista</th><th>Fondos Donados</th><th>Pago a Inversionista a 12 meses(ganancia del 7%)</th><th>Pago con prestamo con interes del 15%</th><th>Pago del préstamo más la ganancia</th></thead>';
database.ref("inverID/").on("value", function(snapshot){
  var nombresProyecto = Object.keys(snapshot.val());
  for(i=0; i<nombresProyecto.length ; i++){
    table += '<tbody>';
    table += '<tr><td>'+snapshot.val()[nombresProyecto[i]].Nombre+'</td>';
  
      table += '<td>'+snapshot.val()[nombresProyecto[i]].Donado+'</td>';
       table += '<td>'+(snapshot.val()[nombresProyecto[i]].Donado/12)*1.07+'</td>';
        table += '<td>'+(((snapshot.val()[nombresProyecto[i]].Donado/12)+(snapshot.val()[nombresProyecto[i]].Donado)*.15))+'</td>';
         table += '<td>'+(((snapshot.val()[nombresProyecto[i]].Donado/12)*1.07)+ (((snapshot.val()[nombresProyecto[i]].Donado/12)+(snapshot.val()[nombresProyecto[i]].Donado)*.15)))+'</td>';
   
  }
 table += '</tbody>'; 
  //alert(table);
  proyectosExistentes.innerHTML = table;
});