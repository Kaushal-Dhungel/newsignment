import React, { useState, useEffect } from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import axios from 'axios';

const ViewArticle = (props) => {

    const slug = props.match.params.id;
    const onUpdateNav = props.onUpdateNav;
    const onUpdateForm = props.onUpdateForm;
    const [item,setItem] = useState([]);

    useEffect(() => {
        const fetchItem = async() => {

            const getParams = {
                params: {
                  whichshow:"all",
                }
            };

            await axios.get(`/api/blogdetail/${slug}`,getParams)
            .then(res => {
                console.log(res.data)
                setItem(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchItem();
        onUpdateNav("Write");
        onUpdateForm("clear","clear")
    },[])

    return (
        <>
            <div className="container mt-5">
                <div className="article_wrapper">

                    <div className="article_image_area">
                        <img src={item.thumbnail} alt="" />
                    </div>

                    <div className="header">
                        <span className="title">
                             <h3> {item.title} </h3> 
                        </span>

                        <span className="date">
                            <p> <i style = {{
                                color:"rgb(146, 146, 146)"
                            }}> 
                            {`${new Date(item.created).toLocaleString('default', { month: 'long' })} ${new Date(item.created).getDate()}`}
                            </i></p>
                            <p> <strong> 6 min read </strong> <StarRateIcon style = {{color:"grey",fontSize : "16px", marginBottom:"7px"}} /> </p>
                        </span>
                    </div>

                        <hr/>

                        <div className="text">
                            <p> {item.details} </p>
                        </div>

                        <div className="writer">
                            <p>
                            <AccountCircleIcon style = {{color:"rgb(202, 202, 202)", fontSize:"45"}}/> <i style = {{
                                color:"rgb(146, 146, 146)"
                            }}> by </i> <strong> {item.get_author_name} </strong>
                            </p>
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

export default connect(null,mapDispatchToPropsFacebook) (ViewArticle);
