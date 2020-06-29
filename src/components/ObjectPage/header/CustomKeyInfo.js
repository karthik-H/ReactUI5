import React from 'react';

import {
    Label,
    Text
} from '@ui5/webcomponents-react';

import { spacing } from '@ui5/webcomponents-react-base';
import CustomColumnItem from '../../CustomColumnItem.js'

export default function CustomKeyInfo(props) {
    const fields = props.headerContent === undefined ? undefined : props.headerContent.field;
    const property = props.property;
    const entity = props.data;

    if (fields === undefined) {
        return (<> </>);
    }

    return (
        fields.map(field => (
            <div style={{ display: 'flex', flexDirection: 'row', ...spacing.sapUiMediumMarginBegin }}>
                <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                    <Label>{property[field].label === undefined ?
                        property[field].field :
                        property[field].label}</Label>
                    <CustomColumnItem value={entity[field]} property={property[field]}
                        criticality={property[field].criticality !== undefined ?
                            entity[property[field].criticality] :
                            undefined} />
                </div>
                {/* <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                <Label>SubCategory</Label>
                <Text> Drink</Text>
            </div> */}
            </div>
        ))

    );
}