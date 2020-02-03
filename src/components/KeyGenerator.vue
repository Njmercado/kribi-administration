<template>
  <v-dialog width="20em" v-model="realOpen">
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
              placeholder="Contraseña"
              label="Contraseña"
              color="teal"
              type="password"
              @keyup.enter="createHash"
              append-icon="mdi-key"
              v-model="password"
              rounded filled dense
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto">
              <v-text-field
                style="cursor: pointer"
                class="text-lowercase"
                v-model="key"
                :disabled="keyButtonDisable"
                @click="copyCodeToClipboar"
                id="hash"
                rounded filled dense readonly
              ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>    
    <Status :open="openStatusModal" :content="statusModalMsg" :type="statusModalType"></Status>
  </v-dialog>
</template>

<script>
import server from '../controller/serverRequest'
import Status from '../components/ModalStatus'
import {mapGetters} from 'vuex'

export default {

  name: "KeyGenerator",
  props:[
    'open'
  ],
  data: () => ({
    realOpen: false,
    key:"estenoesuncodigodeconfirmacion",
    keyButtonDisable: true,
    password: '',
    openStatusModal: false,
    statusModalMsg: '',
    statusModalType: 'error'
  }),
  watch: {
    open: function(){
      this.realOpen = true
    }
  },
  methods:{
    copyCodeToClipboar(){
      if(!this.keyButtonDisable){
        document.getElementById('hash').select()
        document.execCommand('copy')
        this.statusModalMsg = 'Code has been copied'
        this.statusModalType = 'success'
        this.openStatusModal = !this.openStatusModal
      }
    },
    createHash(){
      server.createHash(this.getEmail, this.password, this.getToken) 
      .then(result => {
        this.keyButtonDisable = false
        this.key = result.hash
        this.statusModalMsg = 'Hash created correctly, please prease over hash to copied'
        this.statusModalType = 'success'
        this.openStatusModal = !this.openStatusModal
      })
      .catch(err => {
        this.statusModalMsg = err.msg
        this.statusModalType = 'error'
        this.openStatusModal = !this.openStatusModal
      })
    }
  },
  computed: {
    ...mapGetters(['getEmail', 'getToken'])
  },
  components: {
    Status
  }
} 
</script>
