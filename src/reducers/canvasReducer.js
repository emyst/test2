import * as types from '../actions/canvasActions'
export const initState = {
  name: '',
  email: '',
  canvasLink: '',
  isLoadedCanvas: false,
  isNotShared: false,
  isNotValidCanvas: false,
  author: '',
  isShared: false,
  canEdit: false,
  one: [],
  one_two: [],
  two: [],
  two_two: [],
  free: [],
  four: [],
  five: [],
  five_two: [],
  six: [],
  seven: [],
  eight: [],
  nine: [],
};

export function canvasReducer(state = initState, action) {
    switch(action.type) {
        case types.SET_ON_SUBSCRIBE_CANVAS:
            let nameCanvas = '';
            if (action.payload.name){
                nameCanvas = action.payload.name;
            }
            let emailCanvas = '';
            if (action.payload.email){
                emailCanvas = action.payload.email;
            }
            let linkCanvas = '';
            if (action.payload.canvasLink){
                linkCanvas = action.payload.canvasLink;
            }
            let oneCanvas = [];
            if (action.payload.one){
                oneCanvas = action.payload.one;
            }
            let oneTwoCanvas = [];
            if (action.payload.one_two){
                oneTwoCanvas = action.payload.one_two;
            }
            let twoCanvas = [];
            if (action.payload.two){
                twoCanvas = action.payload.two;
            }
            let twoTwoCanvas = [];
            if (action.payload.two_two){
                twoTwoCanvas = action.payload.two_two;
            }
            let freeCanvas = [];
            if (action.payload.free){
                freeCanvas = action.payload.free;
            }
            let fourCanvas = [];
            if (action.payload.four){
                fourCanvas = action.payload.four;
            }
            let fiveCanvas = [];
            if (action.payload.five){
                fiveCanvas = action.payload.five;
            }
            let fiveTwoCanvas = [];
            if (action.payload.five_two){
                fiveTwoCanvas = action.payload.five_two;
            }
            let sixCanvas = [];
            if (action.payload.six){
                sixCanvas = action.payload.six;
            }
            let sevenCanvas = [];
            if (action.payload.seven){
                sevenCanvas = action.payload.seven;
            }
            let eightCanvas = [];
            if (action.payload.eight){
                eightCanvas = action.payload.eight;
            }
            let nineCanvas = [];
            if (action.payload.nine){
                nineCanvas = action.payload.nine;
            }
            return{
                ...state,
                name: nameCanvas,
                email: emailCanvas,
                canvasLink: linkCanvas,
                isShared: action.payload.isShared,
                canEdit: action.payload.canEdit,
                author: action.payload.author,
                one: oneCanvas,
                one_two: oneTwoCanvas,
                two: twoCanvas,
                two_two: twoTwoCanvas,
                free: freeCanvas,
                four: fourCanvas,
                five: fiveCanvas,
                five_two: fiveTwoCanvas,
                six: sixCanvas,
                seven: sevenCanvas,
                eight: eightCanvas,
                nine: nineCanvas,
                isLoadedCanvas: true,
            };

        case types.SET_IS_NOT_SHARED_CANVAS:
            return{
                ...state,
                isNotShared: action.payload,
            };

        case types.SET_IS_NOT_VALID_CANVAS:
            return {
                ...state,
                isNotValidCanvas: action.payload,
            };

        case types.CLEAR_ALL:
            return{
                ...initState
            };

        default:
            return state;
    }
}