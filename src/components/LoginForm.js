import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Text } from 'react-native';
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    // note: this method comes from the 'actions' index.js
    // it sends the action of type 'email_changed' to all reducers
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@example.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  // adds this.props.email etc to available props inside component
  // also causes the component to update and rerender whenever email is changed
  //   in the textbox, because whenever props change a component updates and rerenders
  if (state.auth.email === '' && state.auth.password === '') {
    return {};
  }
  return {
    email: state.auth.email,
    password: state.auth.password
  };
};

// the emailChanged action becomes a function inside our component (this.props.emailChanged())
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
