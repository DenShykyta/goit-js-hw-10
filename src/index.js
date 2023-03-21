import {fetchCountries} from './fetchCountries' // Named export
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'
import './css/styles.css';

const inputName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


inputName.addEventListener('input', debounce(inputSearchName, DEBOUNCE_DELAY))

function inputSearchName(e) {
    const name = e.target.value.trim();
    if (!name) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return
    }
    fetchCountries(name)
        .then(function (data) {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (data.length < 10 && data.length > 2) {
                countryListMarkup(data);
                countryInfo.innerHTML = '';
            } else if (data.length = 1) {
                countryList.innerHTML = '';
                countryInfoMarkup(data);
            }
        })
        .catch(error => {
            console.log(error)
            Notiflix.Notify.failure('Oops, there is no country with that name')
        })

}
function countryListMarkup(countries) {
    const markup = countries.map(country => 
        `<li class="wrupper">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width ="20">
        <p>${country.name.official}</p>
        </li>`).join('')
countryList.innerHTML = markup;
}

function countryInfoMarkup(countryData) {
    const markup = countryData.map(data =>
    `<div class="wrupper">
        <img class="flag" src="${data.flags.svg}" alt="Flag of ${data.name.official}" width="50" >
        <h2 class="country-title-name">${data.name.official}</h2>
    </div>
    <ul class="list">
        <li><b>Capital:</b> ${data.capital}</li>
        <li><b>Population:</b> ${data.population}</li>
        <li><b>Languages:</b> ${Object.values(data.languages)}</li>
    </ul>`).join('');
    countryInfo.innerHTML = markup;
}

const body = document.querySelector('body');
const title = document.createElement('h2');
title.textContent = 'Введіть назву країни:';
body.prepend(title);