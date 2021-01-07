# Weather
Weather API

Le coordinate decimali di Roma IT per openweathermap.org sono:

lat: 41.8947
lon: 12.4839

ho implementato il programma con Webpack: (dotenv, lodash, axios, style/css/file-loader).

Dovrei aver utilizzato correttamente le Environment Variables.
Per un uso in locale si puó usare la mia API: 84fa0ddce2495b1f04851902133c2e3b 
oppure: http://pietro-tamburini.epizy.com/weather/

Ho gestito gli errori con try/catch con l'uso di una arrow-function async/away.
La richiesta del JSON l'ho spostata da Jquery ad Axios come mi é stato suggerito.

Ogni dato estrapolato dalla richiesta di Axios viene controllato prima da _.get() per verificarne l'esistenza.
il DOM sembra essere responsive.

v 1.1.0