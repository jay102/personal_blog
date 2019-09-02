import React from 'react';
class Card extends React.Component {
  render() {
    return (
      <div className="wrapper card my-4">
        <h5 className="card-header">{this.props.title}</h5>
        <div className={`card-body ${this.props.bg_style}`}>
          <div className="row">
            {this.props.view}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;