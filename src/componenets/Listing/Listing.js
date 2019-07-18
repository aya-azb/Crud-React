import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listing.css';
import AddForm from '../AddForm/AddForm';

class Listing extends Component {
  state = {
    users: [],
    isModalVisibale: false
  }

  componentDidMount() {
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data
        })
      })
  }
  //toggle
  toggleModal = (id) => {
    const { isModalVisibale } = this.state;
    this.setState({
      isModalVisibale: !isModalVisibale,
      userToEditId: id
    })

  }
  handleFormSubmit = (item) => {
    const { users } = this.state;
    if (item.id) {
      const updatedUser = users.map((user) => {
        if (user.id !== item.id) {
          return user
        } else {
          return { ...user, ...item };
        }
      });
      this.setState({ 
        users :updatedUser ,
        isModalVisibale: false
      })
    }
    else {
      const { users } = this.state;
      const LastUserId = users[users.length - 1].id;
      const NewUser = { ...item, id: LastUserId + 1 }
      const updatedList = [...users, NewUser];
      this.setState({
        users: updatedList,
        isModalVisibale: false
      })
    }
   
  }
  //delete
  deleteUser = (index) => {
    let users = this.state.users;
    let i = users.findIndex(user => user.id === index)
    users.splice(i, 1);
    this.setState({
      users
    })
  }
  //<a href="#" onClick={()=>{deleteUser(user.id)}}><i className="fa fa-trash"></i></a>  
  render() {
    const { users, isModalVisibale, userToEditId } = this.state;
    return (
      <div className="App">
        <button className="btn-primary btn" onClick={this.toggleModal}>Add Post</button>
        {isModalVisibale ? <AddForm
          show={isModalVisibale}
          toggle={this.toggleModal}
          handleFormSubmit={this.handleFormSubmit}
          userToEditId={userToEditId}
          users={users}
        /> : null}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">employee_name</th>
              <th scope="col">employee_salary</th>
              <th scope="col">employee_age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.employee_name}</td>
                <td>{user.employee_salary}</td>
                <td>{user.employee_age}</td>
                <td >
                  <a href="#"><i onClick={() => { this.toggleModal(user.id) }} className="fa fa-edit"></i></a>
                  <a href="#" ><i onClick={() => { this.deleteUser(user.id) }} className="fa fa-trash"></i></a>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  }
}

export default Listing;
