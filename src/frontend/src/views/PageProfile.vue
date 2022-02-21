<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileCard />

    <ProfileAddress
      v-for="(address, index) in addresses"
      :key="address.id"
      :address="address"
      :index="index + 1"
    />

    <div class="layout__button">
      <AppButton
        class="button--border"
        caption="Добавить новый адрес"
        @click="addAddress"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { mapState, mapMutations } from "vuex";
import { ADD_ADDRESS } from "@/store/mutations-types";
import ProfileCard from "@/modules/profile/components/ProfileCard.vue";
import ProfileAddress from "@/modules/profile/components/ProfileAddress.vue";
import RedirectOnLogout from "@/common/mixins/redirectOnLogout";
import { auth } from "@/middlewares";

@Component({
  components: {
    ProfileCard,
    ProfileAddress,
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),
  },

  methods: {
    ...mapMutations("Addresses", {
      addAddress: ADD_ADDRESS,
    }),
  },
})
export default class PageProfile extends mixins(RedirectOnLogout) {
  title = "Профиль";
  layout = "AppLayoutAccount";
  middlewares = [auth];

  created() {
    this.$store.dispatch("Addresses/init");
  }
}
</script>
