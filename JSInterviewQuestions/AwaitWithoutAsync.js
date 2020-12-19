function getWeather(loc) {
  (async function() {
    const weather = await fetchWeather(loc);
  })();

  // on and on - code with no dependency on weather
}
