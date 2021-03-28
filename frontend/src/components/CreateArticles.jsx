import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";

const CreateArticles = ({onUpdateNav,onUpdateForm}) => {

    const [image, setImage] = useState(null)

    useEffect(() => {
        onUpdateNav("Publish");
        onUpdateForm("clear","clear");
    },[])

    const formChange = (e) => {
        if (e.target.name === "title") {
            onUpdateForm("title",e.target.value)
        }
        else {
            onUpdateForm("details",e.target.value)
        }
    }

    const imgChange = (e) => {

        onUpdateForm("thumbnail",e.target.files[0])

        setImage(); // this clears the previously selected imgs
    
        if (e.target.files) {
          const fileArray = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
          );
        //   setImgs((prevImgs) => prevImgs.concat(fileArray));
        setImage(fileArray)
          Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
        }
      };

    const renderImgs = (photo) => {
          return <img src={photo} key={photo} alt="" />;
      };

    return (
        <>
            <div className="container">
                <div className="article_form">
                    <label htmlFor="">TITLE</label>
                    <input type="text" name="title" id="" onChange = {formChange}/>

                    <label htmlFor="">DESCRIPTION</label>
                    <textarea name="details"  name="" id="" cols="30" rows="15" onChange = {formChange}></textarea>

                    <div className = "image_area">
                        <span style = {{
                            width:"100%",
                            display:"flex",
                            // gap:"1rem",
                            alignItems:"center",
                            
                        }}>
                            <label htmlFor="imageUpload"> Upload Image</label>
                            <input type="file" id = "imageUpload" name = "thumbnail"
                            onChange = {imgChange}
                            />
                        </span>

                        {/* <span className = "article_img">

                        </span> */}
                        {/* <center> */}
                        {
                            image === null ? null:
                            <div className = "article_form_image">
                                <img src={image} alt=".." />
                                <button className="btn btn-secondary"
                                onClick = {()=> {
                                    setImage(null);
                                }}
                                ><DeleteOutlineIcon /></button>
                            </div>
                        }
                        {/* </center> */}

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

export default connect(null,mapDispatchToPropsFacebook) (CreateArticles);