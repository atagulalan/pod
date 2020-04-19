<template>
  <div>
    <AuthModal />
    <nuxt />
  </div>
</template>

<script>
import AuthModal from '~/components/modals/AuthModal.vue'
export default {
  components: {
    AuthModal,
  },
}
</script>

<style>
/* Modal */

.v--modal-block-scroll {
  overflow: hidden;
  width: 100vw;
}
.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 1;
}
.v--modal-overlay.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.v--modal-overlay .v--modal-background-click {
  width: 100%;
  min-height: 100%;
  height: auto;
}
.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.v--modal-overlay.scrollable .v--modal-box {
  margin-bottom: 2px;
}
.v--modal {
  background-color: white;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}
.v--modal.v--modal-fullscreen {
  width: 100vw;
  height: 100vh;
  margin: 0;
  left: 0;
  top: 0;
}
.v--modal-top-right {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}
.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}
.nice-modal-fade-enter-active,
.nice-modal-fade-leave-active {
  transition: all 0.4s;
}
.nice-modal-fade-enter,
.nice-modal-fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}

/* General */
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
