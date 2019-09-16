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
    getTags
  }
}

export default articleRepository;