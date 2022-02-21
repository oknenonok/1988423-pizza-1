import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";
import { IUser } from "../types";

@Component({
  computed: {
    ...mapState("Auth", ["user"]),
  },
})
export default class RedirectOnLogout extends Vue {
  user!: IUser | null;

  created() {
    if (!this.user) {
      this.$router.push("/");
    }
  }

  @Watch("user")
  onUserChanged(newUser: IUser | null) {
    if (!newUser) {
      this.$router.push("/");
    }
  }
}
