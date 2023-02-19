const urlConstructor = () => {
    const city = document.querySelector('#city').value
    const apiKey = '584ebb9b612546f89b1185600231802'
    const url = new URL('http://api.weatherapi.com/v1/current.json')
    const urlParam = new URLSearchParams()

    urlParam.append('key', apiKey)
    urlParam.append('q', city)
    url.search = urlParam.toString()

    return url;
}

const celsiusFahrenheit = (data) => {
    const tempChoose = document.querySelector('#temp-choose').value
    switch (tempChoose) {
        case 'c': return `${data.current.temp_c}°C` 
        case 'f': return `${data.current.temp_f}°F`
    }
}

function fetchData() {
    fetch(urlConstructor())
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector('#location').innerHTML = `${data.location.name}, ${data.location.country}`
            document.querySelector('#temperature-output').innerHTML = celsiusFahrenheit(data)
            console.log(data.current.temp_c);
        });

}

document.querySelector('#search').addEventListener('click', fetchData, false);