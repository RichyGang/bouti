import React from 'react';
import './index.css'

const PicturesForm = ({resource, handleNewResource}) => {

    return (
        <div>
            <h4>Upload and display picture</h4>
            {resource && resource.file && (
                <div>
                    <img src={URL.createObjectURL(resource.file)} alt="not fount" width={"250px"}/>
                    <br/>
                    <button onClick={()=>handleNewResource(null)}>Remove</button>
                </div>
            )}
            <br/>
            <input
                type="file"
                name="file"
                onChange={(event)=>{
                    handleNewResource(event)
                }}
            />
        </div>
    );
};

export default PicturesForm;
