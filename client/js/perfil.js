var direccion = '/api/Usuarios/' + sessionStorage.userId + '?access_token=' + sessionStorage.userToken;
var direObjetivo = '/api/Objetivos/' + sessionStorage.userObjetivoId + '?access_token=' + sessionStorage.userToken;
var direCentros = '/api/Centros/' + sessionStorage.userCentroId + '?access_token=' + sessionStorage.userToken;
var perfil;

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

function cargaDatos(){
	if (sessionStorage.userCurso == "Coordinador") {
		$("#menu").html('<li><a href="coordinador/inicio.html">Inicio</a></li><li><a href="coordinador/centros/modificarCentro.html">Modificar Centro</a></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Alumnos<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/alumnos/altaAlumnos.html">Alta Alumnos</a></li><li><a href="coordinador/alumnos/listadoAlumnos.html">Listado Alumnos</a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Ingresos<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/ingresos/altaIngresos.html">Alta Ingresos</a></li><li><a href="coordinador/ingresos/listadoIngresos.html">Listado Ingresos</a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Pedidos<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/pedidos/altaPedidos.html">Alta Pedidos</a></li><li><a href="coordinador/pedidos/listadoPedidos.html">Listado Pedidos</a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Productos<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/productos/altaProductos.html">Alta Productos</a></li><li><a href="coordinador/productos/listadoProductos.html">Listado Productos</a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Tipos Producto<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/tiposProducto/altaTiposProducto.html">Alta Tipos Producto</a></li><li><a href="coordinador/tiposProducto/listadoTiposProducto.html">Listado Tipos Producto</a></li></ul></li><li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Proveedores<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="coordinador/proveedores/altaProveedores.html">Alta Proveedores</a></li><li><a href="coordinador/proveedores/listadoProveedores.html">Listado Proveedores</a></li></ul></li>');
	} else {
		$("#menu").html('<li><a href="alumno/inicio.html">Inicio</a></li><li><a href="alumno/altaIngresos.html">Alta Ingreso</a></li><li><a href="alumno/listadoIngresos.html">Listado Ingresos</a></li><li><a href="alumno/listadoPedidos.html">Listado Pedidos</a></li>');
	}

	$("#botonPerfil").html("<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre);
	$("#perfil").text("Perfil de " + sessionStorage.userNombre);
	$("#dni").val(sessionStorage.userDNI);
	$("#nombre").val(sessionStorage.userNombre);
	$("#apellidos").val(sessionStorage.userApellidos);
	$("#email").val(sessionStorage.userEmail);
	$("#curso").val(sessionStorage.userCurso);

	if (sessionStorage.userCurso == "Coordinador") {
		$("#curso").hide();
	}

	$("#telefono").val(sessionStorage.userTelefono);
	$("#ncentro").val("Centro: " + sessionStorage.usernCentro);
	$("#objetivo").val("Año: " + sessionStorage.usernObjetivo);
}
function actualizaDatos(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.userNombre = respuesta.Nombre;
				sessionStorage.userApellidos = respuesta.Apellidos;
				sessionStorage.userDNI = respuesta.DNI;
				sessionStorage.userTelefono = respuesta.Telefono;
				sessionStorage.userCurso = respuesta.Curso;
				sessionStorage.userusername = respuesta.username;
				sessionStorage.userEmail = respuesta.email;
				var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
				$("#botonPerfil").html(nombre);
				estilosinfo();
				$('#info').html("Has actualizado tus datos");
				eliminarinfo();

				window.location.href = "perfil.html";
				
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
				$('#info').html("Error en el envio de datos 1");
				console.log("Error en el envio de datos");
				eliminarAlerta();
			}
			eliminarStorage();
			window.location.href = "index.html";			
	});		
}
function cogeObjetivo(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.usernObjetivo = respuesta.Nombre;
			}else{
				estilosAlerta();
				$('#info').html("No exite el objetivo");
				console.log("No exite el objetivo");
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
function cogeCentro(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
			if(typeof(respuesta.id) !== undefined){
				sessionStorage.usernCentro = respuesta.Nombre;
			}else{
				estilosAlerta();
				$('#info').html("No exite el centro");
				console.log("No exite el centro");
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
function recogeDatos(){
	var error = "";
	var correcto = true;
	var patronNif = /(^([0-9]{8}[A-Z]{1})|^)$/;

	var name = $("#nombre").val();
	var apellidos = $("#apellidos").val();
	var dni = $("#dni").val();
	var curso = $("#curso").val();
	var email = $("#email").val();
	var telefono = $("#telefono").val();

	name = name.trim();
	apellidos = apellidos.trim();
	curso = curso.trim();
	telefono = telefono.trim();
	dni = dni.trim();

	if (sessionStorage.userCurso == "Coordinador") {
		if (name == "" || apellidos == "" || dni == "" || telefono == "") {
		error = "El nombre, apellidos, nif y teléfono son obligatorios";
			correcto = false;
		}else {
			if (!(patronNif.test(dni))) {
				error = "Introduce un nif válido";
				correcto = false;
			}
		}
	}else {
		if (name == "" || apellidos == "" || dni == "" || curso == ""|| telefono == "") {
		error = "El nombre, apellidos, nif, teléfono y curso son obligatorios";
			correcto = false;
		}else {
			if (!(patronNif.test(dni))) {
				error = "Introduce un nif válido";
				correcto = false;
			}
		}
	}

	if(correcto){
		perfil = {
		  "Nombre": name,
		  "Apellidos": apellidos,
		  "DNI": dni,
		  "Telefono": telefono,
		  "Curso": curso,
		  "username": sessionStorage.userusername,
		  "password": sessionStorage.userpassword,
		  "email": email,
		  "centroId": sessionStorage.userCentroId,
		  "objetivo": sessionStorage.userObjetivoId
		}
		actualizaDatos('PUT',perfil,direccion);
	}else{
		cargaDatos();
		estilosAlerta();
		$('#info').html(error);
		eliminarAlerta();
	}
			
}
cogeCentro('GET','',direCentros);
cogeObjetivo('GET','',direObjetivo);

$(document).ready(function() {
	cargaDatos();
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "index.html";
	});
	$("#botonPerfil").click(function(){
		window.location.href = "perfil.html";
	});
	$("#insertar").click(function(){
		recogeDatos();
	});
})