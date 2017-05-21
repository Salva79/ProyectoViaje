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
			}else{
				estilosAlerta();
				$('#info').html("No exiten Pedidos");
				console.log("No exiten Pedidos");
				eliminarAlerta();
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				estilosAlerta();
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
				eliminarAlerta();	
			}else{
				estilosAlerta();
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "../index.html";			
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
			}else{
				estilosAlerta();
				$('#info').html("No exiten Pedidos");
				console.log("No exiten Pedidos");
				eliminarAlerta();
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				estilosAlerta();
				$('#info').html("Error, usuario no registrado");
				console.log("Error, usuario no registrado");
				eliminarAlerta();	
			}else{
				estilosAlerta();
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "../index.html";			
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

function estilosinfo() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-success');
}
function eliminarinfo() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-success');}, 2500);
}
function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}
function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');}, 2500);
}
function eliminarStorage(){
	sessionStorage.removeItem("userToken");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("userTtl");
	sessionStorage.removeItem("userCreated");
	sessionStorage.removeItem("userNombre");
	sessionStorage.removeItem("userApellidos");
	sessionStorage.removeItem("userDNI");
	sessionStorage.removeItem("userTelefono");
	sessionStorage.removeItem("userCurso");
	sessionStorage.removeItem("userusername");
	sessionStorage.removeItem("userEmail");
	sessionStorage.removeItem("userpassword");
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId");
	sessionStorage.removeItem("usernCentro");
	sessionStorage.removeItem("usernObjetivo");
}
function cargarDatos(){
	var nombre = ("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#botonPerfil").html(nombre);
	var cadena = "<div class='listado'>";
	for(var i=0 ; i<arrayPedidos.length ; i++){
		var anyo = arrayFechas[i].substring(0,4);
		var mes = arrayFechas[i].substring(5,7);
		var dia = arrayFechas[i].substring(8,10);
		cadena = cadena + (i+1) + " - Fecha de Pedido: " + dia + " - " + mes + " - " + anyo + "<br>       Cantidad: " + arrayDetalles[i][0] + "€    -    Entregado: " + arrayDetalles[i][1] + "€<br>";
	}
	cadena = cadena + "</div>";
	$("#contienelistados").html(cadena);
}

$(document).ready(function() {
	cargarDatos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
})