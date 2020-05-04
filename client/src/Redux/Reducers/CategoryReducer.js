
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    categories: [],

}

const categoriesReducer = (state = initialState, action) => {

    switch (action.type){

        case (actionTypes.GET_CATEGORIES):
            return {
                ...state,
                categories: action.payload.data.categories
            }

        case (actionTypes.ADD_CATEGORY):
            const updatedCategories = [...state.categories, action.payload.data.category]
            return {
                ...state,
                categories: updatedCategories
                
            }

        case (actionTypes.DELETE_CATEGORY):
            const updatedCat = [...state.categories].filter(elem => elem._id !== action.payload);
            return {
                ...state,
                categories: updatedCat
            }


        default:
            return state
    }
}

export default categoriesReducer;