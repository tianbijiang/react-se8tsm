import React from 'react';
import { connect } from 'react-redux';
import selector from './selector';

const Hello = (props) => {
    return <div>child: {JSON.stringify(props.finalDetails)} (irrelevant prop {props.otherProp})</div>;
}

// Option 1
const mapStateToProps = () => {
  const selectorInstance = selector();
  return (state, props) => ({
    finalDetails: selectorInstance(state, props.myProp),
  });
}

// Option 2
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(props.myProp)(state),
// });

export default connect(mapStateToProps)(Hello);
