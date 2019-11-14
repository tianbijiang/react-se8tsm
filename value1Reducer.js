export default function(state, action) {
  switch(action.type) {
    case 'UPDATE_1':
      return action.payload.num;
    default:
      return state;
  }
}