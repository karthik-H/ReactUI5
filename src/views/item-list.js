import React from 'react';
import {
    Input,
    Icon,
    FilterBar,
    FilterType,
    FilterItem,
    Switch,
    VariantManagement
} from '@ui5/webcomponents-react';
import LuigiClient from '@luigi-project/client';
import { spacing } from '@ui5/webcomponents-react-base'
import CustomTable from '../views/CustomTable'

import data from '../item-details.json';
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

                <CustomTable tableData={data} onRowClick={onRowClick} />
            </section>
        </div >

    );
}   