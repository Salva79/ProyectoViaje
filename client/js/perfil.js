var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var direObjetivo = '/api/Objetivos/' + sessionStorage.userObjetivoId + '?access_token=' + sessionStorage.userToken;
var direCentros = '/api/Centros/' + sessionStorage.userCentroId + '?access_token=' + sessionStorage.userToken;
var perfil;

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

function estilosinfo() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-success');
}
function eliminarinfo() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-success');
    	$('#modalCaja').modal('toggle');}, 2500);
}
function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}
function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');
    	$('#modalCaja').modal('toggle');}, 2500);
}

function cargaDatos(){
	$("#botonPerfil").html("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#perfil").text("Perfil de " + sessionStorage.userNombre);
	$("#dni").val(sessionStorage.userDni);
	$("#nombre").val(sessionStorage.userNombre);
	$("#apellidos").val(sessionStorage.userApellidos);
	$("#email").val(sessionStorage.userEmail);
	$("#telefono").val(sessionStorage.userTelefono);
	$("#curso").val(sessionStorage.userCurso);
	if (sessionStorage.userCurso == "Coordinador") {
		$("#curso").hide();
		$("#objetivo").hide();
		$("#ncentro").hide();
	}else{
		$("#curso").val(sessionStorage.userCurso);
		$("#objetivo").val(sessionStorage.NombreObjetivo);
		$("#ncentro").val("Centro: " + sessionStorage.NombreCentro);
	}	
}
function actualizaDatos(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userNombre = respuesta.Nombre;
				sessionStorage.userApellidos = respuesta.Apellidos;
				sessionStorage.userDni = respuesta.DNI;
				sessionStorage.userTelefono = respuesta.Telefono;
				sessionStorage.userCurso = respuesta.Curso;
				sessionStorage.userUsername = respuesta.username;
				sessionStorage.userEmail = respuesta.email;
				var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
				estilosinfo();
				$('#info').html("Has actualizado tus datos");
				eliminarinfo();
				window.location.href = "inicio.html";
				
			}else{
				estilosAlerta();
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> --- ";
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
				$('#info').html("Error en el envio de datos 1");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "../index.html";			
	});		
}
function cogeObjetivo(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.NombreObjetivo = respuesta.Nombre;
			}else{
				estilosAlerta();
				$('#info').html("No exite el objetivo");
				console.log("No exite el objetivo");
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> --- ---";
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
function cogeCentro(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.NombreCentro = respuesta.Nombre;
			}else{
				estilosAlerta();
				$('#info').html("No exite el centro");
				console.log("No exite el centro");
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> --- ---";
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
function recogeDatos(){
	var error = "";
	var correcto = true;
	var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

	var name = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var dni = $("#dni").val();
	var curso = $("#curso").val();
	var email = $("#email").val();
	var telefono = $("#telefono").val();

	name = name.trim();
	apellidos = apellidos.trim();
	curso = curso.trim();
	telefono = telefono.trim();
	dni = dni.trim();

	if (sessionStorage.userCurso == "Coordinador") {
		if (name == "" || apellidos == "" || dni == "" || telefono == "") {
		error = "El nombre, apellidos, nif y teléfono son obligatorios";
			correcto = false;
		}else {
			if (!(patronNif.test(dni))) {
				error = "Introduce un nif válido";
				correcto = false;
			}
		}
	}else {
		if (name == "" || apellidos == "" || dni == "" || curso == ""|| telefono == "") {
		error = "El nombre, apellidos, nif, teléfono y curso son obligatorios";
			correcto = false;
		}else {
			if (!(patronNif.test(dni))) {
				error = "Introduce un nif válido";
				correcto = false;
			}
		}
	}

	if(correcto){
		perfil = {
		  "Nombre": name,
		  "Apellidos": apellidos,
		  "DNI": dni,
		  "Telefono": telefono,
		  "Curso": curso,
		  "username": email,
		  "email": email
		}
		actualizaDatos('PATCH',perfil,direccion);
	}else{
		cargaDatos();
		estilosAlerta();
		$('#info').html(error);
		eliminarAlerta();
	}
			
}

if(sessionStorage.userCurso !== "Coordinador"){
	cogeCentro('GET','',direCentros);
	cogeObjetivo('GET','',direObjetivo);
	cogeCentro('GET','',direCentros);
}


$(document).ready(function() {
	cargaDatos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";		
	});
	$("#insertar").click(function(){
		recogeDatos();
	});
})