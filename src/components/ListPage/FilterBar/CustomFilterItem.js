import React from 'react';
import {
    ComboBox,
    ComboBoxItem,
    MultiComboBox,
    MultiComboBoxItem,
    Input,
    FilterItem,
    FilterType
} from '@ui5/webcomponents-react';

export default function CustomFilterItem(props) {

    // if(props.filterProps === undefined) {
    //     return(<> </>);
    // }else {
    //     props.filterProps.map(filter => {
    //         const label = filter.label;
    // const component = props.component;
    // const suggestion = props.suggestion;
    // const field = props.field;
    //     })
    // }
    const label = props.label;
    const component = props.component;
    const suggestion = props.suggestion === undefined ? [] : props.suggestion;
    const field = props.field;

    switch (component) {
        case "MultiComboBox":
            return (
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                >
                    <MultiComboBox
                        allowCustomValues={true}
                        id={field}
                        onSelectionChange={props.onFilterChange
                        }
                    >
                        {
                            suggestion.map(suggestion => (
                                <MultiComboBoxItem id={suggestion.key} text={suggestion.value} />
                            ))
                        }
                    </MultiComboBox>
                </FilterItem >

            );
        case "ComboBox":
            return (
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                >
                    <ComboBox
                        allowCustomValues={true}
                        id={field}
                        onChange={props.onFilterChange
                        }
                    >
                        {
                            suggestion.map(suggestion => (
                                <ComboBoxItem id={suggestion.key} text={suggestion.value} />
                            ))
                        }
                    </ComboBox>
                </FilterItem>
            );
        case "Input":
            return (
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                >
                    <Input id={field}
                        showSuggestions={false}
                        onChange={props.onFilterChange}
                    >
                    </Input>
                </FilterItem>

            );
        default:
            return (<></>);
    }
}