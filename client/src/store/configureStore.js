import { createStore, combineReducers } from "redux";
import playgame from './reducer/playgame'



const rootReducer = combineReducers({
    playgame: playgame,
});


const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;