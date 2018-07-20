import React, { Component } from 'react'
import axios from 'axios'
import NotificationSystem from 'react-notification-system'
import Link from 'gatsby-link'
import Input from '../components/Input'
import FORMSPREE_EMAIL from '../constants'


class Contact extends Component {
    _notificationSystem = null
    state = {
        name: "",
        email: "",
        message: "",
        form_errors: {},
    }

    componentDidMount = () => {
        this._notificationSystem = this.refs.notificationSystem;
    }

    _handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    emailValidation = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateForm = () => {
        const { email, name, message } = this.state
        let valid = true
        const errors = {}
        if (email == '' || !this.emailValidation(email)) {
            errors['email'] = "Please provide a valid email"
            valid = false
        }
        if (name == "") {
            errors['name'] = "Please enter your name"
            valid = false
        }
        if (message == "") {
            errors['message'] = "Please enter your message"
            valid = false
        }

        this.setState({ form_errors: errors })
        return valid
    }

    submitForm = (e) => {
        e.preventDefault()
        const { name, email, message } = this.state
        const form_valid = this.validateForm()

        if (form_valid) {
            axios.post('https://formspree.io/' + `${FORMSPREE_EMAIL}`, {
                name: name,
                email: email,
                message: message,
            }).then(function (response) {
                console.log("response", response);
                this._notificationSystem.addNotification({
                    message: `Your message has been successfully sent`,
                    level: 'success'
                });
            }).catch(function (error) {
                console.log("ERROR:", error)
                this._notificationSystem.addNotification({
                    message: `Sorry, something went wrong. Please try again`,
                    level: 'error'
                });
            });
        } else {
            this._notificationSystem.addNotification({
                message: `Please fill in all the details`,
                level: 'error'
            });
        }

    }


    render() {
        const { name, email, message, form_errors } = this.state
        return (
            <div className="contact" ref="contact">
                <NotificationSystem ref="notificationSystem" />
                <div className="header">
                    <h3>Contact Us</h3>

                </div>
                <div className="description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptatum quaerat enim cum, reprehenderit culpa reiciendis exercitationem similique blanditiis, voluptas non quia architecto aperiam id? Neque quia sequi hic ex.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat cumque beatae velit aliquid placeat molestias ipsa reprehenderit dignissimos autem odio iure excepturi hic, suscipit ducimus deserunt quos quis maxime! Deleniti.
                    </p>
                </div>

                <div className="form-container">
                    <form className="contact-form" onSubmit={(e) => this.submitForm(e)}>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => this._handleInputChange(e)}
                            error={form_errors.name ? form_errors.name : null}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => this._handleInputChange(e)}
                            error={form_errors.email ? form_errors.email : null}
                        />

                        <Input
                            type="textarea"
                            placeholder="Message"
                            rows={3}
                            name="message"
                            value={message}
                            onChange={(e) => this._handleInputChange(e)}
                            error={form_errors.message ? form_errors.message : null}
                        />

                        <button className="submit" type="submit">SUBMIT</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default Contact