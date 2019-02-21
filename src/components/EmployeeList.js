import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    props.employeesFetch();
  }

  renderItem(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.employees}
        renderItem={this.renderItem}
        keyExtractor={(employee, index) => index.toString()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  // map object of objects that gets returned from redux into an array of objects
  //  (and add 'key' of each object to the object as an item within the object)
  //  i.e. employees: { "1234uid": { name: "foo" ... } ... } becomes
  //  [ { name: "foo", uid: "1234uid" } ... ]
  const employees = _.map(state.employees, (val, uid) => {
      return { ...val, uid };
  });
  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
