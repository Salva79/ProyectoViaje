function conexion(){
	var envio = {
		username: 'nombre',
		password: 'password'
	}
	$.ajax({
		async: true,
		dataType: 'json',
		data: envio,
		method: 'Post',
		url: '/api/Usuarios/login',
		error: function (xhr){
			console.log('Error ' + xhr.statusText + ' envio de datos');
		},
		sucess:function (respuesta){
			console.log('Enviado, reciviendo:');
			console.log(respuesta);
		},
		complete:function () {
			console.log('Enviado terminado');
		}
	});
}
$(document).ready(function() {
	console.log('cargado');
	$('#enviar').click(function() {
		console.log('pulsado');
		conexion();
	});	
	$('#botonPerfil').click(function() {
		window.location="perfil.html";
	});
	$('#botonVolver').click(function() {
		window.history.back();
	});
})