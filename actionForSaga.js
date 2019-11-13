export default function(payload) {
  return {
    type: 'UPDATE_SAGA',
    payload,
  };
}