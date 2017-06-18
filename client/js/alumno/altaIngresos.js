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

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#cantidad").val("");
	$("#tipoProducto").val(0);
}

function conexion2(metodo,datos,url){
	$.ajax({
		async: true,
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
			console.log("Error Categorías");
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
				$('#info').html("Has ingresado " + respuesta.Cantidad + "€");
			}else{
				$('#info').addClass('alert alert-danger');
				$('#info').html("Error, no se ha podido realizar el alta del ingreso");
			}
	}).fail(function (xhr){
			console.log("Error Alta Ingresos");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});	
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
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
		$('#info').addClass('alert alert-danger');
		$('#info').html("Por favor revisa los datos introducidos");
	}
		
	reiniciarElementos();
	eliminarAlerta(); 
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
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})