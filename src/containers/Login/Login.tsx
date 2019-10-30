import React, { Component, FormEvent } from 'react';
import { FormGroup , ControlLabel, FormControl, Button, FormControlProps } from 'react-bootstrap';
import './Login.css';

import { Auth } from "aws-amplify";

interface ILoginProps {
  email: '',
  password: ''
}

interface ILoginFormState {
  email: string,
  password: string 
}


class Login extends Component<ILoginProps, ILoginFormState> {

  constructor(props:ILoginProps) {
    super(props);
    this.state = { email: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;;
  }

  handleChange(event: FormEvent<FormControlProps & FormControl>) {
    const {name, value} = event.target as HTMLInputElement;
    switch(name) {
      case 'email' : 
        this.setState({email : value});
      break;
      case 'password' :
        this.setState({password : value});
      break;
    }
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     try {
      await Auth.signIn(this.state.email,this.state.password);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return <div className="Login">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" name="email" value={this.props.email} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl value={this.props.password} name="password" type="password" onChange={this.handleChange}/>
        </FormGroup>
        <Button block bsSize="large" disabled={!this.validateForm()} type="submit">Login</Button>
      </form>
    </div>
  }

}

export default Login;
