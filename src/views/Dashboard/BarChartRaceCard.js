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

import BarChart from "../../chart-race-react/src";
import ApiService from "../../services/ApiService";
import UtilService from "../../services/UtilService";
import Const from "../../common/Const";
import LoadingSpinner from "../../components/LoadingSpinner";

class BarChartRaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: true,
      data: null,
      dataType: Const.cases,
      dataTypes: [Const.cases, Const.deaths, Const.recovered],
    };
  }

  async componentDidMount() {
    const result = await ApiService.barChartRaceCumHist();
    this.setState({
      isDataLoading: false,
      data: result,
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

  getBarChartRace() {
    let barChartRace = <LoadingSpinner />;
    if (!this.state.isDataLoading) {
      const stats = this.state.data[this.state.dataType];
      const data = stats.data;
      const len = data[Object.keys(data)[0]].length;
      const keys = Object.keys(data);
      const labels = keys.reduce((res, item) => {
        return {
          ...res,
          ...{
            [item]: (
              <div style={{ textAlign: "center" }}>
                <div>{item}</div>
              </div>
            ),
          },
        };
      }, {});

      const timeline = stats.labels.map(UtilService.formatDate);

      barChartRace = (
        <BarChart
          key={this.state.dataType}
          start={true}
          data={data}
          timeline={timeline}
          labels={labels}
          colors={stats.colors}
          len={len}
          timeout={400}
          delay={200}
          timelineStyle={{
            textAlign: "center",
            fontSize: "50px",
            color: "rgb(148, 148, 148)",
          }}
          textBoxStyle={{
            textAlign: "right",
            color: "rgb(133, 131, 131)",
            fontSize: "30px",
          }}
          barStyle={{
            height: "40px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
          width={[10, 80, 10]}
          maxItems={10}
        />
      );
    }

    return barChartRace;
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Bar Chart Race</CardTitle>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block">
              {this.getButtonToolBar()}
            </Col>
          </Row>
          <div style={{ marginTop: "20px" }}>{this.getBarChartRace()}</div>
        </CardBody>
      </Card>
    );
  }
}

export default BarChartRaceCard;
