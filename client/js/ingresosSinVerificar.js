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

function verificando(alumno){
	alert("Revisando");
	var urlIngreso = '/api/Ingresos/' + alumno + '?access_token=' + sessionStorage.userToken;
	$.ajax({
		async: true,
		dataType: 'json',
		method: 'GET',
		url: urlIngreso,
	}).done(function (respuesta){
		if(respuesta.Verificado === false){
			var urlPedido = '/api/Pedidos?filter={"where":{"' + respuesta.userId + '"}}&access_token=' + sessionStorage.userToken;
			$.ajax({
				async: true,
				dataType: 'json',
				method: 'GET',
				url: urlPedido,
			}).done(function (respuesta){
				if(respuesta.length>0){
					for(var i = 0; i < respuesta.length; i++){
						Pedido[i] = respuesta[i].id
					}
				}
			})
			var urlProducto = '/api/TipoProductos/' + respuesta.tipo + '/productos?access_token=' + sessionStorage.userToken;
			$.ajax({
				async: true,
				dataType: 'json',
				method: 'GET',
				url: urlProducto,
			}).done(function (respuesta){
				Producto = respuesta[0].id;
			})
			var urlDetalle = '/api/Productos/' + Producto + '/detallesPedidos?access_token=' + sessionStorage.userToken;
			$.ajax({
				async: true,
				dataType: 'json',

				method: 'GET',
				url: urlDetalle,
			}).done(function (respuesta){
				var hecho = true;
				var i = 0;
				do{
					if(respuesta[i].CantidadEntrega<respuesta[i].CantidadPedido){
						hecho = false;
						Cantidad = Cantidad + respuesta[i].CantidadEntrega;
						iddetalle = respuesta[i].id;
					}
					i++;
				}while((hecho) && (i < respuesta.length));
				var urlDetalle = '/api/Productos/' + Producto + '/detallesPedidos?access_token=' + sessionStorage.userToken;
				$.ajax({
					async: true,
					dataType: 'json',
					data: '{"CantidadEntrega":' + Cantidad +'}',
					method: 'PATCH',
					url: urlDetalle,
				}).done(function (respuesta){
					alert("Cantdad Entregada");
				})
			})			
		}
	})
}

function conexionCentro(){
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
						for(var i=0; i<respuesta.length; i++){
							if(respuesta[i].Verificado === false){
								cadena = cadena + presunto +  '<button onclick="verificando(' + respuesta[i].id +')" class="botonVerificar btn btn-warning" title="Verificar"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>' + '<br>Cantidad: ' + respuesta[i].Cantidad + "€ - ";
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
						}
					});
				}
				$('#contienelistados').html(cadena);						
			}else{
				estilosAlerta();
				$('#info').html("No hay Ingresos sin Verificar");
				console.log("No hay Ingresos sin Verificar");
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
	conexionCentro();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "../perfil.html";
	});
})