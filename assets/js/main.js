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

		var apiLinkDS = 'https://api.darksky.net/forecast/1b8c46e63e71d03f379b7140dc2/'+latitud+','+longitud+'?language=es?&units=auto&callback=?';//le agregamos nuestro idioma para que nos muestre la info en español y las unidades de medida que nosotros usamos 

		$.ajax({
			url: apiLinkDS,
			type: 'GET',
			datatype: 'jsonp',	
		})

		.done(function(data) {
			console.log(data);
			$('#weather').append(
				'<img src="assets/iconos/'+data.currently.icon+'.png">'+
				'<h1 class="left-align">'+ data.currently.apparentTemperature+'</h1>'+'<br>'+
				'<h3 class="left-align">Wind</h3>'+ '<span class="right-align">'+data.currently.windSpeed+'</span>'+'<br>'+
				'<h3 class="left-align">Humidity</h3>'+'<span class="right-align">'+data.currently.humidity+'</span>'+'<br>'+
				'<h3 class="left-align">UV Index</h3>'+'<span class="right-align">'+data.currently.uvIndex+'</span>'+'<br>'+
				'<h3 class="left-align">Pressure</h3>'+'<span class="right-align">'+data.currently.pressure+'</span>'+'<br>'+
				'<a href="sevenDays.html" class="waves-effect waves-light btn" id="week">PREDICCION DE LA SEMANA</a>');
		})

		.fail(function() {
			console.log('Error al conectar a la Api')
		})
		
	}