var direccionProveedores = '/api/Proveedores?access_token=' + sessionStorage.userToken;

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
	}, 2500);
}

function borraProveedor(id){
	var url = '/api/Proveedores/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			$('#info').addClass('alert alert-success');
			$('#info').html("Proveedor eliminado");	
		}else{
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, proveedor no eliminado");
		}
		$('#modalCaja').modal({
				show: 'true'
		});
		eliminarAlerta();
		window.location.href = "listadoProveedores.html";
	}).fail(function (xhr){
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, provvedor no eliminado");
			$('#modalCaja').modal({
				show: 'true'
			}); 
			eliminarAlerta();				
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
				var cadena = "";
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						cadena = cadena + "<p>" + (i+1) + " -   Nombre: " + respuesta[i].Nombre + " <button type='button' id='borrar' onclick='borraProveedor(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button></p>";
					}
				}else{
					cadena = "No hay proveedores disponibles";
				}
				$('#contienelistados').html(cadena);
			}
	}).fail(function (xhr){
			$('#contienelistados').html("No hay proveedores disponibles");			
	});		
}

$(document).ready(function() {
	conexion("GET","",direccionProveedores)
	
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