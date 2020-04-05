<template>
  <div
    :style="center ? 'margin:0 auto;' : ''"
    :class="['checkboxWrapper', error ? 'error' : '']"
    @click="toggleValue()"
  >
    <input
      :name="name"
      :disabled="disabled"
      :required="required"
      :checked="value"
      type="checkbox"
    />
    <label :for="name">
      <span />
      <div class="background" />
      <div class="label">
        <slot />
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    default: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorHandler: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.default
    }
  },
  methods: {
    toggleValue() {
      this.value = !this.value
      this.$emit('resolveError', this.errorHandler, false)
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="scss">
.checkboxWrapper {
  transition: 0.4s opacity, 0.4s transform;
  display: inline-block;

  &.error {
    input[type='checkbox'] + label > span,
    input[type='checkbox'] + label:hover > span {
      border: 1px solid #b00020;
    }
    input[type='checkbox'] + label > .label {
      color: #b00020;
    }
  }

  @keyframes shrink-bounce {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes checkbox-check {
    0% {
      width: 0;
      height: 0;
      border-color: #fff;
      transform: translate3d(0px, 0, 0) rotate(45deg);
    }
    33% {
      width: 5px;
      height: 0;
      transform: translate3d(0px, 0, 0) rotate(45deg);
    }
    100% {
      width: 5px;
      height: 9px;
      border-color: #fff;
      transform: translate3d(0px, -10px, 0) rotate(45deg);
    }
  }

  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
    & + label {
      float: left;
      height: 21px;
      display: inline-block;
      position: relative;
      color: #9e9e9e;
      transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
      &:hover > span {
        border: 1px solid #c2c2c2;
      }
      & > span {
        vertical-align: middle;
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #f3f3f3;
        background: #f3f3f3;
        border-radius: 20px;
        cursor: pointer;
        transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
        float: left;
        position: relative;
        z-index: 2;
      }
      & > .background {
        background: linear-gradient(135deg, #6f9941 0%, #6f9941 100%);
        border-radius: 20px;
        z-index: 1;
        width: 20px;
        height: 20px;
        left: 0;
        top: 0;
        position: absolute;
        opacity: 0;
        transition: 250ms opacity;
      }
      & > .label {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
        font-size: 8pt;
        cursor: pointer;
        float: left;
      }
    }

    &:focus + label > span {
      background: rgba(255, 255, 255, 0.1);
    }

    &:checked + label > span {
      background: transparent;
      border: 10px solid transparent;
      animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
      &:before {
        content: '';
        position: absolute;
        top: 1.5px;
        left: -4.5px;
        width: 0;
        height: 0;
        border-right: 1.5px solid transparent;
        border-bottom: 1.5px solid transparent;
        transform: translate3d(0, 0, 0) rotate(45deg);
        transform-origin: 0 100%;
        animation: checkbox-check 200ms 100ms cubic-bezier(0.4, 0, 0.23, 1)
          forwards;
      }
    }
    &:checked + label > .background {
      animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
      opacity: 1;
    }
  }
}
</style>
