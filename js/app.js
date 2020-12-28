'use strict';
import {
    getAllCountries
} from './API.js';
import {
    printCountriesCard,
    initUI,
    printCountryDetails
} from './UI.js';

let fullCountries = [];

document.addEventListener('DOMContentLoaded', startApp);


async function startApp() {
    initUI();

    fullCountries = await getAllCountries();

    fullCountries.forEach((element, index) => element.id = index);

    //console.log(fullCountries);
    printCountriesCard(fullCountries);
}

export function prepareForPrintDetails(id) {

    const selectedCountry = {
        ...fullCountries[id]
    };

    const bordersExpandedNames = selectedCountry.borders.map(countryAlpha3Code => {

        const countryFound = fullCountries.find(element => element.alpha3Code === countryAlpha3Code);

        if (countryFound.name) {
            let dataBorder = {
                id: 0,
                name: ''
            };
            dataBorder.id = countryFound.id;
            dataBorder.name = removeParenthesisPart(countryFound.name);

            return dataBorder;

        } else {
            console.error('No se encontraron datos del pais limitrofe: ', countryAlpha3Code);
        }
    });

    selectedCountry.borders = bordersExpandedNames;
    // console.log(selectedCountry);
    printCountryDetails(selectedCountry);
}

const removeParenthesisPart = text => text.split("(")[0].trim();