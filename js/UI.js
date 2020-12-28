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
    const darkModeSwitch=document.querySelector('.dark-mode-switch');

    filterByRegion.addEventListener('change', changeFilterByRegion);
    searchInput.addEventListener('input', changeFilterByName);
    buttonBack.addEventListener('click', returnToCountriesBrief);
    darkModeSwitch.addEventListener('click',switchColorTheme);
}

export function printCountriesCard(fullCountries) {
    const inicio = performance.now();
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

        const divFlag = document.createElement('div');
        divFlag.classList.add('flag');
        divFlag.style.backgroundImage = `url(${flag})`;
        divCard.appendChild(divFlag);

        const divInfo = document.createElement('div');
        divInfo.classList.add('info');
        divInfo.innerHTML = `
            <h3>${name}</h3>
            <p><span>Population:</span> ${population}</p>
            <p><span>Region:</span> ${region}</p>
            <p><span>Capital:</span> ${capital}</p>
        `;
        divCard.appendChild(divInfo);

        divCard.dataset.name = name.toLowerCase().trim();
        divCard.dataset.region = regions[region];
        divCard.dataset.id = index;
        divCard.addEventListener('click', clickCountry);

        divFather.appendChild(divCard);
    });

    divsAllCards = document.querySelectorAll('.country-card');
    const final = performance.now();
    console.log('performance', final - inicio);
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
        top: 0,
        behavior: 'auto'
    });
}

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

const getNames = data => data.map(item => item.name).join(', ');


function filterCards() {
    let areAllHidden = true;

    divsAllCards.forEach(element => {
        let isHiddenByName, isHiddenByRegion;

        if (filterCriteria.byRegion === 'ALL') {
            isHiddenByRegion = false;
        } else if (element.dataset.region === filterCriteria.byRegion) {
            isHiddenByRegion = false;
        } else {
            isHiddenByRegion = true;
        }

        if (filterCriteria.byName === '') {
            isHiddenByName = false;
        } else if (element.dataset.name.includes(filterCriteria.byName)) {
            isHiddenByName = false;
        } else {
            isHiddenByName = true;
        }

        element.hidden = isHiddenByRegion || isHiddenByName;
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

function switchColorTheme(){

    document.body.classList.toggle('dark-mode');

}