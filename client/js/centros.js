conexion('GET','',"api/Centros");

function conexion(metodo,datos,url){
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: metodo,
		url: url,
	}).done(function (respuesta){
		if(typeof(respuesta) !== undefined){
			respuesta.Nombre; // VER QUE DEVUELVE
		}
	});
}
				