import React, { Component } from "react";
import ReactTable from "./reactTable";
import Button from "@material-ui/core/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios' ;
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
class ListUser extends Component {
// axios
  componentDidMount=()=>{
    axios.get('/get-users').then((res)=>this.props.updateUserReducer(res.data))
}


// 
deleteUser=(id)=>
{ axios.delete(`/delete-user/${id}`)   
.then(()=>this.props.deleteUserReducer(id)) 
.catch((err)=>alert(err)) 
}

  render() {
    const { users } = this.props;

    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Family Name",
        accessor: "family_name",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Last Login Date",
        accessor: "last_login_date",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",

        Cell: ({ row }) => (


          // deleteUser=()=>
          // { 
          
          // axios.delete(`/delete-user/${row.original._id}`)   
          // .then(()=>this.props.deleteUserReducer(row.original._id)) 
          // .catch((err)=>alert(err)) 
          // }


          <div>
              <IconButton aria-label="edit">
              <Link to={`/editUser/${row.original._id}`}>
                <EditIcon />
                </Link>
              </IconButton>
             
            <IconButton aria-label="delete">
            {/* <Link to="/users"> */}
              <DeleteIcon
                onClick={() => this.deleteUser(row.original._id)}


              />
                          {/* </Link> */}

            </IconButton>
          </div>
        ),
      },
    ];

    return (
      <div>
        <center>
          <h1>User Management</h1>
          <Styles>
            <ReactTable data={users} columns={columns} />
          </Styles>
          <br />
          <Link to="./addUser">
            <Button color="primary" variant="contained">
              ADD USER
            </Button>
          </Link>
          <Link to="./">
            <br /> <br />
            <Button color="primary" variant="contained">
              LOG OUT
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
    // ADD BACK
    updateUserReducer:users=>
    {
        dispatch({
            type:'UPDATE_USERS',
            users
        })
    },
    // 
    deleteUserReducer: (_id) => {
      dispatch({
        type: "REMOVE_USER",
        _id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
