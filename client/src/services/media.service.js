const mediaRepository = (axios) => {

  const getAllMedia = () => {
    return new Promise((resolve, reject) => {
      axios.get(`/media/`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          if (err.response) {
            reject(err.response)
          }
        })
    })
  }

  return {
    getAllMedia
  }
}
export default mediaRepository;