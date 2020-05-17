import { combineReducers } from "redux";
import universityReducer   from "./screens/university/university.reducer";

const app = combineReducers(
    {
        university: universityReducer
    }
);

export default app;