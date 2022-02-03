<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        Мои данные
      </h1>
    </div>

    <ProfileCard />

    <ProfileAddress
      v-for="(address, index) in addresses"
      :key="address.id"
      :address="address"
      :index="index+1"
    />

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="addAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from "vuex";
import { ADD_ADDRESS } from "@/store/mutations-types";
import ProfileCard from "@/modules/profile/components/ProfileCard";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import redirectOnLogout from "@/common/mixins/redirectOnLogout";
import { auth } from "@/middlewares";

export default {
  name: "Profile",
  title: "Профиль",
  layout: "AppLayoutAccount",
  middlewares: [auth],

  components: {
    ProfileCard,
    ProfileAddress,
  },

  mixins: [
    redirectOnLogout,
  ],

  computed: {
    ...mapState("Addresses", ["addresses"]),
  },

  created() {
    this.$store.dispatch("Addresses/init");
  },

  methods: {
    ...mapMutations("Addresses", {
      addAddress: ADD_ADDRESS,
    }),
  }
};
</script>
