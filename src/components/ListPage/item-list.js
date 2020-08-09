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
import getFilterValue from '../../functions/getFilterValue';
import { spacing } from '@ui5/webcomponents-react-base';
import itemDetailsList from '../../itemDetailsList.json';
import itemCategoryList from '../../itemCategoryList.json';
import itemSubCategoryList from '../../itemSubcategoryList.json';
import annotation from '../../annotation/annotation.json';
import axios from 'axios';
// import data from '../../item-details.json';
export default function ItemList(props) {

    const [context, setContext] = useState("");
    const [parentID, setParentId] = useState("");
    const [entityData, setEntityData] = useState([]);
    const [property, setProperty] = useState({});
    const [filterProps, setFilterProps] = useState([]);
    const [searchProps, setSearchProps] = useState({});
    const [suggestion, setSuggestion] = useState({});
    const [action, setAction] = useState({});
    const [listPage, setListPage] = useState([]);
    const data = props.data;
    const [listData, setListData] = useState([]);
    const [filterValue, setFilterValue] = useState({});
    //error messages 
    const dataLoadIssueMessage = {
        text: "unable to load Data, list check your internet connection once",
        type: "error",
        closeAfter: 3000
    }
    // const category = [];

    // const listPage = props.data.listPage;
    // const searchProps = data.search;
    // const filterProps = data.filter;
    // const property = data.property;
    // const entityData = data.data;
    // const suggestion = data.suggestion;
    // const action = data.action;

    // let filterValue = {};
    //load once per page load

    //load context
    useEffect(() => {
        const initListener = addInitListener((e) => {
            if (props.context !== undefined) {
                setContext(props.context);
            } else {
                setContext(LuigiClient.getContext().parentNavigationContexts === undefined ?
                    "" :
                    LuigiClient.getContext().parentNavigationContexts[0]);
            }
        }
        );
        const updateListener = addContextUpdateListener((e) => {
            //check context is available from props 
            if (props.context !== undefined) {
                setContext(props.context);
            } else {
                setContext(LuigiClient.getContext().parentNavigationContexts === undefined ?
                    "" :
                    LuigiClient.getContext().parentNavigationContexts[0]);
            }

            //check parentID is available from props
            if (props.parentID !== undefined) {
                setParentId(props.parentID);
            }
        })

    }, []);
    //load data
    useEffect(() => {
        if (context !== undefined && context !== "") {
            LuigiClient.uxManager().showLoadingIndicator();

            if (props.data !== undefined) {
                setEntityData(props.data);
                LuigiClient.uxManager().hideLoadingIndicator();
            } else {
                // thavaredailyapi-env.eba-fmgp2w3d.ap-south-1.elasticbeanstalk.com
                axios.get(`${process.env.REACT_APP_DOMAIN}/admin/${context}`)
                    .then((data) => {
                        setEntityData(data.data);
                        LuigiClient.uxManager().hideLoadingIndicator();
                        // category = data.data;
                    }).catch((err) => {
                        debugger;
                        LuigiClient.uxManager().hideLoadingIndicator();
                        LuigiClient.uxManager().showAlert(dataLoadIssueMessage);
                        console.log("err", err);
                    });
            }
        }
    }, [context, props.data])
    useEffect(() => {
        if (annotation[context] !== undefined) {
            console.log(annotation[context], "prps")

            // setProperty(data.property);
            setListPage(annotation[context].listPage);
            setProperty(annotation[context].property);
            // if (context === "itemDetails") {
            //     setEntityData(itemDetailsList);
            // } else if (context === "itemCategory") {
            //     debugger;
            //     setEntityData(listData);
            // } else if (context === "itemSubcategory") {
            //     setEntityData(itemSubCategoryList);
            // }
            setSearchProps(annotation[context].search);
            setFilterProps(annotation[context].filter);
            setSuggestion(annotation[context].suggestion);
            setAction(annotation[context].action);
        }
    }, [context]);



    const onRowClick = (e) => {
        let link = "";
        if (props.context != undefined) {
            link = LuigiClient.linkManager().withParams({ type: props.context, action: "Read" });
        } else {
            link = LuigiClient.linkManager().withParams({ type: LuigiClient.getContext().parentNavigationContexts[0], action: "Read" });
        }
        link.navigate(`/admin-home/objectPage/${e.detail.row.id}`);
    }

    const onGoClick = (e) => {
        // subCategoryId+eq+{30,24}
        let filter = "?";
        debugger;
        Object.keys(filterValue).map(value => {
            if (Array.isArray(filterValue[value])) {
                filterValue[value].map(arrayValue => {
                    filter += `&filter=${value}+${arrayValue.operator}+(${formatFilterValue(arrayValue.operend)})`;
                });
            } else {
                filterValue[value].operend = formatFilterValue(filterValue[value].operend);
                if (value === "searchBar") {
                    searchProps.field.map(search => {
                        filter += `&filter=${search}+eq+(${filterValue[value].operend})`;
                    });
                } else {
                    filter += `&filter=${value}+${filterValue[value].operator}+(${filterValue[value].operend})`;
                }
            }
        })
        console.log(`${process.env.REACT_APP_DOMAIN}/admin/${context}${filter}`);
        LuigiClient.uxManager().showLoadingIndicator();
        // thavaredailyapi-env.eba-fmgp2w3d.ap-south-1.elasticbeanstalk.com
        axios.get(`${process.env.REACT_APP_DOMAIN}/admin/${context}${filter}`)
            .then((data) => {
                setEntityData(data.data);
                LuigiClient.uxManager().hideLoadingIndicator();
                // category = data.data;
                console.log("filter", filterValue);
            }).catch((err) => {
                LuigiClient.uxManager().hideLoadingIndicator();
                LuigiClient.uxManager().showAlert(dataLoadIssueMessage);
                console.log("err", err);
            });
        console.log("GOOOOOOO", filter);
    }

    const formatFilterValue = (filterValue) => {
        filterValue = filterValue.toString().replace(",", "~");
        filterValue = filterValue.toString().replace(" ", "_");
        return (filterValue);
    }

    const onFilterChange = (e) => {
        debugger;
        const DOMparentID = e.target.id;
        let tempFilter = filterValue;
        let value = getFilterValue(e);
        if (value === "") {
            delete tempFilter[DOMparentID]
        } else {
            tempFilter[DOMparentID] = value;
        }
        setFilterValue(tempFilter);
        console.log(filterValue);
    }
    const onCreate = (e) => {
        let link = "";
        debugger;
        // if (props.parentId != undefined) {
        //     link = LuigiClient.linkManager().withParams({ parentId: props.parentId });
        // }

        if (props.context != undefined) {
            link = LuigiClient.linkManager().withParams({ type: props.context, action: "Create", parentId: props.parentId });
        } else {
            link = LuigiClient.linkManager().withParams({ type: LuigiClient.getContext().parentNavigationContexts[0], action: "Create" });
        }
        link.navigate(`/admin-home/objectPage/id`);
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