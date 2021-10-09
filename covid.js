let coronaURL = 'https://corona-api.com/countries'
let countriesURl = 'https://cors-anywhere.herokuapp.com/https://restcountries.herokuapp.com/api/v1'
//let countriesURl = 'https://restcountries.herokuapp.com/api/v1'

async function getCovidData(){
    let covidUrl = (await (await fetch(coronaURL)).json()).data;
    covidData = covidUrl.map((element) =>{
        return {
            name :element.name,
            confirmed : element.latest_data.confirmed,
            critical : element.latest_data.critical,
            deaths : element.latest_data.deaths,
            recovered : element.latest_data.recovered
        }
    })
    window.sessionStorage.setItem('covidData', JSON.stringify(covidData))
}
//getCovidData()
async function getContinentNames(){
    let countriesUrl = await (await fetch(countriesURl)).json()
    console.log(countriesUrl);
    countriesNames = countriesUrl.map((element) =>{
        return{
        name : element.name.common,
        region : element.region
    }
    })
    console.log(countriesNames)
    window.sessionStorage.setItem('countriesNames', JSON.stringify(countriesNames))
}
getContinentNames()