import React, { Component } from 'react';
import '../../../assets/css/styles.css'
import axios from 'axios';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    handleChange = e => {
        this.setState({ password: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.password)
        this.makeRequest()
    }

    makeRequest = () => {
        const { history } = this.props
        const data = { password: this.state.password }

        axios.post('/admin/login', data).then(response => {
            console.log(response)
            //successful login
            this.setState({ password: "" })
            history.push('/admin/dashboard')
            localStorage.setItem('user_id', response.data.user_id);
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
            }
        })
    }
    render() {
        return (
            <div className="background flex-container">

                <div className="text-center">
                    <img id="profile-img" className="rounded-circle profile-img-card" src="https://i.imgur.com/6b6psnA.png" alt="login-background" />
                    <div>
                        <form type="submit" onSubmit={this.handleSubmit}>
                            <input className="size" autoComplete="current-password" type="password" onChange={this.handleChange} value={this.state.password} required autoFocus />
                            <button className="btn btn-primary btn-block size">Login</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default AdminLogin;