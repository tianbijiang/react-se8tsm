export default function(state=0, action) {
  switch(action.type) {
    case 'UPDATE_1':
      return action.payload.num;
    default:
      return state;
  }
}