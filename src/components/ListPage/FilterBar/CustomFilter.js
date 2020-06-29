import React from 'react';
import {
    Button,
    ButtonDesign,
    FilterBar
} from '@ui5/webcomponents-react'
import CustomSearch from './CustomSearch';
import { spacing } from '@ui5/webcomponents-react-base';
import CustomFieldItem from '../../CustomFieldItem.js'

export default function CustomFilter(props) {
    const searchProps = props.search;
    const filterProps = props.filter === undefined ? [] : props.filter;
    const suggestion = props.suggestion;

    if (props.search === undefined && props.filter === undefined) {
        return (
            <>
            </>
        );
    }
    return (
        <FilterBar
            search={
                <div style={{ ...spacing.sapUiContentPadding }}>
                    <CustomSearch id={"searchBar"} property={searchProps} onFilterChange={props.onFilterChange} />
                    <Button design={ButtonDesign.Emphasized} style={{ ...spacing.sapUiSmallMarginBegin }}
                        onClick={props.onGoClick}>GO</Button>
                </div>}
        >
            {
                filterProps.map(filter => (
                    <CustomFieldItem label={props.property[filter].label === undefined ? filter : props.property[filter].label}
                        component={props.property[filter].editComponent}
                        field={filter}
                        suggestion={suggestion[props.property[filter].suggestion]}
                        onFilterChange={props.onFilterChange} />
                ))
            }
        </FilterBar>
    );
}