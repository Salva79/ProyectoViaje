var urlAlumuno = '/api/Usuarios/' + sessionStorage.idAlumnado + '?access_token=' + sessionStorage.userToken;
var metodoObjetivos = '/api/Objetivos';
/* Eliminar los valores de sesión */
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
	sessionStorage.removeItem("userObjetivo");
	sessionStorage.removeItem("userCetro");
	sessionStorage.removeItem("idAlumnado");
}
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

function obtenerObjetivosDisponibles(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			var cadena = '<option value="0">Selecciona el Objetivo</option>';
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}
				$('#objetivo').html(cadena);				
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
			window.location.href = "index.html";			
	});		
}

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
		if(typeof(respuesta.id) !== undefined){
			$("#dni").val(respuesta.DNI);
			$("#nombre").val(respuesta.Nombre);
			$("#apellidos").val(respuesta.Apellidos);
			$("#email").val(respuesta.email);
			$("#telefono").val(respuesta.Telefono);
			$("#curso").val(respuesta.Curso);
			$('#centro').val(respuesta.centroId);
			$('#objetivo').val(respuesta.objetivo);
			$("#username").val(respuesta.username);
		}else{
			vaciarCampos();
			estilosAlerta();
			$('#info').html("No exite el usuario");
			console.log("No exite el usuario");
			eliminarAlerta();
			eliminarStorage();
		}
	}).fail(function (xhr){
		if(xhr.statusText === 'Unauthorized'){
			vaciarCampos();
			estilosAlerta();
			$('#info').html("Error, usuario no registrado");
			console.log("Error, usuario no registrado");
			eliminarAlerta();
			eliminarStorage();
		}else{
			vaciarCampos();
			estilosAlerta();
			$('#info').html("Error en el envio de datos");
			console.log("Error en el envio de datos");
			eliminarAlerta();
			eliminarStorage();
		}			
	});		
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
				estilosinfo();
				$('#info').html("Has actualizado sus datos");
				eliminarinfo();
				window.location.href = "../inicio.html";
				
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




$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	obtenerObjetivosDisponibles("GET", "", metodoObjetivos);
	conexion('GET','',urlAlumuno);

	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});

	$('#insertar').click(function() {
		var direccion = '/api/Usuarios/' + sessionStorage.idAlumnado + '?access_token=' + sessionStorage.userToken; 
		var objetivo = $("#objetivo").val();

		if (objetivo === 0){
			estilosAlerta();
			$('#info').html('Debes introducir un nuevo objetivo');
			eliminarAlerta();
		}else{
			perfil = {
			  "objetivo": objetivo
			}
			actualizaDatos('PATCH',perfil,direccion);
		}		
	});
})