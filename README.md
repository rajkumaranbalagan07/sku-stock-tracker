# Next.js SKU Stock Tracker

This is a simple application that gives endpoints to view SKU information using Nest.js and Node.js. The application fetches SKU data from a Nest.js backend service and displays it on a web interface.

## Prerequisites

- Node.js v18 or later

- npm

## Installation

First, clone the repository:

git clone https://github.com/rajkumaranbalagan07/sku-stock-tracker.git

    cd sku-stock-tracker

Then, install the dependencies:

    npm install

## Running the Application

To start the Nest.js server, run:

    npm start

Then, open [http://localhost:4000](http://localhost:4000)

Then, open [http://127.0.0.1:4000/api](http://127.0.0.1:4000/api) in your web browser to view the application swagger.

## API Routes

- GET `/api/stock-tracker/v1/stock/skus`: Returns a list of all SKUs.

- GET `/api/stock-tracker/v1/stock/sku/{sku}`: Returns information about the specified SKU.

Enjoy using the app!
