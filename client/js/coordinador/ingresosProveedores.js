var proveedores = [];
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

function ListaProveedores(){
	var urlProvvedores = '/api/Proveedores?access_token=' + sessionStorage.userToken;;
	$.ajax({
		async: false,
		dataType: 'json',
		method: 'GET',
		url: urlProvvedores,
	}).done(function (respuesta){
		if(respuesta.length>0){
			for(var i = 0; i < respuesta.length; i++){
				proveedores[i] = respuesta[i].Nombre;
			}
		}
	}).fail(function (xhr){
			console.log("Error Lista Proveedores");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});
}

ListaProveedores();

function conexion(){
	var url = '/api/Centros/' + sessionStorage.userCentroId + '/alumnos?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		method: 'GET',
		url: url,
	}).done(function (respuesta){
			var total;
			var cadena = "";
			if(respuesta.length>0){
				for(var i = 0; i < respuesta.length; i++){
					var dire = '/api/Ingresos?filter={"where":{"userId":"' + respuesta[i].id + '","Verificado": true}}&access_token=' + sessionStorage.userToken;
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: dire,
					}).done(function (respuesta){
						if(respuesta.length>0){
							total = 0;
							for(var i=0; i<respuesta.length; i++){
								if(respuesta[i].Verificado === true){
									total = total + respuesta[i].Cantidad;
									var urltipo = '/api/TipoProductos/' + respuesta[i].tipo + '/productos?access_token=' + sessionStorage.userToken;
									$.ajax({               
										async: false,
										dataType: 'json',
										method: 'GET',
										url: urltipo,
									}).done(function (respuesta){
										cadena = cadena + proveedores[(respuesta[0].Fabricante-1)] + ": " + total + " € <br>";
									});
								}	
							}
						}
					});
				}						
			} else{
				cadena = "No hay ingresos por proveedor";
			}
			$('#contienelistados').html(cadena);
	}).fail(function (xhr){
			console.log("Error Ingresos");
			eliminarStorage();
			window.location.href = "../../index.html";			
	});		
}
$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	conexion();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})