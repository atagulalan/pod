<template>
  <div
    :style="`width:${width};` + (center ? 'text-align:center;' : '')"
    :class="['buttonWrapper', loading ? 'loading' : '']"
  >
    <button @click="emitClick">
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
    }
  },
  methods: {
    emitClick(...params) {
      if (!this.loading) {
        this.$emit('click', this.click)
      }
    }
  }
}
</script>

<style lang="scss">
.buttonWrapper {
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .rotate {
    animation: rotation 2s infinite linear;
  }

  button {
    color: #fff;
    font-weight: 500;
    border: 0;
    border-radius: 500px;
    padding: 8pt 40pt;
    font-size: 14pt;
    cursor: pointer;
    transition: 0.3s filter;
    background: rgba(111, 153, 65, 1);
    background: linear-gradient(
      135deg,
      rgba(111, 153, 65, 1) 0%,
      rgba(111, 153, 65, 1) 100%
    );

    &:hover {
      filter: brightness(1.1);
    }

    svg {
      stroke: #fff;
    }
  }
}
</style>
