<template>
  <div class="baseWrapper">
    <Container
      :get-child-payload="getOpcode"
      behaviour="copy"
      group-name="1"
      :drag-handle-selector="'.cmd'"
    >
      <Draggable v-for="item in opcodes" :key="item.id">
        <div class="draggable-item">
          <div :style="item.style" class="cmd">{{ item.text }}</div>
          <div :style="item.style" class="deger dontshow" />
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  components: {
    Container,
    Draggable,
  },
  props: {
    opcodes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getOpcode(index) {
      return this.opcodes[index]
    },
  },
}
</script>

<style lang="scss">
.baseWrapper {
  width: 230px;
  border-radius: 20px;
  height: 510px;
  .smooth-dnd-container {
    padding-left: 10px;
  }
}
</style>
