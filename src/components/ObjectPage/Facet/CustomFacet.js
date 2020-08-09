import React, { useState } from 'react';

import {
    Label,
    Text,
    Input,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxDirection,
    FlexBoxWrap,
    FlexBoxAlignItems,
    ObjectPageSection
} from '@ui5/webcomponents-react';
import { spacing, useConsolidatedRef } from '@ui5/webcomponents-react-base';
import ItemList from '../../ListPage/item-list.js';
import CustomImageHolder from './CustomImageHolder.js';
import CustomFieldItem from '../../CustomFieldItem.js';

export default function CustomFacet(props) {
    const fields = props.field;
    const editStatus = props.editStatus;
    const association = props.association;
    const type = props.type;
    const parentId = Object.keys(props.entity).length <= 0 ? "" : props.entity["id"]
    const property = association === undefined ?
        props.property :
        props.property[association];
    const entity = props.entity === undefined || Object.keys(props.entity).length <= 0 ?
        [] :
        association === undefined ?
            props.entity :
            props.entity[association];

    const suggestion = props.suggestion;
    const imageUploadpopoverRef = props.imageUploadpopoverRef;
    if (property === undefined || Object.keys(property).length < 1) {
        return (
            <></>
        );
    } else {
        switch (type) {
            case "fieldGroup":
                return (<FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceAround}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Center}

                >
                    {
                        fields.map(field => (

                            <div style={{ ...spacing.sapUiContentPadding }}>
                                {
                                    (editStatus === "Edit") ?
                                        <Label
                                        // required={property[field].key === undefined ?
                                        //     false :
                                        //     property[field].key}
                                        >{
                                                property[field].label}</Label>
                                        :
                                        <></>
                                }

                                <div>
                                    {
                                        editStatus === "Edit" ?
                                            (<Text >{entity === null || entity === undefined ? "" :
                                                entity[property[field].textAssociation === undefined ?
                                                    field :
                                                    property[field].textAssociation]}</Text>) :
                                            property[field].readOnly === undefined ?
                                                (<CustomFieldItem
                                                    label={property[field].label === undefined ? field : property[field].label}
                                                    component={property[field].editComponent}
                                                    suggestion={suggestion === undefined ?
                                                        {} :
                                                        props.suggestion[property[field].suggestion]}
                                                    field={association === undefined ? field : `${association}.${field}`}
                                                    value={entity === null || entity === undefined ? "" : entity[field]}
                                                    onFilterChange={props.onInputChange}
                                                />)
                                                // (<Input value={entity[field]} />) 
                                                :
                                                (
                                                    <>
                                                        <div>
                                                            <Label >{property[field].label === undefined ? field : property[field].label}</Label>
                                                        </div>
                                                        <Text label={"a"}>{entity === null || entity === undefined ? "" :
                                                            entity[property[field].textAssociation === undefined ?
                                                                field :
                                                                property[field].textAssociation]}</Text>
                                                    </>
                                                )
                                        // property[field].key

                                    }
                                </div>
                            </div>
                        ))
                    }
                </FlexBox>
                );
            case "lineItem":
                const data = {};
                data["property"] = property
                data["data"] = entity
                console.log("data", data)
                return (
                    <ItemList parentId={parentId}
                        data={entity === undefined ? [] : entity}
                        context="itemAvailability" />
                );
            case "imageLinks":
                return (
                    <CustomImageHolder
                        entity={entity}
                        editStatus={editStatus}
                        field={association}
                        property={property}
                        onImageSave={props.onImageSave}
                        onImageUpload={props.onImageUpload}
                        imageUploadpopoverRef={imageUploadpopoverRef}
                        enableBusyIndicator={props.enableBusyIndicator}
                    />
                );
            default:
                return (
                    <></>
                );
        }
    }

}