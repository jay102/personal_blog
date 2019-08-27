import React, { Component } from 'react';
import SinglePostView from './SinglePostView'


class SinglePostContainer extends Component {
  state = {
    article: ""
  }
  render() {
    return (
      <SinglePostView />
    );
  }
}

export default SinglePostContainer;