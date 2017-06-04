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
	}, 2500);
}

function borraUsuario(id){
	var url = '/api/Usuarios/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			window.location.href = "listadoAlumnos.html";	
		}else{
			estilosAlerta();
			$('#info').html("Error, alumno no borrado");
			console.log("Error, alumno no borrado");
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

function veralumnado(identificador){
	sessionStorage.idAlumnado = identificador;
	window.location.href = "veralumno.html";
}

/* Función para mostrar los alumnos de un determinado centro */
function listaAlumos(datos,url) {
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		var cadena = "";
		var objetivo = "";
		if(respuesta.length > 0){
			for(var i = 0; i < respuesta.length; i++){
				if(respuesta[i].Curso !== "Coordinador"){
					var dire = '/api/Objetivos/' + respuesta[i].objetivo + '?access_token=' + sessionStorage.userToken;
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: dire,
					}).done(function(ob) {
						objetivo = ob.Nombre;
						if (objetivo === undefined){
							objetivo = "Sin Objetivo";
						}
					});
					cadena = cadena + respuesta[i].Nombre + " " + respuesta[i].Apellidos + '  <button onclick="veralumnado(' + respuesta[i].id +')" class="botonVerificar btn btn-success" title="Ver"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>'				 	 + '<button onclick="borraUsuario(' + respuesta[i].id + ')"  class="botonEliminar btn btn-danger" title="Eliminar"><i class="fa fa-trash" aria-hidden="true"></i></button>' +
				  	"<br>";
				}				
			}
		} else {
			cadena = "No hay alumnos disponibles."
		}
		$('#contienelistados').html(cadena);
	});
}

$(document).ready(function() {
	var metodoAlumnos = '/api/Centros/' + sessionStorage.userCentroId + '/alumnos?access_token=' + sessionStorage.userToken;
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	listaAlumos('',metodoAlumnos);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../../perfil.html";
	});
})