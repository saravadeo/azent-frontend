import React, { Component }                 from "react";
import { connect }                          from "react-redux";
import { fetchMetaData, fetchUniversities } from "./university.action";
import UniversityCardComponent              from "../../components/university-card/university.card.component";
import PaginationComponent                  from "../../components/pagination/pagination.component";
import HeaderComponent                      from "../../components/header/header.component";

class UniversityComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            domain    : null,
            country   : null
        };
    }
    
    componentDidMount() {
        this.props.fetchMetaData();
        this.fetchUniversities(this.props.pageNumber, this.props.pageSize, null);
    }
    
    renderUniversityList() {
        const { universityList } = this.props;
        if ( !universityList ) {
            return null;
        }
        return universityList.map(university => {
            return <UniversityCardComponent key={ university.university_id } details={ university }/>;
        });
    }
    
    fetchUniversities = (pageNumber, pageSize, queryParam) => {
        this.props.fetchUniversities(pageNumber, pageSize, queryParam);
    };
    
    onClearFilter = () => {
        this.setState(
            {
                searchTerm: "",
                domain    : null,
                country   : null
            }
        );
        this.props.fetchUniversities(1, this.props.pageSize, null);
    };
    
    updateValue = (id, value) => {
        this.setState({ [id]: value });
    };
    
    getQueryParams = () => {
        let queryParam = "";
        Object.keys(this.state).forEach(key => {
            if ( this.state[key] ) {
                switch ( key ) {
                    case "searchTerm":
                        queryParam = queryParam + `&name=${ this.state[key] }`;
                        break;
                    case "domain":
                        queryParam = queryParam + `&domain=${ this.state[key].value }`;
                        break;
                    case "country":
                        queryParam = queryParam + `&countryCode=${ this.state[key].value }`;
                        break;
                    default:
                        break;
                }
            }
        });
        return queryParam;
    };
    
    onSearchClick = () => {
        const queryParam = this.getQueryParams();
        if ( queryParam ) {
            this.fetchUniversities(1, this.props.pageSize, queryParam);
        }
    };
    
    renderHeaderComponent() {
        const { domainExtensions, countryCodes } = this.props;
        if ( !domainExtensions || !countryCodes ) {
            return null;
        }
        return (
            <HeaderComponent data={ this.state }
                             onSearchClick={ this.onSearchClick }
                             onClearFilter={ this.onClearFilter }
                             domainExtensions={ domainExtensions }
                             countryCodes={ countryCodes }
                             updateValue={ this.updateValue }/>
        );
    }
    
    onPageChangeFetchData = (pageNumber, pageSize) => {
        this.fetchUniversities(pageNumber, pageSize, this.getQueryParams());
    };
    
    render() {
        return (
            <div>
                { this.renderHeaderComponent() }
                <div className="d-flex justify-content-center">
                    <div className="container m-2">
                        <div className="row">
                            { this.renderUniversityList() }
                        </div>
                        <PaginationComponent totalRecords={ this.props.totalUniversityCount }
                                             showPages={ 7 }
                                             numberOfRecordPerPage={ this.props.pageSize }
                                             currentPage={ this.props.pageNumber }
                                             fetchData={ this.onPageChangeFetchData }/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        universityList      : state.university.universityList,
        pageNumber          : state.university.pageNumber,
        pageSize            : state.university.pageSize,
        totalUniversityCount: state.university.totalUniversityCount,
        domainExtensions    : state.university.domainExtensions,
        countryCodes        : state.university.countryCodes
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMetaData    : () => dispatch(fetchMetaData()),
        fetchUniversities: (pageNumber, pageSize, queryParam) => dispatch(fetchUniversities(pageNumber, pageSize, queryParam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UniversityComponent);
