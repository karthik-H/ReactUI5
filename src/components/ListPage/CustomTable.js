import React, { useState } from 'react';
import {
    Table
} from '@ui5/webcomponents-react'

import CustomColumn from './CustomColumn'
import CustomRow from './CustomRow'


export default function CustomTable(props) {
    const data = props.tableData;
    const property = props.property;
    // const tempcolumnData = [];
    // for (let key in property) {
    //     tempcolumnData.push(key);
    // }
    let columnData = props.listPage === undefined ? [] : props.listPage;
    // const [columnData, setColumnData] = useState(tempcolumnData);
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