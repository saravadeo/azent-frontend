import React, { Component }                           from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./pagination.style.scss";

class PaginationComponent extends Component {
    
    
    renderPageItem(start, end, currentPage, numberOfRecordPerPage) {
        const pageButton = [];
        for ( let i = start; i <= end; i++ ) {
            pageButton.push(
                <PaginationItem key={ i } active={ currentPage === i }>
                    { currentPage === i ? (
                        <PaginationLink tag="button">
                            { i }
                        </PaginationLink>
                    ) : (
                          <PaginationLink tag="button"
                                          onClick={ this.props.fetchData.bind(this, i, numberOfRecordPerPage) }>
                              { i }
                          </PaginationLink>
                      ) }
                </PaginationItem>
            );
        }
        return pageButton;
    }
    
    render() {
        const { totalRecords, numberOfRecordPerPage, currentPage, showPages } = this.props;
        if ( !totalRecords ) {
            return null;
        }
        const pages = Math.ceil(totalRecords / numberOfRecordPerPage);
        
        let start = 0;
        let end = 0;
        let showPage = showPages || 5;
        if ( pages <= showPage ) {
            start = 1;
            end = pages;
        } else {
            if ( currentPage > (showPage / 2) ) {
                start = currentPage - 3;
                if ( (currentPage + 2) > pages ) {
                    start = pages - 4;
                    end = pages;
                } else {
                    end = currentPage + 3;
                }
            } else {
                start = 1;
                end = showPage;
            }
        }
        
        return (
            <Pagination className="pagination-wrapper m-0 pagination-az">
                <PaginationItem disabled={ currentPage <= 1 }>
                    <PaginationLink first tag="button"
                                    onClick={ this.props.fetchData.bind(this, 1, numberOfRecordPerPage) }/>
                </PaginationItem>
                <PaginationItem disabled={ currentPage <= 1 }>
                    <PaginationLink previous tag="button"
                                    onClick={ this.props.fetchData.bind(this, (currentPage - 1), numberOfRecordPerPage) }/>
                </PaginationItem>
                { this.renderPageItem(start, end, currentPage, numberOfRecordPerPage) }
                <PaginationItem disabled={ currentPage >= pages }>
                    <PaginationLink next tag="button"
                                    onClick={ this.props.fetchData.bind(this, (currentPage + 1), numberOfRecordPerPage) }/>
                </PaginationItem>
                <PaginationItem disabled={ currentPage >= pages }>
                    <PaginationLink last tag="button"
                                    onClick={ this.props.fetchData.bind(this, pages, numberOfRecordPerPage) }/>
                </PaginationItem>
            </Pagination>
        );
    }
}

export default PaginationComponent;