import React, { useState, useEffect } from 'react';

import LuigiClient, {
    addInitListener,
    addContextUpdateListener
} from '@luigi-project/client';
import Luigi from '@luigi-project/core/luigi';
import CustomTable from './CustomTable'
import { Button, FlexBox, ButtonDesign } from '@ui5/webcomponents-react';
import CustomFilter from './FilterBar/CustomFilter'
import '@ui5/webcomponents/dist/features/InputSuggestions.js'
import getFieldValue from '../../functions/getFieldValue'
import { spacing } from '@ui5/webcomponents-react-base';
import itemDetailsList from '../../itemDetailsList.json';
import itemCategoryList from '../../itemCategoryList.json';
import itemSubCategoryList from '../../itemSubcategoryList.json';
import annotation from '../../annotation/annotation.json';
// import data from '../../item-details.json';
export default function ItemList(props) {

    const [context, setContext] = useState("");
    const [entityData, setEntityData] = useState([]);
    const [property, setProperty] = useState({});
    const [filterProps, setFilterProps] = useState([]);
    const [searchProps, setSearchProps] = useState({});
    const [suggestion, setSuggestion] = useState({});
    const [action, setAction] = useState({});
    const [listPage, setListPage] = useState([]);
    const data = props.data;
    // const listPage = props.data.listPage;
    // const searchProps = data.search;
    // const filterProps = data.filter;
    // const property = data.property;
    // const entityData = data.data;
    // const suggestion = data.suggestion;
    // const action = data.action;
    let filterValue = {};

    useEffect(() => {
        const initListener = addInitListener((e) => {
            setContext(LuigiClient.getContext().parentNavigationContexts === undefined ?
                "" :
                LuigiClient.getContext().parentNavigationContexts[0]);
            console.log("context", LuigiClient.getContext().parentNavigationContexts[0]);
        }
        );
        const updateListener = addContextUpdateListener((e) => {
            setContext(LuigiClient.getContext().parentNavigationContexts === undefined ?
                "" :
                LuigiClient.getContext().parentNavigationContexts[0]);
            console.log("update", context);
        })

    }, []);

    useEffect(() => {
        if (annotation[context] !== undefined) {
            console.log(annotation[context], "prps")

            // setProperty(data.property);
            setListPage(annotation[context].listPage);
            setProperty(annotation[context].property);
            if (context === "itemDetails") {
                setEntityData(itemDetailsList);
            } else if (context === "itemCategory") {
                setEntityData(itemCategoryList);
            } else if (context === "itemSubcategory") {
                setEntityData(itemSubCategoryList);
            }
            setSearchProps(annotation[context].search);
            setFilterProps(annotation[context].filter);
            setSuggestion(annotation[context].suggestion);
            setAction(annotation[context].action);
        }
    }, [context])

    const onRowClick = (e) => {
        const link = LuigiClient.linkManager().withParams({ type: LuigiClient.getContext().parentNavigationContexts[0], action: "Read" });
        link.navigate(`/admin-home/objectPage/${e.detail.row.id}`);
    }

    const onGoClick = (e) => {
        console.log("GOOOOOOO", e);
    }

    const onFilterChange = (e) => {
        const parentID = e.target.id;
        filterValue[parentID] = getFieldValue(e);
        console.log("filter", filterValue);
    }
    const onCreate = (e) => {
        const link = LuigiClient.linkManager().withParams({ type: LuigiClient.getContext().parentNavigationContexts[0], action: "Create" });
        link.navigate(`/admin-home/objectPage/id`);
    }
    const getFilterValue = (e) => {
        const component = e.target.nodeName;
        switch (component) {
            case "UI5-MULTI-COMBOBOX":
                return (e.detail.items.map(item => item.id));
            case "UI5-COMBOBOX":
                const value = e.target.value;
                const filteredItem = e.target.items.filter(item => item.text === value);
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
                    {/* <h1 className="fd-section__title">Items(2)</h1> */}
                </div>
                <div className="header">
                    {
                        <CustomFilter search={searchProps} filter={filterProps}
                            suggestion={suggestion}
                            property={property}
                            onFilterChange={onFilterChange}
                            onGoClick={onGoClick}
                        />
                    }

                </div>
                <FlexBox justifyContent="End">
                    {
                        action === undefined || action.CreateEnabled !== "true" ?
                            <> </> :
                            <Button design={ButtonDesign.Emphasized} style={spacing.sapUiSmallMarginBegin} onClick={
                                onCreate
                            }>Create</Button>
                    }
                </FlexBox>

                <CustomTable tableData={entityData} property={property} onRowClick={onRowClick}
                    listPage={listPage} />
            </section>
        </div >

    );
}   