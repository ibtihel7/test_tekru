import React ,{Component} from 'react'
import { Button, TextField } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Img from './logo.png'


class Home extends Component {
    state = {  }

    handleChange=(event)=>
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() { 
        return ( <div className ='login'>
            
            <center>
                <img src= {Img} alt="pic" height = "80px"/>
                <br/>
                <h1>LOGIN</h1>
                <form className="access-form" action="/">
                    <TextField
                        id="outlined-login-input"
        
                        className="login-textField"
                        type="text"
                        name="username"
                        autoComplete="username"
                        variant="outlined"
                        margin="dense"
                        // value={username}
                        onChange={this.handleChange}
                     
                        // error={isError}
                        // disabled={loading}
                        // helperText={isError ? errorText : false}
                    />
                    <br/>
                    <TextField
                 
                        className="password-textField"
                        type="password"
                        name="password"
                        autoComplete="password"
                        variant="outlined"
                        margin="dense"
                        onChange={this.handleChange}

                        // value={password}
                        // onChange={event => this.onChangeInput(event.target)}
                        // error={isError}
                        // disabled={loading}
                    />
                    <br/>


                        <br/>

                    <Link to='/users'>
       
       <Button
           color="primary"
       variant="contained"
       btnType="btn btn-raised btn-success"
       onClick={this.login}
                     >
           OK
         </Button>
         </Link>  
                  
                </form>
            </center>
            </div> );
    }
}
 
export default Home;





