export class App {
    run() {
        const currencyPromise  = this.makeCurrencyRequestPromise();

        currencyPromise.then((response) => {
            this.renderCurrencyTable(response);
        });
    }

    makeCurrencyRequestPromise() {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    resolve(JSON.parse(httpRequest.responseText));
                }
            };

            httpRequest.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', true);
            httpRequest.send();
        });
    }

    renderCurrencyTable(currency) {
        // check if browser supports template elements
        if ('content' in document.createElement('template')) {
            const currencyRowTemplate = document.getElementById('currency-row'),
                currencyTbody = document.querySelector('.currency tbody');

            currency.forEach((item, index) => {
                let currencyRowClone = document.importNode(currencyRowTemplate.content, true),
                    td = currencyRowClone.querySelectorAll('td');

                td[0].textContent = currency[index].txt;
                td[1].textContent = currency[index].rate;

                currencyTbody.appendChild(currencyRowClone);
            });
        }
    }
}

