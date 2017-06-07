var direccionCategorias = '/api/TipoProductos?access_token=' + sessionStorage.userToken;

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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
	}, 2500);
}

function borraCategoria(id){
	var url = '/api/TipoProductos/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			window.location.href = "listadoCategorias.html";	
		}else{
			estilosAlerta();
			$('#info').html("Error, categoria no borrada");
			console.log("Error, proveedor no borrado");
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
						cadena = cadena + (i+1) + " -   Nombre: " + respuesta[i].Nombre + " <button type='button' id='borrar' onclick='borraCategoria(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button><br>";
					}
					cadena = cadena + "</div>";
					$('#contienelistados').html(cadena);
				}else{
					$('#contienelistados').html("No hay categoria");
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
	conexion("GET","",direccionCategorias)
	$("#botonPerfil").html(("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre));
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})