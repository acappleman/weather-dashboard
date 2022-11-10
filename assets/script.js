const APIKey = "ac4b41943cfd428cec371f8ad7d9a7f3";
const limit = 5;
let now = moment();

let history = localStorage.getItem('history');
if (!history) {
    history = [];
} else {
    history = history.split(',');
}
console.log(history);
for (let i = 0; i < history.length; i++) {
    $('#searchHistory').append('<button class="btn btn-secondary" type="button">' + history[i] + '</button>');
}

populateWeather('Houston');

function getApi(requestUrl) {
    return fetch(requestUrl)
      .then(function (response) {
        return response.json();
    });
}

$('#searchHistory').on('click', 'button', function() {
    populateWeather($(this).text());
})

$('#submitButton').click(function() {

    let cityName = $('#floatingInput').val()
    populateWeather(cityName);

    history.push(cityName);
    localStorage.setItem('history', history);

    $('#searchHistory').append('<button class="btn btn-secondary" type="button">' + cityName + '</button>')

});

function populateWeather(cityName) {
    let geocodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + APIKey;

    getApi(geocodeUrl).then(function(response) {
        console.log(response);
        let location = response[0];
        let weatherMapUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + location.lat + "&lon=" + location.lon + "&appid=" + APIKey;
        return getApi(weatherMapUrl);
    }).then(function(response) {
        console.log(response);
        let weatherList = response.list;

        $('#city').html(cityName + " (" + now.format('MM/DD/YYYY') + ') <img src="https://openweathermap.org/img/wn/' + weatherList[0].weather[0].icon + '@2x.png" alt="weather-icon">');
        $('#temp').text('Temp: ' + weatherList[0].main.temp);
        $('#wind').text('Wind: ' + weatherList[0].wind.speed);
        $('#humidity').text('Humidity: ' + weatherList[0].main.humidity);

        let tomorrow = weatherList[7];
        let day2 = weatherList[15];
        let day3 = weatherList[23];
        let day4 = weatherList[31];
        let day5 = weatherList[39];

        // Tomorrow
        $('#dateDay1').text(moment(tomorrow.dt_txt).format('MM/DD/YYYY'));
        console.log(tomorrow.weather[0].icon);
        $('#weatherIconDay1').attr('src', 'https://openweathermap.org/img/wn/' + tomorrow.weather[0].icon + '@2x.png');
        $('#tempDay1').text('Temp: ' + tomorrow.main.temp);
        $('#windDay1').text('Wind: ' + tomorrow.wind.speed);
        $('#humidityDay1').text('Humidity: ' + tomorrow.main.humidity);

        // Day 2
        $('#dateDay2').text(moment(day2.dt_txt).format('MM/DD/YYYY'));
        console.log(day2.weather[0].icon);
        $('#weatherIconDay2').attr('src', 'https://openweathermap.org/img/wn/' + day2.weather[0].icon + '@2x.png');
        $('#tempDay2').text('Temp: ' + day2.main.temp);
        $('#windDay2').text('Wind: ' + day2.wind.speed);
        $('#humidityDay2').text('Humidity: ' + day2.main.humidity);

        // Day 3
        $('#dateDay3').text(moment(day3.dt_txt).format('MM/DD/YYYY'));
        console.log(day3.weather[0].icon);
        $('#weatherIconDay3').attr('src', 'https://openweathermap.org/img/wn/' + day3.weather[0].icon + '@2x.png');
        $('#tempDay3').text('Temp: ' + day3.main.temp);
        $('#windDay3').text('Wind: ' + day3.wind.speed);
        $('#humidityDay3').text('Humidity: ' + day3.main.humidity);

        // Day 4
        $('#dateDay4').text(moment(day4.dt_txt).format('MM/DD/YYYY'));
        console.log(day4.weather[0].icon);
        $('#weatherIconDay4').attr('src', 'https://openweathermap.org/img/wn/' + day4.weather[0].icon + '@2x.png');
        $('#tempDay4').text('Temp: ' + day4.main.temp);
        $('#windDay4').text('Wind: ' + day4.wind.speed);
        $('#humidityDay4').text('Humidity: ' + day4.main.humidity);

        // Day 5
        $('#dateDay5').text(moment(day5.dt_txt).format('MM/DD/YYYY'));
        console.log(day5.weather[0].icon);
        $('#weatherIconDay5').attr('src', 'https://openweathermap.org/img/wn/' + day5.weather[0].icon + '@2x.png');
        $('#tempDay5').text('Temp: ' + day5.main.temp);
        $('#windDay5').text('Wind: ' + day5.wind.speed);
        $('#humidityDay5').text('Humidity: ' + day5.main.humidity);
    });
}




