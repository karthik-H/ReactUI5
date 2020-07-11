import React from 'react';

import {
    Label
} from '@ui5/webcomponents-react';

import { spacing } from '@ui5/webcomponents-react-base';
import CustomColumnItem from '../../CustomColumnItem.js'

export default function CustomHeaderContent(props) {
    const fields = props.headerContent === undefined ? undefined : props.headerContent.field;
    const property = props.property;
    const entity = props.entity;
    if (fields === undefined || Object.keys(property).length <= 0) {
        return (<> </>);
    }
    return (
        <>
            {
                fields.map(field => (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                            <Label>{property[field].label === undefined ?
                                property[field].field :
                                property[field].label}</Label>
                            <CustomColumnItem value={entity[property[field].textAssociation === undefined ?
                                field :
                                property[field].textAssociation]}
                                property={property[field]}
                                criticality={property[field].criticality !== undefined ?
                                    entity[property[field].criticality] :
                                    undefined} />
                        </div>
                        {/* <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                    <Label>Staus</Label>
                    <ObjectStatus state={ValueState.Success}>Active</ObjectStatus>
                </div> */}
                    </div>
                )
                )
            }
        </>
    );

}