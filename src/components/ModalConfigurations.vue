<template>
  <div>
    <v-dialog v-model="opener" width="32em">
      <v-card style="border-radius: 16px">
        <v-img
          style="background-color: grey"
          :src="imageAux"
          class="align-end"
          height="16em"
          @click="editProfileHandler"
        >
          <v-card-title class="name">{{ name }}</v-card-title>
        </v-img>
        <v-card-text class="text--primary" style="margin-top: 3vh">
          <div v-if="!editProfile">
            <v-btn style="margin-top: 1vh" class="text-capitalize" color="teal" @click="showChangePasswordModal" block dark>
              <v-icon style="margin-right: 1vw" small>mdi-lock</v-icon>Cambiar Contraseña
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="teal"
              @click="showKeyGeneratorModal"
              block dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-key</v-icon>Generar Key
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="grey"
              @click="openRecordsView"
              block dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-history</v-icon>Historial
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="#8c3420"
              @click="logout"
              block dark
            >
              <v-icon style="margin-right: 1vw" small>mdi-logout</v-icon>Salir
            </v-btn>
          </div>
          <!-- If user press over profile image then it gonna trigger user profile configurations. This -->
          <div v-else>
            <v-row justify="end" style="margin-top: -1em">
              <v-btn color="teal" @click="editProfile = false" fab text small>
                <v-icon>mdi-undo-variant</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="center" align="center" style="margin-bottom: 1em">
              <v-btn 
                class="text-capitalize" 
                color="teal" 
                @click="openFileSelector" 
                :loding="processingImageRequest" 
                dark small
              >
                cambiar imagen
              </v-btn>
              <input type="file" ref="file" hidden @change="handleSelectedFile">
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
              <v-btn 
                class="text-capitalize" 
                @click="updateUserDescription" 
                color="teal" 
                :loading="processingDescriptionRequest" 
                small dark
              >actualizar</v-btn>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal callers -->
    <KeyGenerator :open="openCloseKeyGeneratorModal"></KeyGenerator>
    <Status :open="openStatus" :content="statusMsg" :type="statusType"></Status>
    <ChangePassword
      :open="openChangePasswordModal"
    ></ChangePassword>
  </div>
</template>

<script>
import KeyGenerator from "../components/KeyGenerator.vue";
import ChangePassword from "../components/ModalChangePassword.vue";
import { mapMutations } from "vuex";
import server from "../controller/serverRequest.js";
import Status from '../components/ModalStatus.vue'

export default {
  name: "ModalConfigurations",
  data: () => ({
    opener: false,
    openCloseKeyGeneratorModal: false,
    openChangePasswordModal: false,
    editProfile: false,
    descriptionAux: '',
    imageAux: '',
    openStatus: false,
    statusMsg: '',
    statusType: 'error',
    processingImageRequest: false,
    processingDescriptionRequest: false,
  }),
  props: ["open", "email", "name", "description", "token", "image"],
  watch: {
    open: function() {
      this.opener = true;
    },
  },
  mounted(){
    this.descriptionAux = this.description
    this.imageAux = this.image
  },
  methods: {
    ...mapMutations(["setToken", "setDescription", "setImage"]),
    showKeyGeneratorModal() {
      this.openCloseKeyGeneratorModal = !this.openCloseKeyGeneratorModal;
    },
    showChangePasswordModal() {
      this.openChangePasswordModal = !this.openChangePasswordModal
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
      this.processingDescriptionRequest= true
      server
        .updateUserDescription(this.email, this.descriptionAux, this.token)
        .then(result => {
          this.setDescription(this.descriptionAux)
          this.statusMsg = result
          this.statusType = 'success'
          this.openStatus = !this.openStatus
          this.processingDescriptionRequest= false
        })
        .catch(err => {
          console.log(err)
          this.processingDescriptionRequest= false
        })
    },
    openFileSelector() {
      this.$refs.file.click()
    },
    handleSelectedFile(image) {
      this.updateUserProfileImage(image.srcElement.files[0])
    },
    updateUserProfileImage(chosenImage) {
      this.processingImageRequest = true
      server
        .updateUserProfileImage(this.email, chosenImage, this.imageAux, this.token)
        .then(result => {
          this.imageAux = result.imageUrl
          this.setImage(this.imageAux)
          this.statusMsg = result.msg
          this.statusType = 'success'
          this.openStatus = !this.openStatus
          this.processingImageRequest = false
        })
        .catch(err => {
          console.log(err)
          this.processingImageRequest = false
        })
    }
  },
  components: {
    KeyGenerator,
    Status,
    ChangePassword
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
