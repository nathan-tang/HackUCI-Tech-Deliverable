import React, { Component } from 'react';
import axios from 'axios';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.min.css';
import logo from './assets/hack-logo-transparent.png';
import './App.css';
import petr from './assets/astro_petr.png';
import './stars.css' // Original Template Made By Saransh Sinha


class App extends Component {
    state = {
        name: '',
        email: '',
        funfact: '',
    };

    handleReset = event => {
        this.setState( {
            name: '',
            email: '',
            funfact: ''
        })
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    };

    handleFactChange = event => {
        this.setState({
            funfact: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        let userData = {
            name : this.state.name,
            email : this.state.email,
            funfact : this.state.funfact
        };

        var passAll = true;
        document.getElementById("input-name-id").className = "form-control";
        document.getElementById("input-email-id").className = "form-control";
        document.getElementById("input-fun-fact-id").className = "form-control";
        document.getElementById("name-error").innerText = "";
        document.getElementById("email-error").innerText = "";
        document.getElementById("fun-fact-error").innerText = "";


        if (userData['name'] === "") {
            passAll = false;
            document.getElementById("name-error").innerText = "Name is Required.";
            document.getElementById("input-name-id").className = "form-control is-invalid";
        }
        if (userData['email'] === "") {
            passAll = false;
            document.getElementById("email-error").innerText = "Email is Required.";
            document.getElementById("input-email-id").className = "form-control is-invalid";
        }
        else if (!userData['email'].includes("."))
        {
            passAll = false;
            document.getElementById("email-error").innerText = "Email is Invalid.";
            document.getElementById("input-email-id").className = "form-control is-invalid";
        }
        if (userData['funfact'] === "") {
            passAll = false;
            document.getElementById("fun-fact-error").innerText = "Fun-Fact is Required.";
            document.getElementById("input-fun-fact-id").className = "form-control is-invalid";
        }
        if (passAll)
        {
            axios.get('https://hack-uci-test-endpoint.herokuapp.com/test', {
                params: {
                    name: userData['name'],
                    email: userData['email'],
                    funfact: userData['funfact']
                }
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    document.getElementById("application-form").reset();
                    document.getElementById("input-name-id").className = "form-control is-valid";
                    document.getElementById("input-email-id").className = "form-control is-valid";
                    document.getElementById("input-fun-fact-id").className = "form-control is-valid";
                    this.handleReset();
                    alert("Sucessfully Submitted!")
                })
        }
    };

    render () {
        return (
            <div className="App">

                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>

                <header>
                    <a href="https://www.hackuci.com"><img src={logo} className="Hack-logo" alt="HackUCI" /></a>

                </header>

                <div className="main-wrapper">
                    <div className="container" id="form-container">
                        <h4 id="header-p"> <b>HackUCI Application</b> </h4>
                        <form id="application-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputName1">Name:</label>
                                <small className="text-danger" id="name-error"> </small>
                                <input type="name" name="name" className="form-control" id="input-name-id"
                                       placeholder="Enter Name" onChange={this.handleNameChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email:</label>
                                <small className="text-danger" id="email-error"> </small>
                                <input type="email" name="email" className="form-control" id="input-email-id"
                                       placeholder="Enter Email" onChange={this.handleEmailChange}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Fun Fact:</label>
                                <small className="text-danger" id="fun-fact-error"> </small>
                                <textarea type="funfact" name="funfact" className="form-control" id="input-fun-fact-id"
                                       placeholder="Enter Fun-Fact" onChange={this.handleFactChange}/>
                            </div>

                            <button type="submit" className="btn btn-secondary" id="submit-button">Submit</button>
                        </form>
                    </div>

                    <div className="d-flex justify-content-center" id="petr-container">
                        <img src={petr} id="petr-sprite" alt="petr"/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
