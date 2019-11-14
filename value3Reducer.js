export default function(state=0, action) {
  switch(action.type) {
    case 'UPDATE_3':
      return action.payload.num;
    default:
      return state;
  }
}