<template>
  <div class="elementContainer" :style="`background-color: ${bgColor}`">
    <div class="accountWrapper">
      <h1 class="flex:1">{{ rank }}</h1>
      <div>
        <Icon
          v-if="rank === 1"
          :size="26"
          i="diamond"
          stroke="#f1c40f"
          stroke-width="2"
        />
        <Icon
          v-else-if="rank === 2"
          :size="26"
          i="diamond"
          stroke="#bdc3c7"
          stroke-width="2"
        />
        <Icon
          v-else-if="rank === 3"
          :size="26"
          i="diamond"
          stroke="#e67e22"
          stroke-width="2"
        />

        <Icon
          v-else
          :size="26"
          i="diamond"
          :stroke="bgColor"
          stroke-width="2"
        />
      </div>
      <h1 class="flex:1">{{ username }}</h1>
    </div>
    <div class="resultWrapper">
      <h1 class="element">{{ numofline }}</h1>
      <h1 class="element">{{ numofexec }}</h1>
      <h1 class="element">{{ duration }}</h1>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon'
export default {
  components: {
    Icon,
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
    duration: {
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
  }

  .resultWrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  h1 {
    font-size: 16pt;
    font-family: 'Quicksand', sans-serif;
  }
}
</style>
