import React, { Component }             from "react";
import UniversityComponent              from "./screens/university/university.component";
import { Provider }                     from "react-redux";
import { applyMiddleware, createStore } from "redux";
import app                              from "./reducer";
import thunk                            from "redux-thunk";
import "./styles/main.scss";

const middleware = applyMiddleware(thunk);
const store = createStore(app, middleware);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <UniversityComponent/>
            </Provider>
        );
    }
}

export default App;
