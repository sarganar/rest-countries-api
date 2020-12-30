"use strict";
import { getAllCountries } from "./API.js";
import { printCountriesCard, initUI, printCountryDetails } from "./UI.js";

let fullCountries = [];
let keyedFullCountries = [];

document.addEventListener("DOMContentLoaded", startApp);

async function startApp() {
  initUI();

  fullCountries = await getAllCountries();

  keyedFullCountries = keyBy(fullCountries, "alpha3Code");

  printCountriesCard(fullCountries);
}

export function prepareDetails(idAlpha3Code) {
  const selectedCountry = { ...keyedFullCountries[idAlpha3Code] };
  const bordersExpanded = expandBordersNames(selectedCountry);
  selectedCountry.borders_expanded = bordersExpanded;

  printCountryDetails(selectedCountry);
}

const expandBordersNames = (country) =>
  country.borders.map((countryAlpha3Code) => {
    const countryFound = { ...keyedFullCountries[countryAlpha3Code] };

    if (countryFound?.name) {
      const dataBorder = {
        id: countryFound.alpha3Code,
        name: removeParenthesisPart(countryFound.name),
      };

      return dataBorder;
    } else {
      console.error(
        "No se encontraron datos del pais limitrofe: ",
        countryAlpha3Code
      );
    }
  });

const removeParenthesisPart = (text) => text.split("(")[0].trim();

const keyBy = (arr, key) =>
  arr.reduce((acc, el) => {
    acc[el[key]] = el;
    return acc;
  }, {});
