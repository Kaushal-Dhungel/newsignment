import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import home from '../imgs/bandipur.jpg';
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import axios from 'axios'
import getCookie from './utils';

const Submitted = ({onUpdateNav,onUpdateForm}) => {

    const [items,setItems] = useState([]);

    useEffect(() => {

        const fetchItems = async() => {

            const getParams = {
                params: {
                  whichshow:"mine",
                }
            };

            await axios.get('/api/blogs/',getParams)
            .then(res => {
                console.log(res.data)
                setItems(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchItems();

        onUpdateNav("Write");
        onUpdateForm("clear","clear");
    },[])

    const deletePost =(slug) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this post?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                console.log(slug)

                const csrftoken = getCookie('csrftoken');
                const axiosConfig = {
                        headers: {
                            "X-CSRFToken": csrftoken
                        }
                      };
                      
                axios.delete(`/api/blogdetail/${slug}`,axiosConfig)
                .then(res => {
                    console.log(res.data)
                    swal("Deleted!", "The post has been deleted!", "success")
                    setItems(res.data)
                })
                .catch(err => {
                    console.log(err)
                    swal("Sorry!", "The post can not be deleted right now. PLease try later.", "warning")
                })
            }
          })

    }

    return (
        <>
            <div className="container">
                <div className="top">
                    <hr/>
                    <p> YOUR SUBMITTED ARTICLES </p>
                    <hr/>
                </div>

                <div className="card_wrapper">

                    {
                        items.map((item,index) => {
                            return (
                                <div key = {index}>
                                    <div className="card">
                                        <img src={item.thumbnail} alt=""/>
                                        <div className="card_text">
                                            <h4> <Link className = "link" to ={ `/view/${item.slug}`}>  {item.title} </Link> </h4>
                                            <p> {item.details.slice(0,150)}... </p>
                                        </div>
                                        <div className="card_icons">
                                            <p className = "btn"><EditIcon style = {{color:"gray"}} /></p>
                                            <p className="btn"  
                                            onClick = {()=> {deletePost(item.slug)}}
                                            ><DeleteSweepIcon style = {{color:"gray"}} 
                                            onClick = {()=> {deletePost(item.slug)}}

                                            /></p>
                                        </div>
            
                                    </div>
            
                                    <hr className = "mt-5"/>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="pagination_wrapper">
                    <div className="pagination">
                        <p className = "btn" 
                            style = {{
                            backgroundColor:"rgb(160, 160, 160)",
                            borderRadius:"5px",
                            color:"white"
                            }}
                        >1</p>
                        <p className = "btn">2</p>
                        <p className = "btn">3</p>
                        <p className = "btn">4</p>
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

export default connect(null,mapDispatchToPropsFacebook) (Submitted);
