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

/* Eliminar la alerta de información */
function eliminarAlerta() {
	setTimeout(function() {
		$('#info').html("");
		$('#info').removeClass();
		$('#modalCaja').modal('toggle');
	}, 2500);
}

/* Vaciar los campos, después de seleccionar el botón enviar */
function reiniciarElementos() {
	$("#nombre").val("");
	$("#dinicio").val("");
	$("#dfin").val("");
	$("#minicio").val("");
	$("#mfin").val("");
	$("#ainicio").val("");
	$("#afin").val("");
}

/* Función para insertar proveedores */
function insertarObjetivo(datos,url) {
	$.ajax({
		async: true,
		dataType: 'json',
		data: datos,
		method: 'POST',
		url: url,
	}).done(function(respuesta) {
		if (typeof(respuesta.id) !== undefined) {
			$('#info').addClass('alert alert-success');
			$('#info').html("Objetivo insertado");	
		} else {
			$('#info').addClass('alert alert-danger');
			$('#info').html("Error, objetivo no insertado");
		}
	});
}

/* Funciones para validar fechas */
function validarFechaDias (valorFecha) {
	if (!isNaN(valorFecha) && (valorFecha>0) && (valorFecha <=31)) {
		return true;
	} else {
		return false;
	}
}

function validarMeses (valorFecha) {
	if (!isNaN(valorFecha) && (valorFecha>0) && (valorFecha <=12)) {
		return true;
	} else {
		return false;
	}
}

function validarYear (valorFecha) {
	if (!isNaN(valorFecha)) {
		return true;
	} else {
		return false;
	}
}


function compruebafechas(){
	var dinicio = $("#dinicio").val();
	var minicio = $("#minicio").val();
	var ainicio = $("#ainicio").val();
	var dfin = $("#dfin").val();
	var mfin = $("#mfin").val();
	var afin = $("#afin").val();

	var diaInicio = validarFechaDias(dinicio);
	var diaFin = validarFechaDias(dfin);

	var mesInicio = validarMeses(minicio);
	var mesFin = validarMeses(mfin);

	var yearInicio = validarYear(ainicio);
	var yearFin = validarYear(afin);

	if (diaInicio && diaFin && mesInicio && mesFin && yearInicio && yearFin) {
		if(ainicio<=afin){
			if(ainicio===afin){
				if(minicio<=mfin){
					if(minicio===mfin){
						if(dinicio<dfin){
							return true;
						}else{
							return false;
						}
					}else{
						return true;
					}
				}else{
					return false;
				}
			}else{
				return true;
			}
		}else{
			return false;
		}
	} else {
		$('#info').addClass('alert alert-danger');
		$('#info').html("Introduce fechas válidas");
	}
}

/* Función para comprobar los datos introducidos */
function validarDatos() {
	var nombre = $("#nombre").val();
	var dinicio = $("#dinicio").val();
	var minicio = $("#minicio").val();
	var ainicio = $("#ainicio").val();
	var dfin = $("#dfin").val();
	var mfin = $("#mfin").val();
	var afin = $("#afin").val();
	var inicio;
	var fin;
	nombre = nombre.trim();
	dinicio = dinicio.trim();
	minicio = minicio.trim();
	ainicio = ainicio.trim();
	dfin = dfin.trim();
	mfin = mfin.trim();
	afin = afin.trim();
	if (nombre == "" || inicio == "" || fin == "") {
		$('#info').addClass('alert alert-danger');
		$('#info').html("El nombre y las fechas son obligatorios");
	} else if(!compruebafechas()){
		$('#info').addClass('alert alert-danger');
		$('#info').html("Combrueba que la fecha fin sea mayor que la fecha inicio");
	}else{
		inicio = ainicio + "-" + minicio + "-" + dinicio;
		fin = afin + "-" + mfin + "-" + dfin;
		var datosEnvio = {
			"YearInicio": inicio,
  			"YearFin": fin,
  			"usuarioId": sessionStorage.userId,
			"Nombre": nombre
		}
		var destino = '/api/Objetivos?access_token=' + sessionStorage.userToken;
		insertarObjetivo(datosEnvio, destino);
	}
	reiniciarElementos();
	eliminarAlerta();
}

$(document).ready(function() {
	var nombre = "<i class='fa fa-user-circle' aria-hidden='true'></i> " + sessionStorage.userNombre;
	$("#botonPerfil").html(nombre);
	$("#botonSalir").click(function(){
		eliminarStorage();
		window.location.href = "../../index.html";
	});

	$('#insertar').click(function() {
		validarDatos();
	});

	$('body').keyup(function(e){
		if(e.keyCode === 13){
			validarDatos();
		}
	});
})