<template>
  <div class="initContainer">
    <div class="initWrapper">
      <div class="logo">
        <Logo />
      </div>
      <button
        :style="{ backgroundColor: '#46cb92' }"
        @click="selectSection('forests')"
      >
        Başla
      </button>
      <button
        :style="{ backgroundColor: '#ff3448' }"
        @click="selectSection('store')"
      >
        Dolap
      </button>
      <button
        :style="{ backgroundColor: '#00cde8' }"
        @click="selectSection('code')"
      >
        Amacımız
      </button>
      <button
        :style="{ backgroundColor: '#ffcf00' }"
        @click="selectSection('code')"
      >
        Jenerik
      </button>
      <button
        :style="{ backgroundColor: '#683F28' }"
        @click="selectSection('code')"
      >
        Çıkış
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '../components/atomic/Logo'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      money: 0,
    }
  },
  mounted() {},
  methods: {
    selectSection(section) {
      this.$router.push(`/${section}`)
    },
  },
}
</script>

<style lang="scss">
.initContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .initWrapper {
    width: 40vw;
    height: 60vh;
    margin: auto;
    margin-top: 180px;
    min-width: 400px;
    text-align: center;

    .logo {
      width: 144px;
      height: 200px;
      max-width: 500px;
      margin: auto;
    }

    button {
      border: 0;
      border-radius: 500px;
      cursor: pointer;
      font-size: 20pt;
      font-weight: 600;
      padding: 17pt 32pt;
      width: 90%;
      margin: 0 auto 20px;
      text-align: left;
      overflow: hidden;
      max-width: 500px;
      text-align: center;
      color: #fff;

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
