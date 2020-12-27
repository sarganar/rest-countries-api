'use strict';

import {
    prepareForPrintDetails
} from "./app.js";

let divsAllCards = [];
const filterCriteria = {
    byName: '',
    byRegion: 'ALL'
};


export function initUI() {
    const filterByRegion = document.querySelector('#byRegion');
    const searchInput = document.querySelector('#byName');
    const buttonBack = document.querySelector('#back');

    filterByRegion.addEventListener('change', changeFilterByRegion);
    searchInput.addEventListener('input', changeFilterByName);
    buttonBack.addEventListener('click', returnToCountriesBrief);
}

export function printCountriesCard(fullCountries) {
    //const inicio = performance.now();
    const regions = {
        'Africa': 'AF',
        'Americas': 'AM',
        'Asia': 'AS',
        'Europe': 'EU',
        'Oceania': 'OC'
    };

    const divFather = document.querySelector('.countries-brief-info');

    fullCountries.forEach((element, index) => {
        const {
            name,
            population,
            region,
            capital,
            flag
        } = element;

        const divCard = document.createElement('div');
        divCard.className = 'country-card border-shadow';
        divCard.innerHTML = `
        <div class="flag">
            <img src="${flag}" alt="flag of ${name}">
        </div>
        <div class="info">
            <h3>${name}</h3>
            <p><span>Population:</span> ${population}</p>
            <p><span>Region:</span> ${region}</p>
            <p><span>Capital:</span> ${capital}</p>
        </div>        
        `;
        divCard.dataset.name = name.toLowerCase().trim();
        divCard.dataset.region = regions[region];
        divCard.dataset.id = index;
        divCard.addEventListener('click', clickCountry);

        divFather.appendChild(divCard);
    });
//    <img src="${flag}" alt="flag of ${name}">
{/* <div class="flag" style="background-image:url('${encodeURIComponent(flag)}');"> */}

    divsAllCards = document.querySelectorAll('.country-card');
    //const final = performance.now();
    //console.log('performance', final - inicio);
}


export function printCountryDetails(country) {
    const {
        name,
        population,
        region,
        capital,
        flag,
        nativeName,
        subregion,
        topLevelDomain,
        currencies,
        languages,
        borders
    } = country;

    const divFilters = document.querySelector('.searching-and-filtering');
    const divCountriesBrief = document.querySelector('.countries-brief-info');
    const divDetails = document.querySelector('.country-details');
    const divPanel = document.querySelector('.panel');

    divPanel.addEventListener('click', clickPanel);

    divPanel.innerHTML = `
    <div class="flag-detail">
        <img src="${flag}" alt="flag of ${name}">
    </div>

    <div class="info-detail">
        <h3>${name}</h3>
        <div class="block-container">
            <div class="block1">
                <p><span>Native Name:</span> ${nativeName}</p>
                <p><span>Population:</span> ${population}</p>
                <p><span>Region:</span> ${region}</p>
                <p><span>Sub Region:</span> ${subregion}</p>
                <p><span>Capital:</span> ${capital}</p>
            </div>
            <div class="block2">
                <p><span>Top Level Domain:</span> ${topLevelDomain}</p>
                <p><span>Currencies:</span> ${getNames(currencies)}</p>
                <p><span>Languages:</span> ${getNames(languages)}</p>
            </div>
        </div>
        <div class="border-countries">
            <h4>Border Countries:</h4>        
            ${renderBorders(borders)}
        </div>    
    </div>    
    `;

    divDetails.hidden = false;
    divFilters.hidden = true;
    divCountriesBrief.hidden = true;
    window.scrollTo({
        top:0,
        behavior: 'auto'
    });
}

//todo: informar si no hay paises limitrofes. ej Barbados
function renderBorders(borders) {
    let buttonsHTML = '';
    borders.forEach(({
        id,
        name
    }) => buttonsHTML += `   <button name="${name}" id="${name}" data-id="${id}"class="border-shadow border-button">${name}</button>
    `);

    if (buttonsHTML === '') {
        buttonsHTML = `
        <div class="messages-box">
            <p>There are no border countries.</p>
        </div>
        `;
    }
    return `
    <nav>
    ${buttonsHTML}
    </nav>
    `;
}

function getNames(data) {
    return data.map(item => item.name).join(', ');
}

function filterCards() {
    let areAllHidden = true;

    divsAllCards.forEach(element => {
        let hiddenByName, hiddenByRegion;

        if (filterCriteria.byRegion === 'ALL') {
            hiddenByRegion = false;
        } else if (element.dataset.region === filterCriteria.byRegion) {
            hiddenByRegion = false;
        } else {
            hiddenByRegion = true;
        }

        if (filterCriteria.byName === '') {
            hiddenByName = false;
        } else if (element.dataset.name.includes(filterCriteria.byName)) {
            hiddenByName = false;
        } else {
            hiddenByName = true;
        }

        element.hidden = hiddenByRegion || hiddenByName;
        areAllHidden = areAllHidden && element.hidden; // si areAllHidden es false luego del forEach, al menos una card se mostró

    });

    // decidir si mostrar o no mensaje '0 found', cuando no hay cards para mostrar
    const divMessages = document.querySelector('.messages-box');
    divMessages.hidden = !areAllHidden;


}

function changeFilterByRegion(event) {
    filterCriteria['byRegion'] = event.target.value;
    filterCards();
}

function changeFilterByName(event) {
    filterCriteria['byName'] = event.target.value.toLowerCase().trim();
    filterCards();
}

function clickCountry(event) {
    prepareForPrintDetails(event.currentTarget.dataset.id);
}

function returnToCountriesBrief() {
    const divFilters = document.querySelector('.searching-and-filtering');
    const divCountriesBrief = document.querySelector('.countries-brief-info');
    const divDetails = document.querySelector('.country-details');

    divFilters.hidden = false;
    divCountriesBrief.hidden = false;
    divDetails.hidden = true;
}

function clickPanel(event) {
    if (event.target.classList.contains('border-button')) {
        prepareForPrintDetails(event.target.dataset.id);
    }

}