import React from 'react';
import {
    Table,
    TableColumn,
    TableRow,
    TableCell,
    ObjectStatus,
    Label,
    ValueState,
    Avatar,
    AvatarShape
} from '@ui5/webcomponents-react'

import LuigiClient from '@luigi-project/client';

export default function CustomTable(props) {
    const onAvailablityClick = () => {
        console.log(LuigiClient.getContext());
        const link = LuigiClient.linkManager().withParams({ type: 'category' });
        link.navigate('/admin-home/objectPage/2');
    }
    return (
        <Table
            noDataText={'no Items avaialble'}
            showNoData={true}
            stickyColumnHeader={'Items'}
            columns={
                <>
                    <TableColumn style={{ width: '8rem' }}>
                        <Label>ID</Label>
                    </TableColumn>
                    <TableColumn >
                        <Label>Item Image</Label>
                    </TableColumn>
                    <TableColumn minWidth={500} popinText="Item Name" demandPopin>
                        <Label>Item Name</Label>
                    </TableColumn>
                    <TableColumn minWidth={600}>
                        <Label>Category</Label>
                    </TableColumn>
                    <TableColumn minWidth={600}>
                        <Label>SubCategory</Label>
                    </TableColumn>
                    <TableColumn minWidth={300} popinText="Status" demandPopin>
                        <Label>Status</Label>
                    </TableColumn>
                </>
            }
            //   onPopinChange={action('onPopinChange')}
            onRowClick={props.onRowClick}
        >
            <TableRow id="2">
                <TableCell>
                    <Label>2</Label>
                </TableCell>
                <TableCell>
                    <Avatar
                        shape={AvatarShape.Square}
                        image={"https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"}
                    />
                </TableCell>
                <TableCell>
                    <Label>Boost</Label>
                </TableCell>
                <TableCell>
                    <Label>2</Label>
                </TableCell>
                <TableCell>
                    <Label>10</Label>
                </TableCell>
                <TableCell>
                    <ObjectStatus state={ValueState.Success}> Active</ObjectStatus>
                </TableCell>
            </TableRow>
        </Table>
    );
}

// export default CustomTable;