import React from 'react';
import { connect } from 'react-redux';
import selector from './selector';

const Hello = (props) => {
    return (
      <div>
        <br></br>
        child {props.myProp ? "1" : "2"}:
        <div>interested redux value: {JSON.stringify(props.finalDetails)}</div>
        <div>(irrelevant prop {props.otherProp})</div>
        <div>(irrelevant redux value: {props.value3FromRedux})</div>
      </div>);
}

// Option 1 working
// const mapStateToProps = () => {
//   const selectorInstance = selector();
//   return (state, props) => ({
//     finalDetails: selectorInstance(state, props.myProp),
//     value3FromRedux: state.value3FromRedux,
//   });
// }

// Option 2 not working
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(props.myProp)(state),
//   value3FromRedux: state.value3FromRedux,
// });

// Option 3 working
const mapStateToProps = (state, props) => ({
  finalDetails: selector(props.myProp)(state, props.myProp),
  value3FromRedux: state.value3FromRedux,
});

// Option 4 not working
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(state, props.myProp),
//   value3FromRedux: state.value3FromRedux,
// });

export default connect(mapStateToProps)(Hello);
