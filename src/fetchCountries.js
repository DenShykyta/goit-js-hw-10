const BASE_URL = 'https://restcountries.com/v3.1/name'
const searchParameters = '?fields=name,languages,population,capital,flags'

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}${searchParameters}`)
        .then(response => response.json())
}
export { fetchCountries }; // Named export