import { ADD_NOTE,DELETE_NOTE, UPDATE_SEARCH } from "../actions/actions";

const initialState = {
    notes:[],
    search:'',
}

export function rootReducer(state = initialState,action ){
    switch(action.type){
        case ADD_NOTE:
            return {
                ...state,
                notes :[
                    ...state.notes,
                    {
                        id : action.id,
                        title : action.title,
                        content : action.content
                    }
                ]
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes:[
                    ...state.notes.filter(note => note.id != action.id)
                ]
            }    
        case UPDATE_SEARCH:
            return{
                ...state,
                search : action.value
            }
        default:
            return state
    } 
}