import moment from 'moment';

export default function getFilterValuegetFilterValue(e) {
    const component = e.target.nodeName;
    switch (component) {
        case "UI5-MULTI-COMBOBOX":
            const multivalue = e.detail.items.map(item => item.id);
            if (multivalue.length <= 0) {
                return ({});
            } else {
                return ({
                    "operend": multivalue,
                    "operator": "eq"
                });
            }
        case "UI5-COMBOBOX":
            const value = e.target.value;
            const filteredItem = e.target.items.filter(item => item.text === value);
            if (filteredItem.length > 0) {
                return ({
                    "operend": filteredItem[0].id,
                    "operator": "eq"
                });
            } else {
                return ({});
            }
            break;
        case "UI5-INPUT":
            return ({
                "operend": e.target.value,
                "operator": "eq"
            });

        case "UI5-DATERANGE-PICKER":
            return ([{
                "operend": formatDate(e.target.firstDateValue),
                "operator": "ge"
            }, {
                "operend": formatDate(e.target.lastDateValue),
                "operator": "le"
            }]);
        default:
            break;
    }
}

const formatDate = (date) => {
    return (moment(date).format('YYYY-MM-DD[T00:00:00.000Z]'));
}