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
		$('#objetivo').html("No hay objetivos disponibles");			
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
			$('#objetivo').val(respuesta.objetivo);
			$("#username").val(respuesta.username);

			if (respuesta.Curso == "Coordinador") {
				$("#curso").hide();
				$("#objetivo").hide();
			}else{
				$("#curso").val(respuesta.Curso);
				$("#objetivo").val(respuesta.objetivo);
			}	
		}			
	});		
}

function actualizaDatos(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
		if(typeof(respuesta.id) !== undefined){
			$('#info').addClass('alert alert-success');
			$('#info').html("Se han actualizado los datos del usuario");	
		}else{
			$('#info').addClass('alert alert-danger');
			$('#info').html("No se han actualizado los datos del usuario");
		}
		eliminarAlerta();
	}).fail(function (xhr){
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, datos no actualizados");
			eliminarAlerta();			
	});		
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonPerfilAdmin").html(nombre);

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

		if (objetivo == 0){
			$('#info').addClass('alert alert-danger');
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