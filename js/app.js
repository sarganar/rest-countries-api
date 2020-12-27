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

    console.log(fullCountries[0]);
    printCountriesCard(fullCountries);

}

export function prepareForPrintDetails(id) {

    const selectedCountry = {
        ...fullCountries[id]
    };

    const bordersCompleteNames = fullCountries[id].borders.map(border => {
        const idFound = countryCodes.indexOf(border);
        if (idFound > -1) {
            let dataBorder = {
                id: 0,
                name: ''
            };
            dataBorder.id = idFound;
            dataBorder.name = removeParenthesisParts(fullCountries[idFound].name);
            return dataBorder;
        } else {
            console.error('No se encontraron datos del pais id:', id);
        }
    });

    selectedCountry.borders = bordersCompleteNames;
    //console.log(selectedCountry);
    printCountryDetails(selectedCountry);
}

const removeParenthesisParts = text => {
    const [name, ...rest] = text.split("(");
    if (name) {
        return name.trim();
    } else {
        return text;
    }
}