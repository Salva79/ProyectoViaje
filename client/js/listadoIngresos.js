var direccion = '/api/Ingresos?filter={"where":{"userId":"' + sessionStorage.userId + '"}}&access_token=' + sessionStorage.userToken;
var direccion2 = '/api/TipoProductos?access_token=' + sessionStorage.userToken;
var arrayTipos = [];

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

function obtenerTiposDisponibles(metodo,datos,url){
	$.ajax({
		async: false,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(respuesta.length > 0){
				for(var i = 0; i < respuesta.length; i++){
					arrayTipos[i] = respuesta[i].Nombre;
				}
			}else{
				estilosAlerta();
				$('#info').html("No exite el tipo de producto");
				console.log("No exite el tipo de producto");
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
						var verify = "";
						if(respuesta[i].Verificado){
							verify = "Sí"
						}else{
							verify = "No"
						}
						cadena = cadena + (i+1) + " -   Tipo: " + arrayTipos[respuesta[i].tipo-1] + "  -  Cantidad: " + respuesta[i].Cantidad + " €<br>Verificado: " + verify + "<br>";
					}
					cadena = cadena + "</div>";
					$('#contienelistados').html(cadena);
				}else{
					alert("No hay");
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
			window.location.href = "../index.html";			
	});		
}

obtenerTiposDisponibles('GET','',direccion2);
conexion('GET','',direccion);

$(document).ready(function() {
	var nombre = ("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
				$("#botonPerfil").html(nombre);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
})