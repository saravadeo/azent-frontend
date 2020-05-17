import { UNIVERSITY_DATA_FETCHED, UNIVERSITY_META_DATA_FETCHED } from "./university.constant";

const defaultState = {
    universityList      : null,
    pageNumber          : 1,
    pageSize            : 9,
    totalUniversityCount: 0,
    domainExtensions    : null,
    countryCodes        : null
};

export default function(state = defaultState, action) {
    switch ( action.type ) {
        case UNIVERSITY_META_DATA_FETCHED:
            return Object.assign({}, state, {
                domainExtensions: action.data.domainExtensions,
                countryCodes    : action.data.countryCodes
            });
        case UNIVERSITY_DATA_FETCHED:
            return Object.assign({}, state, {
                universityList      : action.data.universities,
                totalUniversityCount: action.data.totalCount,
                pageNumber          : action.data.pageNumber
            });
        default:
            return state;
    }
}
