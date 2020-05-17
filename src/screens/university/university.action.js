import API                                                       from "../../libs/client";
import { UNIVERSITY_DATA_FETCHED, UNIVERSITY_META_DATA_FETCHED } from "./university.constant";
import Swal                                                      from "sweetalert2";

export const fetchMetaData = () => {
    return (dispatch) => {
        return Promise.all([
                               API.get("/university/domain-extensions"),
                               API.get("/university/country-codes")
                           ]
        ).then((result) => {
                   dispatch(
                       {
                           type: UNIVERSITY_META_DATA_FETCHED,
                           data: {
                               domainExtensions: result[0].data?.domainExtensions.map(ext => ext._id),
                               countryCodes    : result[1].data?.countryCodes
                           }
                       }
                   );
            
               }
        ).catch(error => {
            dispatch(
                {
                    type: UNIVERSITY_META_DATA_FETCHED,
                    data: {
                        domainExtensions: [],
                        countryCodes    : []
                    }
                }
            );
        });
    };
};

export const fetchUniversities = (pageNumber, pageSize, queryParam) => {
    return (dispatch) => {
        let url = `/university?pageNumber=${ pageNumber }&pageSize=${ pageSize }`;
        if ( queryParam ) {
            url = url + queryParam;
        }
        Swal.showLoading();
        return API.get(url).then(({ data }) => {
            Swal.close();
            dispatch(
                {
                    type: UNIVERSITY_DATA_FETCHED,
                    data: {
                        universities: data.universities,
                        totalCount  : data.totalCount,
                        pageNumber  : pageNumber
                    }
                }
            );
        }).catch(() => {
            Swal.close();
        });
    };
};