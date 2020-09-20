import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/button";
import Input from "@material-ui/core/Input";
import axios from 'axios'


class EditUser extends Component {
  constructor(props) {
    super(props);
    const user = this.props.users.filter((el) => el._id === this.props._id)[0];
    this.state = {
      _id: user._id,
      name: user.name,
      family_name: user.family_name,
      password: user.password,
      last_login_date: user.last_login_date,
      created_at: user.created_at,
      updated_at: user.updated_at,
      phone: user.phone,
      email: user.email,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // editUser = () => {
  //   this.props.editReducer({ ...this.state });
  // };

// add axios
  editUser=()=>
  {
     axios.put(`/edit-user/${this.state._id}`,{
      // _id: this.state._id,
      name: this.state.name,
      family_name: this.state.family_name,
      password: this.state.password,
      last_login_date: this.state.last_login_date,
      created_at: this.state.created_at,
      updated_at: this.state.updated_at,
      phone: this.state.phone,
      email: this.state.email,
   }) 
    .then(()=>this.props.editUserReducer({...this.state})) 
    .catch((err)=>alert(err))
  }
// 



  render() {
    return (
      

      <div>
        <center>
          <h1>EDIT USER</h1>
          <h5>Name </h5>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <h5>Family Name </h5>
          <Input
            type="text"
            name="family_name"
            value={this.state.family_name}
            onChange={this.handleChange}
          />
          <h5> Password </h5>
          <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <h5> Last Login Date </h5>
          <Input
            type="text"
            name=" last_login_date"
            value={this.state.last_login_date}
            onChange={this.handleChange}
          />
          <h5> Created At </h5>
          <Input
            type="text"
            name="created_at"
            value={this.state.created_at}
            onChange={this.handleChange}
          />
          <h5> Updated At </h5>
          <Input
            type="text"
            name="updated_at"
            value={this.state.updated_at}
            onChange={this.handleChange}
          />
          <h5>Phone </h5>
          <Input
            type="number"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <h5>Email </h5>
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <Link to="/users">

            <Button color="primary" variant="contained" onClick={this.editUser}>
              EDIT
            </Button>
            
          </Link>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editUserReducer: (edituser) => {
      

      dispatch({
        type: "EDIT_USER",
        edituser,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
