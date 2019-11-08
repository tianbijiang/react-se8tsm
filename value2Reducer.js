export default function(state=0, action) {
  switch(action.type) {
    case 'UPDATE_2':
      return action.payload;
    default:
      return state;
  }
}