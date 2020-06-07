import React from 'react';

import LuigiClient from '@luigi-project/client';
import CustomTable from './CustomTable'

import CustomFilter from './FilterBar/CustomFilter'
import '@ui5/webcomponents/dist/features/InputSuggestions.js'
import data from '../../item-details.json';
export default function ItemList() {
    const searchProps = data.search;
    const filterProps = data.filter;
    const property = data.property;
    const entityData = data.data;
    const suggestion = data.suggestion;
    let filterValue = {};

    const onRowClick = () => {
        console.log(LuigiClient.getContext());
        const link = LuigiClient.linkManager().withParams({ type: 'category' });
        link.navigate('/admin-home/objectPage/2');
    }

    const onGoClick = (e) => {
        console.log("GOOOOOOO", e);
    }

    const onFilterChange = (e) => {
        const parentID = e.target.id;
        filterValue[parentID] = getFilterValue(e);
        console.log("filter", filterValue);
    }

    const getFilterValue = (e) => {
        const component = e.target.nodeName;
        switch (component) {
            case "UI5-MULTI-COMBOBOX":
                return (e.detail.items.map(item => item.id));
            case "UI5-COMBOBOX":
                const filteredItem = e.target._state._filteredItems;
                if (filteredItem.length > 0) {
                    return (filteredItem[0].id);
                }
                break;
            case "UI5-INPUT":
                return (e.target.value);
            default:
                break;
        }
    }
    return (
        <div>
            <section className="fd-section">
                <div className="fd-section__header">
                    <h1 className="fd-section__title">Items(2)</h1>
                </div>
                <div className="header">
                    {
                        <CustomFilter search={searchProps} filter={filterProps}
                            suggestion={suggestion}
                            onFilterChange={onFilterChange}
                            onGoClick={onGoClick}
                        />
                    }

                </div>

                <CustomTable tableData={entityData} property={property} onRowClick={onRowClick} />
            </section>
        </div >

    );
}   