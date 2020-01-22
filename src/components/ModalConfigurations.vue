<template>
  <div>
    <v-dialog v-model="opener" width="32em">
      <template v-slot:activator=" { on } ">
        <v-icon v-on="on"></v-icon>
      </template>

      <v-card>
        <v-img
          style="background-color: grey"
          :src="image"
          class="align-end"
          height="16em"
          @click="editProfileHandler"
        >
          <v-card-title class="name">{{ name }}</v-card-title>
        </v-img>
        <v-card-text class="text--primary" style="margin-top: 3vh">
          <div v-if="!editProfile">
            <v-btn style="margin-top: 1vh" class="text-capitalize" color="teal" block dark>
              <v-icon style="margin-right: 1vw" small>mdi-lock</v-icon>Cambiar Contraseña
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="teal"
              @click="showKeyGeneratorModal"
              block
              dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-key</v-icon>Generar Key
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="grey"
              @click="openRecordsView"
              block
              dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-history</v-icon>Historial
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="#8c3420"
              @click="logout"
              block
              dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-logout</v-icon>Salir
            </v-btn>
          </div>
          <div v-else>
            <v-row justify="end" style="margin-top: -1em">
              <v-btn color="teal" @click="editProfile = false" fab text small>
                <v-icon>mdi-undo-variant</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-textarea
                label="Description"
                color="teal"
                v-model="descriptionAux"
                filled
              >
              </v-textarea>
            </v-row>
            <v-row justify="end">
              <v-btn @click="updateUserDescription" color="teal" small dark>actualizar</v-btn>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal callers -->
    <KeyGenerator :open="openCloseKeyGeneratorModal"></KeyGenerator>
  </div>
</template>

<script>
import KeyGenerator from "../components/KeyGenerator.vue";
import { mapMutations } from "vuex";
import server from "../controller/serverRequest.js";

export default {
  name: "ModalConfigurations",
  data: () => ({
    opener: false,
    openCloseKeyGeneratorModal: false,
    editProfile: false,
    descriptionAux: ''
  }),
  props: ["open", "email", "name", "description", "token", "image"],
  watch: {
    open: function() {
      this.opener = true;
    },
  },
  mounted(){
    this.descriptionAux = this.description
  },
  methods: {
    ...mapMutations(["setToken"]),
    showKeyGeneratorModal() {
      this.openCloseKeyGeneratorModal = !this.openCloseKeyGeneratorModal;
    },
    openRecordsView() {
      this.$router.push("/records");
    },
    logout() {
      this.setToken("");
      this.$router.push("/");
    },
    editProfileHandler() {
      this.editProfile = true 
      // server.getInfo(this.email, this.token);
    },
    updateUserDescription() {
      console.log("dentro")
      server.updateUserDescription(this.email, this.descriptionAux, this.token)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    KeyGenerator
  }
};
</script>

<style>
.name {
  color: white;
  background-color: teal;
  width: auto;
  margin: 0 11vw 1vw 1vw;
  padding: 0.3vw;
  border-radius: 5px;
  font-size: 0.9em;
}
</style>
