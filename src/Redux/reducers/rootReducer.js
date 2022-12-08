import {combineReducers} from "redux";
import {categoriesReducer} from "./categories";
import {resourcesReducer} from "./resources";
import {categoryAttributesReducer} from "./categoryAttributes";
import {unitsReducer} from "./units";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    categoryAttributes: categoryAttributesReducer,
    resources: resourcesReducer,
    units: unitsReducer,
})

export default rootReducer