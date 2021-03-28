import React, {useState} from 'react';
import {Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import getCookie from './utils';
import { useHistory } from "react-router-dom";

const Navbar = ({navValue,title,detail,thumbnail}) => {
    
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    const logoutFunc = () => {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to log out?",
          icon: "warning",
          dangerMode: true,
        })
        .then(willLogOut => {
          if (willLogOut) {
            axios.get('/api/logout/')

            .then(res=> {
                swal("Logged Out!", "You have been logged out!", "success")
                .then(okay => {
                    window.location = "/"
                })
            })

            .catch (err => {
                swal("Unsuccessful!", "Can't log out. Please try again.", "error")
            })
          }
        })
    }

    const addArticle = () => {

        if(navValue !== "Publish") {
            return;
        }

        if(title === "" || detail === "" || thumbnail === ""){
            swal("Unsuccessful!", "Please make sure no field is empty", "error")
            return;
        }
        const csrftoken = getCookie('csrftoken');
        const axiosConfig = {
            headers: {
                "X-CSRFToken": csrftoken
            }
          };

        const form = new FormData();
        form.append("title",title);
        form.append("detail",detail);
        form.append("thumbnail",thumbnail);

        axios.post('/api/blogs/',form,axiosConfig)

        .then(res => {
            console.log(res.data);
            swal("Added!", "You post has been added", "success")
            .then(okay => {
                history.push('/submitted');
            })
        })

        .catch(err => {
            console.log(err);
            swal("Unsuccessful!", "Can't perform the action. Please try again.", "error")
        })
    }
    
    const navStyle = {
        color:"white",
        display:"flex",
        gap:"0.5rem"
    }

    const spanStyle = {
        display:"flex",
        alignItems:"center",
    }

    const pStyle = {
        paddingTop:"15px",
        color :"gray"
    }

    return (
        !isAuthenticated ? null :
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" exact to="/">
                <span style = {spanStyle}>
                    <h3>FATMUG | </h3> <p style = {{paddingTop:"3px"}}> <strong> Greetings {username} </strong> </p>
                </span>
            </NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto mr-5">
                        
                        <li className="nav-item ">
                            <NavLink className="nav-link" exact to="/create"
                            activeStyle={navStyle}
                            >
                                <p className = "btn btn-secondary" 
                                onClick = {addArticle}
                                disabled = {loading}
                                >
                                {navValue}
                                </p>

                            </NavLink>
                        </li>

                        <li className="nav-item ">
                            <NavLink className="nav-link" exact to="/submitted"
                            activeStyle={navStyle}
                            > <p className = "btn btn-outline-secondary">Your Articles</p>
                            </NavLink>
                        </li>     
                    
                    <li>
                        <p className = "btn"  style = {pStyle} onClick = {logoutFunc}> Logout </p>
                    </li>
                    
                </ul>
            </div>
        </nav>
        </>
    )
}
  
const mapStateToProps = (state) => {
    return {
      navValue: state.navValue,
      title : state.title,
      detail : state.details,
      thumbnail : state.thumbnail
    };
  };

export default connect(mapStateToProps,null) (Navbar)