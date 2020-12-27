'use strict';

export async function requestAPI() {
    // const url='https://restcountries.eu/rest/v2/all'; // traer todos los datos de cada pais
    //const url = 'https://restcountries.eu/rest/v2/all?fields=name;capital;flag'; // traer solo campos específicos
    const url='https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders;alpha3Code';
    console.log('[requestAPI] Fecthing request... ');
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('[requestAPI] Response received');
        return data;
    } catch (error) {
        console.log(error);
    }
}
