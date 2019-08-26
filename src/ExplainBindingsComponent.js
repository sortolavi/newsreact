import React, {Component} from 'react';

class ExplainBindingsComponent extends Component {

  constructor() {
    super();
    this.onClickMe = this.onClickMe.bind(this);
  }

  // class method
  onClickMe() {
    // without binding at constructor this would log as undefined
    // or another way is to change: onClick={this.onClickMe.bind(this)}, avoid it because it binds every time render method is run, at constructor it only binds once
    console.log(this);
  }

  // class methods can be autobound automatically without binding them explicitly by using JavaScript ES6 arrow functions.
  // onClickMe = () => console.log(this);

  render() {
    return (
      <button
        onClick={this.onClickMe}
        type="button" 
        
      >
      Click Me
      </button>
    );
  }
}

export default ExplainBindingsComponent;