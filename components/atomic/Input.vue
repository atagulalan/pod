<template>
  <div
    :class="['inputWrapper', error ? 'error' : '']"
    :style="`width:${width}px;` + (center ? 'margin:0 auto;' : '')"
  >
    <div
      :class="[
        'inputBox',
        leading ? 'leading' : '',
        trailing ? 'trailing' : '',
        focus ? 'focus' : '',
        error ? 'error' : ''
      ]"
    >
      <Icon v-if="leading" :i="leading" :size="24" class="leading" />
      <input
        :name="name"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        :type="type"
        placeholder=" "
        :value="value"
        @input="updateValue($event.target.value)"
        @focus="focusInput()"
        @blur="blurInput()"
        @keypress.enter="submit"
      />
      <label :for="name">
        {{ placeholder }}<span v-if="error && required">*</span>
      </label>
      <Icon v-if="trailing" :i="trailing" :size="24" class="trailing" />
    </div>
    <div v-if="helper" class="helper">
      {{ helper }}
    </div>
    <div v-if="maxlength" class="max">
      <span class="characters">{{ message ? message.length : 0 }}</span> /
      {{ maxlength }}
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    Icon
  },
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
    error: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    helper: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    },
    leading: {
      type: String,
      default: ''
    },
    trailing: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 350
    },
    value: {
      type: String,
      default: ''
    },
    submit: {
      type: Function,
      default: () => {}
    },
    errorHandler: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      message: '',
      focus: false
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('resolveError', this.errorHandler)
      this.$emit('input', value)
    },
    focusInput() {
      this.focus = true
    },
    blurInput() {
      this.focus = false
    }
  }
}
</script>

<style lang="scss">
.inputWrapper {
  height: auto;
  overflow: hidden;
  padding: 20px 2px 2px;

  &.error {
    .inputBox,
    .inputBox:hover {
      box-shadow: 0px 0px 0px 1px #b00020;
    }
    .inputBox.focus {
      box-shadow: 0px 0px 0px 2px #b00020;
    }
    .helper,
    .inputBox label {
      color: #b00020;
    }
  }

  .inputBox {
    box-shadow: 0px 0px 0px 1px #f3f3f3;
    background: #f3f3f3;
    border-radius: 20px;
    width: 100%;
    position: relative;
    height: 56px;
    transition: 0.3s box-shadow;

    &.focus,
    &.focus:hover {
      box-shadow: 0px 0px 0px 2px #6f9941;
    }

    &.focus label,
    &.focus input:focus + label {
      color: #6f9941;
    }

    &:hover {
      box-shadow: 0px 0px 0px 1px #c2c2c2;
    }

    label {
      position: absolute;
      height: 18px;
      line-height: 18px;
      top: 19px;
      left: 16px;
      background: transparent;
      transition: 0.2s all;
      font-weight: 400;
      pointer-events: none;
    }

    svg {
      position: absolute;
      top: 16px;
      stroke: #757575;
      cursor: text;

      &.leading {
        left: 16px;
      }

      &.trailing {
        right: 16px;
      }
    }

    input {
      width: 100%;
      border: 0;
      padding: 12px 16px;
      cursor: text;
      height: 56px;
      background: transparent;
      border-radius: 20px;
      &:focus + label,
      &:not(:placeholder-shown) + label {
        left: 10px;
        font-size: 9pt;
        top: -20px;
        padding: 0 5px;
        color: #757575;
      }
    }

    &.leading {
      input {
        padding-left: 48px;
      }
      label {
        left: 48px;
      }
    }

    &.trailing {
      input {
        padding-right: 48px;
      }
    }
  }

  .helper {
    float: left;
    padding: 0 16px;
    font-size: 9pt;
    color: rgba(0, 0, 0, 0.6);
    padding-top: 3px;
    line-height: 19px;
    max-width: calc(100% - 80px);
    word-break: break-word;
  }

  .max {
    float: right;
    padding: 0 16px;
    font-size: 9pt;
    color: rgba(0, 0, 0, 0.6);
    padding-top: 3px;
    line-height: 19px;
  }
}
</style>
