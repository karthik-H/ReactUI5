import React, { useState } from 'react';
import {
    Button,
    ButtonDesign
} from '@ui5/webcomponents-react'

export default function CustomAvailabilityAction(props) {
    let [AvailableButton, setAvailableButton] = useState("Mark as unavailable");
    const onHeaderAction1Pressed = () => {
        setAvailableButton(AvailableButton === "Mark as unavailable" ? "Mark as available" : "Mark as unavailable");
    }
    return (
        <Button class="fd-button fd-button--emphasized fd-button--compact"
            key="1" design={AvailableButton === "Mark as unavailable" ? ButtonDesign.Negative : ButtonDesign.Positive} onClick={onHeaderAction1Pressed}>
            {AvailableButton}
        </Button>
    );
}