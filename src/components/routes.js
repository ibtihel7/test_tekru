import React, { Component } from 'react';
import {Route} from 'react-router-dom'
// import { PrivateRoute } from '../components';
import Home from './home'
import ListUser from './listUser'
import AddUser from './addUser'
import EditUser from './editUser'
class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className='routes-container'>

{/* <PrivateRoute exact path="/" component={HomePage} /> */}
                 <Route exact path='/' component={Home}/>   
                 <Route exact path='/users' component={ListUser}/>
                 <Route exact path='/addUser' component={AddUser}/>
                 <Route exact path='/editUser/:_id' 
                 render={(props)=><EditUser _id={props.match.params._id}/>} />
                 


        </div> );
    }
}
 
export default Routes;




