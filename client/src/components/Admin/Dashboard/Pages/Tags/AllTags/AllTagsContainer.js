import React, { Component } from 'react';
import AllTagsView from './AllTagsView'
import Card from '../../../../../Widgets/Card/Card'
import articlesRepository from '../../../../../../services/articles.service'
import axios from 'axios'
import Modal from '../../../../../Widgets/Modal/Modal';

const repository = articlesRepository(axios)
class AllTagsContainer extends Component {
  state = {
    tags: [],
    isEdited: false,
    error: false,
    success: false,
    tag: "",
    url: "",
    class: "",
    tag_id: ""
  }
  componentDidMount() {
    this.getTags()
  }
  getTags = async () => {
    try {
      const data = await repository.getTags();
      this.setState({ tags: data })
      this.props.setRefresh();
    } catch (err) {
      console.log(err)
    }
  }

  deleteTag = (e, id) => {
    e.preventDefault();
    const qst = window.confirm('Delete tag?')
    if (qst) {
      axios.delete('/tags', { data: { id: id } })
        .then(res => {
          alert(res.data.message)
          this.getTags()
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
          }
        })
    } else {
      return;
    }



  }
  handleInput = (e) => {
    const { name } = e.target
    this.setState({ [name]: e.target.value })
  }
  forEdit = (data) => {
    this.setState(
      {
        tag_id: data.id,
        tag: data.tag,
        url: data.url,
        class: data.class
      })
  }
  editTag = () => {
    const data = {
      id: this.state.tag_id,
      tag: this.state.tag,
      url: this.state.url,
      class: this.state.class
    }
    axios.put('/tags', data)
      .then(res => {
        console.log(res.data)
        this.setState({
          tag: "",
          url: "",
          class: "",
          success: !this.state.success
        })
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
          this.setState({ error: !this.state.error })
        }
      })
  }
  refresh = () => {
    this.getTags();
  }
  render = () => {
    if (this.props.refresh) {
      this.refresh()
    }
    const { tags } = this.state;
    const list = tags.map(tags => {
      return (
        <li className="list-group-item">{tags.tag}
          <i className="fas fa-marker edit_icon" onClick={() => this.forEdit(tags)} data-toggle="modal" data-target="#edit_tag"></i>
          <i className="far fa-trash-alt delete_icon" onClick={(e) => this.deleteTag(e, tags.id)}></i>
        </li>
      );
    })
    return (
      <>
        <Card
          title={`All tags`}
          view={<AllTagsView tags={list} />}
        />
        <Modal
          {...this.state}
          submit={this.editTag}
          handleInput={this.handleInput}
          modalTitle={"Edit tag"}
          modalId={"edit_tag"} />
      </>
    )
  }
}

export default AllTagsContainer;