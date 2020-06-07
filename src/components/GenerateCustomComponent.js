import React from 'react';
import {
    Label,
    Avatar,
    AvatarShape,
    ObjectStatus
} from '@ui5/webcomponents-react'

export default function GenerateCustomComponent(props) {
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
        default:
            return (
                <Label wrap={true}>{value}</Label>
            );
    }
}