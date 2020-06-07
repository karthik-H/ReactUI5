import React from 'react';
import {
    Input,
    Icon
} from '@ui5/webcomponents-react'

export default function CustomSearch(props) {

    const property = props.property;
    if (property === undefined) {
        return (
            <>

            </>
        )
    } else {
        return (
            <Input
                id={props.id}
                icon={<Icon name="search" />}
                placeholder={
                    property.label === undefined ?
                        "Search" :
                        property.label
                }
                onChange={props.onFilterChange}
            >Search</Input>
        );
    }

}