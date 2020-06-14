var usersinitial=[{
    id:'2',
    name:'ibtihel',
    family_name:'HAMDI',
    password:'ibtihel',
    last_login_date:'15/05/2020',
    created_at:'12/12/2019',
    updated_at:'10/01/2020',
    phone:'21719850',
    email:'ibtihel7hamdi@gmail.com' 
},

{
    id:'3',
    name:'admin1',
    family_name:'ADMIN2',
    password:'admin1',
    last_login_date:'13/06/2020',
    created_at:'12/05/2020',
    updated_at:'12/06/2020',
    phone:'21719850',
    email:'admin1@gmail.com' },

{
        id:'4',
        name:'admin2',
        family_name:'ADMIN2',
        password:'admin2',
        last_login_date:'14/06/2020',
        created_at:'13/06/2019',
        updated_at:'13/06/2020',
        phone:'21719850',
        email:'admin2@gmail.com'}
]

const userReducer=(state=usersinitial,action)=>
{
  switch(action.type)
  {  
     case 'ADD_USER':
  return (
      state.concat(action.newuser)
  )
    case 'EDIT_USER':
    return (
        state.map(el=>(el.id===action.edituser.id)?el=action.edituser:el)

    )
    case 'DELETE_USER':
    return (
        state.filter((el,index)=>el.id!==action.id)
    )
      default :
      return state
  }
  
}

export default userReducer