const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const produccion = "http://adswsir.firebaseapp.com/";
const desarrollo = "http://127.0.0.1:8000/plataforma-fintech/";
var usandoURL = desarrollo;

function busca_user() {    
   
   


var db = firebase.database();
var ref = db.ref("proyectID");
     
var table = document.getElementById("tabla");
    
//limpia la tabla
table.innerHTML = "";
 
 //con esta función recorre todos los datos almacenados en FB ordenados por mi child(tipo)
    
ref.orderByChild("NombreProyecto").on("child_added", function(snapshot){
//repite el proceso como cuantas referencias encuentre y los asigna a la lista "d"
     
  var d = snapshot.val();        
        
  {
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  
  // asigna a las celdas el valir del Child especificado
  cell1.innerHTML = d.NombreProyecto;
  cell2.innerHTML = d.validarComite;
  }
 
        
});
 
}