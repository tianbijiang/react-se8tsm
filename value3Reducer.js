export default function(state=Math.random(), action) {
  switch(action.type) {
    case 'UPDATE_3':
      return action.payload;
    default:
      return state;
  }
}