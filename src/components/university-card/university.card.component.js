import React, { PureComponent } from "react";
import "./university.card.style.scss";
import API                      from "../../libs/client";
import { Utils }                from "../../libs/utils";
import Spinner                  from "reactstrap/es/Spinner";


class UniversityCardComponent extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            fetchingData: true,
            data        : null
        };
    }
    
    componentDidMount() {
        const { details } = this.props;
        API.get(`/scrap?url=${ details.web_page }`).then(({ data }) => {
            const state = { fetchingData: false };
            const keys = Object.keys(data);
            if ( keys && keys.length > 0 ) {
                state["data"] = data;
            }
            console.log(data);
            this.setState(state);
        }).catch(() => {
            this.setState({ fetchingData: false });
        });
    }
    
    getImageUrl = () => {
        const { details } = this.props;
        if ( this.state.fetchingData ) {
            return require("./../../images/university-default.png");
        }
        const { data } = this.state;
        if ( data && data.ogImage ) {
            let url = "";
            if ( Array.isArray(data.ogImage) ) {
                if ( data.ogImage.length > 0 ) {
                    url = data.ogImage[0]?.url;
                } else {
                    return require("./../../images/university-default.jpg");
                }
            } else {
                url = data.ogImage.url;
            }
            if ( url ) {
                if ( Utils.isValidURL(url) ) {
                    return url;
                } else {
                    return details.web_page + url;
                }
            } else {
                return require("./../../images/university-default.jpg");
            }
        } else {
            return require("./../../images/university-default.jpg");
        }
    };
    
    renderImageLoader() {
        if ( this.state.fetchingData ) {
            return <div className="university-card-image-loader"><Spinner/></div>;
        }
        return null;
    }
    
    render() {
        const { details } = this.props;
        return (
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 pt-4 pb-4 pl-5 pr-5">
                <div className="university-card-layout">
                    <img alt={ details.name } className="university-card-image"
                         src={ this.getImageUrl() }/>
                    { this.renderImageLoader() }
                    <div className="university-card-details">
                        <div className="flex-grow-1">
                            <div className="university-card-details-name">
                                { details.name }
                            </div>
                            <div className="university-card-details-country">
                                Country: { details.country }
                            </div>
                        </div>
                        <div>
                            <a className="btn btn-sm btn-primary university-card-details-button"
                               target='_blank'
                               rel="noopener noreferrer"
                               href={ details.web_page }>
                                View
                            </a>
                        </div>
                    </div>
                    <div className="university-card-details-description">
                        Description: { this.state.data?.ogDescription || "" }
                    </div>
                </div>
            </div>
        );
    }
}

export default UniversityCardComponent;