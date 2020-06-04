import React, { useState } from 'react';
import {
    Table
} from '@ui5/webcomponents-react'

import CustomColumn from '../views/CustomColumn'
import CustomRow from '../views/CustomRow'


export default function CustomTable(props) {
    const data = props.tableData.data;
    const property = props.tableData.property;
    const tempcolumnData = [];
    for (let key in property) {
        tempcolumnData.push(key);
    }
    const [columnData, setColumnData] = useState(tempcolumnData);
    return (
        <Table
            noDataText={'no Items avaialble'}
            showNoData={true}
            stickyColumnHeader={'Items'}
            columns={
                <CustomColumn columnName={columnData} property={property} />
            }
            //   onPopinChange={action('onPopinChange')}
            onRowClick={props.onRowClick}
        >
            <CustomRow rowData={data} columnName={columnData} property={property} />
        </Table>
    );
}