import React from 'react';
import {
    Button,
    ButtonDesign,
    Title,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    Avatar,
    AvatarBackgroundColor,
    AvatarShape,
    AvatarSize,
    Loader,
    LoaderType,
    ResponsivePopover,
    PopoverHorizontalAlign,
    PlacementType,
    PopoverVerticalAlign,
    FileUploader
} from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
export default function CustomImageHolder(props) {
    debugger;
    const EditSaveButton = props.editStatus;
    const ImageUploadpopoverRef = props.imageUploadpopoverRef;
    const entity = props.entity;
    let enableBusyIndicator = props.enableBusyIndicator;
    let count = 0;
    const multiple = props.property === undefined ?
        false :
        props.property.multiple === undefined ? false : props.property.multiple;
    if (enableBusyIndicator) {
        return (
            <div>
                <FlexBox
                    alignItems={FlexBoxAlignItems.Center}
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceAround}
                    wrap={FlexBoxWrap.Wrap}
                >
                    {/* <Loader
                        type={LoaderType.Indeterminate}
                        progress={'40%'}
                    /> */}
                    <Title>
                        Uploading Images, Please Wait...
                    </Title>
                </FlexBox>
            </div>
        )
    } else {
        return (
            <div>
                <Button id="openPopoverButton" design={ButtonDesign.Emphasized}
                    style={{ ...spacing.sapUiForceWidthAuto, ...spacing.sapUiSmallMarginBottom }}
                    icon="upload"
                    onClick={(e) => {
                        ImageUploadpopoverRef.current.open(e.target);
                        // document.getElementById("imageupload-popover").openBy(document.getElementById("openPopoverButton"))
                    }}
                >
                    Upload New Image
                            </Button>
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceAround}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Center}

                >
                    {
                        entity === null || entity === undefined ?
                            <></> :
                            multiple === false ?
                                (
                                    <div class="fd-tile">
                                        <div class="fd-tile__content"
                                        // style={{ backgroundColor: "#cce0ff" }}
                                        >
                                            <Avatar
                                                backgroundColor={AvatarBackgroundColor.Accent6}
                                                initials={"i"}
                                                shape={AvatarShape.Square}
                                                size={AvatarSize.XL}
                                                image={entity}
                                            />
                                        </div>
                                        <div class="fd-tile__actions">
                                            <div class="fd-popover fd-popover--right">
                                                <div class="fd-popover__control">
                                                    <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id={entity}
                                                        _type={props.field} aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById(entity))}></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                entity.map(image => (
                                    <div class="fd-tile">
                                        <div class="fd-tile__content"
                                        // style={{ backgroundColor: "#cce0ff" }}
                                        >
                                            <Avatar
                                                backgroundColor={AvatarBackgroundColor.Accent6}
                                                initials={"i"}
                                                shape={AvatarShape.Square}
                                                size={AvatarSize.XL}
                                                image={image}
                                            />
                                        </div>
                                        <div class="fd-tile__actions">
                                            <div class="fd-popover fd-popover--right">
                                                <div class="fd-popover__control">
                                                    <button class="fd-button fd-button--transparent sap-icon--overflow" aria-label="More" aria-expanded="false" id={image}
                                                        _type={props.field} aria-controls="WQIDD179" aria-haspopup="true" onClick={() => document.getElementById("hello-popover").openBy(document.getElementById(image))}></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                    }

                    {/* <div class="fd-tile">
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
                    </div> */}
                </FlexBox>
                <ResponsivePopover
                    ref={ImageUploadpopoverRef}
                    allowTargetOverlap={true}
                    headerText={"Add new images"}
                    horizontalAlign={PopoverHorizontalAlign.Right}
                    placementType={PlacementType, PlacementType.Right}
                    verticalAlign={PopoverVerticalAlign.Top}
                    header={
                        <FileUploader
                            id="fileUploder-id"
                            accept="image"
                            multiple={multiple}
                            // name={"add new Image"}
                            placeholder={"click to upload"}
                            onChange={props.onImageUpload}
                        >

                        </FileUploader>
                    }
                // footer={
                //     <div
                //         id={props.field}
                //         style={{
                //             display: 'flex',
                //             justifyContent: 'flex-end',
                //             alignItems: 'center',
                //             width: 'calc(100% - 1rem)',
                //             height: '2.5rem'
                //         }}
                //     >
                //         <Button id="closeImageUploader" design={ButtonDesign.Default} onClick={(e) => ImageUploadpopoverRef.current.close()}>Close</Button>
                //         <Button id="saveImageUploader" design={ButtonDesign.Emphasized} onClick={props.onImageSave}>Save</Button>
                //     </div>
                // }
                >
                    <div id="result" style={{ ...spacing.sapUiContentPadding }} />
                    <div
                        id={props.field}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: 'calc(100% - 1rem)',
                            height: '2.5rem'
                        }}
                    >
                        <Button id="closeImageUploader" design={ButtonDesign.Default} onClick={(e) => ImageUploadpopoverRef.current.close()}>Close</Button>
                        <Button id="saveImageUploader" design={ButtonDesign.Emphasized} onClick={props.onImageSave}>Save</Button>
                    </div>
                </ResponsivePopover>
            </div>
        );
    }
}