import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class AddForm extends Component {
    state = {
        employee_name: '',
        employee_age: '',
        employee_salary: ''
    }
    componentDidMount() {
        const { userToEditId, users } = this.props;
        if (userToEditId) {
            const userToEdit = users.find((user) => user.id === userToEditId)
            this.setState({
                userToEdit
            })
        }
    }
    handleChange = (e) => {
        const { userToEdit } = this.state;
        if (userToEdit) {
            this.setState({
                userToEdit: {
                    ...userToEdit,
                [e.target.id]: e.target.value 
             }
    })
}

        else {
    this.setState({
        [e.target.id]: e.target.value
    })
}
    }
handleSubmit = (e) => {
    e.preventDefault();
    const { userToEdit } = this.state;
    if(userToEdit){
        this.props.handleFormSubmit(userToEdit);
    }
    else{
    this.props.handleFormSubmit(this.state);
    }

}
hideModal = () => {
    const { toggle } = this.props;
    toggle();
}

render() {
    const { show } = this.props;
    const { userToEdit } = this.state;
    return (
        <div className="modal">
            <Modal open={show} onClose={this.hideModal} >
                <h3>
                    {userToEdit ? 'Edit Employee' : 'Add Employee'}
                </h3>
                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={userToEdit && userToEdit.employee_name} onChange={this.handleChange} id="employee_name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input type="number" className="form-control" value={userToEdit && userToEdit.employee_salary} onChange={this.handleChange} id="employee_salary" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" className="form-control" value={userToEdit && userToEdit.employee_age} onChange={this.handleChange} id="employee_age" />
                        </div>
                        <button type="submit" className="add-btn btn btn-primary">Save</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
}

export default AddForm;
