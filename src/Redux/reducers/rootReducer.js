import {combineReducers} from "redux";
import {categoriesReducer} from "./categories";
import {resourcesReducer} from "./resources";
import {categoryAttributesReducer} from "./categoryAttributes";
import {unitsReducer} from "./units";
import {resourceAttributesReducer} from './resourceAttributes'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    categoryAttributes: categoryAttributesReducer,
    resources: resourcesReducer,
    resourceAttributes: resourceAttributesReducer,
    units: unitsReducer,
})

export default rootReducer