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

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import { DATA_TRANSFER_PAYLOAD, EFFECT_LINK } from "@/common/constants";

@Component
export default class AppDrag extends Vue {
  @Prop({ required: true }) readonly transferData!: number | string | object;
  @Prop({ default: true }) readonly draggable!: boolean;

  onDrag({ dataTransfer }: { dataTransfer: DataTransfer }) {
    dataTransfer.effectAllowed = EFFECT_LINK;
    dataTransfer.dropEffect = EFFECT_LINK;
    dataTransfer.setData(
      DATA_TRANSFER_PAYLOAD,
      JSON.stringify(this.transferData)
    );
  }
}
</script>

<style scoped>
.draggable {
  user-select: none;
}
</style>
