<template>
  <div
    class="draggable"
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, EFFECT_LINK } from "@/common/constants";

export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: [Number, String, Object],
      required: true,
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = EFFECT_LINK;
      dataTransfer.dropEffect = EFFECT_LINK;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

<style scoped>
.draggable {
  user-select: none;
}
</style>
