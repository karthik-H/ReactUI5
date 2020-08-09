import React, { useEffect, useState } from 'react';
import {
    ComboBox,
    ComboBoxItem,
    MultiComboBox,
    MultiComboBoxItem,
    Input,
    FilterItem,
    FilterType
} from '@ui5/webcomponents-react';
import { DatePicker } from 'fundamental-react';
import "@ui5/webcomponents/dist/DateRangePicker";
import axios from 'axios';

export default function CustomFieldItem(props) {

    // if(props.filterProps === undefined) {
    //     return(<> </>);
    // }else {
    //     props.filterProps.map(filter => {
    //         const label = filter.label;
    // const component = props.component;
    // const suggestion = props.suggestion;
    // const field = props.field;
    //     })
    // }
    const label = props.label;
    const component = props.component;
    const [suggestion, setSuggestion] = useState([]);
    // let suggestion = [];
    // const suggestion = props.suggestion === undefined ? [] : props.suggestion;
    const field = props.field;
    const value = props.value === undefined ? "" : props.value;
    console.log("sugg", suggestion)
    useEffect(() => {
        if (props.suggestion !== undefined && props.suggestion.valueType === "constant") {
            setSuggestion(...suggestion, props.suggestion.value);
        } else if (props.suggestion !== undefined && props.suggestion.valueType === "standard") {
            axios.get(`${process.env.REACT_APP_DOMAIN}${props.suggestion.value}`).then((data) => {
                setSuggestion(...suggestion, data.data);
            })
        }
        const dateRange = document.getElementById(field);
        if (dateRange) {
            dateRange.addEventListener("change", props.onFilterChange);
        }
    }, [])
    switch (component) {
        case "MultiComboBox":
            return (
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                >
                    <MultiComboBox
                        allowCustomValues={true}
                        id={field}
                        value={value}
                        onSelectionChange={props.onFilterChange
                        }
                    >
                        {
                            suggestion.map(suggestion => (
                                <MultiComboBoxItem id={suggestion.key} text={suggestion.value} />
                            ))
                        }
                    </MultiComboBox>
                </FilterItem >

            );
        case "ComboBox":
            return (
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                >
                    <ComboBox
                        allowCustomValues={true}
                        id={field}
                        onChange={props.onFilterChange
                        }
                        value={value}
                    >
                        {
                            suggestion.map(suggestion => (
                                <ComboBoxItem id={suggestion.key} text={suggestion.value} />
                            ))
                        }
                    </ComboBox>
                </FilterItem>
            );
        case "Input":
            return (
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                >
                    <Input id={field}
                        showSuggestions={false}
                        value={value}
                        onChange={props.onFilterChange}
                    >
                    </Input>
                </FilterItem>

            );
        case "DateRange":
            return (
                // <ui5-daterange-picker
                //     id="mydaterange-picker1"
                //     change={props.onFilterChange}>
                // </ui5-daterange-picker>
                // <ui5-date-picker id="myDatepicker1"></ui5-date-picker>
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                >
                    <ui5-daterange-picker
                        id={field}
                    // readonly
                    // onChange={props.onFilterChange}
                    >
                    </ui5-daterange-picker>
                    {/* <DatePicker enableRangeSelection /> */}
                </FilterItem>
            );
        default:
            return (<></>);
    }
}