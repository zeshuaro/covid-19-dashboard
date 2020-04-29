const baseUrl = process.env.REACT_APP_BASE_URL;

const baseAPI = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  });

  return await response.json();
};

const globalStats = async () => await baseAPI(`${baseUrl}/global/stats`);

const worldMapCountry = async () =>
  await baseAPI(`${baseUrl}/country/world-map`);

const lineChartCumGlobalHist = async () =>
  await baseAPI(`${baseUrl}/global/historical/cumulative/line-chart`);

const barChartRaceCumHist = async () =>
  await baseAPI(`${baseUrl}/country/historical/cumulative/bar-chart-race`);

const barChartRaceNewHist = async () =>
  await baseAPI(`${baseUrl}/country/historical/new/bar-chart-race`);

const lineChartCumCountryHist = async () =>
  await baseAPI(`${baseUrl}/country/historical/cumulative/line-chart`);

const lineChartNewCountryHist = async () =>
  await baseAPI(`${baseUrl}/country/historical/new/line-chart`);

export default {
  globalStats,
  lineChartCumGlobalHist,
  worldMapCountry,
  barChartRaceCumHist,
  barChartRaceNewHist,
  lineChartCumCountryHist,
  lineChartNewCountryHist,
};
