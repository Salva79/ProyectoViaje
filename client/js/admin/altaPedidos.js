var producto;
var Precio = [];
var total;
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
	$("#objetivo").val(0);
	$("#cantidad").val("1");
	$("#total").val("0€");
}

/* Función para obtener los alumnos */
function obtenerAlumnos(datos,url) {
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		var cadena = '<option value="0">Selecciona un alumno</option>';
		if(respuesta.length > 0){
			var cadena = '<option value="0">Selecciona un alumno</option>';
			for(var i = 0; i < respuesta.length; i++){
				cadena = cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].DNI + " " + respuesta[i].Nombre + " " + respuesta[i].Apellidos + '</option>';
			}
		} else {
			var cadena = '<option value="0">No hay alumnos disponibles</option>';
		}
		$("#alumno").html(cadena);
	});
}

/* Función para obtener los productos */
function obtenerProductos(datos,url) {
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if(respuesta.length > 0){
			var cadena = '<option value="0">Selecciona un producto</option>';
			for(var i = 0; i < respuesta.length; i++){
				Precio[i] = respuesta[i].PrecioiVenta;
				cadena = cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Descripcion + '</option>';
			}
		} else {
			var cadena = '<option value="0">No hay productos disponibles</option>';
		}
		$("#producto").html(cadena);
	});
}

function obtenerObjetivo(datos,url) {
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if(respuesta.length > 0){
			var cadena = '<option value="0">Selecciona un objetivo</option>';
			for(var i = 0; i < respuesta.length; i++){
				cadena = cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>';
			}
		} else {
			var cadena = '<option value="0">No hay objetivos disponibles</option>';
		}
		$("#objetivo").html(cadena);
	});
}


function mostarDatos() {
	var datosAlumnos = '/api/Centros/' + sessionStorage.userCentroId + '/alumnos/?filter={"where": {"Curso": {"nlike": "Coordinador"}}}&access_token=' + sessionStorage.userToken;
	obtenerAlumnos("", datosAlumnos);

	var datosProductos = '/api/Productos/?access_token=' + sessionStorage.userToken;
	obtenerProductos("", datosProductos);

	var datosObjetivos = '/api/Objetivos/?access_token=' + sessionStorage.userToken;
	obtenerObjetivo("", datosObjetivos);
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
			var detalles = '/api/DetallesPedidos?access_token=' + sessionStorage.userToken;
			datosDetalles = {
				"pedidoId": respuesta.id,
				"productoId": producto,
				"CantidadPedido": total,
				"CantidadEntrega": 0
			}
			insertarDetallePedido(datosDetalles, detalles);
		} 
	});
}

function insertarDetallePedido(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
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
	var objetivo = $("#objetivo").val();
	cantidadPedida = total;
	cantidadEntrega = 0;
	var fechaActual = new Date();	
	if (alumno == 0 || producto == 0 || objetivo == 0) {
		$('#info').html("Todos los campos son obligatorios");
		$('#info').addClass('alert alert-danger');
	} else {
		var datosPedido = {
			"FechaPedido": fechaActual,
			"userId": alumno,
			"objetivo": objetivo,
			"objetivoId": objetivo
		}
		var destinoPedido = '/api/Pedidos?access_token=' + sessionStorage.userToken;
		insertarPedido(datosPedido, destinoPedido);
	}
		reiniciarElementos();
		eliminarAlerta();
}

function calculaTotal(){
	var cantidad = $("#cantidad").val();
	var seleccionado = $("#producto").val();
	if(!isNaN(cantidad) && (cantidad>0)){
		total = (cantidad*Precio[seleccionado-1]);
		$("#total").val(total+"€");
	}
}

$(document).ready(function() {
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#total").val("0€");
	$("#cantidad").val("1");

	mostarDatos();

	$("#cantidad").on('change',function(){
		calculaTotal();
	})

	$("#producto").on('change',function(){
		calculaTotal();	
	})

	/* Salir de la aplicación */
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$('#insertar').click(function() {
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})