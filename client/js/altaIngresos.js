var direccion2 = '/api/TipoProductos?access_token=' + sessionStorage.userToken;

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

function estilosinfo() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-success');
}
function eliminarinfo() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-success');
    	$('#modalCaja').modal('toggle');}, 2500);
}
function estilosAlerta() {
	$('#info').removeClass();
	$('#info').addClass('alert alert-danger');
}
function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass('alert alert-danger');
    	$('#modalCaja').modal('toggle');}, 2500);
}

function conexion2(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			var cadena = '<option value="0">Selecciona el tipo de producto</option>';
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					cadena = (cadena + '<option value=' + respuesta[i].id +'>' + respuesta[i].Nombre + '</option>');
				}
				$('#tipoProducto').html(cadena);				
			}else{
				estilosAlerta();
				$('#info').html("No hay productos definidos");
				console.log("No exite el tipo de producto");
				eliminarAlerta();
				window.location.href = "inicio.html";	
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
				$('#info').html("Has ingresado " + respuesta.Cantidad + "€");
				eliminarinfo();
				window.location.href = "inicio.html";
				
			}else{
				estilosAlerta();
				$('#info').html("No exite el usuario");
				console.log("No exite el usuario");
				nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> --- ---";
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

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	conexion2('GET','',direccion2);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
	$("#insertar").click(function(){
		var tipo = $('#tipoProducto').val();
		var numero = $('#cantidad').val();

		if((tipo > 0 ) && ((numero > 0 ) && (isNaN(numero) === false))){
			var direccion3 = '/api/Ingresos?access_token=' + sessionStorage.userToken; 	
			var datosIngreso = {
				"Cantidad": numero,
  				"Verificado": false,
  				"objetivoId": sessionStorage.userObjetivoId,
  				"objetivo": sessionStorage.userObjetivoId,
  				"tipo": tipo,
  				"userId": sessionStorage.userId
			}
			conexionInsertar('POST',datosIngreso,direccion3);
		}else{
			estilosAlerta();
			$('#info').html("Por favor revisa los datos introducidos");
			console.log("Por favor revisa los datos introducidos");
			eliminarAlerta();
		} 		
	});
})