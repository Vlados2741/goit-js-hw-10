import './css/styles.css';
var  debounce  = require ('lodash.debounce') 
const DEBOUNCE_DELAY = 300;
import { Notify } from 'notiflix/build/notiflix-notify-aio'


const refs = {
    input: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`)
};

function onCountriesInput(e) {
    const country = e.currentTarget.value;
    console.log(e.currentTarget.value);
    fetchCountries(country)
    .then((countries) => renderCountriesList(countries))
    .catch((error) => console.log(error));
}

function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  ).then((response) => {
    if (!response.ok) {
        Notify.failure("Oops, there is no country with that name");
    }
    return response.json();
  });
}

function renderCountriesList(countries) {
    if (countries.length > 10) {
        Notify.info ("Too many matches found. Please enter a more specific name.")
        return
    } else if (countries.length > 2 ) {
        const markup = countries
            .map((country) => {
                return `
          <li>
            <p>
                <span><img 
                    src="${country.flags.svg}"
                    width="15px", 
                    height="10px" 
                </span>
                ${country.name.official}
            </p>
          </li>
      `;
            })
            .join("");
        refs.countryList.innerHTML = markup;
    } else if (countries.length > 1 ) {
        const markup = countries
            .map((country) => {
                return `
          <li>
            <p>
                <span><img 
                    src="${country.flags.svg}"
                    width="15px", 
                    height="10px" 
                </span>
                ${country.name.official}
            </p>
            <p>
            <b>Capital: ${country.capital}</b>
            <b>Population: ${country.population}</b>
            <b>Languages: ${country.languages}</b>
            </p>
          </li>
      `;
            })
            .join("");
        refs.countryList.innerHTML = markup;
    } else if (countries.length === 0) {
        Notify.failure("Oops, there is no country with that name");
    };

    console.log(countries)
};

// refs.input.addEventListener("input", debounce(onCountriesInput, DEBOUNCE_DELAY));
refs.input.addEventListener("input", onCountriesInput);