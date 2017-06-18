var direccionObjetivos = '/api/Objetivos?access_token=' + sessionStorage.userToken;

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

function borraObjetivo(id){
	var url = '/api/Objetivos/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			window.location.href = "listadoObjetivos.html";
		}else{
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, objetivo no eliminado");
			$('#modalCaja').modal({
				show: 'true'
			});
			eliminarAlerta();
		}	
	}).fail(function (xhr){
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, objetivo no eliminado");
			$('#modalCaja').modal({
				show: 'true'
			}); 
			eliminarAlerta();		
	});
}

// Función para mostrar la fecha adecuadamente
function invertir(cadena) {
	var longitudCadena = cadena.length;
    var cadenaMostrar = "";

    // DIA
    cadenaMostrar = cadenaMostrar + cadena.charAt(8);
    cadenaMostrar = cadenaMostrar + cadena.charAt(9);
    cadenaMostrar = cadenaMostrar + cadena.charAt(7);

    // MES
    cadenaMostrar = cadenaMostrar + cadena.charAt(5);
    cadenaMostrar = cadenaMostrar + cadena.charAt(6);
    cadenaMostrar = cadenaMostrar + cadena.charAt(4);

    // AÑO
    for (var i = 0; i < 4; i++) {
    	cadenaMostrar = cadenaMostrar + cadena.charAt(i);
    }

    return cadenaMostrar;
}

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta) !== undefined){
				var cadena = "";
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						var inicio = respuesta[i].YearInicio;
						var fin = respuesta[i].YearFin;
						inicio = inicio + "";
						inicio = inicio.substring(0,10);
						var inicioMostrar = invertir(inicio);
						fin = fin + "";
						fin = fin.substring(0,10);
						var finMostrar = invertir(fin);
						cadena = cadena + "<p>" + (i+1) + " - Nombre: " + respuesta[i].Nombre + "<br>   " + inicioMostrar + " a " + finMostrar + " <button type='button' id='borrar' onclick='borraObjetivo(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button></p>";
					}
				}else{
					cadena = "No hay objetivos disponibles";
				}
				$('#contienelistados').html(cadena);
			}
	}).fail(function (xhr){
			$('#contienelistados').html("No hay objetivos disponibles");			
	});		
}

$(document).ready(function() {
	conexion("GET","",direccionObjetivos)
	
	/* Mostrar el nombre del usuario conectado */
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonPerfilAdmin").html(nombre);

	/* Ver información del perfil del usuario */
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});

	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	
})