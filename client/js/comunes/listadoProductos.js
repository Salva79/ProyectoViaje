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

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
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
			$('#info').addClass('alert alert-success');
			$('#info').html("Producto eliminado");	
		}else{
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, producto no eliminado");
		}
		$('#modalCaja').modal({
			show: 'true'
		});
		eliminarAlerta();
		window.location.href = "listadoProductos.html";
	}).fail(function (xhr){
			console.log("Error Borrar Productos");
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
				var cadena = "";
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						cadena = cadena + "<p>" + (i+1) + " -   Nombre: " + respuesta[i].Descripcion + " <button type='button' id='borrar' onclick='borraProductos(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button><br>";
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
							cadena = cadena + "Proveedor: " + respuesta.Nombre + "</p>";
						})
					}
				}else{
					cadena = "No hay productos disponbles";
				}
				$('#contienelistados').html(cadena);
			}
	}).fail(function (xhr){
			console.log("Error Listado Productos");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}



$(document).ready(function() {
	var direccionProductos = '/api/Productos?access_token=' + sessionStorage.userToken;
	conexion("GET","",direccionProductos);
	
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