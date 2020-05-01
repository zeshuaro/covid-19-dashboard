# COVID-19 Dashboard

## Getting Started

This dashboard relies on a REST API client which is available [here](https://github.com/zeshuaro/covid-19-dashboard-api). Follow the instructions there to get your API client running and obtain a token from it.

Create a `.env` file with the following variables:

```
REACT_APP_BASE_URL=<YOUR_API_ENDPOINT>
REACT_APP_TOKEN=<YOUR_TOKEN>
```

Then, install the dependencies and run the dashboard

```sh
yarn install
yarn start
```