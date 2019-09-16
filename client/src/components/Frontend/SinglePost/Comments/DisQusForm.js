import React, { Component } from 'react';
class DisQusForm extends Component {

  componentDidMount() {
    this.disqus()
  }
  disqus = () => {
    var disqus_config = function () {
      this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = this.props.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function () { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://jaycodes-blog.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
    //Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
  }
  render() {
    return (
      <div className="card my-4">
        <div id="disqus_thread"></div>
      </div>
    );
  }

}
export default DisQusForm;