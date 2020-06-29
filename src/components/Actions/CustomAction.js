import React, { useState } from 'react';
// import {
//     Button,
//     ButtonDesign
// } from '@ui5/webcomponents-react'

import CustomAvailabilityAction from './CustomAvailabilityAction.js'
export default function CustomAction(props) {
    // let [AvailableButton, setAvailableButton] = useState("Mark as unavailable");
    // const onHeaderAction1Pressed = () => {
    //     setAvailableButton(AvailableButton === "Mark as unavailable" ? "Mark as available" : "Mark as unavailable");
    // }
    const actionType = props.actionProp.type;
    switch (actionType) {
        case "CustomAvailabilityAction":
            return (
                <CustomAvailabilityAction actionUrl={props.actionProp.url} />
            );
        default:
            break;
    }
    // return (
    //     // <Button class="fd-button fd-button--emphasized fd-button--compact"
    //     //     key="1" design={AvailableButton === "Mark as unavailable" ? ButtonDesign.Negative : ButtonDesign.Positive} onClick={onHeaderAction1Pressed}>
    //     //     {AvailableButton}
    //     // </Button>
    // );
}