import React, { useState, useRef, useEffect } from 'react';
import { ObjectPage } from '@ui5/webcomponents-react/lib/ObjectPage';
import LuigiClient, {
    addInitListener,
    addContextUpdateListener,
    removeContextUpdateListener,
    removeInitListener
} from '@luigi-project/client';
import {
    Text,
    Link,
    Breadcrumbs,
    BreadcrumbsSeparatorStyle,
    Title,
    TitleLevel,
    Button,
    ButtonDesign,
    ObjectPageMode,
    ObjectPageSection,
    ObjectPageSubSection,
    Icon,
    ObjectStatus,
    Label,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxDirection,
    FlexBoxWrap,
    FlexBoxAlignItems,
    ValueState,
    Avatar,
    AvatarBackgroundColor,
    AvatarShape,
    AvatarSize,
    Input,
    List,
    ListMode,
    FileUploader,
    ResponsivePopover,
    PopoverHorizontalAlign,
    PlacementType,
    PopoverVerticalAlign,
    Table,
    TableColumn,
    TableRow,
    TableCell
} from '@ui5/webcomponents-react'

import { spacing } from '@ui5/webcomponents-react-base'
import '../style/sap-icons.css'
import { sapUiTinyMargin } from '@ui5/webcomponents-react-base/lib/spacing';
import "@ui5/webcomponents-icons/dist/icons/upload.js";

// this.initListener = null;
// = null;
const ObjectForm = () => {
    useEffect(() => {
        const initListener = addInitListener((e) => {
            console.log(LuigiClient.getNodeParams(), LuigiClient.getPathParams());
            console.log("init listener");
        });
        return function cleanup() {
            removeInitListener(initListener);
        }
    });

    let [EditSaveButton, setEditSaveButton] = useState("Edit");
    let [AvailableButton, setAvailableButton] = useState("Mark as unavailable");
    const ImageUploadpopoverRef = useRef();
    const onHeaderAction2Pressed = () => {
        setEditSaveButton(EditSaveButton === "Edit" ? "Save" : "Edit");
    }
    const onHeaderAction1Pressed = () => {
        setAvailableButton(AvailableButton === "Mark as unavailable" ? "Mark as available" : "Mark as unavailable");
    }
    const onImageUpload = (event) => {
        const resultDiv = document.querySelector("#result");
        const files = event.target.files;

        if (!files.length) {
            resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
        } else {
            resultDiv.innerHTML = "";

            for (let i = 0; i < files.length; i++) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[i]);
                img.width = 100;
                img.height = 100;
                img.onload = () => {
                    URL.revokeObjectURL(img.src);
                }
                resultDiv.appendChild(img);
            }
        }
    }
    const onAvailablityClick = () => {
        console.log("onAvailabiltyClick");
        // LuigiClient.linkManager().withParams({ foo: "bar" }).navigate('/admin-home/dashboard')
        // LuigiClient.linkManager().openAsModal('/admin-home/dashboard', { title: 'Users', size: 'm' });
        const splitViewHandle = LuigiClient.linkManager().openAsSplitView('/admin-home/dashboard', { title: 'Logs', size: 40, collapsed: true });

    }
    const onGoBack = () => {
        LuigiClient.linkManager().goBack();
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
                            <Title level={TitleLevel.H3}>Item Details</Title>
                        </div>
                    </div>
                </div>
            </header>
            <div class="fd-page__content" style={{ width: '100%' }}>
                <ObjectPage
                    headerContent={
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                                <Label>Item Description</Label>
                                <Text> Best before 6 months</Text>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                                <Label>Staus</Label>
                                <ObjectStatus state={ValueState.Success}>Active</ObjectStatus>
                            </div>
                        </div>
                    }
                    breadcrumbs={
                        <div style={{ ...spacing.sapUiContentPadding }}></div>
                    }
                    keyInfos={
                        <div style={{ display: 'flex', flexDirection: 'row', ...spacing.sapUiMediumMarginBegin }}>
                            <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                                <Label>Category</Label>
                                <Text>Grocery</Text>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', ...spacing.sapUiSmallMargin }}>
                                <Label>SubCategory</Label>
                                <Text> Drink</Text>
                            </div>
                        </div>
                    }
                    title={'Boost'}
                    subTitle={'14'}
                    headerActions={[
                        <Button class="fd-button fd-button--emphasized fd-button--compact"
                            key="1" design={AvailableButton === "Mark as unavailable" ? ButtonDesign.Negative : ButtonDesign.Positive} onClick={onHeaderAction1Pressed}>
                            {AvailableButton}
                        </Button>,
                        <Button id="b2" class="fd-button fd-button--emphasized fd-button--compact"
                            key="2" design={ButtonDesign.Emphasized} onClick={onHeaderAction2Pressed}>
                            {EditSaveButton}
                        </Button>
                    ]}
                    image={<Avatar
                        backgroundColor={AvatarBackgroundColor.Accent6}
                        initials={"i"}
                        shape={AvatarShape.Square}
                        size={AvatarSize.XL}
                        image="https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"
                    />}
                    mode={ObjectPageMode.Default}
                    imageShapeCircle={false}
                    showHideHeaderButton={true}
                    selectedSectionId={'1'}
                    onSelectedSectionChanged={'onSelectedSectionChanged'}
                    noHeader={false}
                    alwaysShowContentHeader={false}
                    showTitleInHeaderContent={false}
                    style={{ width: '100%', height: 'calc(100% - 100px)' }}
                    headerContentPinnable={true}
                >
                    <ObjectPageSection title="General Information" id="1">
                        <FlexBox
                            // style={{ width: '100%', height: '100vh' }}
                            // direction={FlexBoxDirection.Column}
                            direction={FlexBoxDirection.Row}
                            justifyContent={FlexBoxJustifyContent.SpaceAround}
                            wrap={FlexBoxWrap.Wrap}
                            alignItems={FlexBoxAlignItems.Center}

                        >
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label required={true} >Item ID</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >14</Text>) :
                                            (<Input value="14" />)
                                    }
                                </div>
                            </div>
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >Item Name</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >Boost</Text>) :
                                            (<Input value="Boost" />)
                                    }
                                </div>
                            </div>
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >Category</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >Grocery(2)</Text>) :
                                            (<Input value="2" />)
                                    }
                                </div>
                            </div>
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >Item Name</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >Drink(1)</Text>) :
                                            (<Input value="1" />)
                                    }
                                </div>
                            </div>



                        </FlexBox>
                    </ObjectPageSection>
                    <ObjectPageSection title="Description" id="2">
                        <FlexBox
                            // style={{ width: '100%', height: '100vh' }}
                            // direction={FlexBoxDirection.Column}
                            direction={FlexBoxDirection.Row}
                            justifyContent={FlexBoxJustifyContent.SpaceAround}
                            wrap={FlexBoxWrap.Wrap}
                            alignItems={FlexBoxAlignItems.Center}

                        >
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >Item Description</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >best for 3 months contains 30% protein</Text>) :
                                            (<Input value="best for 3 months contains 30% protein" />)
                                    }
                                </div>
                            </div>
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >Product Company</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >nescafe</Text>) :
                                            (<Input value="nescafe" />)
                                    }
                                </div>
                            </div>
                            <div style={{ ...spacing.sapUiContentPadding }}>
                                <Label >disclaimer</Label>
                                <div>
                                    {
                                        EditSaveButton === "Edit" ?
                                            (<Text >good for all age</Text>) :
                                            (<Input value="good for all age" />)
                                    }
                                </div>
                            </div>
                        </FlexBox>
                    </ObjectPageSection>
                    <ObjectPageSection title="Availablity" id="3">
                        <Table
                            noDataText={'no Items avaialble'}
                            showNoData={true}
                            stickyColumnHeader={'ItemAvailablilty'}
                            columns={
                                <>
                                    <TableColumn style={{ width: '10rem' }}>
                                        <Label>Available Value</Label>
                                    </TableColumn>
                                    <TableColumn minWidth={800} popinText="unit" demandPopin>
                                        <Label>Unit</Label>
                                    </TableColumn>
                                    <TableColumn minWidth={400} popinText="Actual Price" demandPopin>
                                        <Label>Actual Price</Label>
                                    </TableColumn>
                                    <TableColumn minWidth={600}>
                                        <Label>Discount</Label>
                                    </TableColumn>
                                    <TableColumn minWidth={400} popinText="DiscountPrice" demandPopin>
                                        <Label>DiscountPrice</Label>
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
                                    <Label>KG</Label>
                                </TableCell>
                                <TableCell>
                                    <Label>200</Label>
                                </TableCell>
                                <TableCell>
                                    <Label>10</Label>
                                </TableCell>
                                <TableCell>
                                    <Label>180</Label>
                                </TableCell>
                                <TableCell>
                                    <ObjectStatus state={ValueState.Success}> Active</ObjectStatus>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </ObjectPageSection>
                    <ObjectPageSection title="Images" id="4">
                        <Button id="openPopoverButton" design={ButtonDesign.Emphasized} disabled={EditSaveButton === "Edit" ? true : false}
                            style={{ ...spacing.sapUiContentPadding, ...spacing.sapUiForceWidthAuto, ...spacing.sapUiSmallMarginBottom }}
                            icon="upload"
                            onClick={(e) => {
                                ImageUploadpopoverRef.current.open(e.target);
                                // document.getElementById("imageupload-popover").openBy(document.getElementById("openPopoverButton"))
                            }}>
                            Upload New Image
                        </Button>
                        {/* <ui5-button id="openPopoverButton" design="Emphasized" disabled={false}
                            style={{ ...spacing.sapUiContentPadding, ...spacing.sapUiForceWidthAuto, ...spacing.sapUiSmallMarginBottom }}
                            onClick={(e) => {
                                ImageUploadpopoverRef.current.open(e.target);
                                // document.getElementById("imageupload-popover").openBy(document.getElementById("openPopoverButton"))
                            }
                            }
                        >

                            Upload New Image</ui5-button> */}
                        <FlexBox
                            // style={{ width: '100%', height: '100vh' }}
                            // direction={FlexBoxDirection.Column}
                            direction={FlexBoxDirection.Row}
                            justifyContent={FlexBoxJustifyContent.SpaceAround}
                            wrap={FlexBoxWrap.Wrap}
                            alignItems={FlexBoxAlignItems.Center}

                        >
                            <div class="fd-tile">
                                <div class="fd-tile__content" style={{ backgroundColor: "#cce0ff" }}>
                                    <Avatar
                                        backgroundColor={AvatarBackgroundColor.Accent6}
                                        initials={"i"}
                                        shape={AvatarShape.Square}
                                        size={AvatarSize.XL}
                                        image="https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"
                                    />
                                </div>
                                <div class="fd-tile__actions">
                                    <div class="fd-popover fd-popover--right">
                                        <div class="fd-popover__control">
                                            <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id="1"
                                                aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById("1"))}></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="fd-tile">
                                <div class="fd-tile__content">
                                    <Avatar
                                        backgroundColor={AvatarBackgroundColor.Accent6}
                                        initials={"i"}
                                        shape={AvatarShape.Square}
                                        size={AvatarSize.XL}
                                        image="https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"
                                    />
                                </div>
                                <div class="fd-tile__actions">
                                    <div class="fd-popover fd-popover--right">
                                        <div class="fd-popover__control">
                                            <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id="2"
                                                aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById("2"))}></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="fd-tile">
                                <div class="fd-tile__content">
                                    <Avatar
                                        backgroundColor={AvatarBackgroundColor.Accent6}
                                        initials={"i"}
                                        shape={AvatarShape.Square}
                                        size={AvatarSize.XL}
                                        image="https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"
                                    />
                                </div>
                                <div class="fd-tile__actions">
                                    <div class="fd-popover fd-popover--right">
                                        <div class="fd-popover__control">
                                            <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id="3"
                                                aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById("3"))}></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="fd-tile">
                                <div class="fd-tile__content">
                                    <Avatar
                                        backgroundColor={AvatarBackgroundColor.Accent6}
                                        initials={"i"}
                                        shape={AvatarShape.Square}
                                        size={AvatarSize.XL}
                                        image="https://res.cloudinary.com/dsywyhhdl/image/upload/v1590764351/boost_uhyhgi.jpg"
                                    />
                                </div>
                                <div class="fd-tile__actions">
                                    <div class="fd-popover fd-popover--right">
                                        <div class="fd-popover__control">
                                            <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id="4"
                                                aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById("4"))}></button>
                                        </div>

                                    </div>
                                </div>
                            </div>



                        </FlexBox>

                    </ObjectPageSection>
                </ObjectPage>
            </div>
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
            <ui5-popover id="imageupload-popover" header-text="Add new Images">
                <div class="popover-content" style={{ ...spacing.sapUiForceWidthAuto }}>
                    <FileUploader
                        accept="image"
                        multiple={true}
                        // name={"add new Image"}
                        placeholder={"click to upload"}
                        onChange={onImageUpload}
                    >
                        <ui5-button icon="upload">Upload Images</ui5-button>
                    </FileUploader>
                    {/* <div id="result" style={{ ...spacing.sapUiContentPadding }} /> */}
                </div>
                <div slot="footer" class="popover-footer">
                    <div style={{ flex: 1 }}></div>
                    <ui5-button id="closePopoverButton" design="Emphasized">Save</ui5-button>
                </div>
            </ui5-popover>
        </main >

    );
}

export default ObjectForm;