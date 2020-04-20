<template>
  <div :class="type">
    <div
      v-for="(item, i) in items.length
        ? items.filter((el) => el.type === type)
        : []"
      :key="`${type}-${i}`"
      :class="`${type}Container ${weared[type] === item.key ? 'active' : ''} ${
        !item.owned && item.cost !== 0 ? 'locked' : ''
      }`"
      @click="wearItem(type, item.key)"
    >
      <div class="selected">
        <Icon
          v-if="item.owned || item.cost === 0"
          :size="30"
          i="ok"
          stroke="#fff"
          :stroke-width="4"
        />
        <span v-else-if="weared[type] === item.key">
          {{ item.cost }}
        </span>
        <Icon
          v-else
          :size="26"
          i="lock"
          stroke="#fff"
          :stroke-width="3"
          style="margin-bottom: 4px;"
        />
      </div>
      <div
        :class="`${type}Item`"
        :style="`background-image:url(/img/character/thumbnails/${type}/${item.key.replace(
          /#/gi,
          '%23'
        )}.png)`"
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
    owned: {
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
