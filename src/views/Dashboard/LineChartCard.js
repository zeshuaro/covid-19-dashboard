import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import Charts from "../Charts/Charts";
import Const from "../../common/Const";
import LoadingSpinner from "../../components/LoadingSpinner";
import ApiService from "../../services/ApiService";
import UtilService from "../../services/UtilService";

class LineChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: true,
      data: null,
      dataType: Const.cumulative,
      dataTypes: [Const.cumulative, Const.newStats],
      statsTypes: [Const.cases, Const.deaths, Const.recovered],
    };
  }

  async componentDidMount() {
    const cumResult = await ApiService.lineChartCumCountryHist();
    const newResult = await ApiService.lineChartNewCountryHist();
    this.setState({
      isDataLoading: false,
      data: { cumulative: cumResult, new: newResult },
    });
  }

  onButtonClick(dataType) {
    this.setState({ dataType });
  }

  getButtonToolBar() {
    let buttons = [];
    this.state.dataTypes.forEach((dataType) => {
      buttons.push(
        <Button
          key={dataType}
          color="outline-secondary"
          onClick={() => this.onButtonClick(dataType)}
          active={this.state.dataType === dataType}
        >
          {UtilService.capitalize(dataType)}
        </Button>
      );
    });

    return (
      <ButtonToolbar
        className="float-right"
        aria-label="Toolbar with button groups"
      >
        <ButtonGroup className="mr-3" aria-label="First group">
          {buttons}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  getLineCharts() {
    let lineChartsRow = <LoadingSpinner />;
    if (!this.state.isDataLoading) {
      const stats = this.state.data[this.state.dataType];
      let lineCharts = [];

      this.state.statsTypes.forEach((statsType) => {
        lineCharts.push(
          <Col key={statsType} sm={"4"}>
            <Card>
              <CardBody>
                <CardTitle className="mb-0">
                  {UtilService.capitalize(statsType)}
                </CardTitle>
                <div style={{ height: "350px", marginTop: "10px" }}>
                  {Charts.lineChart({
                    data: stats[statsType],
                    height: "100%",
                    key: this.state.dataType + statsType,
                  })}
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      });
      lineChartsRow = <Row style={{ marginTop: "20px" }}>{lineCharts}</Row>;
    }

    return lineChartsRow;
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">
                Line Charts of Statistics of Top 10 Countries
              </CardTitle>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block">
              {this.getButtonToolBar()}
            </Col>
          </Row>
          {this.getLineCharts()}
        </CardBody>
      </Card>
    );
  }
}

export default LineChartCard;
