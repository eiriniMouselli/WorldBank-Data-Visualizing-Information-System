# WorldBank-Data-Visualizing-Information-System

WorldBank-Data-Visualizing-Information-System visualizes data from [World Bank Organization]( http://data.worldbank.org/) in the form of Timeline charts, Barcharts and Scatterplots.
## Prerequisites

MySQL

React

Node.js

## Installation

Use the .csv files given in /world-bank-database/client/mysql/ as well as the load_tables.sql script in the same folder to create locally the needed database. It is advised to name your database 'metrics_db'.

In the /world-bank-database/server.js please enter your local server's username and password. In case you gave a different name for your database, please change that as well in server.js

Finally, the needed node modules were ommitted as they were huge files. To recreate them run
```bash
npm install
```
both in /world-bank-database and in /world-bank-database/client.

## Usage
Run 
```bash
node server.js 
```
in  /world-bank-database and 
```bash
npm start
```
in /world-bank-database/client.

## Credits

This project was developed by Eftihia Kiafa (AM 3003), Grigoria Nikita (AM 3048) and me (Eirini Mouselli AM 3031) for the course Advanced Topics in Technology and Database Applications ΜΥΕ030 (Προχωρημένα Θέματα Τεχνολογίας και Εφαρμογών Βάσεων Δεδομένων), 2019 - 2020.

## License

[MIT](https://choosealicense.com/licenses/mit/)
