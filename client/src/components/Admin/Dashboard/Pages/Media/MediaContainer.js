import React, { Component } from 'react';
import axios from 'axios';

//import spinner 
import Spinner from '../../../../Widgets/Spinner/spinner';

// import service
import mediaservice from '../../../../../services/media.service';

// import view
import MediaView from './MediaView';

const mediaService = mediaservice(axios);
class Media extends Component {
  state = {
    media: []
  }

  componentDidMount() {
    this.getMedia();
  }

  getMedia = async () => {
    try {
      const result = await mediaService.getAllMedia();
      console.log(result)
      this.setState({ media: result })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const { media } = this.state;
    if (media !== undefined || media.length !== 0) {
      const allmedia = media.map(t => {
        return (
          <h1>Hello</h1>
        );
      });
    }


    // const Allmedia = media.map(media => {
    //   return (
    //     <div class="col-md-4">
    //       <div class="card mb-4 shadow-sm">
    //         <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
    //         <div class="card-body">
    //           <div class="d-flex justify-content-between align-items-center">
    //             <div class="btn-group">
    //               <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
    //               <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // })
    if (media.length === 0 || media === undefined) {
      return <Spinner />
    } else {
      return (
        <MediaView
          media={media} />
      );
    }

  }
}

export default Media;