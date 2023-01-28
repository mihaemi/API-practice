const rates = []
const labels = []

const getRatesForDate = (date) => {
    const URL = `https://bnm.md/ro/official_exchange_rates?get_xml=1&date=${date}`
    const xhr = new XMLHttpRequest()

    xhr.open("GET", URL)
    xhr.send()

    xhr.onload = () => {
        let res = xhr.responseText
        
        // parsing XML
        let xmlParser = new DOMParser()
        let xmlDoc = xmlParser.parseFromString(res, "text/xml")

        let valute = xmlDoc.querySelector('[ID="47"]')

        // EUR to MDL
        let value = parseFloat(valute.lastElementChild.innerHTML)
        
        //console.log(value)
        rates.push(value)
    }
}

const getRates = (fromDate, toDate) => {
    for (let date = fromDate; date <= toDate; date++) {
        if(date < 10)
        date = '0' + date
        labels.push(`${date}.01.2023`)
        getRatesForDate(`${date}.01.2023`)
    }
}

getRates(1, 28)

const plotData = ()=> {
    const data = {
        labels: labels,
        datasets: [{
        label: 'BNM Exchange rates for EUR/MDL',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: rates,
        }]
    }
    const config = {
        type: 'line',
        data: data,
        options: {}
    }
    const ratesChart = new Chart(
        document.getElementById('ratesChart'),
        config
    )
}
setTimeout(plotData, 2000)