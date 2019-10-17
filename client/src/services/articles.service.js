const articleRepository = (axios) => {

  const getArticles = (page) => {

    return new Promise((resolve, reject) => {
      axios.get(`posts/`)
        .then(res => {
          //successful return of posts
          resolve(res.data.Posts)
        })
        .catch(err => {
          if (err.response) {
            reject(err.response)
          }
        })
    })
  }

  const getArticle = (articleUrl) => {
    return new Promise((resolve, reject) => {
      axios.get(`/posts/tag/${articleUrl}`)
        .then(res => resolve(res.data.article))
        .catch(err => {
          if (err.response) {
            reject(err.response)
          }
        })

    });
  }

  const getArticlesByTag = (tag, pageNumber) => {
    return new Promise((resolve, reject) => {
      axios.get(`/tags/${tag}`)
        .then(res => {
          resolve(res.data.articles)
        })
        .catch(err => {
          if (err.response) {
            reject(err.response)
          }
        })
    })
  }
  const getTags = () => {

    return new Promise((resolve, reject) => {

      axios.get('/tags').then(res => {
        resolve(res.data.tags)
      }).catch(err => {
        if (err.response) {
          reject(err.response)
        }
      })
    })
  }


  return {
    getArticles,
    getArticle,
    getArticlesByTag,
    getTags
  }
}

export default articleRepository;