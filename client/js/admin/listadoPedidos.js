var cadena = "";

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

function listarPedidos(){
	var url = '/api/Pedidos?access_token=' + sessionStorage.userToken;
	var fecha = "";
	$.ajax({
		async: false,
		dataType: 'json',
		method: 'GET',
		url: url,
	}).done(function(respuesta) {
		if(respuesta.length>0){
			for(var i=0; i<respuesta.length ; i++){
				var urlUsuario = '/api/Usuarios/' + respuesta[i].userId + '?access_token=' + sessionStorage.userToken;
				var urlObjetivo = '/api/Objetivos/' + respuesta[i].objetivoId + '?access_token=' + sessionStorage.userToken;
				var urlDetalles = '/api/Pedidos/' + respuesta[i].id + '/detallesPedidos?access_token=' + sessionStorage.userToken;
				fecha = respuesta[i].FechaPedido;
				fecha = fecha.substring(0,10);
				var fechaMostrar = invertir(fecha);
				$.ajax({
					async: false,
					dataType: 'json',
					method: 'GET',
					url: urlUsuario,
				}).done(function(respuesta) {
					cadena =  cadena + "<p>" + (i+1) + " - " + respuesta.DNI + " - " + respuesta.Nombre + " " + respuesta.Apellidos + "<br>";						
				})
				
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: urlObjetivo,
					}).done(function(respuesta) {
						cadena = cadena + respuesta.Nombre + "<br>";
					})
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: urlDetalles,
					}).done(function(respuesta) {
						var urlProducto = '/api/Productos/' + respuesta[0].productoId + '?access_token=' + sessionStorage.userToken;
						$.ajax({
							async: false,
							dataType: 'json',
							method: 'GET',
							url: urlProducto,
						}).done(function(respuesta) {
							cadena =  cadena + respuesta.Descripcion + "<br>";
						})
						cadena =  cadena + "Total: " + respuesta[0].CantidadPedido + "€ - Entregado: " + respuesta[0].CantidadEntrega + "€<br>";
					})
					cadena =  cadena + fechaMostrar + "</p>";
			}
		}
		else {
			cadena = "No hay pedidos disponibles"
		}

		$('#contienelistados').html(cadena);
	}).fail(function (xhr){
			$('#contienelistados').html("No hay pedidos disponibles");			
	});	
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfilAdmin").html(nombre);
	listarPedidos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

})