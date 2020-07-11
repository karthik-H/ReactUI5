import {
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    Card,
    AnalyticalCard,
    AnalyticalCardHeader,
    Text,
    ValueState,
    ProgressIndicator,
    Title,
    TitleLevel,
    StandardListItem,
    Icon,
    DeviationIndicator
} from '@ui5/webcomponents-react';

import { spacing } from '@ui5/webcomponents-react-base'
import { LineChart } from '@ui5/webcomponents-react-charts/lib/next/LineChart'
import { BarChart } from '@ui5/webcomponents-react-charts/lib/next/BarChart'
import { RadialChart } from '@ui5/webcomponents-react-charts/lib/RadialChart';
// import { BarChart } from '@ui5/webcomponents-react-charts'
import React, { useRef, useState } from 'react';
import '@ui5/webcomponents-icons/dist/icons/line-chart.js';
import '@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js';
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents-icons/dist/icons/phone.js";
import "@ui5/webcomponents-icons/dist/icons/calendar.js";
import "@ui5/webcomponents-icons/dist/icons/history.js";
import '@ui5/webcomponents/dist/Timeline';

import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import '../style/card-style.css'
import {
    addInitListener,
    addContextUpdateListener,
    removeContextUpdateListener,
    removeInitListener
} from '@luigi-project/client';


const DashBoardFun = () => {
    const [toggleChart, setToggleChart] = useState("lineChart");
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef();

    const handleHeaderClick = (event) => {
        if (toggleChart === "lineChart") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleChart("barChart");
            }, 200);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleChart("lineChart");
            }, 200);
        }
    }
    const datasets = [{
        month: 'January',
        value: 65
    }, {
        month: 'February',
        value: 59
    }, {
        month: 'March',
        value: 80
    }, {
        month: 'April',
        value: 20
    }, {
        month: 'May',
        value: 39,
        predictedValue: 39
    }, {
        month: 'June',
        predictedValue: 50
    }];
    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];

    const data = [65, 59, 80, 81, 56, 55, 40];

    addInitListener(initialContext => {
        console.log("in init ka");
    });



    return (
        <div>
            <section className="fd-section">
                <div className="fd-section__header">
                    <h1 className="fd-section__title">DashBoard</h1>
                </div>
                <FlexBox
                    // style={{ width: '100%', height: '100vh' }}
                    // direction={FlexBoxDirection.Column}
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.Start}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Start}
                >
                    <AnalyticalCard
                        width="300px"
                        style={{ margin: "18px" }}
                        header={
                            <AnalyticalCardHeader
                                title="Sales Overview"
                                subTitle="Relative Change"
                                arrowIndicator={DeviationIndicator.Up}
                                indicatorState={ValueState.Success}
                                value="19"
                                valueState={ValueState.Success}
                                unit="PC"
                                deviation="9%"
                                counter="profit margin : 12%"
                                counterState={ValueState.Warning}
                                currency="Rupees"
                                onHeaderPress={handleHeaderClick}
                            />
                        }
                    >
                        {
                            toggleChart === "lineChart" ?
                                <LineChart dataset={datasets} dimensions={[{
                                    accessor: 'month'
                                }]}
                                    measures={[{
                                        accessor: 'value'
                                    }, {
                                        accessor: 'predictedValue'
                                    }]} /> :
                                <BarChart dataset={datasets} dimensions={[{
                                    accessor: 'month'
                                }]}
                                    measures={[{
                                        accessor: 'value'
                                    }]} />
                        }
                    </AnalyticalCard>
                    <Card id="card2" heading="Timeline" style={{ width: "300px", ...spacing.sapUiContentPadding }}
                        avatar={<Icon name="history" />}
                        maxWidth="300px">

                        <Text style={spacing.sapUiContentPadding}> TimeLine </Text>
                        <ui5-timeline>
                            <ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" item-name="John Smith" item-name-clickable></ui5-timeline-item>
                            <ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">
                                MR SOF02 2.43
		</ui5-timeline-item>
                            <ui5-timeline-item title-text="Video Converence Call - UI5" timestamp="1485813600000" icon="calendar">
                                Online meeting
		</ui5-timeline-item>
                        </ui5-timeline>
                    </Card>
                    <Card id="card3" heading="Order Progress" style={{ width: "300px", ...spacing.sapUiContentPadding }}
                        avatar={<Icon name="list" />}
                        maxWidth="300px">
                        <Text style={spacing.sapUiContentPadding}> Orders </Text>
                        <StandardListItem info="finished" infoState={ValueState.Success}>
                            <Title level={TitleLevel.H5}>Activity 1</Title>
                            <Text > Amount : 100Rs</Text>
                        </StandardListItem>
                        <StandardListItem info="failed" infoState={ValueState.Error}>
                            <Title level={TitleLevel.H5}>Activity 2</Title>
                            <Text > Amount : 300Rs</Text>
                        </StandardListItem>
                        <StandardListItem
                            info="in progress"
                            infoState={ValueState.Warning}
                            style={{ height: "80px" }}>
                            <FlexBox direction={FlexBoxDirection.Column}>
                                <Title level={TitleLevel.H5}>Activity 3</Title>
                                <Text > Amount : 3100Rs</Text>
                                <ProgressIndicator
                                    displayValue="89%"
                                    percentValue={89}
                                    width="180px"
                                    state={ValueState.Success} />
                            </FlexBox>
                        </StandardListItem>
                        <StandardListItem
                            info="in progress"
                            infoState={ValueState.Warning}
                            style={{ height: "80px" }}>
                            <FlexBox direction={FlexBoxDirection.Column}>
                                <Title level={TitleLevel.H5}>Activity 4</Title>
                                <Text > Amount : 1300Rs</Text>
                                <ProgressIndicator
                                    displayValue="5%"
                                    percentValue={5}
                                    width="180px"
                                    state={ValueState.Error} />
                            </FlexBox>
                        </StandardListItem>
                    </Card>
                    <ui5-card heading="New Purchase Orders" subheading="Today" status="1 of 15" class="medium" style={{ ...spacing.sapUiContentPadding }} >
                        <ui5-table class="demo-table content-padding">
                            <ui5-table-column slot="columns">
                                <ui5-label>Sales Order</ui5-label>
                            </ui5-table-column>

                            <ui5-table-column slot="columns">
                                <ui5-label>Customer</ui5-label>
                            </ui5-table-column>

                            <ui5-table-column slot="columns">
                                <ui5-label>Net Amount</ui5-label>
                            </ui5-table-column>

                            <ui5-table-column slot="columns" min-width="450" popin-text="Status" demand-popin>
                                <ui5-label>Status</ui5-label>
                            </ui5-table-column>
                            <ui5-table-row >
                                <ui5-table-cell>
                                    <ui5-label>5000010051</ui5-label>
                                </ui5-table-cell>
                                <ui5-table-cell>
                                    <ui5-label>Brazil Techologies</ui5-label>
                                </ui5-table-cell>
                                <ui5-table-cell>
                                    <ui5-label>2k USD</ui5-label>
                                </ui5-table-cell>
                                <ui5-table-cell>
                                    <span className="status-error">Rejected</span>
                                </ui5-table-cell>
                            </ui5-table-row>
                        </ui5-table>
                    </ui5-card>
                </FlexBox>
            </section>
        </div >
    );
}
export default DashBoardFun;