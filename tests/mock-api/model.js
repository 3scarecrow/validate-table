module.exports = {
  successModel(data) {
    return {
      is_success: true,
      result: data
    }
  },
  errorModel(msg, code) {
    return {
      error_info: {
        code: code || 500,
        msg
      },
      is_success: false
    }
  }
}