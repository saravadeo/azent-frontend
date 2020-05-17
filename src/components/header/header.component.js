import React, { Component } from "react";
import "./header.style.scss";
import DropdownComponent    from "../dropdown/dropdown.component";

class HeaderComponent extends Component {
    
    
    onClearFilter = () => {
        this.props.onClearFilter();
    };
    
    onSearchClick = () => {
        this.props.onSearchClick();
    };
    
    onKeyPress = (target) => {
        if ( target.charCode === 13 ) {
            this.props.onSearchClick();
        }
    };
    
    renderActionButtons() {
        return (
            <div className="ml-5 header-search-button-div">
                <button className="ml-3 btn btn-primary header-search-button" onClick={ this.onSearchClick }>
                    Search
                </button>
                <button className="btn btn-primary header-search-button ml-3" onClick={ this.onClearFilter }>
                    Clear
                </button>
            </div>
        );
    }
    
    onChange = (event) => {
        this.props.updateValue(event.target.id, event.target.value);
    };
    
    renderSearchInput() {
        return (
            <div className="flex-grow-1 header-mobile-margin">
                <span className="fa fa-search header-search-icon"/>
                <input className="header-search-input" placeholder="Search by university name"
                       id='searchTerm'
                       onKeyPress={ this.onKeyPress }
                       onChange={ this.onChange }
                       value={ this.props.data.searchTerm }/>
            </div>
        );
    }
    
    render() {
        const { domainExtensions, countryCodes } = this.props;
        return (
            <div className='header'>
                <div className="header-img-div">
                    <img alt='UNI LOGO' className='header-img' src={ require("./../../images/uni.png") }/>
                </div>
                { this.renderSearchInput() }
                <div className="flex-grow-1 header-mobile-margin">
                    <DropdownComponent options={ domainExtensions } label={ "Select domain" }
                                       id={ "domain" }
                                       value={ this.props.data.domain }
                                       onChange={ this.props.updateValue }/>
                </div>
                <div className="flex-grow-1 header-mobile-margin">
                    <DropdownComponent options={ countryCodes } label={ "Select country" } id={ "country" }
                                       value={ this.props.data.country }
                                       onChange={ this.props.updateValue }/>
                </div>
                { this.renderActionButtons() }
            </div>
        );
    }
}

export default HeaderComponent;