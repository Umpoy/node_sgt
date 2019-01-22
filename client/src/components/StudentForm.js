import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StudentForm extends Component {

    handleSubmit = e => {
        console.log('state: ', this.state);
        e.preventDefault();
        // this.props.onSubmit(formValues)
    }

    handleChange = e => {
        console.log('state: ', e.target.value);
        this.setState({ value: e.target.value });
    }

    render() {
        console.log('props: ', this.props);
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" component="input" onChange={this.handleChange}></Field>
                    <label htmlFor="email">email</label>
                    <Field name="email" type="text" component="input"></Field>
                </div>
            </form>
        )
    }
}

StudentForm = reduxForm({
    form: 'grade'
})(StudentForm);

export default StudentForm;