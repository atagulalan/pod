<template>
  <div :style="[`width:${width};`]" :class="['buttonWrapper']">
    <button
      :style="[`color:${color};`, `background:${background};`].join(' ')"
      @click="emitClick"
    >
      <div
        class="percentage"
        :style="`width: ${percentage}%;background:${background};`"
      ></div>
      <span class="slot">
        <slot />
      </span>
      <div class="fade"></div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'auto',
    },
    click: {
      type: Function,
      default: () => {},
    },
    color: {
      type: String,
      default: '#fff',
    },
    background: {
      type: String,
      default: 'rgba(111, 153, 65, 1)',
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    emitClick() {
      this.$emit('click', this.click)
    },
  },
}
</script>

<style lang="scss">
.buttonWrapper {
  button {
    border: 0;
    border-radius: 500px;
    position: relative;
    cursor: pointer;
    transition: 0.3s filter, 0.3s background, 0.3s -webkit-filter;
    font-size: 20pt;
    font-weight: 600;
    padding: 17pt 32pt;
    width: 90%;
    margin: 0 5% 20px;
    text-align: left;
    overflow: hidden;
    max-width: 500px;
    .percentage {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .fade {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(255, 255, 255, 0.4);
    }

    .slot {
      transition: 0.3s all;
      position: relative;
      z-index: 3;
    }

    &:hover {
      filter: brightness(1.1);
    }
  }
}
</style>
