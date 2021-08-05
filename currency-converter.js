const axios = require('axios');
// Exchange Rate: http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1
// Countries: https://restcountries.eu/rest/v2/currency/${currencyCode}
// BASE: USD
const base = 'USD';
const ExchangeRateAPI = 'http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1'
const CountriesAPI = 'https://restcountries.eu/rest/v2/currency/'
//fromCurrency = base + fromCurrency;
  //  toCurrency = base + toCurrency;

const getExchangeRate = async (fromCurrency, toCurrency) => {
    
    
    const res = await axios.get(ExchangeRateAPI);
    const rate = res.data.quotes;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    return exchangeRate;
}
 
const getCountries = async (toCurrency) => {
    const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
    res.data.map((country) => {
        country.currencies.map(currency => {
            if (currency.code == toCurrency)
                return (currency.name);
        })
        
    }
    );
    
}
const country = getCountries('USD');
console.log(country);
