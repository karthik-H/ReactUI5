import React from 'react';
import {
    TableRow,
    TableCell
} from '@ui5/webcomponents-react'

import CustomColumnItem from '../CustomColumnItem.js'

export default function CustomRow(props) {
    // debugger;
    const rows = props.rowData === undefined ? [] : props.rowData;
    const getCriticality = (columnName, row) => {
        return row[props.property[columnName].criticality];
    }
    return (
        <>
            {
                rows.map(row => (
                    <TableRow id={row[props.columnName[0]]}>
                        {
                            props.columnName.map(column => (
                                <TableCell id={"id"}>
                                    <CustomColumnItem value={row[column]} property={props.property[column]}
                                        criticality={getCriticality(column, row)} />
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
        </>
    );
}