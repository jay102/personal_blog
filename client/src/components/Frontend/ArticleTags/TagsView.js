import React from 'react';
import ArticleView from '../Articles/ArticleView'

const TagsView = (props) => {
  const img = `${window.location.origin}/img/tags/node.jpg`;
  const tagStyle = {
    backgroundImage: `url(${img})`,
  }

  const data = {
    header: `All Things Tagged ${props.tag}`,
    subtitle: "",
  }
  return (
    <>
      <ArticleView
        data={data}
        header_style="masthead tag"
        Posts={props.Posts}
        mystyle={tagStyle}
      />
    </>
  );
}

export default TagsView;