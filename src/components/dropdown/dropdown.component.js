import React, { Component } from "react";
import Select               from "react-select";
import { colourStyles }     from "./dropdown.constant";

class DropdownComponent extends Component {
    
    createOptionData = (option) => {
        return option.map(option => {
            return {
                value: option,
                label: option
            };
        });
        
    };
    onChange = (data, dropdown) => {
        this.props.onChange(dropdown.name, data);
    };
    
    render() {
        const { options, label, id } = this.props;
        return (
            <div>
                <Select options={ this.createOptionData(options) }
                        styles={ colourStyles }
                        placeholder={ label }
                        name={ id }
                        value={ this.props.value }
                        onChange={ this.onChange }
                        isClearable={ true }
                        isSearchable={ true }/>
            </div>
        );
    }
}

export default DropdownComponent;