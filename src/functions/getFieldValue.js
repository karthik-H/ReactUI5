
export default function getFieldValue(e) {
    const component = e.target.nodeName;
    switch (component) {
        case "UI5-MULTI-COMBOBOX":
            const multivalue = e.detail.items.map(item => item.id);
            if (multivalue.length <= 0) {
                return ("");
            } else {
                return (multivalue);
            }
        case "UI5-COMBOBOX":
            const value = e.target.value;
            const filteredItem = e.target.items.filter(item => item.text === value);
            if (filteredItem.length > 0) {
                return (filteredItem[0].id);
            } else {
                return ("");
            }
            break;
        case "UI5-INPUT":
            return (e.target.value);

        case "UI5-DATERANGE-PICKER":
            return ({
                "firstValue": e.target.firstDateValue,
                "lastValue": e.target.lastDateValue
            });
        default:
            break;
    }
}