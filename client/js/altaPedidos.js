var producto;
var cantidadPedida;
var cantidadEntrega;

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
	sessionStorage.removeItem("userPassword");
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId"); 
	sessionStorage.removeItem("NombreCentro"); 
	sessionStorage.removeItem("CodigoCentro");
	sessionStorage.removeItem("LocalidadCentro");
	sessionStorage.removeItem("userIdAlumnado");
	sessionStorage.removeItem("NombreObjetivo");     
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#alumno").val(0);
	$("#producto").val(0);
	$("#fecha").val("");
	$("#cantidadPedida").val("");
	$("#cantidadEntrega").val(0);
}

/* Función para obtener los alumnos */
function obtenerAlumnos(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		var cadena = '<option value="0">Selecciona un alumno</option>';
		if(respuesta.length > 0){
			for(var i = 0; i < respuesta.length; i++){
				cadena = cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].DNI + " " + respuesta[i].Nombre + " " + respuesta[i].Apellidos + '</option>';
			}
			$("#alumno").html(cadena);
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("No hay alumnos disponibles");
		}
	});
}

/* Función para obtener los productos */
function obtenerProductos(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		var cadena = '<option value="0">Selecciona un producto</option>';
		if(respuesta.length > 0){
			for(var i = 0; i < respuesta.length; i++){
				cadena = cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>';
			}
			$("#producto").html(cadena);
		} else {
			$("#producto").html("No hay productos disponibles");
		}
	});
}

function mostarDatos() {
	var datosAlumnos = '/api/Centros/' + sessionStorage.userCentroId + '/alumnos/?access_token=' + sessionStorage.userToken;
	obtenerAlumnos("", datosAlumnos);

	var datosProductos = '/api/Productos/?access_token=' + sessionStorage.userToken;
	obtenerAlumnos("", datosProductos);
}

/* Función para insertar pedidos */
function insertarPedido(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			var destino = '/api/Pedidos/count?access_token=' + sessionStorage.userToken;
			obtenerIdPedido("", destino);
		} 
	});
}

/* Función para obtener el id del pedido */
function obtenerIdPedido(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			sessionStorage.idPedido = respuesta.count;

			var datosEnvio = {
			"CantidadPedido": cantidadPedida,
			"CantidadEntrega": cantidadEntrega,
			"pedidoId": sessionStorage.idPedido,
			"productoId": producto
		}
		var destino = '/api/DetallePedidos?access_token=' + sessionStorage.userToken;
		insertarDetallePedido(datosEnvio, destino);
			$('#info').addClass('alert alert-success');
			$('#info').html("Pedido insertado");
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, pedido no insertado");
		}
	});
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var alumno = $("#alumno").val();
	producto = $("#producto").val();
	var fecha = $("#fecha").val();
	cantidadPedida = $("#cantidadPedida").val();
	cantidadEntrega = $("#cantidadEntrega").val();

	fecha = fecha.trim();
	cantidadPedida = cantidadPedida.trim();
	cantidadEntrega = cantidadEntrega.trim();

	var fechaActual = new Date();
	fechaActual = ;

	if (alumno == 0 || producto == 0 || fecha == "" || cantidadPedida == "" || cantidadEntrega == "") {
		$('#info').html("Todos los campos son obligatorios");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosPedido = {
			"FechaPedido": fecha,
			"userId": alumno
		}
		var destinoPedido = '/api/Pedidos?access_token=' + sessionStorage.userToken;
		insertarPedido(datosPedido, destinoPedido);
	}
		reiniciarElementos();
		eliminarAlerta();
}

$(document).ready(function() {
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);

	mostarDatos();

	/* Salir de la aplicación */
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	/* Ver información del perfil del usuario */
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});

	$('#enviar').click(function() {
		validarDatos();
	});
})