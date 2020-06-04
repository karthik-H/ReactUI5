import React from 'react';
import {
    TableRow,
    TableCell
} from '@ui5/webcomponents-react'

import GenerateCustomComponent from './GenerateCustomComponent';

export default function CustomRow(props) {
    const getCriticality = (columnName, row) => {
        return row[props.property[columnName].criticality];
    }
    return (
        <>
            {
                props.rowData.map(row => (
                    <TableRow id={row[props.columnName[0]]}>
                        {
                            props.columnName.map(column => (
                                <TableCell>
                                    <GenerateCustomComponent value={row[column]} property={props.property[column]}
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