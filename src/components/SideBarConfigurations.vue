<template>
  <div style="height: 100%">
    <v-navigation-drawer
      v-model="realOpener"
      :absolute="onMovil"
      :temporary="onMovil"
      :permanent="!onMovil"
      color="#8c3420"
      dark
    >
      <v-list>
        <v-list-item>
          <v-img
            style="border-radius: 32em; margin-left: .4em; cursor: pointer"
            :src="getImage"
            @click="openFileSelector"
          >
            <template v-slot:placeholder>
              <v-row align="center" justify="center" class="fill-height ma-0">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <input type="file" ref="file" hidden @change="handleSelectedFile" />
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{getName}}</v-list-item-title>
            <v-list-item-subtitle>{{getEmail}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link @click="openChangePasswordModal = !openChangePasswordModal">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cambiar Contraseña</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openKeyGeneratorModal = !openKeyGeneratorModal">
          <v-list-item-icon>
            <v-icon>mdi-key</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Generar Key</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Historial</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <ChangePassword :open="openChangePasswordModal"></ChangePassword>
    <KeyGenerator :open="openKeyGeneratorModal"></KeyGenerator>
    <Status :open="openStatus" :content="statusMsg" :type="statusType"></Status>
  </div>
</template>

<script>
import ChangePassword from "../components/ModalChangePassword.vue";
import KeyGenerator from "../components/KeyGenerator.vue";
import request from "../controller/serverRequest.js";
import Status from "../components/ModalStatus.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SideBarConfigurations",
  data: () => ({
    expandable: true,
    onMovil: false,
    realOpener: false,
    statusMsg: "",
    statusType: "error",

    //Openers
    openChangePasswordModal: false,
    openKeyGeneratorModal: false,
    openStatus: false
  }),
  props: ["open"],
  watch: {
    open(val) {
      this.realOpener = val ? val : true;
    }
  },
  computed: {
    ...mapGetters(["getToken", "getName", "getEmail", "getImage"])
  },
  mounted() {
    if (
      /Mobi/i.test(navigator.userAgent) ||
      /Android/i.test(navigator.userAgent)
    ) {
      this.onMovil = true;
    }
  },
  methods: {
    ...mapMutations(["setToken", "setImage"]),
    logout() {
      this.setToken("");
      this.$router.push("/");
    },
    //File selectors
    openFileSelector() {
      this.$refs.file.click();
    },
    handleSelectedFile(image) {
      this.updateUserProfileImage(image.srcElement.files[0]);
    },
    updateUserProfileImage(chosenImage) {
      const pass = typeof chosenImage === "undefined" ? false : true;
      if (pass) {
        request
          .updateUserProfileImage(
            this.getEmail,
            chosenImage,
            this.getImage,
            this.getToken
          )
          .then(async result => {
            await this.setImage(result.imageUrl);
            this.statusMsg = result.msg;
            this.statusType = "success";
            this.openStatus = !this.openStatus;
          })
          .catch(err => {
            console.log("ERROR: ");
            console.log(err.response.data.msg);
            this.statusMsg = err.response.data.msg;
            this.statusType = "error";
            this.openStatus = !this.openStatus;
          });
      } else {
        console.log("whats up bitches!!!! (imagine bart saying this :v)");
      }
    }
    //End file selectors
  },
  components: {
    ChangePassword,
    KeyGenerator,
    Status
  }
};
</script>

