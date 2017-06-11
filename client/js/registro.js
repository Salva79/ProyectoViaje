$(document).ready(function() {

	function vaciarCampos() {
		$("#email").val("");
		$("#password").val("");
		$("#password1").val("");
		$('#rol > option[value="alumno"]').attr('selected', 'selected');
	}

	function eliminarAlerta() {
		setTimeout(function(){
	        $('#info').html("");
	        $('#info').removeClass('alert alert-danger');
	    	$('#modalCaja').modal('toggle');
	    }, 2500);
	}

	function validarDatos() {
		var error = "";
		var correcto = true;
		var patronEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

		var email = $("#email").val();
		var rol = $("#rol").val();
		var password = $("#password").val();
		var password1 = $("#password1").val();

		email = email.trim();
		password = password.trim();
		password1 = password1.trim();

		if (email == "" || password == "" || password1 == "") {
			error = "El email y las contraseñas son obligatorios";
			correcto = false;
		} else {
			if (!patronEmail.test(email))  {
				error = "Introduce un email válido";
				correcto = false;
			} else {
				if (password != password1) {
					error = "Las contraseñas no coinciden";
					correcto = false;
				}
			}
		}

		if (correcto) {
			sessionStorage.username=email;
			sessionStorage.email=email;
			sessionStorage.password=password;

			if (rol == "alumno") {
				sessionStorage.alumnoRol=1;
				sessionStorage.coordinadorRol=0;
				window.location.href = "completarPerfilAlumno.html";
			} else {
				sessionStorage.alumnoRol=0;
				sessionStorage.coordinadorRol=1;
				window.location.href = "completarPerfilCoordinador.html";
			}

		} else {
			vaciarCampos();
			$('#info').addClass('alert alert-danger');
			$('#info').html(error);
			$('#modalCaja').modal({
		        show: 'true'
		    });
			eliminarAlerta();
		}
	}

	$('#enviar').click(function() {
		validarDatos();
	});	
})