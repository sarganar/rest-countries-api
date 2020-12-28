'use strict';
import {
    requestAPI
} from './API.js';
import {
    printCountriesCard,
    initUI,
    printCountryDetails
} from './UI.js';

let fullCountries = [];
let countryCodes = [];

document.addEventListener('DOMContentLoaded', startApp);


async function startApp() {
    initUI();

    fullCountries = await requestAPI();

    countryCodes = fullCountries.map(country => country.alpha3Code);

    printCountriesCard(fullCountries);
}

export function prepareForPrintDetails(id) {

    const selectedCountry = {
        ...fullCountries[id]
    };

    const bordersExpandedNames = selectedCountry.borders.map(border => {
        const idFound = countryCodes.indexOf(border);
        if (idFound > -1) {
            let dataBorder = {
                id: 0,
                name: ''
            };
            dataBorder.id = idFound;
            dataBorder.name = removeParenthesisPart(fullCountries[idFound].name);
            return dataBorder;
        } else {
            console.error('No se encontraron datos del pais id:', id);
        }
    });

    selectedCountry.borders = bordersExpandedNames;
    // console.log(selectedCountry);
    printCountryDetails(selectedCountry);
}

const removeParenthesisPart = text => text.split("(")[0].trim();