import {combineReducers} from 'redux'
import actionType from './actionType.js';

const login = (state = {
    username: 'user',
}, action)=>{
    switch (action.type) {
        case actionType.LOGIN:
            state = Object.assign({}, state, {
                username: action.username,
                type: action.type,
            });
            return state;
        
        default:
            return state
    }
}

const points = (state = {
    pointsList: [],
    pointsAllList: [],
    pointAddSuccess: false,
    pointUpdateSuccess: false,
}, action) => {
    switch (action.type) {
        case actionType.GET_POINTS:
            state = Object.assign({}, state, {
                pointsList: action.pointsList,
                totalPointsCount: action.totalPointsCount,
            });
            return state;
        case actionType.GET_ALL_POINTS:
            state = Object.assign({}, state, {
                pointsAllList: action.pointsAllList,
            });
            return state;
        case actionType.ADD_POINT:
            state = Object.assign({}, state, {
                pointAddSuccess: action.pointAddSuccess,
            });
            return state;
        case actionType.UPDATE_POINT:
            state = Object.assign({}, state, {
                pointUpdateSuccess: action.pointUpdateSuccess,
            });
            return state;
        default:
            return state;
    }
}

const subjects = (state = {
    subjectsList: [],
    subjectsAllList: [],
    subjectAddSuccess: false,
    subjectUpdateSuccess: false,
}, action) => {
    switch (action.type) {
        case actionType.GET_SUBJECTS:
            state = Object.assign({}, state, {
                subjectsList: action.subjectsList,
                totalSubjectCount: action.totalSubjectCount,
            });
            return state;
        case actionType.GET_ALL_SUBJECTS:
            state = Object.assign({}, state, {
                subjectsAllList: action.subjectsAllList,
            });
            return state;
        case actionType.ADD_SUBJECT: 
            state = Object.assign({}, state, {
                subjectAddSuccess: action.subjectAddSuccess,
            });
            return state;
        case actionType.UPDATE_SUBJECT: 
            state = Object.assign({}, state, {
                subjectUpdateSuccess: action.subjectUpdateSuccess,
            });
            return state;
        default:
            return state;
    }
}

const users = (state = {
    userAddSuccess: false,
    userUpdateSuccess: false,
    userForbidSuccess: false,
    userModifySuccess: false,
}, action) => {
    switch (action.type) {
        case actionType.ADD_USER:
            state = Object.assign({}, state, {
                userAddSuccess: action.userAddSuccess,
            });
            return state;
        case actionType.UPDATE_USER: 
            state = Object.assign({}, state, {
                userUpdateSuccess: action.userUpdateSuccess,
            });
            return state;
        case actionType.FORBID_USER: 
            state = Object.assign({}, state, {
                userForbidSuccess: action.userForbidSuccess,
            });
            return state;
        case actionType.MODIFY_USER: 
            state = Object.assign({}, state, {
                userModifySuccess: action.userModifySuccess,
            });
            return state;
        default:
            return state;
    }
}
export default combineReducers({
    login,
    points,
    subjects,
    users,
});