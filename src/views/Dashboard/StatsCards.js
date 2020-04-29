import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, Col, Row } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

import LoadingSpinner from "../../components/LoadingSpinner";
import ApiService from "../../services/ApiService";
import UtilService from "../../services/UtilService";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandDanger = getStyle("--danger");

const cardChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

class StatsCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStatsDataLoading: true,
      statsData: null,
      isChartDataLoading: true,
      chartData: null,
    };
  }

  componentDidMount() {
    this.fetchStatsData();
    this.fetchChartData();
  }

  async fetchStatsData() {
    const result = await ApiService.globalStats();
    this.setState({
      isStatsDataLoading: false,
      statsData: result,
    });
  }

  async fetchChartData() {
    const result = await ApiService.lineChartCumGlobalHist();
    this.setState({
      isChartDataLoading: false,
      chartData: result,
    });
  }

  getCardWithoutChart(key, colorClass, height = 70) {
    let cardClassName = "text-white " + colorClass;
    let cardBody = <LoadingSpinner />;

    if (!this.state.isStatsDataLoading) {
      cardBody = (
        <div>
          <div className="text-value">
            {this.state.statsData[key].toLocaleString()}
          </div>
          <div>{UtilService.capitalize(key)}</div>
        </div>
      );
    }

    return (
      <Card className={cardClassName}>
        <CardBody className="pb-0">{cardBody}</CardBody>
        <div style={{ height: height + "px" }} />
      </Card>
    );
  }

  getCardWithChart(key, cardClassColor, chartBackgroundColor) {
    let cardClassName = "text-white " + cardClassColor;
    let cardBody = <LoadingSpinner />;
    let chart;

    if (!this.state.isStatsDataLoading && !this.state.isChartDataLoading) {
      cardBody = (
        <div>
          <div className="text-value">
            {this.state.statsData[key].toLocaleString()}
          </div>
          <div>{UtilService.capitalize(key)}</div>
        </div>
      );

      const stats = this.state.chartData[key];
      const chartData = {
        labels: stats["labels"].map((date) => UtilService.formatDate(date)),
        datasets: [
          {
            label: UtilService.capitalize(key),
            backgroundColor: chartBackgroundColor,
            borderColor: "rgba(255,255,255,.55)",
            data: stats["data"],
          },
        ],
      };
      chart = <Line data={chartData} options={cardChartOpts} height={70} />;
    }

    return (
      <Card className={cardClassName}>
        <CardBody className="pb-0">{cardBody}</CardBody>
        <div style={{ height: "70px" }}>{chart}</div>
      </Card>
    );
  }

  render() {
    const lowerCardsHeight = 20;

    return (
      <div>
        <Row>
          <Col xs="12" sm="6" lg="3">
            {this.getCardWithoutChart("affectedCountries", "bg-info")}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithChart("cases", "bg-primary", brandPrimary)}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithChart("deaths", "bg-danger", brandDanger)}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithChart("recovered", "bg-success", brandSuccess)}
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" lg="3">
            {this.getCardWithoutChart("active", "bg-info", lowerCardsHeight)}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithoutChart(
              "todayCases",
              "bg-primary",
              lowerCardsHeight
            )}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithoutChart(
              "todayDeaths",
              "bg-danger",
              lowerCardsHeight
            )}
          </Col>

          <Col xs="12" sm="6" lg="3">
            {this.getCardWithoutChart(
              "critical",
              "bg-warning",
              lowerCardsHeight
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default StatsCards;
