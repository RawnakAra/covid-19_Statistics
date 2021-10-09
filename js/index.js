let coronaURL = 'https://corona-api.com/countries'
let countriesURl = 'https://api.allorigins.win/raw?url=https://restcountries.herokuapp.com/api/v1'

let chosenContinent, graphObject, chosenCase;

const asia = document.querySelector('#asia'),
    africa = document.querySelector('#africa'),
    america = document.querySelector('#america'),
    europe = document.querySelector('#europe'),
    oceania = document.querySelector('#oceania'),
    CountriesContainer = document.querySelector('.CountriesContainer'),
    selectbtn = document.querySelector('#selectbtn'),
    Country = document.querySelector('#Country'),
    confirmed = document.querySelector('.confirmed'),
    death = document.querySelector('.death'),
    recovered = document.querySelector('.recovered'),
    critical = document.querySelector('.condition'),
    totalCases = document.querySelector('.totalCases'),
    totaldeath = document.querySelector('.totaldeath'),
    totalrecoverd = document.querySelector('.totalrecoverd'),
    criticalcondition = document.querySelector('.criticalcondition');

async function getCountries() {
    if(!window.localStorage.getItem('countries')){
    let countries = await ((await fetch(countriesURl)).json())
    countries = countries.map(element => {
        return {
            name: element.name.common,
            region: element.region
        }
    })
    window.localStorage.setItem('countries', JSON.stringify(countries))
}
}

async function getCOVIDData() {
    if(!window.localStorage.getItem('covidData')){
    let covidData = (await ((await fetch(coronaURL)).json())).data;
    covidData = covidData.map(element => {
        return {
            name: element.name,
            critical: element.latest_data.critical,
            deaths: element.latest_data.deaths,
            recovered: element.latest_data.recovered,
            confirmed: element.latest_data.confirmed
        }
    })
    window.localStorage.setItem('covidData', JSON.stringify(covidData))
}
}

function getContinent(continentIWant, typeOfStatistic) {
    let arrayOfCountriesCovidData = [], arrayOfCountriesNames = [];
    for (let i = 0; i < countriesResult.length; i++) {
        if (countriesResult[i].region == continentIWant) {
            for (let j = 0; j < covidDataResult.length; j++)
                if (covidDataResult[j].name == countriesResult[i].name && covidDataResult[j] != undefined) {
                    arrayOfCountriesCovidData.push(covidDataResult[j][typeOfStatistic])
                    arrayOfCountriesNames.push(countriesResult[i].name);
                }
        }
    }
    return { arrayOfCountriesNames, arrayOfCountriesCovidData }
}

function selectScroll(region) {
    Country.innerHTML = '';
    let countries = (getContinent(region, 'confirmed')['arrayOfCountriesNames'])
    countries.forEach(element => {
        Country.innerHTML += `<option value='${element}'>${element}</option>`
    })
}


function buildChart(continent, statistictype = 'confirmed') {
    let dataRes = getContinent(continent, statistictype)
    if (graphObject)
        graphObject.destroy()
    graphObject = new Chart(document.querySelector('#myChart'), {
        type: 'line',
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
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,


                    }
                }
            }
        }
    })
}


asia.addEventListener('click', () => {
    totalCases.innerHTML=totaldeath.innerHTML=totalrecoverd.innerHTML=criticalcondition.innerHTML=''
    selectScroll('Asia');
    buildChart('Asia', chosenCase)
    chosenContinent = 'Asia';
})
africa.addEventListener('click', function () {
    totalCases.innerHTML=totaldeath.innerHTML=totalrecoverd.innerHTML=criticalcondition.innerHTML=''
    buildChart('Africa', chosenCase)
    chosenContinent = 'Africa';
   selectScroll('Africa')
})
america.addEventListener('click', function () {
    totalCases.innerHTML=totaldeath.innerHTML=totalrecoverd.innerHTML=criticalcondition.innerHTML=''
    buildChart('Americas', chosenCase)
    chosenContinent = 'Americas';
    selectScroll('America')
})
europe.addEventListener('click', function () {
    totalCases.innerHTML=totaldeath.innerHTML=totalrecoverd.innerHTML=criticalcondition.innerHTML=''
    buildChart('Europe', chosenCase)
    chosenContinent = 'Europe';
    selectScroll('Europe')
})
oceania.addEventListener('click', function () {
    totalCases.innerHTML=totaldeath.innerHTML=totalrecoverd.innerHTML=criticalcondition.innerHTML=''
    buildChart('Oceania', chosenCase)
    chosenContinent = 'Oceania';
    selectScroll('Oceania')
})

confirmed.addEventListener('click', function () {
    buildChart(chosenContinent, 'confirmed');
    chosenCase = 'confirmed';

})
death.addEventListener('click', () => {
    buildChart(chosenContinent, 'deaths')
    chosenCase = 'deaths'
})
recovered.addEventListener('click', () => {
    buildChart(chosenContinent, 'recovered')
    chosenCase = 'recovered'
})
critical.addEventListener('click', () => {
    buildChart(chosenContinent, 'critical')
    chosenCase = 'critical'
})

Country.addEventListener("change",(e)=>{
     console.log(e.target.value)
     for(let i=0;i<covidDataResult.length;i++){
         if(e.target.value==covidDataResult[i].name){
             console.log(covidDataResult[i])
             totalCases.innerHTML=covidDataResult[i].confirmed
             totaldeath.innerHTML=covidDataResult[i].deaths
             totalrecoverd.innerHTML=covidDataResult[i].recovered
             criticalcondition.innerHTML=covidDataResult[i].critical
         }
     }
 });
window.onload= async function(){
    await getCOVIDData()
    await getCountries()
    countriesResult = JSON.parse(localStorage.getItem('countries'))
    covidDataResult = JSON.parse(localStorage.getItem('covidData')) 
    buildChart('Asia');
    selectScroll('Asia');
    for(let i=0;i<covidDataResult.length;i++){
        if('Afghanistan' == covidDataResult[i].name){
            console.log(covidDataResult[i])
            totalCases.innerHTML=covidDataResult[i].confirmed
            totaldeath.innerHTML=covidDataResult[i].deaths
            totalrecoverd.innerHTML=covidDataResult[i].recovered
            criticalcondition.innerHTML=covidDataResult[i].critical
        }
    }
}