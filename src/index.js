import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Principal from './components/Principal';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import 'bootstrap/dist/css/bootstrap.css';

let idioma2 = ()=>{
    return navigator.language;
}
let idioma = () => {
    console.log(navigator.language);
    if (navigator.language === "es") {
        return localeEsMessages;
    }

    else if (navigator.language === "en") {
        return localeEnMessages;
    }
}



  ReactDOM.render(<IntlProvider locale={idioma2()} messages={idioma()}>
            <Principal/>
        </IntlProvider>, document.getElementById("root"));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
