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



var table = '<thead><th>Nombre de proyecto</th><th>Dinero Requerido (MXN)</th> <th>Dinero Recaudado (MXN)</th> <th>Estatus</th> <th>Fecha de Inicio</th> <th>Fecha de finalización </th> <th>Notificaciones</th> <th>Observaciones</th></thead>';
database.ref("proyectID/").on("child_added", function(snapshot){
  var nombresProyecto = Object.keys(snapshot.val());
  for(i=0; i<nombresProyecto.length ; i++){
    table += '<tbody>';
    table += '<tr><td>'+snapshot.val()[nombresProyecto[i]].NombreProyecto+'</td>';
    table += '<td>'+snapshot.val()[nombresProyecto[i]].Requerido+'</td>';
    table += '<td>'+snapshot.val()[nombresProyecto[i]].Recaudado+'</td>';
    
    if(snapshot.val()[nombresProyecto[i]].Requerido == snapshot.val()[nombresProyecto[i]].Recaudado){
      table += '<td>Aprobado</td>';
    }
    else{
       table += '<td>Pendiente</td>';
    }
    table += '<td>'+snapshot.val()[nombresProyecto[i]].fechaValComite+'</td>';
    table += '<td>'+snapshot.val()[nombresProyecto[i]].fechaValComite+'</td>';
    
    if(snapshot.val()[nombresProyecto[i]].Requerido == snapshot.val()[nombresProyecto[i]].Recaudado){
      table += '<td>Generar Orden de pago</td>';
      table += '<td>Sin observaciones</td>';

    }
    else{
       if(snapshot.val()[nombresProyecto[i]].validarFinalizar==1){
        table += '<td>Cancelar proyecto, tiempo de colecta vencido</td>';
         table += '<td>Devolver fondos recaudados</td>';
       }
       else{
        table += '<td>En espera de mas fondos</td>';
        table += '<td>Sin observaciones</td>';
       }
    }


  }
 table += '</tbody>'; 
  //alert(table);
  proyectosExistentes.innerHTML = table;
});
