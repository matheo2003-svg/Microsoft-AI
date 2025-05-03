// public/js/map.js
const API_KEY = '3be5c8cd8ccb0a17c108f5b9996bcc39'; // Replace with your OpenWeatherMap API key
const map = L.map('map').setView([-30.5595, 22.9375], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);



const cities = [
  { name: 'Durban', coords: [-29.8587, 31.0218] },
  { name: 'Cape Town', coords: [-33.9249, 18.4241] },
  { name: 'Johannesburg', coords: [-26.2041, 28.0473] },
  { name: 'Pretoria', coords: [-25.7479, 28.2293] }
];

cities.forEach(city => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},ZA&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const weather = data.weather[0];
      const weatherMain = weather.main.toLowerCase();
      const description = weather.description;
      const temperature = data.main.temp;

      let color = 'red'; // default
      if (weatherMain.includes('rain')) color = 'blue';
      else if (weatherMain.includes('clear')) color = 'orange';
      else if (weatherMain.includes('cloud')) color = 'gray';
      else if (weatherMain.includes('snow')) color = 'lightblue';

      L.circleMarker(city.coords, {
        radius: 10,
        fillColor: color,
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })
      .addTo(map)
      .bindPopup(
        `<b>${city.name}</b><br>
        🌤️ <b>${description}</b><br>
        🌡️ Temp: ${temperature}°C`
      );
    })
    .catch(err => {
      console.error(`Failed to load weather for ${city.name}:`, err);
    });
});
