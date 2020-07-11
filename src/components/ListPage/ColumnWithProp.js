import React from 'react';

import '@ui5/webcomponents/dist/TableColumn';

export default function ColumnWithProp(props) {
    const property = props.property;
    const label = property.label === undefined ? props.columnName : property.label;
    if (property.importence === "HIGH") {
        return (
            <ui5-table-column slot="columns" style={{ width: '12rem' }}>
                <span>{label}</span>
            </ui5-table-column>
        );
    } else if (property.importence === "MEDIUM") {
        return (
            <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="600" popin-text={label} demand-popin>
                <span style={{ lineheight: "1.4rem" }}>{label}</span>
            </ui5-table-column>
        );
    } else {
        return (
            <ui5-table-column slot="columns" min-width="600">
                <span>{label}</span>
            </ui5-table-column>
        );
    }
}