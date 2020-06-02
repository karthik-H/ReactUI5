import React, { Component, useRef, useState } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import {
  addInitListener,
  addContextUpdateListener,
  removeContextUpdateListener,
  removeInitListener
} from '@luigi-project/client';
import {
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  ShellBar,
  ThemeProvider,
  Popover,
  PlacementType,
  Card,
  Text,
  List,
  ValueState,
  AnalyticalTable,
  ProgressIndicator,
  Title,
  TitleLevel,
  StandardListItem,
  Icon
} from '@ui5/webcomponents-react';

import { spacing } from '@ui5/webcomponents-react-base'
// import {LineChart} from '@ui5/webcomponents-react-charts/lib/next/LineChart'
import { LineChart, BarChart } from '@ui5/webcomponents-react-charts'

import '@ui5/webcomponents-icons/dist/icons/line-chart.js';
import '@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js';
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";

import { DashboardState } from '../components/dashboard-state.js'

export default class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'in constructor'
    };
    this.name = "karthik";
    console.log("in construc");
    this.initListener = null;
    this.contextUpdateListener = null;
  }
  componentDidMount() {
    this.initListener = addInitListener(initialContext => {
      this.setState({
        message: 'Luigi Client initialized.'
      });
      console.log("in init ka");
    });
    this.contextUpdateListener = addContextUpdateListener(updatedContext => {
      this.setState({
        message: 'Luigi Client updated.'
      });
    });
  }

  componentWillUnmount() {
    removeContextUpdateListener(this.contextUpdateListener);
    removeInitListener(this.initListener);
  }

  render() {
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">DashBoard</h1>
          </div>
          <Text>{this.toggleChart}</Text>
        </section>
      </div>
    );
  }
}
