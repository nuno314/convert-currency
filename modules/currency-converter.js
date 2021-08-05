import axios from '../index.js'
// Exchange Rate: http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1
// Countries: https://restcountries.eu/rest/v2/currency/${currencyCode}
// BASE: USD
const base = "USD";
const ExchangeRateAPI =
  "http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1";

export const getExchangeRate = async (fromCurrency, toCurrency) => {
  fromCurrency = base + fromCurrency;
  toCurrency = base + toCurrency;
  const res = await axios.get(ExchangeRateAPI);
  const rate = res.data.quotes;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(`Unable to get currency ${fromCurrency} or ${toCurrency}`);
  }

  return exchangeRate;
};

export const getCountries = async (toCurrency) => {
  try {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${toCurrency}`
    );
  } catch (e) {
    throw new Error(`Unable to get countries that use ${toCurrency}`);
  }
  return res.data.map((country) => country.name);
};

export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. 
    You can spent these in the following countries: ${countries}`;
};



