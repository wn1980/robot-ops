/*
import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavDropdown, Container } from "react-bootstrap"

class Header extends Component {

    base_url = 'http://' + document.location.hostname;

    portainer = this.base_url + ":9000";
    
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <a className="navbar-brand" href="#">ROS|Web-control</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/settings">Settings</a>
                            </li>

                            <li className="nav-item dropdown">

                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tools
                                </a>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>

                                    <li><hr className="dropdown-divider"/></li>

                                    <li>
                                        <a className="dropdown-item" href="http://localhost:9000" target="_blank">Portainer</a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
*/

export default function Header() {

    var base_url = 'http://' + document.location.hostname;

    var ros_desktop = base_url + ":9901";
    var code_server = base_url + ":8557";
    var webviz = base_url + ":1000";
    var web_vdo_server = base_url + ":8080";
    var portainer = base_url + ":9000";

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <a className="navbar-brand" href="/">ROS|Web-control</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/settings">Settings</a>
                        </li>

                        <li className="nav-item dropdown">

                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tools
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href={ros_desktop} target="_blank" rel="noreferrer" >ROS-desktop</a></li>
                                <li><a className="dropdown-item" href={code_server} target="_blank" rel="noreferrer" >code-server</a></li>
                                <li><a className="dropdown-item" href={webviz} target="_blank" rel="noreferrer" >webviz</a></li>
                                <li><a className="dropdown-item" href={web_vdo_server} target="_blank" rel="noreferrer" >web-vdo-server</a></li>

                                <li><hr className="dropdown-divider"/></li>

                                <li>
                                    <a className="dropdown-item" href={portainer} target="_blank" rel="noreferrer" >portainer</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
  }
