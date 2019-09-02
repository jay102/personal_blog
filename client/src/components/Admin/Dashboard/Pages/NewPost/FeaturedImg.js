import React from 'react';
const FeaturedImg = (props) => {

  // handle image
  let handleChange = (event) => {
    props.setImage(event.target.files[0])
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {props.featured_img ? <img src={props.featured_img} alt="preview" height="100px" width="210px" style={{ objectFit: "contain" }} /> : null}
    </div>
  );
}
export default FeaturedImg;