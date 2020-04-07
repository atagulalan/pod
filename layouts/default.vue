<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    /*
    if (!this.$store.state.localStorage.user.initialized) {
      this.createAnonymousUser()
    }
    */
  },
  methods: {
    /*
    async createAnonymousUser() {
      const user = await this.$axios.$post('/api/u/anonymous')
      // eslint-disable-next-line no-console
      console.log('User created: ', user)
      this.$store.commit('localStorage/setUser', {
        ...user.returnObject,
        initialized: true
      })
    }
    */
  }
}
</script>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body.modal-open {
  overflow: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Quicksand', sans-serif;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

*:focus {
  outline: 0;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 17px;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 17px 17px #6f9941;
  border: 7px solid transparent;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 17px 17px rgba(0, 0, 0, 0.05);
  border: 7px solid transparent;
}
::selection {
  background: #6f9941;
  color: #000;
}
</style>
