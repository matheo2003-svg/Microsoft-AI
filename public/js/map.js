// public/js/map.js
const API_KEY = '3be5c8cd8ccb0a17c108f5b9996bcc39'; // Replace with your OpenWeatherMap API key
const map = L.map('map').setView([-30.5595, 22.9375], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);



const cities = [
  { name: 'Soweto',           coords: [-26.26781, 27.85849] },
{ name: 'Alexandra',        coords: [-26.10528, 28.09884] },
{ name: 'Khayelitsha',      coords: [-34.0393, 18.6792] },
{ name: 'Gugulethu',        coords: [-33.983, 18.567] },
{ name: 'Nyanga',           coords: [-33.9833, 18.5833] },
{ name: 'Mitchells Plain', coords: [-34.0534, 18.6237] },
{ name: 'Umlazi',           coords: [-29.9667, 30.8833] },
{ name: 'Soshanguve',       coords: [-25.5228, 28.1053] },
{ name: 'Thembisa',         coords: [-25.99636, 28.2268] },
{ name: 'Mamelodi',         coords: [-25.707, 28.347] },
{ name: 'Diepsloot',        coords: [-25.9333, 27.9333] },
{ name: 'oThongathi',       coords: [-29.5833, 31.1333] },
{ name: 'Bronville',        coords: [-27.9833, 26.7167] },
{ name: 'Hani Park',        coords: [-27.9833, 26.7167] },
{ name: 'Port St Johns',    coords: [-31.6167, 29.5333] },
{ name: 'Kwanobuhle',       coords: [-33.7833, 25.4167] },
{ name: 'Langa',            coords: [-33.9333, 18.5333] },
{ name: 'Zwide',            coords: [-33.8833, 25.5833] },
{ name: 'Mdantsane',        coords: [-32.9333, 27.6833] },
{ name: 'Jozini',           coords: [-27.4333, 32.0833] },
{ name: 'Elukwatini',       coords: [-25.8833, 30.7667] },
{ name: 'Muyexe',           coords: [-23.3167, 30.7167] },
{ name: 'Nkwowankowa',      coords: [-23.8333, 30.2833] },
{ name: 'Komani',           coords: [-31.8833, 26.8667] },
{ name: 'Coffee Bay',       coords: [-31.9833, 29.1333] }

  //Malamulele //Umlazi //Thembisa //
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
