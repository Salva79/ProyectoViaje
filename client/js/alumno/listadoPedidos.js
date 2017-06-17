var direccionPedidos = '/api/Pedidos?filter={"where":{"userId":"' + sessionStorage.userId + '"}}&access_token=' + sessionStorage.userToken;
var arrayPedidos = [];
var arrayObjetivos = [];
var arrayFechas = [];
var arrayDetalles = [];
function obtenerPedidosDisponibles(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					arrayPedidos[i] = respuesta[i].id;
					arrayFechas[i] = respuesta[i].FechaPedido;
				}
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}
function obtenerDetallesDisponibles(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					var objeto = [respuesta[i].CantidadPedido,respuesta[i].CantidadEntrega];
					arrayDetalles.push(objeto);	
				}
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}
function obtenerDetallesPedido(){
	for(var i=0; i<arrayPedidos.length; i++){
		var direccionDetalles = '/api/Pedidos/' + arrayPedidos[i] + '/detallesPedidos?access_token=' + sessionStorage.userToken;
		obtenerDetallesDisponibles('GET','',direccionDetalles);	
	}
}

obtenerPedidosDisponibles('GET','',direccionPedidos);
obtenerDetallesPedido();

/* Eliminar los valores de sesión */
function eliminarStorage(){ 
	sessionStorage.removeItem("userToken");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("userTtl");
	sessionStorage.removeItem("userCreated");
	sessionStorage.removeItem("userNombre");
	sessionStorage.removeItem("userApellidos");
	sessionStorage.removeItem("userDni");
	sessionStorage.removeItem("userTelefono");
	sessionStorage.removeItem("userCurso");
	sessionStorage.removeItem("userUsername");
	sessionStorage.removeItem("userEmail");
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId"); 
	sessionStorage.removeItem("NombreCentro"); 
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
	sessionStorage.removeItem("userIdAlumnado");
	sessionStorage.removeItem("NombreObjetivo");     
}

function cargarDatos(){
	var nombre = ("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#botonPerfil").html(nombre);
	var cadena = "";
	if(arrayPedidos.length > 0){
		for(var i=0 ; i<arrayPedidos.length ; i++){
			var anyo = arrayFechas[i].substring(0,4);
			var mes = arrayFechas[i].substring(5,7);
			var dia = arrayFechas[i].substring(8,10);
			cadena = cadena + (i+1) + " - Fecha de Pedido: " + dia + " - " + mes + " - " + anyo + "<br>       Cantidad: " + arrayDetalles[i][0] + "€    -    Entregado: " + arrayDetalles[i][1] + "€<br>";
		}
	}else{
		cadena = "No dispones de pedidos realizados";
	}
	$("#contienelistados").html(cadena);
}

$(document).ready(function() {
	cargarDatos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})