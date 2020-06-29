
export default function getFieldValue(e) {
    const component = e.target.nodeName;
    switch (component) {
        case "UI5-MULTI-COMBOBOX":
            return (e.detail.items.map(item => item.id));
        case "UI5-COMBOBOX":
            const value = e.target.value;
            const filteredItem = e.target.items.filter(item => item.text === value);
            if (filteredItem.length > 0) {
                return (filteredItem[0].id);
            }
            break;
        case "UI5-INPUT":
            return (e.target.value);
        default:
            break;
    }
}