<template>
  <div>
  <v-dialog width="20em" v-model="realOpener">
    <v-card style="border-radius: 16px">
      <v-container>
        <v-row justify="center" style="margin: 3vh 0 6vh 0;">
          <v-avatar color="teal" size="4em">
            <v-icon dark>
              mdi-key
            </v-icon>
          </v-avatar>
        </v-row>

        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              label="Contraseña actual"
              color="teal"
              type="password"
              append-icon="mdi-key"
              v-model="oldPassword"
              rounded filled dense
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              label="Nueva contraseña"
              :type="typeFileTextForNewPassword? 'password': 'text'"
              v-model="newPassword"
              color="warning"
              append-icon="mdi-eye"
              @click:append="typeFileTextForNewPassword = !typeFileTextForNewPassword"
              rounded filled dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-btn class="text-lowercase" color="teal" @click="changePassword" :loading="processingPasswordChange" small dark>
            cambiar contraseña
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
    <Status
      :open="openStatus"
      :content="statusMsg"
      :type="statusType"
    ></Status>  
  </div>
</template>

<script>

import { users as Users } from '../controller/Server/index.js'
import Status from './ModalStatus.vue'
import {mapGetters} from 'vuex'

export default {
  name: "ModalChangePassword",
  data: () => ({
    realOpener: false,
    oldPassword: '',
    newPassword: '',
    typeFileTextForNewPassword: true,
    openStatus: false,
    statusMsg: '',
    statusType: 'error',
    processingPasswordChange: false
  }),
  props: [
    "open"
  ],
  watch: {
    open(val){
      this.realOpener = val? val: true
    }
  },
  computed: {
    ...mapGetters(["getToken", "getEmail"])
  },
  methods:{
    changePassword() {
      this.processingPasswordChange = true
      Users
        .changeUserPassword(this.getEmail, this.oldPassword, this.newPassword, this.getToken)
        .then(result => {
          this.statusMsg = result.message
          this.statusType = "success"
          this.openStatus = !this.openStatus 
          this.processingPasswordChange = false
          this.newPassword = ''
          this.oldPassword = ''
        })
        .catch(err => {
          this.statusMsg = err.message
          this.statusType = "error"
          this.openStatus = !this.openStatus 
          this.processingPasswordChange = false
          this.newPassword = ''
          this.oldPassword = ''
        })
    }
  },
  components:{
    Status
  }  
} 
</script>

