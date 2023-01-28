/*
WEATHER APP
- DOM manipulations
-DOM events
-APIs
-JSON
-HTTP
-AJAX
-Immutability
-Storage
-Optimization
-callbacks
-hof (higher order function)
-geolocation
*/

const submit = document.querySelector('#submitForm').addEventListener('submit', submitForm)
let city = document.forms['cityName'].elements[0]
let temperature = document.getElementById('temperature')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('wind-speed')
let output = document.getElementById('output')
let icon = document.querySelector('#icon').firstElementChild

const loadDataFromAPI = (cb) => {

    let xhr = new XMLHttpRequest()
    xhr.open(
        "GET",
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value.replace(/\s/g, "")}&appid=b88431da936bcbf38383e4d0aba65ae7&units=metric`
    )
    xhr.send()

    xhr.onload = () => {
        let data = JSON.parse(xhr.responseText)
        //console.log(data) 
        cb(data)
    }
}

// manages data
const load = (cb) => {
    // 1. check the cache
    let data = null
    if (checkDataCache("data")) {
        // 2. take from cache
        data = loadDataFromCache("data")
        cb(data)
        //cb(data)
    } else {
        // 3. take from API
        loadDataFromAPI((data) => {
            saveDataToCache("data", data)
            cb(data)
        })
    }

}

const saveDataToCache = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const loadDataFromCache = (key) => {
    return JSON.parse( localStorage.getItem(key))
}

const checkDataCache = (key) => {
    return localStorage.getItem(key)
}

const render = (data) => {
    temperature.innerHTML = `Temperature: ${data.main.temp} Celsius deg`
    humidity.innerHTML = `Air humididty: ${data.main.humidity}`
    windSpeed.innerHTML = `Wind speed: ${data.wind.speed}`
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    //saveData(data)
}

function submitForm(event) {
    if(city.value) {
        loadDataFromAPI(render)
    } 
    event.preventDefault()
    //console.log('aa')
    load(render)
}


// loadDataFromAPI(render)


/*
    CACHE:
    - speed
    - near consumption place
    - lower traffic
    - low resource consumption

    CONSUMER --- req --->  [CACHE] | --- req ---> PROVIDER
                                   |
                                   |
                        cache hit  | -  cache miss


*/