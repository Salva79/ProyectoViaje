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
	sessionStorage.removeItem("userObjetivoId");
	sessionStorage.removeItem("userCentroId");
	sessionStorage.removeItem("usernCentro");
	sessionStorage.removeItem("usernObjetivo"); 
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
	setTimeout(function() {
	}, 2500);
}
function borraProductos(id){
	var url = '/api/Productos/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			window.location.href = "listadoProductos.html";	
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
			window.location.href = "../../index.html";			
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
						cadena = cadena + (i+1) + " -   Nombre: " + respuesta[i].Descripcion + " <button type='button' id='borrar' onclick='borraProductos(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button><br>";
						cadena = cadena + "Referencia: " + respuesta[i].Referencia + "<br>";
						cadena = cadena + "Precio Venta: " + respuesta[i].PrecioiVenta + "€  -  Beneficio: " + respuesta[i].Beneficio + "€<br>"
						var urlcategoria = '/api/TipoProductos/' + respuesta[i].tipoProductoId + '?access_token=' + sessionStorage.userToken;
						$.ajax({
							async: false,
							dataType: 'json',
							method: 'GET',
							url: urlcategoria,
						}).done(function (respuesta){
							cadena = cadena + "Categoría: " + respuesta.Nombre + "<br>";
						})
						var urlproveedor = '/api/Proveedores/' + respuesta[i].proveedoresId + '?access_token=' + sessionStorage.userToken;
						$.ajax({
							async: false,
							dataType: 'json',
							method: 'GET',
							url: urlproveedor,
						}).done(function (respuesta){
							cadena = cadena + "Proveedor: " + respuesta.Nombre + "<br>";
						})
						cadena = cadena + "<br>"
					}
					cadena = cadena + "</div>";
					$('#contienelistados').html(cadena);
				}else{
					$('#contienelistados').html("No hay productos");
				}
			}else{
				estilosAlerta();
				$('#info').html("No hay productos");
				console.log("No hay productos");
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
	var direccionProductos = '/api/Productos?access_token=' + sessionStorage.userToken;
	conexion("GET","",direccionProductos);
	$("#botonPerfil").html(("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre));
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})