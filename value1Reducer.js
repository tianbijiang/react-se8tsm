export default function(state=0, action) {
  if (action.secReducer) {
    // reuse some logic here...
    switch(action.type) {
      case 'UPDATE_2':
        return action.payload.num;
      default:
        return state;
    }
  } else {
    switch(action.type) {
      case 'UPDATE_1':
        return action.payload.num;
      default:
        return state;
    }
  }
}