<template>
  <div :class="type">
    <div
      v-for="(item, i) in items.length
        ? items.filter((el) => el.type === type)
        : []"
      :key="`${type}-${i}`"
      :class="`${type}Container ${weared[type] === item.key ? 'active' : ''}`"
      @click="wearItem(type, item.key)"
    >
      <div class="selected">
        <Icon :size="30" i="ok" stroke="#fff" :stroke-width="4" />
      </div>
      <div
        :class="`${type}Item`"
        :style="`background-image:url(/img/character/thumbnails/${type}/${item.key}.svg)`"
      ></div>
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
    type: {
      type: String,
      default: '',
    },
    weared: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    wearItem: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
