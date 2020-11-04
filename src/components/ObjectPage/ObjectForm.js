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
    BusyIndicator,
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

// import worker from '../../Worker/UploadFile';
const ObjectForm = () => {

    // let formType = "";
    const [formType, setFormType] = useState("");
    const [formAction, setFormAction] = useState("");
    const [pathValue, setPathValue] = useState("");
    const [parentId, setParentId] = useState("");
    const [previousOperation, setPreviousOperation] = useState("");
    const [EditSaveButton, setEditSaveButton] = useState("Edit");
    const [enableBusyIndicator, setEnableBusyIndicator] = useState(false);
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
        text: "unable to load Data, object check your internet connection once",
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
        // let dataset = "";
        if (pathValue !== "" && pathValue != "id" && formType !== "" && previousOperation !== "Create") {
            console.log(`${process.env.REACT_APP_DOMAIN}/admin/${formType}/${pathValue}`);
            axios.get(`${process.env.REACT_APP_DOMAIN}/admin/${formType}/${pathValue}`)
                .then((data) => {
                    setEntity(data.data);
                    // LuigiClient.uxManager().hideLoadingIndicator();
                    // category = data.data;
                }).catch((err) => {
                    // LuigiClient.uxManager().hideLoadingIndicator();
                    LuigiClient.uxManager().showAlert(dataLoadIssueMessage);
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
            // resetValue();
            setDefaultAction(annotation[formType].action);
            setEditSaveButton("Save");
            setProperty(annotation[formType].property);
            setSuggestion(annotation[formType].suggestion);
            setEntity(annotation[formType].metadata);
            // setFacets(annotation[formType].facet === undefined ? [] : annotation[formType].facet);
            setFacets(annotation[formType].facet === undefined ?
                [] :
                getFacetWithoutAssociation(annotation[formType].facet));
            setFormData(JSON.parse(JSON.stringify(annotation[formType].metadata)))
            // setFormData(annotation[formType].metadata);
        }
    }, [formAction, formType, pathValue]);

    const getFacetWithoutAssociation = (facets) => {
        return facets.filter(facet => facet.type === "fieldGroup");
    }
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
            setFormAction(LuigiClient.getNodeParams().action);
            setParentId(LuigiClient.getNodeParams().parentID);
            LuigiClient.uxManager().hideLoadingIndicator();
        }
        );
        const updateListener = addContextUpdateListener((e) => {
            if (pathValue !== LuigiClient.getPathParams().id) {
                setPathValue(LuigiClient.getPathParams().id);
            }
            if (formType !== LuigiClient.getNodeParams().type) {
                setFormType(LuigiClient.getNodeParams().type);
            }
            if (formAction !== LuigiClient.getNodeParams().action) {
                setFormAction(LuigiClient.getNodeParams().action);
            }
            if (parentId !== LuigiClient.getNodeParams().parentId) {
                setParentId(LuigiClient.getNodeParams().parentId);
            }
        })
        return function cleanUp() {
            removeInitListener(initListener);
            removeContextUpdateListener(updateListener);
        }
    }, []);

    const ImageUploadpopoverRef = useRef();

    const setParentValue = (property, data, value, type, entity) => {
        Object.keys(property).map(key => {
            if (property[key].parentId === "true") {
                if (type === "Edit") {
                    data[key] = entity[key];
                } else {
                    data[key] = value;
                }
            }
        })
    }

    const onEditAction = () => {
        if (EditSaveButton === "Edit") {
            setFormData(JSON.parse(JSON.stringify(annotation[formType].metadata)));
            setEditSaveButton("Save");
        } else {
            if (isDirty) {
                let method = "";
                LuigiClient.uxManager().showLoadingIndicator();
                //check HTTP method type(id contains number => Edit)
                if (pathValue === "id") {
                    //create
                    method = "post";
                    //check if parentid exist 
                    if (parentId !== "" || parentId !== undefined) {
                        setParentValue(property, formData, parentId);
                    }
                } else {
                    //edit
                    method = "put"
                    formData["id"] = entity["id"];
                    setParentValue(property, formData, parentId, "Edit", entity);
                }
                let bodyFormData = new FormData();
                bodyFormData.append(formType, JSON.stringify(formData));
                console.log(`${process.env.REACT_APP_DOMAIN}/admin/${formType}`);
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
                        isDirty = false;
                        LuigiClient.uxManager().hideLoadingIndicator();
                        console.log("response", response);
                    })
                    .catch(function (response) {
                        const errorMessage = {
                            text: response.response.data === undefined ?
                                response.message :
                                response.response.data.message,
                            type: "error",
                            closeAfter: 3000
                        }
                        LuigiClient.uxManager().hideLoadingIndicator();
                        LuigiClient.uxManager().showAlert(errorMessage);
                    });

            }
            setEditSaveButton("Edit");
        }
    }

    const onDeleteAction = () => {
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_DOMAIN}/admin/${formType}/${pathValue}`
        })
            .then(function (response) {
                LuigiClient.uxManager().hideLoadingIndicator();
                LuigiClient.linkManager().goBack();
            })
            .catch(function (response) {
                const errorMessage = {
                    text: response.response === undefined ?
                        response.message :
                        response.response.data.message,
                    type: "error",
                    closeAfter: 3000
                }
                LuigiClient.uxManager().hideLoadingIndicator();
                LuigiClient.uxManager().showAlert(errorMessage);
            });
    }
    const onInputChange = (e) => {
        const parentID = e.target.id;
        const temp = parentID.split('.');
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
            // const busyIndicator = document.createElement("ui5-busyindicator");

            tile.setAttribute("class", "fd-tile");
            tileContent.setAttribute("class", "fd-tile__content");
            // busyIndicator.setAttribute("id", "busyIndicator");
            // tileContent.appendChild(busyIndicator);
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
    const onImageUpload = (event) => {
        let tempfiles = { ...event.target.files, length: event.target.files.length };
        setFileState({ ...event.target.files });
        renderImages(filesRef.current);
    }
    const onImageDelete = (event) => {
        debugger;
        const fieldName = event.target.offsetParent._opener.getAttribute("_type");
        const oPopOver = event.target.offsetParent;
        const imageToDelete = oPopOver._opener.id;
        let tempEntity = JSON.parse(JSON.stringify(entity));
        if (tempEntity[fieldName] !== undefined) {
            let newImage = "";
            if (property[fieldName].multiple === "true") {
                newImage = tempEntity[fieldName].filter(image => image !== imageToDelete);
            } else {
                newImage = undefined;
                // tempEntity[fieldName] = filesRef.current[key];
            }
            tempEntity[fieldName] = newImage;
            let form = new FormData();
            form.append("type", formType);
            //get id of current entity
            form.append("id", entity["id"]);
            form.append("images", imageToDelete);
            axios({
                method: 'put',
                url: `${process.env.REACT_APP_DOMAIN}/admin/imageUpload`,
                data: form,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                debugger;
            }).catch((response) => {
                const errorMessage = {
                    text: response.response.data === undefined ?
                        response.message :
                        response.response.data.message,
                    type: "error",
                    closeAfter: 3000
                }
                LuigiClient.uxManager().showAlert(errorMessage);
            });
            setEntity(tempEntity);
            oPopOver.close();
        }
    }
    const onImageSave = (event) => {
        const fieldName = event.target.parentElement.id;
        // let tempEntity = JSON.parse(JSON.stringify(entity));
        // let form = new FormData();
        // form.append("type", formType);
        //get id of current entity
        // form.append("id", entity["id"]);
        // Object.keys(filesRef.current).map((key) => {
        //     form.append("images", filesRef.current[key]);
        //     if (property[fieldName].multiple === "true") {
        //         tempEntity[fieldName].push(URL.createObjectURL(filesRef.current[key]));
        //     } else {
        //         tempEntity[fieldName] = filesRef.current[key];
        //     }
        // })
        //add local image to image holder
        debugger;
        let webWorker = new Worker('./UploadFile.js');
        webWorker.postMessage({
            msg: 'uploadImage',
            file: filesRef.current,
            type: formType,
            fieldName: fieldName,
            entity: entity,
            property: property[fieldName],
            domain: process.env.REACT_APP_DOMAIN
        });
        webWorker.onmessage = (event) => {
            debugger;
            if (event && event.data &&
                event.data.tempEntity && event.data.msg === 'success') {
                setEntity(event.data.tempEntity);
                setEnableBusyIndicator(false);
                LuigiClient.uxManager().hideLoadingIndicator();
            }
            else if (event && event.data && event.data.msg === 'Error') {
                const error = event.data.errorMessage;
                const errorMessage = {
                    text: error.response === undefined ?
                        error :
                        error.response.data.message,
                    type: "error",
                    closeAfter: 8000
                }
                setEnableBusyIndicator(false);
                LuigiClient.uxManager().hideLoadingIndicator();
                LuigiClient.uxManager().showAlert(errorMessage);
            }

        }
        webWorker.onerror = (error) => {
            setEnableBusyIndicator(false);
            const errorMessage = {
                text: error.response,
                type: "error",
                closeAfter: 8000
            }
            LuigiClient.uxManager().hideLoadingIndicator();
            LuigiClient.uxManager().showAlert(errorMessage);
        }
        setEnableBusyIndicator(true);
        LuigiClient.uxManager().showLoadingIndicator();

        // ImageUploadpopoverRef.current.close();
        // axios({
        //     method: 'post',
        //     url: `${process.env.REACT_APP_DOMAIN}/admin/imageUpload`,
        //     data: form,
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // }).then((response) => {
        //     setEnableBusyIndicator(false);
        //     // ImageUploadpopoverRef.current.close();
        //     LuigiClient.uxManager().hideLoadingIndicator();
        // }).catch((response) => {
        // setEnableBusyIndicator(false);
        // const errorMessage = {
        //     text: response.response === undefined ?
        //         response.message :
        //         response.response.data.message,
        //     type: "error",
        //     closeAfter: 3000
        // }
        // LuigiClient.uxManager().hideLoadingIndicator();
        // LuigiClient.uxManager().showAlert(errorMessage);
        // })
    }
    const onActionClick = () => { }

    const settings = {
        header: "Warning",
        body: "you haven't saved data!! Are you sure you want to exit",
        buttonConfirm: "Yes",
        buttonDismiss: "No"
    }
    const resetValue = () => {
        setProperty({});
        setEntity({});
        setHeader({});
        setActions([]);
        setFacets([]);
        setDefaultAction({});
        setFormData({});
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
            resetValue();
            LuigiClient.linkManager().goBack();
        }
    }
    debugger;
    if (!Object.keys(property) || !Object.keys(entity).length) {
        return (
            <></>
        );
    } else
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
                                    key="edit-action-default-action" design={ButtonDesign.Emphasized} onClick={onEditAction}>
                                    {EditSaveButton}
                                </Button>,

                            defaultAction === undefined || defaultAction.deleteEnabled !== "true" ?
                                <></> :
                                <Button id="b2" class="fd-button fd-button--emphasized fd-button--compact"
                                    key="save-action-default-action" design={ButtonDesign.Negative} onClick={onDeleteAction}>
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
                                        enableBusyIndicator={enableBusyIndicator}
                                        // setEntity={setEntity}
                                        suggestion={suggestion}
                                        onInputChange={onInputChange}
                                        onImageSave={onImageSave}
                                        onImageUpload={onImageUpload} />
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
                                        key="2" design={ButtonDesign.Negative} onClick={onImageDelete}>
                                        Delete
                                    </Button>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </ui5-popover>

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