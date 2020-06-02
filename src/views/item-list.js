import React from 'react';
import {
    List,
    StandardListItem,
    Text,
    Label,
    Button,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    Input,
    Icon,
    FilterBar,
    FilterType,
    FilterItem,
    Switch,
    VariantManagement,
    Table,
    TableColumn,
    TableRow,
    TableCell,
    ObjectStatus,
    ValueState,
    Avatar,
    AvatarShape

} from '@ui5/webcomponents-react';
import { ListSeparators } from '@ui5/webcomponents-react';
import LuigiClient from '@luigi-project/client';
import { spacing } from '@ui5/webcomponents-react-base'
import CustomTable from '../views/CustomTable'

import data from '../item-details.json'
const filterItems = ["a", "b"];
export default function ItemList() {
    const onRowClick = () => {
        console.log(LuigiClient.getContext());
        const link = LuigiClient.linkManager().withParams({ type: 'category' });
        link.navigate('/admin-home/objectPage/2');
    }
    return (
        <div>
            <section className="fd-section">
                <div className="fd-section__header">
                    <h1 className="fd-section__title">Items(2)</h1>
                </div>
                <div className="header">
                    <FilterBar
                        search={<Input icon={<Icon name="search" />} placeholder="Enter Item ID or name">Search</Input>}
                        variants={
                            <VariantManagement
                                closeOnItemSelect="true"
                                selectedKey={'2'}
                                variantItems={[{ key: "1", label: "Variant 1" }, { key: "2", label: "Variant 2" }]}
                                placement={"Bottom"}
                                level={"H6"}
                            />
                        }
                    >
                        <FilterItem
                            filterItems={[{ key: "1", text: "12" },
                            { key: "2", text: "14" }]}
                            label="Category"
                            key="Category"
                            type={FilterType.Select}
                        />
                        <FilterItem
                            key={'filter2'}
                            type={FilterType.Custom}
                            label={'Status : Active'}
                        // changeEventName={'onClick'}
                        // valueParamName={'state'}
                        >
                            <div style={{ width: "50%", ...spacing.sapUiMediumMargin }}>
                                <Switch />
                            </div>
                            {/* <Switch style={{ width: "50%", ...spacing.sapUiContentPadding }} /> */}
                        </FilterItem>
                    </FilterBar>
                </div>

                <CustomTable data={data} onRowClick={onRowClick} />
                {/* <Table
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
                    onRowClick={onAvailablityClick}
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
                </Table> */}
                {/* 
                <ui5-table class="demo-table" id="table" style={{ width: "100%" }} onRowClick={() => console.log("e")}>
                    <ui5-table-column slot="columns" style={{ width: "16rem" }}>
                        <span style={{ lineheight: "1.4rem" }}>ID</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns" style={{ width: "16rem" }}>
                        <span style={{ lineheight: "1.4rem" }}>Item Name</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="800">
                        <span style={{ lineheight: "1.4rem" }}>Category</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="800">
                        <span style={{ lineheight: "1.4rem" }}>SubCategory</span>
                    </ui5-table-column>
                    <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="600" popin-text="Actual Price" demand-popin>
                        <span style={{ lineheight: "1.4rem" }}>ActualPrice</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="600" popin-text="Discount" demand-popin>
                        <span style={{ lineheight: "1.4rem" }}>Discount</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns" style={{ width: "16rem" }} min-width="600">
                        <span style={{ lineheight: "1.4rem" }}>DiscountPrice</span>
                    </ui5-table-column>

                    <ui5-table-column slot="columns">
                        <span style={{ lineheight: "1.4rem" }}>Status</span>
                    </ui5-table-column>

                    <ui5-table-row >
                        <ui5-table-cell>
                            <ui5-label>1</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>Boost</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>12</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>24</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>500Rs</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>5 %</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <ui5-label>25Rs</ui5-label>
                        </ui5-table-cell>
                        <ui5-table-cell>
                            <span className="status-success">Active</span>
                        </ui5-table-cell>
                    </ui5-table-row>
                </ui5-table> */}

            </section>
        </div >

    );
}   