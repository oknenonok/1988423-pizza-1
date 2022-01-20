<template>
  <div class="user">
    <picture>
      <img
        :src="user.avatar"
        :alt="user.name"
        width="72"
        height="72"
      >
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileCard",

  computed: {
    ...mapState("Auth", ["user"]),
  },

};
</script>
