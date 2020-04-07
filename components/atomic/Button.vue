<template>
  <div
    :style="`width:${width};` + (center ? 'text-align:center;' : '')"
    :class="['buttonWrapper', loading ? 'loading' : '', size]"
  >
    <button
      :style="`color:${color};background:${background};`"
      @click="emitClick"
    >
      <Icon
        v-if="loading"
        :size="24"
        i="loading"
        class="rotate"
        stroke="#fff"
      />
      <slot v-else />
    </button>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    Icon
  },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    center: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: '#fff'
    },
    background: {
      type: String,
      default: 'rgba(111, 153, 65, 1)'
    }
  },
  methods: {
    emitClick() {
      if (!this.loading) {
        this.$emit('click', this.click)
      }
    }
  }
}
</script>

<style lang="scss">
.buttonWrapper {
  &.big {
    button {
      font-size: 24pt;
      font-weight: 600;
      padding: 16pt 40pt;
    }
  }

  &.huge {
    button {
      font-size: 36pt;
      font-weight: 600;
      padding: 24pt 40pt;
    }
  }

  button {
    font-weight: 500;
    border: 0;
    border-radius: 500px;
    padding: 8pt 40pt;
    font-size: 14pt;
    cursor: pointer;
    transition: 0.3s filter;

    &:hover {
      filter: brightness(1.1);
    }

    svg {
      stroke: #fff;
    }
  }
}
</style>
