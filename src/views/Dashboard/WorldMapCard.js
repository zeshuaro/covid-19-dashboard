import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { ResponsiveChoropleth } from "@nivo/geo";
import moment from "moment";

import Const from "../../common/Const";
import ApiService from "../../services/ApiService";
import LoadingSpinner from "../../components/LoadingSpinner";
import UtilService from "../../services/UtilService";

const mapFeatures = require("./world_countries.json");

const WorldMap = ({ data, maxValue, colors }) => (
  <ResponsiveChoropleth
    data={data}
    features={mapFeatures.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors={colors}
    domain={[0, maxValue]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default class WorldMapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: true,
      data: null,
      dataType: Const.cases,
      dataTypes: [
        Const.cases,
        Const.deaths,
        Const.recovered,
        Const.active,
        Const.critical,
      ],
      colorMap: {
        cases: "purples",
        deaths: "reds",
        recovered: "blues",
        active: "purples",
        critical: "oranges",
      },
    };
  }

  async componentDidMount() {
    const result = await ApiService.worldMapCountry();
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

  getWorldMap() {
    let worldMap = <LoadingSpinner />;
    if (!this.state.isDataLoading) {
      const dataType = this.state.dataType;
      const data = this.state.data[dataType];

      worldMap = (
        <WorldMap
          data={data["data"]}
          maxValue={data["maxValue"]}
          colors={this.state.colorMap[dataType]}
        />
      );
    }

    return worldMap;
  }

  getTopCountries() {
    let countries = <div style={{ height: "50px" }} />;
    if (!this.state.isDataLoading) {
      const data = this.state.data[this.state.dataType];
      countries = [];

      data["top_n"].forEach((country) => {
        countries.push(
          <Col
            sm={12}
            md
            className="mb-sm-2 mb-0 d-md-down-none"
            key={country["country"]}
          >
            <div className="text-muted">{country["country"]}</div>
            <strong>{country["value"].toLocaleString()}</strong>
          </Col>
        );
      });
    }

    return countries;
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Worldwide</CardTitle>
              <div className="small text-muted">{moment().format("LL")}</div>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block">
              {this.getButtonToolBar()}
            </Col>
          </Row>
          <div
            className="chart-wrapper"
            style={{ height: "300px", marginTop: "40px" }}
          >
            {this.getWorldMap()}
          </div>
        </CardBody>
        <CardFooter>
          <Row className="text-center">{this.getTopCountries()}</Row>
        </CardFooter>
      </Card>
    );
  }
}
