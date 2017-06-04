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
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#descripcion").val("");
	$("#referencia").val("");
	$("#precioVenta").val("");
	$("#beneficio").val("");
	$("#fabricante").val(0);
	$("#tipoProducto").val(0);
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

function conexion2(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			var cadena = '<option value="0">Selecciona la categoría</option>';
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}
				$('#tipoProducto').html(cadena);				
			}else{
				estilosAlerta();
				$('#info').html("No exite dicha categoría");
				console.log("No exite dicha categoría");
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
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			var cadena = '<option value="0">Selecciona el proveedor</option>';
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}
				$('#fabricante').html(cadena);				
			}else{
				estilosAlerta();
				$('#info').html("No hay proveedores definidos");
				console.log("No hay proveedores definidos");
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

function conexionInsertar(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				estilosinfo();
				$('#info').html("Producto creado");
				eliminarinfo();
				window.location.href = "../inicio.html";
				
			}else{
				estilosAlerta();
				$('#info').html("No se ha creado el producto");
				console.log("No se ha creado el producto");
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
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);

	var metodoProveedor = '/api/Proveedores?access_token=' + sessionStorage.userToken;
	conexion('GET', "", metodoProveedor);
	var metodoCategorias = '/api/TipoProductos?access_token=' + sessionStorage.userToken;
	conexion2('GET', "", metodoCategorias);

	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});

	$('#insertar').click(function() {
		var descripcion = $('#descripcion').val();
		var referencia = $('#referencia').val();
		var fabricante = $('#fabricante').val();
		var precioVenta = $('#precioVenta').val();
		var beneficio = $('#beneficio').val();
		var tipoProducto = $('#tipoProducto').val();

		descripcion = descripcion.trim();
		referencia = referencia.trim();

		/*(isNaN(precioVenta) === false) || (isNaN(beneficio) === false) ||*/

		if( (descripcion === "") || (referencia === "") || (fabricante <= 0) || (tipoProducto <= 0)){
			estilosAlerta();
			$('#info').html("Por favor revisa los datos introducidos");
			console.log("Por favor revisa los datos introducidos");
			eliminarAlerta();
		}else{
			var direccion3 = '/api/Productos?access_token=' + sessionStorage.userToken; 	
			var datos = {
				"Descripcion": descripcion,
  				"Referencia": referencia,
  				"PrecioiVenta": precioVenta,
  				"Beneficio": beneficio,
  				"proveedoresId": fabricante,
  				"tipoProductoId": tipoProducto,
  				"Tipo": tipoProducto,
  				"Fabricante": fabricante 
			}
			conexionInsertar('POST',datos,direccion3);
		}
	});
})