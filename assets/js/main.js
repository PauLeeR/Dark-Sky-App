
$(document).ready(function() { 
	//funcion para preguntar ubicación al usuario
	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(found, notFound);
		}
	}

	window.addEventListener("load", buscar); //una vez que cargue la página (o app en este caso), se echa a andar la función buscar

	var latitud, longitud;

	var found = function(posicion){ //entrega la posición del usuario
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;
		showMeTheWeather(latitud, longitud);
	}

	var notFound = function(error){// en caso de no encontrar la ubicación del usuario, entrega un alert con un msj
		alert ("We couldn't find you!");
	}

	/*llamada a la api de Dark Sky*/ 
	function showMeTheWeather(latitud, longitud){

		var proxy = 'https://cors-anywhere.herokuapp.com/';
		var apiLinkDS = "https://api.darksky.net/forecast/1b8c46e63e71d03f379b7140dc2/'+latitud+','+longitud+'?language=es?&units=auto';

		$.ajax({
			url: proxy+apiLinkDS,
			type: 'GET',
			datatype: 'jsonp',	
		})

		.done(function(data) {
			console.log(data);
			$('.mostrar').append('<p>la temperatura es de '+ data.currently.apparentTemperature+'</p>');
		})
		.fail(function() {
			console.log('Error al conectar a la Api')
		})
		.always(function() {
			console.log('Completado')
		});
	}
});