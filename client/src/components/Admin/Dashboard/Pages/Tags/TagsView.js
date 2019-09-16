import React from 'react';
import AllTagsContainer from './AllTags/AllTagsContainer'
import NewTagsContainer from './NewTag/NewTagsContainer'
import { useState } from 'react'
const TagsView = (props) => {
  const [isRefresh, setRefresh] = useState(false);

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="container fluid">
        <div className="row">
          <div className="col">
            <AllTagsContainer {...props} refresh={isRefresh} setRefresh={() => setRefresh(false)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <NewTagsContainer refreshTags={() => setRefresh(true)} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default TagsView;