import React from 'react';
const CheckBox = (props) => {
  return (
    <div className="form-check checkbox">
      <label className="form-check-label">
        <input type="checkbox"
          className="form-check-input"
          onChange={props.handleSelection}
          name={props.title} />
        {props.title}
      </label>
    </div>);
}
export default CheckBox;