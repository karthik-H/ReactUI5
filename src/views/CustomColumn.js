import React from 'react';
import ColumnWithProp from './ColumnWithProp'

export default function CustomColumn(props) {

    const getProperty = (columnName) => {
        const property = props.property[columnName];
        if (property !== undefined) {
            return property;
        } else return "LOW";
    }
    return (
        <>
            {
                props.columnName.map(columnName => (
                    <ColumnWithProp property={getProperty(columnName)} columnName={columnName} />
                ))
            }
        </>
    );
}