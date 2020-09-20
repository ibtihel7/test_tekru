import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { Button, TextField, InputLabel } from "@material-ui/core";
import Img from "./logo.png";

class Home extends Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      username: "",
      password: "",
      loggedIn,
      error: "",
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async formSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    try {
      const token = await Axios.post("/login", { username, password });
      localStorage.setItem("token", token);
      this.setState({
        loggedIn: true,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/users" />;
    }
    return (
      <div className="login">
        <center>
          <img src={Img} alt="pic" height="80px" />
          <br />
          <h1>LOGIN</h1>
          <form className="access-form" action="/">
            <InputLabel>User Name</InputLabel>
            <TextField
              id="outlined-login-input"
              className="login-textField"
              type="text"
              name="username"
              autoComplete="username"
              variant="outlined"
              margin="dense"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />
            <InputLabel>Password</InputLabel>
            <TextField
              className="password-textField"
              type="password"
              name="password"
              value={this.state.password}
              autoComplete="password"
              variant="outlined"
              margin="dense"
              onChange={this.handleChange}
            />
            <br />
            <br />

            <Button
              color="primary"
              variant="contained"
              onClick={this.formSubmit}
            >
              login
            </Button>
            <br />
            <h4>{this.state.error}</h4>
          </form>
        </center>
      </div>
    );
  }
}

export default Home;
