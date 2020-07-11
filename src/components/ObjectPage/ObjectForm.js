import React, { useState, useRef, useEffect } from 'react';
import { ObjectPage } from '@ui5/webcomponents-react/lib/ObjectPage';
import LuigiClient, {
    addInitListener,
    addContextUpdateListener,
    removeContextUpdateListener,
    removeInitListener
} from '@luigi-project/client';
import {
    Title,
    TitleLevel,
    Button,
    ButtonDesign,
    ObjectPageMode,
    ObjectPageSection,
    Avatar,
    AvatarBackgroundColor,
    AvatarShape,
    AvatarSize,
    FileUploader,
    ResponsivePopover,
    PopoverHorizontalAlign,
    PlacementType,
    PopoverVerticalAlign
} from '@ui5/webcomponents-react'

import { spacing, usePassThroughHtmlProps } from '@ui5/webcomponents-react-base'
import '../../style/sap-icons.css'
import { sapUiTinyMargin } from '@ui5/webcomponents-react-base/lib/spacing';
import "@ui5/webcomponents-icons/dist/icons/upload.js";


import CustomHeaderContent from './header/CustomHeaderContent.js';
import CustomKeyInfo from './header/CustomKeyInfo.js';
import CustomAction from '../Actions/CustomAction.js';
import CustomFacet from '../ObjectPage/Facet/CustomFacet.js';
import CustomImageHolder from './Facet/CustomImageHolder.js';
import data from '../../annotation/itemDetails_annotation.json';
import itemDetails from '../../itemDetails.json';
import itemCategory from '../../itemCategory.json';
import itemSubcategory from '../../itemSubcategory.json';
import annotation from '../../annotation/annotation.json';
import useConstructor from '../CustomHooks/useConstructor.js';

import getFieldValue from '../../functions/getFieldValue.js'
import axios from 'axios';
import "@ui5/webcomponents-icons/dist/icons/decline.js";
const ObjectForm = () => {

    // let formType = "";
    const [formType, setFormType] = useState("");
    const [formAction, setFormAction] = useState("");
    const [pathValue, setPathValue] = useState("");
    const [previousOperation, setPreviousOperation] = useState("");
    const [EditSaveButton, setEditSaveButton] = useState("Edit");
    const [id, setId] = useState("");
    const filesRef = useRef({});
    let isDirty = false;
    const [header, setHeader] = useState({});
    //header custom action
    const [actions, setActions] = useState([]);

    const [property, setProperty] = useState({});
    const [suggestion, setSuggestion] = useState({});
    const [entity, setEntity] = useState({});
    const [facets, setFacets] = useState([]);
    //default action - create, update & delete
    const [defaultAction, setDefaultAction] = useState({});
    const [formData, setFormData] = useState({});
    const dataLoadIssueMessage = {
        text: "unable to load Data, check your internet connection once",
        type: "error",
        closeAfter: 3000
    }
    const setFileState = (data) => {
        filesRef.current = data;
    }
    const delFileState = (i) => {
        let temp = { ...filesRef.current }
        delete temp[i];
        setFileState(temp);
    }

    useEffect(() => {
        debugger;
        // let dataset = "";
        if (pathValue !== "" && pathValue != "id" && formType !== "" && previousOperation !== "Create") {
            console.log(`${process.env.REACT_APP_DOMAIN}/admin/${formType}/${pathValue}`);
            axios.get(`${process.env.REACT_APP_DOMAIN}/admin/${formType}/${pathValue}`)
                .then((data) => {
                    setEntity(data.data);
                    LuigiClient.uxManager().hideLoadingIndicator();
                    // category = data.data;
                }).catch((err) => {
                    LuigiClient.uxManager().hideLoadingIndicator();
                    LuigiClient.uxManager().showAlert(dataLoadIssueMessage);
                    console.log("err", err);
                });
        }
        // if (formType === "itemDetails") {

        //     dataset = itemDetails;
        // } else if (formType === "itemCategory") {
        //     dataset = itemCategory;
        // } else if (formType === "itemSubcategory") {
        //     dataset = itemSubcategory;
        // }
        if (formAction === "Read") {
            // setHeader(data.header);
            debugger;
            setHeader(annotation[formType].header);
            setEditSaveButton("Edit");
            console.log("header", header);
            setActions(annotation[formType].header === undefined ?
                [] :
                annotation[formType].header.headerActions);
            setDefaultAction(annotation[formType].action);
            setProperty(annotation[formType].property);
            setSuggestion(annotation[formType].suggestion);
            setFormData(annotation[formType].metadata);
            // setEntity(dataset);
            setFacets(annotation[formType].facet === undefined ? [] : annotation[formType].facet);
            setPreviousOperation("Read");
        } else if (formAction === "Create") {
            setDefaultAction(annotation[formType].action);
            setEditSaveButton("Save");
            setProperty(annotation[formType].property);
            setSuggestion(annotation[formType].suggestion);
            setEntity(annotation[formType].metadata);
            setFacets(annotation[formType].facet === undefined ? [] : annotation[formType].facet);
            setFormData(annotation[formType].metadata);
        }
    }, [formAction, formType, pathValue])
    const initData = (obj) => {
        Object.keys(obj).map(key => {
            if (obj[key] === Object(obj[key])) {
                initData(obj[key])
                if (Object.keys(obj[key]).length === 0) obj[key] = ""
                return
            }
            if (obj[key] instanceof Array) obj[key] = []
            else delete obj[key]
        })
        return obj;
    }
    useEffect(() => {
        const initListener = addInitListener((e) => {
            console.log(LuigiClient);
            setFormType(LuigiClient.getNodeParams().type);
            setPathValue(LuigiClient.getPathParams().id);
            LuigiClient.uxManager().hideLoadingIndicator();
            // formType = LuigiClient.getNodeParams().type;
            setFormAction(LuigiClient.getNodeParams().action);
        }
        );
        const updateListener = addContextUpdateListener((e) => {
            debugger;
            console.log(LuigiClient);
            setFormType(LuigiClient.getNodeParams().type);
            setPathValue(LuigiClient.getPathParams().id);
            setFormAction(LuigiClient.getNodeParams().action);
        })

    }, []);

    const ImageUploadpopoverRef = useRef();
    const onEditAction = () => {
        debugger;
        if (EditSaveButton === "Edit") {
            setFormData(JSON.parse(JSON.stringify(annotation[formType].metadata)));
            setEditSaveButton("Save");
        } else {
            if (isDirty) {
                let method = "";
                LuigiClient.uxManager().showLoadingIndicator();
                if (pathValue === "id") {
                    console.log(entity["id"]);
                    //create
                    method = "post";
                } else {
                    //edit
                    method = "put"
                    formData["id"] = entity["id"];
                }
                let bodyFormData = new FormData();
                bodyFormData.append(formType, JSON.stringify(formData));
                axios({
                    method: method,
                    url: `${process.env.REACT_APP_DOMAIN}/admin/${formType}`,
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(function (response) {
                        setEntity(response.data);
                        setPathValue(response.data["id"]);
                        setFormAction("Read");
                        LuigiClient.uxManager().hideLoadingIndicator();
                        console.log("response", response);
                    })
                    .catch(function (response) {
                        debugger;
                        const errorMessage = {
                            text: response.message,
                            type: "error",
                            closeAfter: 3000
                        }
                        LuigiClient.uxManager().hideLoadingIndicator();
                        LuigiClient.uxManager().showAlert(errorMessage);
                    });
                isDirty = false;
            }
            setEditSaveButton("Edit");
        }
    }

    const onDeleteAction = () => {

    }
    const onInputChange = (e) => {
        const parentID = e.target.id;
        const temp = parentID.split('.');
        debugger;
        if (temp.length > 1) {
            if (formData[temp[0]] === null) {
                // entity[temp[0]] = {};
                formData[temp[0]] = {};
                // entity[temp[0]][temp[1]] = getFilterValue(e);
                formData[temp[0]][temp[1]] = getFieldValue(e);
            } else {
                // entity[temp[0]][temp[1]] = getFilterValue(e);
                formData[temp[0]][temp[1]] = getFieldValue(e);
            }
        } else {
            // entity[parentID] = getFieldValue(e);
            formData[parentID] = getFieldValue(e);
        }
        // LuigiClient.uxManager().setDirtyStatus(true);
        isDirty = true;
    }
    // const getFilterValue = (e) => {
    //     const component = e.target.nodeName;
    //     debugger;
    //     switch (component) {
    //         case "UI5-MULTI-COMBOBOX":
    //             return (e.detail.items.map(item => item.id));
    //         case "UI5-COMBOBOX":
    //             const value = e.target.value;
    //             const filteredItem = e.target.items.filter(item => item.text === value);
    //             if (filteredItem.length > 0) {
    //                 return (filteredItem[0].id);
    //             }
    //             break;
    //         case "UI5-INPUT":
    //             return (e.target.value);
    //         default:
    //             break;
    //     }
    // }

    const renderImages = (files) => {
        const resultDiv = document.querySelector("#result");
        resultDiv.innerHTML = "";
        for (let [key, value] of Object.entries(filesRef.current)) {
            const tile = document.createElement("div");
            const tileContent = document.createElement("div");
            const tileAction = document.createElement("div");
            const avathar = document.createElement("ui5-avatar");
            const button = document.createElement("ui5-button");

            tile.setAttribute("class", "fd-tile");
            tileContent.setAttribute("class", "fd-tile__content");
            tileContent.appendChild(avathar);
            tileAction.setAttribute("class", "fd-tile__actions");
            tileAction.appendChild(button);
            avathar.setAttribute("image", URL.createObjectURL(value));
            avathar.setAttribute("shape", "Square");
            avathar.setAttribute("size", "XL");
            button.setAttribute("icon", "decline");
            button.setAttribute("id", URL.createObjectURL(value));
            button.addEventListener("click", (e) => {
                delFileState(key);
                renderImages(filesRef);
            })
            tile.appendChild(tileContent);
            tile.appendChild(tileAction);
            resultDiv.appendChild(tile);
        }
    }
    const onImageUpload = (event, test) => {
        let tempfiles = { ...event.target.files, length: event.target.files.length };
        setFileState({ ...event.target.files });
        renderImages(filesRef.current);
    }
    const onActionClick = () => {

    }
    const settings = {
        header: "Warning",
        body: "you haven't saved data!! Are you sure you want to exit",
        buttonConfirm: "Yes",
        buttonDismiss: "No"
    }
    const onGoBack = () => {
        if (isDirty) {
            LuigiClient
                .uxManager()
                .showConfirmationModal(settings)
                .then(() => {
                    LuigiClient.linkManager().goBack();
                });
        } else {
            LuigiClient.linkManager().goBack();
        }
    }
    return (

        <main className="fd-page fd-page--transparent" style={{ width: '100%', height: '100%', margin: '0', overflow: 'hidden' }}>
            <header>
                <div class="fd-bar fd-bar--page-m_l fd-bar--header-with-subheader">
                    <div class="fd-bar__left">
                        <div class="fd-bar__element">
                            <button class="fd-button fd-button--transparent sap-icon--navigation-left-arrow" onClick={onGoBack}></button>
                        </div>
                        <div class="fd-bar__element">
                            <Title level={TitleLevel.H3}>{formType}</Title>
                        </div>
                    </div>
                </div>
            </header>
            <div class="fd-page__content" style={{ width: '100%' }}>
                <ObjectPage
                    headerContent={
                        header === undefined ?
                            <></> :
                            <CustomHeaderContent headerContent={header.headerContent}
                                property={property}
                                entity={entity} />
                    }
                    breadcrumbs={
                        <div style={{ ...spacing.sapUiContentPadding }}></div>
                    }
                    keyInfos={
                        header === undefined ?
                            <></> :
                            <CustomKeyInfo headerContent={header.keyInfos}
                                property={property}
                                data={entity} />
                    }
                    title={header === undefined ?
                        <></> :
                        entity[header.title]}
                    subTitle={header === undefined ?
                        <></> :
                        entity[header.subTitle]}
                    headerActions={[
                        // <Button class="fd-button fd-button--emphasized fd-button--compact"
                        //     key="1" design={AvailableButton === "Mark as unavailable" ? ButtonDesign.Negative : ButtonDesign.Positive} onClick={onHeaderAction1Pressed}>
                        //     {AvailableButton}
                        // </Button>,
                        actions === undefined ?
                            <></> :
                            actions.map(action => (
                                <CustomAction actionProp={action} onActionClick={onActionClick} />
                            )),

                        // <Button id="b2" class="fd-button fd-button--emphasized fd-button--compact"
                        //     key="2" design={ButtonDesign.Emphasized} onClick={onEditAction}>
                        //     {EditSaveButton}
                        // </Button>
                        defaultAction === undefined || defaultAction.updateEnabled !== "true" ?
                            <></> :
                            <Button id="b2" class="fd-button fd-button--emphasized fd-button--compact"
                                key="2" design={ButtonDesign.Emphasized} onClick={onEditAction}>
                                {EditSaveButton}
                            </Button>,

                        defaultAction === undefined || defaultAction.deleteEnabled !== "true" ?
                            <></> :
                            <Button id="b2" class="fd-button fd-button--emphasized fd-button--compact"
                                key="2" design={ButtonDesign.Negative} onClick={onDeleteAction}>
                                Delete
                            </Button>

                    ]}
                    image={
                        header === undefined ?
                            <></> :
                            header.image === undefined ?
                                <></> :
                                <Avatar
                                    backgroundColor={AvatarBackgroundColor.Accent6}
                                    initials={"i"}
                                    shape={AvatarShape.Square}
                                    size={AvatarSize.XL}
                                    image={entity[header.image]}
                                />}
                    mode={ObjectPageMode.Default}
                    imageShapeCircle={false}
                    showHideHeaderButton={true}
                    // selectedSectionId={'1'}
                    onSelectedSectionChanged={'onSelectedSectionChanged'}
                    noHeader={false}
                    alwaysShowContentHeader={false}
                    showTitleInHeaderContent={false}
                    style={{ width: '100%', height: 'calc(100% - 100px)' }}
                    headerContentPinnable={true}
                >
                    {
                        facets.map(facet => (
                            <ObjectPageSection
                                title={facet.label === undefined ? "" : facet.label}
                                id={facet.id === undefined ? "" : facet.id}>
                                <CustomFacet field={facet.field}
                                    association={facet.association}
                                    property={property}
                                    type={facet.type}
                                    imageUploadpopoverRef={ImageUploadpopoverRef}
                                    editStatus={EditSaveButton}
                                    entity={entity}
                                    // setEntity={setEntity}
                                    suggestion={suggestion}
                                    onInputChange={onInputChange} />
                            </ObjectPageSection>
                        ))
                    }
                </ObjectPage>
            </div>
            {/* pop over to set default image */}
            <ui5-popover id="hello-popover">
                <div class="popover-content">
                    <div class="flex-column">
                        <nav class="fd-menu" id="">
                            <ul class="fd-menu__list fd-menu__list--no-shadow">
                                <Button id="b2" class="fd-button fd-button--default fd-button--compact"
                                    key="2" onClick="onclick">
                                    Mark as default
                                                 </Button>
                                <Button id="b2" class="fd-button fd-button--negetive fd-button--compact"
                                    key="2" design={ButtonDesign.Negative} onClick={(e) => { console.log(e) }}>
                                    Delete
                                                 </Button>
                            </ul>
                        </nav>

                    </div>
                </div>
            </ui5-popover>
            <ResponsivePopover
                ref={ImageUploadpopoverRef}
                allowTargetOverlap={true}
                headerText={"add new images"}
                horizontalAlign={PopoverHorizontalAlign.Center}
                placementType={PlacementType, PlacementType.Right}
                verticalAlign={PopoverVerticalAlign.Center}
                header={
                    <FileUploader
                        id="fileUploder-id"
                        accept="image"
                        multiple={true}
                        // name={"add new Image"}
                        placeholder={"click to upload"}
                        onChange={onImageUpload}
                    >
                        {/* <ui5-button design={ButtonDesign.Emphasized} icon="upload"></ui5-button> */}
                    </FileUploader>
                }
                footer={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: 'calc(100% - 1rem)',
                            height: '2.5rem'
                        }}
                    >
                        <Button id="saveImages" design={ButtonDesign.Default} onClick={(e) => ImageUploadpopoverRef.current.close()}>Close</Button>
                        <Button id="saveImages" design={ButtonDesign.Emphasized}>Save</Button>
                    </div>
                }
            >
                <div id="result" style={{ ...spacing.sapUiContentPadding }} />


            </ResponsivePopover>
            {/* <ui5-popover id="imageupload-popover" header-text="Add new Images"> */}
            {/* <div class="popover-content" style={{ ...spacing.sapUiForceWidthAuto }}> */}
            {/* <FileUploader
                        accept="image"
                        multiple={true}
                        // name={"add new Image"}
                        placeholder={"click to upload"}
                        onChange={onImageUpload}
                    > */}
            {/* <ui5-button icon="upload">Upload Images</ui5-button>
                    </FileUploader> */}
            {/* <div id="result" style={{ ...spacing.sapUiContentPadding }} /> */}
            {/* </div> */}
            {/* <div slot="footer" class="popover-footer">
                    <div style={{ flex: 1 }}></div>
                    <ui5-button id="closePopoverButton" design="Emphasized">Save</ui5-button>
                </div> */}
            {/* </ui5-popover> */}

        </main >

    );
}

export default ObjectForm;