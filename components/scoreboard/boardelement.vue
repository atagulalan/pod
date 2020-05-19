<template>
  <div class="elementContainer" :style="`background-color: ${bgColor}`">
    <div class="accountWrapper">
      <h1 class="flex:1">{{ rank }}</h1>
      <div>
        <img :src="avatar" class="avatar" />
      </div>
      <h1 class="flex:1">{{ username }}</h1>
    </div>
    <div class="resultWrapper">
      <h1 class="element">{{ numofline }}</h1>
      <h1 class="element">{{ numofexec }}</h1>
      <Stars :star-count="starCount" />
    </div>
  </div>
</template>

<script>
import Stars from '~/components/scoreboard/stars'
export default {
  components: {
    Stars,
  },
  props: {
    bgColor: {
      type: String,
      default: '#fff',
    },
    rank: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    numofline: {
      type: Number,
      default: 0,
    },
    numofexec: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.elementContainer {
  width: 100%;
  height: 80px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .accountWrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
  }

  .resultWrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  h1 {
    font-size: 16pt;
    font-family: 'Quicksand', sans-serif;
  }
}
</style>
