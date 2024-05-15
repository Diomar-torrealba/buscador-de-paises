// Selectores
const inputIn = document.querySelector('.input');
const all = document.querySelector('#paises');
const info = document.querySelector('#info');
const infoMore = document.querySelector('#info-more');
const texto = "";
const idiomaOrigen = "en";
const idiomaDestino = "es";

const traducir = async () => {
    const respuesta = await fetch(`https://api.mymemory.translated.net/get?q=${texto}&langpair=
    ${idiomaOrigen}|${idiomaDestino}`);
    const datos = await respuesta.json();
    return datos.responseData.translatedText;
};

traducir("red").then((textoTraducido) => {
    console.log(textoTraducido);
});

let countries = [];

const getCountries = async () => {
  try {
    const respuesta = await (await fetch('https://restcountries.com/v3.1/all')).json();
    countries = respuesta;
  } catch (error) {
    console.log(error);
  }
 
}
getCountries();


inputIn.addEventListener('input', async e => {


  const filtrado = countries.filter(name => name.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
  info.innerHTML = '';
  infoMore.innerHTML = '';
  let infoHTML= '';

    if (filtrado.length === 0 ){
      info.innerHTML = `
      <p class="info-paises"> No existen paises por esa busqueda </p>
      `
    }
    else if(filtrado.length > 10) {

      infoMore.innerHTML += `
        <p class="info-paises"> Muchos paises,especifique su busqueda</p>
        `

    } else if (filtrado.length === 1) {
    const clain = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${filtrado[0].latlng[0]}&lon=${filtrado[0].latlng[1]}&appid=8f34169f4b90140d83b5baedd9753685&units=metric`)).json();
    const tempetatura = clain.main.temp; 
    const imagen = clain.weather[0].icon;
    const Tiempo = clain.weather[0].description;
    const Presion = clain.main.pressure;
    const Humedad = clain.main.humidity;
    const velocidadDelViento = clain.wind.speed;

    console.log(clain)
    console.log(Tiempo)
    
    const country =   filtrado[0]; //FILTRA AL PAÍS 
    console.log(country)
      const pais = country.name.common;
      const timezones = country.timezones[0];
      const capital = country.capital;
      const poblacion = country.population;
      const idioma = country.languages ? Object.values(country.languages).join(', ') : 'No se encontraron idiomas';
      const continente = country.region;
      const bandera = country.flags.svg;

    infoHTML = `
    <div id="seccion-pais">
          <div id="informacion-Imagen">
              <img class="banderas" src=${bandera} alt="${pais}">
          </div>

              <div class="descripcion-Pais">
                 <h3 class="titulo-pais">Pais:${pais}</h3>
                 <p class="nombres">Capital:${capital}</p>
                 <p class="nombres">Poblacion:${poblacion}</p>
                 <p class="nombres">Tiempo de zona :${timezones}</p>
                 <p class="nombres">Idioma:${idioma}</p>
                 <p class="nombres">Region:${continente}</p>
               </div>
     </div>

     <div id="Seccion-Clima">     
          <div id="informacion-Imagen">              
              <img src="img/icono de clima.jpg"  class="img-clima">             
          </div>

              <div class="descripcion-Clima"> 
                  <img class="clain-icon" src= "https://openweathermap.org/img/wn/${imagen}@2x.png">
                  <p class="info-country">Temperatura: ${tempetatura}°</p>
                  <p class="info-country">Tiempo:${Tiempo}</p>
                  <p class="info-country">Presion:${Presion}</p>
                  <p class="info-country">Humedad:${Humedad}</p>
                  <p class="info-country">Velocidad del viento:${velocidadDelViento}</p>

              </div>
      </div>
      `;
    } else  {
      filtrado.forEach(country => {
        const pais = country.name.common;
        const bandera = country.flags.svg;
      infoHTML += ` 
       <div class="conta-car"
       <div class="card">
          <img class="banderas" src=${bandera}>
          <h3 class="titulo-pais">${pais}</h3>
        </div>
       
        `;
    });
  }
  all.innerHTML = infoHTML;

});







