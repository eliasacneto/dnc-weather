async function getZipWeatherData() {
  const zipcode = document.getElementById("zipcode").value;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
    const data = await response.json();
    console.log(data);
    const street = document.getElementById("street");
    const district = document.getElementById("district");
    const cityUf = document.getElementById("cityUf");

    street.innerHTML = data.logradouro ?? " ";
    district.innerHTML = data.bairro ?? " ";
    cityUf.innerHTML = data.localidade ?? " " + "/" + data.uf ?? " ";
  } catch (error) {
    const errorZipcode = document.getElementById("errorZipcode");
    errorZipcode.innerHTML = "CEP inválido!";
    console.log(error.message);
  }

  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
    );
    const data = await response.json();
    console.log(data);
    const weatherData = document.getElementById("weatherData");

    weatherData.innerHTML = data.current.temperature_2m + "° C";
  } catch (error) {
    const errorLatLon = document.getElementById("errorLatLon");
    errorLatLon.innerHTML = "Latitude ou Longitude inválida!";
    console.log(error.message);
  }
}

function zipMask(zipcode) {
  if (zipcode.value.length == 5) {
    zipcode.value = zipcode.value + "-";
  }
}
