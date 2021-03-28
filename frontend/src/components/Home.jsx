import React, { useState, useEffect } from 'react';
import {Link, NavLink } from 'react-router-dom';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import StarRateIcon from '@material-ui/icons/StarRate';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import axios from 'axios'
import {Redirect} from 'react-router-dom';

const Home = ({onUpdateNav,onUpdateForm}) => {
    
    const [items,setItems] = useState([]);

    useEffect(() => {

        const fetchItems = async() => {
            const getParams = {
                params: {
                  whichshow:"all",
                }
            };
    
            await axios.get('/api/blogs/',getParams)
            .then(res => {
                console.log(res.data)
                setItems(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        }

        fetchItems('/api/blogs/');

        onUpdateNav("Write");
        onUpdateForm("clear","clear");
        
    },[])

    const ErrorIconStyle = {
        transform:"rotate(180deg)",
        fontSize:"30",
        color:"rgb(116, 116, 116)",
    }


    return (
        !isAuthenticated ? <Redirect to = '/login' /> :
        <>
            <div className="home_wrapper">
                <div className="left">

                    {
                        items === undefined? <h2> Hello</h2>:
                        items.map((item,index) => {
                            return(
                                <div key = {index} className="home_card">
                                    <img src={item.thumbnail} alt=".."/>
                                    <p style={{display:"flex",alignItems:"center",gap:"0.5rem",marginTop:"3vh"}}> 
                                        <ErrorOutlineIcon style = {ErrorIconStyle}/> 
                                        <strong>{item.get_author_name}</strong> <i>in</i> <strong>Wholistique</strong> 
                                    </p>
            
                                    <h3> {item.title} </h3>
            
                                    <p> {item.details.slice(0,600)}..... </p>
            
                                    <div style = {{display:"flex", justifyContent:"flex-end"}}>
                                        <span style = {{display:"flex", gap:"1rem"}}>
                                            <Link to = {`view/${item.slug}`} className = "link">Read More</Link>
                                            <p> <strong>7 min read </strong> <StarRateIcon style = {{color:"grey",fontSize : "16px",marginBottom:"7px"}} /> </p> 
                                        </span>
                                    </div>
        
                                </div>
                            )
                        })
                    }

                </div>

                <div className="right">
                    <div className="home_right_top top">
                        <hr/>
                        <p> TOP ARTICLES </p>
                        <hr/>
                    </div>

                    <div className="bottom">

                        {   
                            items === undefined? <h2> Hello</h2>:
                            items.slice(0,4).map((item,index) => {
                                return (
                                    <div key = {index} className="mini_cards">
                                        <div className="mini_card_left">
                                            <p className = "mini_card_author">
                                                <ErrorOutlineIcon style = {ErrorIconStyle}/> 
                                                <p> {item.get_author_name} in better programming  </p>
                                            </p>
            
                                            <h5>
                                                <Link to = {`view/${item.slug}`} className ="link"> {item.title.slice(0,38)}.. </Link>
                                            </h5>
            
                                            <span className = "mini_card_bottom">
                                                <p> Jun 10 </p>
                                                <p> 6 min read <StarRateIcon style = {{color:"grey",fontSize : "12px",marginBottom:"5px"}} />  </p>
                                            </span>
                                        </div>
            
                                        <div className="mini_card_right">
                                            <img src={item.thumbnail} alt=".."/>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </>   
    )
}

const mapDispatchToPropsFacebook = (dispatch) => {
    return {
      onUpdateNav: (value) => dispatch(actions.updateNav(value)),
      onUpdateForm :(name,value) => dispatch(actions.updateForm(name,value))

    };
  };

export default connect(null,mapDispatchToPropsFacebook) (Home);
