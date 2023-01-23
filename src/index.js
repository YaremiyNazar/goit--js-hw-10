
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");

let search= '';

inputEl.addEventListener("input", debounce(onEventInput, DEBOUNCE_DELAY));

function onEventInput() {
    search = inputEl.value.trim();
    if (search === "") {
        clearAll();
        return;
    } else fetchCountries(search).then(countryNames => {
        if (countryNames.length < 2) {
            createCountrie(countryNames);
  
        } else if (countryNames.length < 10 && countryNames.length > 1) {
             markupList(countryNames);
        } else {
            clearAll();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        };
    })
        .catch(() => {
        clearAll();
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
};
function  markupList(data) {
    clearAll();
    const  markup = data.map((country) => 
        `<li class="little-item">
            <img src="${country.flags.svg}" alt="flag" width="40", height="20">
            <span class="little-name">${country.name.official}</span>
        </li>`)
        .join("");
    listEl.insertAdjacentHTML('beforeend',  markup);
};

function createCountrie(country) {
    clearAll();
    const marcup = `<div>
        <div class="flex">
            <img src="${country[0].flags.svg}" alt="flag" width="80", height="40">
            <h2 class="big-name"> ${country[0].name.official}</h2>
        </div>
            <p class="capital">Capital: <span>${country[0].capital}</span></p>
            <p class="population">Population: <span>${country[0].population}</span></p>
            <p class="language">Languages: <span>${Object.values(country[0].languages).join(", ")}</span></p>
    </div>`
    infoEl.innerHTML = marcup;
};

function clearAll() {
  listEl.innerHTML = "";
  infoEl.innerHTML = "";
};