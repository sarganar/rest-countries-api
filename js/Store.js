'use strict';

export function getValueFromStore(nameValue) {
    return JSON.parse(localStorage.getItem(nameValue));
}

export function setValueInStore(nameValue, value) {
    localStorage.setItem(nameValue, JSON.stringify(value));
}