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

function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass();
    	$('#modalCaja').modal('toggle');}, 2500);
}

function borraCentro(id){
	var url = '/api/Centros/' + id + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		data: "",
		method: 'DELETE',
		url: url,
	}).done(function (respuesta){
		if(respuesta.count === 1){
			$('#info').addClass('alert alert-success');
			$('#info').html("Centro eliminado");	
		}else{
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, alumno no borrado");
		}
		$('#modalCaja').modal({
			show: 'true'
		}); 
		eliminarAlerta();
		window.location.href = "listadoCentro.html";
	}).fail(function (xhr){
			console.log("Error Borrar Centros");
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
			if(typeof(respuesta) !== undefined){
				var cadena = "";
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						cadena = cadena + (i+1) + " -   Nombre: " + respuesta[i].Nombre + " <button type='button' id='borrar' onclick='borraCentro(" + respuesta[i].id + ")' title='Eliminar' class='btn btn-danger botonForm btn-xs'><i class='fa fa-trash' aria-hidden='true'></i></button>";
						cadena = cadena + "<br>Codigo: " + respuesta[i].CodigoCentro;
						cadena = cadena + "<br>Localidad: " + respuesta[i].Localidad;
						urlCoordinador = '/api/Usuarios/' + respuesta[i].userId + '?access_token=' + sessionStorage.userToken;;
						$.ajax({
							async: false,
							dataType: 'json',
							method: 'GET',
							url: urlCoordinador,
						}).done(function (respuesta){
							cadena = cadena + "<br>Coordinador: " + respuesta.Nombre + " " + respuesta.Apellidos + "<br>";
						});
					}
				}else{
					cadena = "No hay Centros disponibles";
				}
				$('#contienelistados').html(cadena);
			}
	}).fail(function (xhr){
			console.log("Error Listado Centros");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfilAdmin").html(nombre);
	var centrosurl = '/api/Centros?access_token=' + sessionStorage.userToken;
	conexion('GET','',centrosurl);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
})