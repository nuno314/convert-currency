
// Exchange Rate: http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1
// Countries: https://restcountries.eu/rest/v2/currency/${currencyCode}
// BASE: USD
const base = "USD";
const ExchangeRateAPI =
  "http://api.currencylayer.com/live?access_key=4724b49cee6c8a12ef25233935060226&format=1";

const getExchangeRate = async (fromCurrency, toCurrency) => {
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

const getCountries = async (toCurrency) => {
  try {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${toCurrency}`
    );
    return res.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${toCurrency}`);
  }
  
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return {convertedAmount, countries};
};

const fromInput = document.getElementById('from-currency');
const toInput = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const btn = document.getElementById('btn');
const result = document.getElementById('converted')

const convert = async (amount, fromCurrency, toCurrency) => {
    const {convertedAmount, countries } = await convertCurrency(fromCurrency, toCurrency, amount);
    
    let text = `<div class="converted-amount">
        <p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>
    </div>`
    
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        text = text + `<br><li>${country}</li>`
        
    }
    console.log(countries.length);
    result.innerHTML = text;
} 

const submit = (e) => {
    if (e.keyCode == 13) {
        let fromCurrency = fromInput.value;
        let toCurrency = toInput.value;
        let amount = amountInput.value;
        convert(amount, fromCurrency, toCurrency);
        fromCurrency = "";
        toCurrency = "";
        amount = "";
    }
}

document.addEventListener("keyup", (e) => {
    submit(e);
})

btn.addEventListener("click", (e) => {
    submit(e);
});
