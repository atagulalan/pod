<template>
  <div
    :style="`width:${width};` + (center ? 'text-align:center;' : '')"
    :class="['buttonWrapper', loading ? 'loading' : '', size]"
  >
    <button
      :style="`color:${color};background:${background};`"
      :disabled="disabled"
      @click="emitClick"
    >
      <div class="loadingIcon">
        <Icon
          :size="size === 'big' ? 44 : 24"
          i="loading"
          class="rotate"
          stroke="#fff"
        />
      </div>
      <span class="slot">
        <slot />
      </span>
    </button>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    width: {
      type: String,
      default: 'auto',
    },
    center: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
    },
    color: {
      type: String,
      default: '#fff',
    },
    background: {
      type: String,
      default: 'rgba(111, 153, 65, 1)',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick() {
      if (!this.loading) {
        this.$emit('click', this.click)
      }
    },
  },
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

  &.fit {
    button {
      padding: 8pt 20pt;
    }
  }

  &.huge {
    button {
      font-size: 36pt;
      font-weight: 600;
      padding: 24pt 40pt;
    }
  }

  &.loading {
    button {
      .loadingIcon {
        opacity: 1;
      }
      .slot {
        opacity: 0;
      }
    }
  }

  button {
    font-weight: 500;
    border: 0;
    border-radius: 500px;
    padding: 8pt 40pt;
    font-size: 14pt;
    position: relative;
    cursor: pointer;
    transition: 0.3s filter, 0.3s background;

    .loadingIcon {
      opacity: 0;
      position: absolute;
      stroke: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.3s all;
    }

    .slot {
      transition: 0.3s all;
    }

    &:hover {
      filter: brightness(1.1);
    }
    &:disabled {
      filter: grayscale(1);
    }
  }
}
</style>
