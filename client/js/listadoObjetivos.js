var direccionObjetivos = '/api/Objetivos?filter={"where": {"usuarioId": "' + sessionStorage.userId + '"}}&access_token=' + sessionStorage.userToken;

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

function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
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
			estilosAlerta();
			$('#info').html("Error, objetivo no borrado");
			console.log("Error, objetivo no borrado");
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
			window.location.href = "../../index.html";			
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
				var cadena = "<div class='listado'>";
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
						cadena = cadena + (i+1) + " -   Nombre: " + respuesta[i].Nombre + "<br>   " + inicioMostrar + " a " + finMostrar + " <button type='button' id='borrar' onclick='borraObjetivo(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button><br>";
					}
					cadena = cadena + "</div>";
					$('#contienelistados').html(cadena);
				}else{
					$('#contienelistados').html("No hay objetivos");
				}
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
				$('#info').html("Error en el envio de datos");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

$(document).ready(function() {
	conexion("GET","",direccionObjetivos)
	$("#botonPerfil").html(("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre));
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})