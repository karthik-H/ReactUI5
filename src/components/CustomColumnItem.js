import React from 'react';
import {
    Label,
    Avatar,
    AvatarShape,
    ObjectStatus,
    Text
} from '@ui5/webcomponents-react'

export default function CustomColumnItem(props) {
    const value = props.value;
    switch (props.property.component) {
        case "Avatar":
            return (
                <Avatar
                    shape={AvatarShape.Square}
                    image={value}
                />
            );
        case "ObjectStatus":
            return (
                <ObjectStatus state={props.criticality}> {value}</ObjectStatus>
            );
        case "Text":
            return (
                <Text wrap={true}>{value}</Text>
            );
        default:
            return (
                <Label wrap={true}>{value}</Label>
            );
    }
}