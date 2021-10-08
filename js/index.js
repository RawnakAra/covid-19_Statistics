let coronaURL = 'https://corona-api.com/countries'
let countriesURl = 'https://cors-anywhere.herokuapp.com/https://restcountries.herokuapp.com/api/v1'
//let countriesURl = 'https://restcountries.herokuapp.com/api/v1'
let countriesResult, covidDataResult, chosenContinent, graphObject;
async function getCountries() {
    let countries = await ((await fetch(countriesURl)).json())
    countries = countries.map(element => {
        return {
            name: element.name.common,
            region: element.region
        }
    })
    window.sessionStorage.setItem('countries', JSON.stringify(countries))
    //return countries;
    //let mahde = JSON.parse(sessionStorage.getItem('countries')) //USE THIS IN OTHER CODE
}
async function getCOVIDData() {
    let covidData = (await ((await fetch(coronaURL)).json())).data;
    covidData = covidData.map(element => {
        return {
            name: element.name,
            population: element.population,
            critical: element.latest_data.critical,
            deaths: element.latest_data.deaths,
            recovered: element.latest_data.recovered,
            confirmed: element.latest_data.confirmed
        }
    })
    window.sessionStorage.setItem('covidData', JSON.stringify(covidData))
    //return covidData;
    //let mahde = JSON.parse(sessionStorage.getItem('countries')) //USE THIS IN OTHER CODE
}
function getContinent(continentIWant, typeOfStatistic) {
    let arrayOfCountriesNames = [], arrayOfCountriesCovidData = [];
    console.log(countriesResult);
    for (let i = 0; i < countriesResult.length; i++) {
        if (countriesResult[i].region == continentIWant) {
            arrayOfCountriesNames.push(countriesResult[i].name);
            arrayOfCountriesCovidData.push(covidDataResult[i][typeOfStatistic])
        }
    }
    return { arrayOfCountriesNames, arrayOfCountriesCovidData }
}
function buildChart(charttype, continent, statistictype) {
    let dataRes = getContinent(continent, statistictype)
    if (graphObject)
        graphObject.destroy()
    graphObject = new Chart(document.querySelector('#myChart'), {
        type: charttype,
        data: {
            labels: dataRes.arrayOfCountriesNames,
            datasets: [{
                label: statistictype,
                data: dataRes.arrayOfCountriesCovidData,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                fill: true
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    })
}
async function run() {
    await getCountries()
    await getCOVIDData()
    countriesResult = JSON.parse(sessionStorage.getItem('countries'))
    covidDataResult = JSON.parse(sessionStorage.getItem('covidData'))
    console.log(countriesResult);
    console.log(covidDataResult);
}
document.querySelector('#asia').addEventListener('click', async function () {
    await run()
    buildChart('line', 'Asia', 'confirmed')
    chosenContinent = 'Asia';
})