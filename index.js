import { getExchangeRate, getCountries, convertCurrency } from "./modules/currency-converter.js";
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const button = document.querySelector(".submit");
const result = document.getElementById("result");

const convert = async (fromCurrency, toCurrency) => {
    const text = await convertCurrency(fromCurrency, toCurrency);
    result.innerHTML(text); 
}
convert("USD", "EUR");
button.addEventListener("click", () => {
    console.log(1);
});


const axios = require('axios');
export default axios;


