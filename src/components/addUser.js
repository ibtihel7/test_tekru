import React, { Component } from 'react';
import Button from '@material-ui/core/button'
import Input from '@material-ui/core/input'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class AddUser extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
                       id:'',
                       name:'',
                       family_name:'',
                       password:'',
                       last_login_date:'',
                       created_at:'',
                       updated_at:'',
                       phone:'',
                       email:'' 

    }
    }


    handleChange=(event)=>
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    addUser=()=>
    {
        this.props.addReducer({...this.state,id:Math.random()*1000+''})
    }

    render() { 
        return ( <div className='add-user-container'>
        <center>
        <h1>ADD USER</h1>
        <h5>Name </h5>
        <Input type='text' name='name' onChange={this.handleChange}/>
        <h5>Family Name </h5>
        <Input type='text' name='family_name' onChange={this.handleChange}/>
        <h5> Password </h5>
        <Input type='password' name='password' onChange={this.handleChange}/>
        
        <h5>  Last Login Date </h5>
        <Input type='text' name=' last_login_date' onChange={this.handleChange}/>
        <h5> Created At </h5>
        <Input type='text' name='created_at' onChange={this.handleChange}/>
        <h5> Updated At </h5>
        <Input type='text' name='updated_at' onChange={this.handleChange}/>
        
        <h5>Phone </h5>
        <Input type='number' name='phone' onChange={this.handleChange}/>
        <h5>Email </h5>
        <Input type='email' name='email' onChange={this.handleChange}/>
        <br/>
        <br/>

        <Link to='/users'>   
            <Button
            color="primary"
            variant="contained"
            onClick={this.addUser}
            >  ADD </Button>
        </Link>
        <br/>

    </center>
    </div> )
}
}
const mapDispatchToProps=(dispatch)=>
{
     return {
         addReducer:newuser=>
         {
             dispatch({
                 type:'ADD_USER',
                 newuser
             })

         }
     }
}

export default connect(null,mapDispatchToProps)(AddUser)