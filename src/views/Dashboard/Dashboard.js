import React, { Component } from "react";

import StatsCards from "./StatsCards";
import WorldMapCard from "./WorldMapCard";
import BarChartRaceCard from "./BarChartRaceCard";
import LineChartCard from "./LineChartCard";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <StatsCards />
        <WorldMapCard />
        <BarChartRaceCard />
        <LineChartCard />
      </div>
    );
  }
}

export default Dashboard;
