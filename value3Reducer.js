export default function(state=parseInt(Math.random()*100), action) {
  switch(action.type) {
    case 'UPDATE_3':
      return action.payload;
    default:
      return state;
  }
}