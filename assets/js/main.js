/* 
TODOS:
    ! Figure out which weather conditions exist. Include function for different icons in case of different conditions.
    ? Maybe include a function that keeps the site on load till the location track as either accepted or declined.
*/

const urlConstructor = (lat, lon) => {
    const city = document.querySelector('#city').value
    const apiKey = '584ebb9b612546f89b1185600231802'
    const url = new URL('http://api.weatherapi.com/v1/current.json')
    const urlParam = new URLSearchParams()

    // ? Works, but maybe replace with switch for consistency
    if (lat, lon) {
        console.log(url);
        urlParam.append('q', lat + ',' + lon)
    } else if (city) {
        urlParam.append('q', city)
    }

    urlParam.append('key', apiKey)
    url.search = urlParam.toString()
    console.log(url.toString());

    return url;
}

// Checks if either celsius, fahrenheit or both is selected. Returns the corresponding value.
const celsiusFahrenheit = (data) => {
    const tempChoose = document.querySelector('#temp-choose').value
    switch (tempChoose) { 
        case 'c': return `${data.current.temp_c}°C` 
        case 'f': return `${data.current.temp_f}°F`
        case 'cf': return `${data.current.temp_c}°C / ${data.current.temp_f}°F`
    }
}

function fetchData(lat, lon) {
    fetch(urlConstructor(lat, lon))
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#weather-icon').src = 'https://basmilius.github.io/weather-icons/production/fill/all/drizzle.svg'
            document.querySelector('#location').innerHTML = `${data.location.name}, ${data.location.country}`
            document.querySelector('#temperature-output').innerHTML = celsiusFahrenheit(data)
        });
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        fetchData(position.coords.latitude, position.coords.longitude);
      });
}

document.addEventListener('DOMContentLoaded', getLocation)

document.querySelector('#search').addEventListener('click', fetchData, false);