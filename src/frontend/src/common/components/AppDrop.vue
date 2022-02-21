<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

@Component
export default class AppDrop extends Vue {
  onDrop({ dataTransfer }: { dataTransfer: DataTransfer }) {
    const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
    if (payload) {
      const transferData = JSON.parse(
        dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
      );
      this.$emit("drop", transferData);
    }
  }
}
</script>
