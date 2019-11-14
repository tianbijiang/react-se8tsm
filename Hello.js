import React from 'react';
import { connect } from 'react-redux';
import action1 from './action1';
import action2 from './action2';
import action3 from './action3';
import selector from './selector';
import anotherSelector from './anotherSelector';
import chainSelector from './chainSelector';
import actionForSaga from './actionForSaga';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeValueInterested: 0,
      storeValue3: 0,
    };
  }

  componentDidMount() {
    this.setState({
      storeValueInterested: this.props.finalDetails,
    });
    this.setState({
      storeValue3: this.props.value3FromRedux,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.finalDetails !== nextProps.finalDetails) {
      this.setState({
        storeValueInterested: nextProps.finalDetails,
      });
    }
    if (this.props.value3FromRedux !== nextProps.value3FromRedux) {
      this.setState({
        storeValue3: nextProps.value3FromRedux,
      });
    }
  }

  render() {
    return (
      <div>
        <br></br>
        child {this.props.myProp ? "1" : "2"}:

        {this.props.myProp && <div>
          <button onClick={() => {
            const storeValueInterested = parseInt(Math.random()*100);
            this.setState({ storeValueInterested });
            this.props.action1(storeValueInterested);
          }}>update interested redux store value</button>
          <button onClick={() => this.props.action1(this.state.storeValueInterested)}>
            resend same value
          </button>
          {this.state.storeValueInterested}
        </div>}

        {!this.props.myProp && <div>
          <button onClick={() => {
            const storeValueInterested = parseInt(Math.random()*100);
            this.setState({ storeValueInterested });
            this.props.action2(storeValueInterested);
          }}>update interested redux store value</button>
          <button onClick={() => this.props.action2(this.state.storeValueInterested)}>
            resend same value
          </button>
          {this.state.storeValueInterested}
        </div>}

        <div>
          <button onClick={() => {
            const storeValue3 = parseInt(Math.random()*100);
            this.setState({ storeValue3 });
            this.props.action3(storeValue3)}
          }>update irrelevant redux store value</button>
          <button onClick={() => this.props.action3(this.state.storeValue3)}>
            resend same value
          </button>
          {this.props.value3FromRedux}
        </div>
        <div>derived redux store value: {this.props.derivedValue}</div>
        <div>chained redux store value: {this.props.chainedValue}</div>
        <div><button onClick={() => this.props.actionForSaga({myProp: this.props.myProp})}>fire action for saga value {this.props.myProp ? "1" : "2"}</button></div>
        <div>irrelevant prop is {this.props.otherProp}</div>
      </div>);
  }
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
  finalDetails: selector(props.myProp)(state),
  value3FromRedux: state.value3FromRedux,
  derivedValue: anotherSelector(props.myProp)(state),
  chainedValue: chainSelector(props.myProp)(state),
});

// Option 4 not working
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(state, props.myProp),
//   value3FromRedux: state.value3FromRedux,
// });

const mapDispatchToProps = (dispatch) => ({
  action1: (value) => dispatch(action1(value)),
  action2: (value) => dispatch(action2(value)),
  action3: (value) => dispatch(action3(value)),
  actionForSaga: (value) => dispatch(actionForSaga(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
