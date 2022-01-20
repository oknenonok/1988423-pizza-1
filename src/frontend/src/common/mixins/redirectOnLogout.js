import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Auth", ["user"]),
  },

  created() {
    if (!this.user) {
      this.$router.push("/");
    }
  },

  watch: {
    user(newUser) {
      if (!newUser) {
        this.$router.push("/");
      }
    }
  },
};
