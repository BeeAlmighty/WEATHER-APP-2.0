const apiKeys = "6d2507ce67a32cb5eb21967e695f7063";
const weatherInput = document.getElementById('weatherInput');
let container = document.querySelector(".container");
let weatherForm = document.querySelector(".entry");



weatherForm.addEventListener('submit', async event => {
  event.preventDefault()

  let city = weatherInput.value;

  if(city){

    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      console.log(weatherData)

    }catch(error) {
      displayError(error)
    }

  }else {
    displayError('Please Enter a city')
  }
  
});


async function getWeatherData(city) {

  const apiWeb = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}`;

  const response = await fetch(apiWeb);
  if(!response.ok) {
    throw new Error('Couldn\'t Fetch Data')
  }
  return response.json()

}

const displayWeatherInfo = (data) => {
  const {
          name: city, 
         sys: {
           country
          }, 
          main: {
            temp
          },
          weather: [
            {
              description: desc,
              id
            }
          ],
          wind: {
            speed: wind
          } 
        } = data;
  
  container.textContent = '';
  container.style.display = 'flex';
  
  let cityDisplay = document.createElement('h1');
  let countryDisplay = document.createElement('h1');
  let tempDisplay = document.createElement('p');
  let descDisplay = document.createElement('p');
  let emoDisplay = document.createElement('p');
  let windDisplay = document.createElement('p');


  cityDisplay.textContent =  `CITY: ${city}`;
  countryDisplay.textContent = `COUNTRY: ${country}`;
  tempDisplay.textContent = `TEMPERATURE: ${(temp - 273.15).toFixed(1)}°C`;
  descDisplay.textContent = `DESCRIPTION: ${desc}`;
  emoDisplay.textContent = getWeatherEmoji(id)
  windDisplay.textContent = `WIND: ${wind} MPH`;


  cityDisplay.classList.add('city');
  countryDisplay.classList.add('country');
  tempDisplay.classList.add('temp');
  descDisplay.classList.add('desc');
  emoDisplay.classList.add('id');
  windDisplay.classList.add('wind');

  container.appendChild(cityDisplay);
  container.appendChild(countryDisplay);
  container.appendChild(tempDisplay);
  container.appendChild(descDisplay);
  container.appendChild(emoDisplay);
  container.appendChild(windDisplay);



}

const getWeatherEmoji = (weatherId) => {
  
  switch(true){
    case (weatherId >= 200 && weatherId < 300):
      return '⛈';
    case (weatherId >= 300 && weatherId < 400):
      return '🌧';
    case (weatherId >= 500 && weatherId < 600):
      return '⛈';
    case (weatherId >= 600 && weatherId < 700):
      return '❄️';
    case (weatherId >= 700 && weatherId < 800):
      return '⛅️';
    case (weatherId === 800):
      return '☀️';
    case (weatherId > 800 && weatherId <= 810):
      return '☁️';
    default:
      return '❓';
  }
}

const displayError = (message) => {
  const errorDisplay = document.createElement('h1');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('error');

  container.textContent = '';
  container.style.display = 'flex';
  container.appendChild(errorDisplay);

}




























// async function getWeatherData () {
//   let cityName = weatherInput.value;
//   try {

//     const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeys}`);
    
//     const data = await response.json();
//     const {
//       name: city, 
//      sys: {
//        country: country
//       }, 
//       main: {
//         temp: temp
//       },
//       weather: [
//         {
//           description: desc
//         }
//       ],
//       wind: {
//         speed: wind
//       } 
//     } = data;
//     console.log(data);
    
//     if(cityName){
//       displayWeather(city, country, temp, desc, wind);
      
//     }else if(!cityName || cityName === '') {
//       errorMessage()
//     }
//   }
//   catch(error){
//     console.error('INVALID CITY!!');
//     // errorDisplay.textContent = 'INVALID CITY'
//     errorMessage('INVALID CITY!!')

//   }
  
// }

// const displayWeather = (city, country, temp, desc, wind) => {
//   cityDisplay.textContent =  `CITY: ${city}`;
//   countryDisplay.textContent = `COUNTRY: ${country}`;
//   tempDisplay.textContent = `TEMPERATURE: ${(temp - 273.15).toFixed(1)}°C`;
//   descDisplay.textContent = `DESCRIPTION: ${desc}`;
//   emoDisplay.textContent = '☁️'
//   windDisplay.textContent = `WIND: ${wind} MPH`;

//   cityDisplay.classList.add('city');
//   countryDisplay.classList.add('country');
//   tempDisplay.classList.add('temp');
//   descDisplay.classList.add('desc');
//   emoDisplay.classList.add('id');
//   windDisplay.classList.add('wind');

//   // if(temp < 15){
//   //   tempDisplay.classList.add(low_temp)
//   // } else {
//   //   tempDisplay.classList.add(high_temp)

//   // }
  
//   container.style.display = 'flex';
//   container.removeChild(errorDisplay);

//   container.appendChild(countryDisplay);
//   container.appendChild(cityDisplay);
//   container.appendChild(tempDisplay);
//   container.appendChild(descDisplay);
//   container.appendChild(emoDisplay);
//   container.appendChild(windDisplay);
// }


// const errorMessage = (message) => {
//   errorDisplay.textContent = `PLEASE ENTER VALID CITY NAME!!`;
//   errorDisplay.classList.add('error');
//   container.appendChild(errorDisplay);
//   container.removeChild(cityDisplay);
//   container.removeChild(countryDisplay);
//   container.removeChild(tempDisplay);
//   container.removeChild(windDisplay);
//   container.removeChild(emoDisplay);
//   container.removeChild(descDisplay);
// }