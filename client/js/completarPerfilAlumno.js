var metodoCentros = '/api/Centros';
var metodoObjetivos = '/api/Objetivos';

function eliminarStorage(){
	sessionStorage.removeItem("Username");
	sessionStorage.removeItem("Email");
	sessionStorage.removeItem("Password");
	sessionStorage.removeItem("alumnoRol");
	sessionStorage.removeItem("coordinadorRol");
}

function vaciarCampos() {
	$("#nombre").val("");
	$("#apellidos").val("");
	$("#nif").val("");
	$('#centro > option[value="valorInicio"]').attr('selected', 'selected');
	$("#curso").val("");
	$("#telefono").val("");
}

function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass('alert alert-danger');
		$('#modalCaja').modal('toggle');
	}, 2500);
}

function obtenerCentrosDisponibles(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				var cadena = '<option value="0">Selecciona el centro</option>';
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}			
			} else {
				var cadena = '<option value="0">No hay centros disponibles</option>';
			}
			$('#centro').html(cadena);
	}).fail(function (xhr){
			$('#centro').html("<option value="0">No hay centros disponibles</option>");			
	});		
}
function obtenerObjetivosDisponibles(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				var cadena = '<option value="0">Selecciona el Objetivo</option>';
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}				
			} else {
				var cadena = '<option value="0">No hay objetivos disponibles</option>';
			}
			$('#objetivo').html(cadena);
	}).fail(function (xhr){
			$('#objetivo').html("<option value="0">No hay objetivos disponibles</option>");			
	});		
}
function conexion(envio, url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: envio,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			eliminarStorage();
			window.location.href = "index.html";
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("No se ha podido realizar el registro del usuario");
			$('#modalCaja').modal({
				show: 'true'
			});
			eliminarAlerta();
		}
	}).fail(function(xhr) {
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";
	});
}

function validarDatos() {
	var error = "";
	var correcto = true;
	var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

	var nombre = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var nif = $("#nif").val();
	var centro = $("#centro").val();
	var curso = $("#curso").val();
	var username = sessionStorage.Email;
	var email = sessionStorage.Username;
	var password = sessionStorage.Password;
	var objetivo = $("#objetivo").val();
	var telefono = $("#telefono").val();

	nombre = nombre.trim();
	apellidos = apellidos.trim();
	curso = curso.trim();
	telefono = telefono.trim();
	nif = nif.trim();

	if ((nombre == "" || apellidos == "" || nif == "" || curso == ""|| telefono == "") || (objetivo == 0 || centro == 0)) {
		error = "El nombre, apellidos, nif, teléfono, objetivo, centro y curso son obligatorios";
		correcto = false;
	} else {
		if (!(patronNif.test(nif))) {
			error = "introduce un nif válido";
			correcto = false;
		}
	}

	if (correcto) {
		var envio = {
			"Nombre": nombre,
			"Apellidos": apellidos,
			"DNI": nif,
			"centroId": centro,
			"Curso": curso,
			"username": username,
			"email": email,
			"password": password,
			"objetivo": objetivo,
			"Telefono": telefono
		}
		var destino = '/api/Usuarios';
		conexion(envio, destino);
	} else {
		vaciarCampos();
		$('#info').addClass('alert alert-danger');
		$('#info').html(error);
		$('#modalCaja').modal({
			show: 'true'
		});
		eliminarAlerta();
	}
}

obtenerCentrosDisponibles("GET", "", metodoCentros);
obtenerObjetivosDisponibles("GET", "", metodoObjetivos);

$(document).ready(function() {
	$('#enviar').click(function() {
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})