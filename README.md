# Weather API
### JavaScript Intermediate project:  
  
#### v 1.2.0  
  
tentativo formattazione di _codice pulito_.  
  
suddivisione logiche in differenti funzioni. (creazione service.js , lodash.js)  
`service.js` -> axios request  
`lodash.js`  -> _.get( data from axios request )  
  
aggiunta commenti guida  
  
Per un uso in locale si puó usare la mia `API: 84fa0ddce2495b1f04851902133c2e3b`  
oppure: __http://pietro-tamburini.epizy.com/weather/__  
  
#### v 1.1.0 _deprecated_  
  
Le coordinate decimali di Roma IT per openweathermap.org sono:  
  
lat: 41.8947  
lon: 12.4839  
  
ho implementato il programma con Webpack: (`dotenv`, `lodash`, `axios`, style/css/file-`loader`).  
  
Dovrei aver utilizzato correttamente le `Environment Variables`.
  
Ho gestito gli errori con `try/catch` con l'uso di una arrow-function `async/away`.  
La richiesta del JSON l'ho spostata da Jquery ad `Axios` come mi è stato suggerito.  
  
Ogni dato estrapolato dalla richiesta di Axios viene controllato prima da `lodash {_.get()}` per verificarne l'esistenza.  
il DOM sembra essere responsive.  



