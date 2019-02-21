import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import _ from 'lodash';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {

  constructor(props) {
    super(props);
    // Using constructor() in place of componentWillMount here
    // For each property in the employee (if an employee is passed in),
    //   add that property to the reducer so that that state is passed into the component
    // Note that the employeeUpdate action updates the prop/value in the employeeForm reducer
    //   this employeeSave action updates the entire employee in the db
    _.each(props.employee.item, (value, prop) => {
      props.employeeUpdate({ prop, value });
    });
  }

  state = { showModal: false };

  onButtonPress() {
    // note that this.props.name this.props.phone etc utilize the onChangeText
    //   in employeeForm.js, so they already reflect the new values if the user
    //   has made a change
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.item.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`)
  }

  // when user hits 'yes' in the 'fire' modal
  onAccept() {
    const { uid } = this.props.employee.item;

    this.props.employeeDelete({ uid });
  }

  // when user hits 'no' in the 'fire' modal
  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    // the employee details are in this.props.employee.item if the user came by
    //   clicking on the employee list
    console.log(this.props.employee.item);
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Employee
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete
})(EmployeeEdit);
