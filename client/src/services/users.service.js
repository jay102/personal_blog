
const usersRepository = (axios) => {

  const getAdminAvatar = async (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/admin/${id}`)
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
    getAdminAvatar
  }
}
export default usersRepository