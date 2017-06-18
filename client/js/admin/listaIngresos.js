var Cantidad;
var Pedido = [];
var Producto;

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

function conexionCentro() {
	var url = '/api/Usuarios?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: false,
		dataType: 'json',
		method: 'GET',
		url: url,
	}).done(function (respuesta){
			var cadena = "";
			var presunto = "";
			if(respuesta.length>0){
				for(var i = 0; i < respuesta.length; i++){
					presunto = respuesta[i].Nombre + " " + respuesta[i].Apellidos;
					var dire = '/api/Ingresos?filter={"where":{"userId":"' + respuesta[i].id + '"}}&access_token=' + sessionStorage.userToken;
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: dire,
					}).done(function (respuesta){
						if(respuesta.length>0){
							for(var i=0; i<respuesta.length; i++){
									cadena = cadena + presunto + '<br>Cantidad: ' + respuesta[i].Cantidad + "€ - ";
									var urltipo = '/api/TipoProductos/' + respuesta[i].tipo + '?access_token=' + sessionStorage.userToken;
									$.ajax({
										async: false,
										dataType: 'json',
										method: 'GET',
										url: urltipo,
									}).done(function (respuesta){
										cadena = cadena + respuesta.Nombre + "<br>";
									});
								}
							} else {
								cadena = "No hay ingresos disponibles";
							}	
						
					});
										
				}
			} else{
				cadena = "No hay ingresos disponibles";
			}
			$('#contienelistados').html(cadena);
										
	}).fail(function (xhr){
			$('#contienelistados').html("No hay ingresos disponibles");			
	});		
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfilAdmin").html(nombre);
	conexionCentro();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
})