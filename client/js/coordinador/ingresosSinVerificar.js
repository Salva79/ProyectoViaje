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

function eliminarAlerta() {
	setTimeout(function(){
        $('#info').html("");
        $('#info').removeClass();
    	$('#modalCaja').modal('toggle');}, 2500);
}

function verificando(id){
	var urlIngreso = '/api/Ingresos/' + id + '?access_token=' + sessionStorage.userToken;
	var cIngreso = "";
	var producto = "";
	$.ajax({
		async: false,
		dataType: 'json',
		method: 'GET',
		url: urlIngreso,
	}).done(function (respuesta){
		if(respuesta.Verificado === false){
			cIngreso = respuesta.Cantidad;
			var urlProducto = '/api/TipoProductos/' + respuesta.tipo +'/productos?access_token=' + sessionStorage.userToken;
			$.ajax({
				async: false,
				dataType: 'json',
				method: 'GET',
				url: urlProducto,
			}).done(function (respuesta){
				producto = respuesta[0].id;
			})
			var urlPedidos = '/api/Pedidos?filter={"where": {"userId": "' + respuesta.userId +'"}}&access_token=' + sessionStorage.userToken;
			$.ajax({
				async: false,
				dataType: 'json',
				method: 'GET',
				url: urlPedidos,
			}).done(function (respuesta){
				if(respuesta.length>0){
					for(var i=0; i<respuesta.length; i++){
						var urlDetalles = '/api/DetallesPedidos?filter={"where": {"pedidoId": "' + respuesta[i].id + '" , "productoId":"' + producto + '"}}&access_token=' + sessionStorage.userToken;
						$.ajax({
							async: false,
							dataType: 'json',
							method: 'GET',
							url: urlDetalles,
						}).done(function (respuesta){
							if(respuesta.length>0){
								for(var i=0; i<respuesta.length; i++){
									if((respuesta[i].CantidadEntrega + cIngreso) <= respuesta[i].CantidadPedido){
										cIngreso = cIngreso + respuesta[i].CantidadEntrega;
										urlActualiza = '/api/DetallesPedidos/' + respuesta[i].id + '?access_token=' + sessionStorage.userToken; 
										var entregado = {
											"CantidadEntrega": cIngreso
										}
										$.ajax({
											async: false,
											dataType: 'json',
											method: 'PATCH',
											data: entregado,
											url: urlActualiza,
										}).done(function (respuesta){
											var date = {
												"Verificado": true
											}
											$.ajax({
												async: false,
												dataType: 'json',
												method: 'PATCH',
												data: date,
												url: urlIngreso,
											}).done(function (respuesta){
												$('#info').addClass('alert alert-success');
												$('#info').html("Ingreso verificado");
												$('#modalCaja').modal({
													show: 'true'
												});
												eliminarAlerta();
												window.location.href = "ingresosSinVerificar.html";
											})
										}).fail(function (xhr){
												$('#info').addClass('alert alert-danger');
												$('#info').html("Error, ingreso no verificado");
												$('#modalCaja').modal({
													show: 'true'
												});
												eliminarAlerta();			
										});

									}									
								}
							}
						})
					}
				}
			})
		}
	})
}

function conexionCentro() {
	var url = '/api/Centros/' + sessionStorage.userCentroId + '/alumnos?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		method: 'GET',
		url: url,
	}).done(function (respuesta){
			var cadena = "<div class='listado'>";
			var presunto = "";
			if(respuesta.length>0){
				for(var i = 0; i < respuesta.length; i++){
					presunto = respuesta[i].Nombre + " " + respuesta[i].Apellidos;
					var dire = '/api/Ingresos?filter={"where":{"userId":"' + respuesta[i].id + '","Verificado": false}}&access_token=' + sessionStorage.userToken;
					$.ajax({
						async: false,
						dataType: 'json',
						method: 'GET',
						url: dire,
					}).done(function (respuesta){
						if(respuesta.length>0){
							for(var i=0; i<respuesta.length; i++){
								if(respuesta[i].Verificado === false){
									cadena = cadena + "<p>" + presunto +  '<button onclick="verificando(' + respuesta[i].id +')" class="botonVerificar btn btn-warning" title="Verificar"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>' + '<br>Cantidad: ' + respuesta[i].Cantidad + "€ - ";
									var urltipo = '/api/TipoProductos/' + respuesta[i].tipo + '?access_token=' + sessionStorage.userToken;
									$.ajax({
										async: false,
										dataType: 'json',
										method: 'GET',
										url: urltipo,
									}).done(function (respuesta){
										cadena = cadena + respuesta.Nombre + "</p>";
									});
								}
							}	
						}
					});
										
				}
			} else{
				cadena = "No hay ingresos sin verificar";
			}
			$('#contienelistados').html(cadena);
										
	}).fail(function (xhr){
			$('#contienelistados').html("No hay ingresos sin verificar");			
	});		
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	conexionCentro();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})