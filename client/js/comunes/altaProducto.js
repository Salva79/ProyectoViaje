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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#descripcion").val("");
	$("#referencia").val("");
	$("#precioVenta").val("");
	$("#beneficio").val("");
	$("#fabricante").val(0);
	$("#tipoProducto").val(0);
}

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

function conexion2(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				var cadena = '<option value="0">Selecciona la categoría</option>';
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}				
			}else{	
				var cadena = '<option value="0">No hay categorías disponibles</option>';	
			}
			$('#tipoProducto').html(cadena);
	}).fail(function (xhr){
			console.log("Error Alta Productos");
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
			if(respuesta.length > 0){
				var cadena = '<option value="0">Selecciona el proveedor</option>';
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}				
			}else{
				var cadena = '<option value="0">No hay proveedores disponibles</option>';
			}
			$('#fabricante').html(cadena);
	}).fail(function (xhr){
			console.log("Error Proveedores");
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
				$('#info').addClass('alert alert-success');
				$('#info').html("Producto insertado");
			}else{
				$('#info').addClass('alert alert-danger');
				$('#info').html("Error, producto no insertado");
			}
	}).fail(function (xhr){
			if(xhr.statusText === 'Unauthorized'){
				console.log("Error, usuario no registrado");
			}else{
				console.log("Error, en el envio de datos");
			}

			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var descripcion = $('#descripcion').val();
	var referencia = $('#referencia').val();
	var fabricante = $('#fabricante').val();
	var precioVenta = $('#precioVenta').val();
	var beneficio = $('#beneficio').val();
	var tipoProducto = $('#tipoProducto').val();

	descripcion = descripcion.trim();
	referencia = referencia.trim();

	if( (descripcion === "") || (referencia === "") || (fabricante <= 0) || (tipoProducto <= 0) || (isNaN(precioVenta) === false) || (isNaN(beneficio) === false)){
		$('#info').addClass('alert alert-danger');
		$('#info').html("Por favor revisa los datos introducidos");
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

	reiniciarElementos();
	eliminarAlerta();
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonPerfilAdmin").html(nombre);

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

	$("#insertar").click(function(){
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})