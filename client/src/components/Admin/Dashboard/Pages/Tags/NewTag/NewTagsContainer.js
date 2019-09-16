import React, { Component } from 'react';
import NewTagsView from './NewTagsView'
import Card from '../../../../../Widgets/Card/Card'
import axios from 'axios'

class NewTagsContainer extends Component {
  state = {
    class: "",
    url: "",
    tag: "",
    error: false,
    success: false
  }
  handleInput = (e) => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    const data = {
      class: this.state.class,
      url: this.state.url,
      tag: this.state.tag
    }
    axios.post('/tags', data)
      .then(res => {
        this.setState({
          class: "",
          url: "",
          tag: "",
          success: !this.state.success,
        })
        this.props.refreshTags();
      })
      .catch(err => {
        if (err.response) {
          this.setState({ error: !this.state.error })
        }
      })
  }
  render() {
    return <Card
      title={`Add tags`}
      view={<NewTagsView {...this.state}
        handleInput={this.handleInput}
        submit={this.submit} />}
    />
  }
}

export default NewTagsContainer;