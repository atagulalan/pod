import Vue from 'vue'

Vue.mixin({
  data: function () {
    return {
      files: []
    }
  },
  methods: {
    getFiles() {
      return this.files
    },
    setFiles(files) {
      this.files = files
    }
  }
})
