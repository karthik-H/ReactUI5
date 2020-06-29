import React from 'react';

import {
    Button,
    ButtonDesign,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    Avatar,
    AvatarBackgroundColor,
    AvatarShape,
    AvatarSize
} from '@ui5/webcomponents-react';
import { spacing } from '@ui5/webcomponents-react-base';
export default function CustomImageHolder(props) {
    const EditSaveButton = props.editStatus;
    const ImageUploadpopoverRef = props.imageUploadpopoverRef;
    return (
        <div>
            <Button id="openPopoverButton" design={ButtonDesign.Emphasized} disabled={EditSaveButton === "Edit" ? true : false}
                style={{ ...spacing.sapUiContentPadding, ...spacing.sapUiForceWidthAuto, ...spacing.sapUiSmallMarginBottom }}
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
            </FlexBox>
        </div>
    );
}