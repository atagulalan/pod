export default function (obj) {
  obj.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      obj.app.accessiblePluginModal.show('authModal')
    }
  })
}
