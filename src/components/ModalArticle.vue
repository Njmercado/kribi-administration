<template>
  <v-dialog  
    v-model="realOpener"
    width="38em"
    persistent
  >
    <v-card color="teal" dark>
      <v-card-title>
        <label style="margin-left: auto; margin-right: auto">Árticulos</label>
      </v-card-title>
      <v-card-text>
        <v-row justify="center" align="center">
          <v-avatar color="teal lighten-2" size="128" style="cursor: pointer" @click="openFilesSelector">
            <v-img 
              :src="articleImage"
            >
            </v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="Titulo"
              v-model="title"
              prepend-icon="mdi-tag-text"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="Autor"
              v-model="author"
              prepend-icon="mdi-account-circle"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="Link"
              v-model="link"
              prepend-icon="mdi-link"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-lowercase" color="blue darken-1" @click="createArticle" rounded>
          agregar
        </v-btn>
        <v-btn class="text-lowercase" color="#8c3420" @click="realOpener = !realOpener" rounded>
          cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
    <Status :open="openStatus" :content="statusMsg" :type="statusType"></Status>
    <!-- <input type="file" ref="file" hidden @change="handleChosenFiles"> -->
    <input type="file" ref="file" hidden @change="handleChosenFiles">
  </v-dialog>
</template>

<script>
import request from '../controller/serverRequest.js'
import {mapGetters} from 'vuex'
import Status from '../components/ModalStatus.vue'

export default {
  name: "ModalArticle",
  data: () => ({
    realOpener: false,
    link: '',
    author: '',
    title: '',
    openStatus: false,
    statusMsg: '',
    statusType: 'error',
    articleImage: '' 
  }),
  props: [
    "open"
  ],
  watch: {
    open(val){
      this.realOpener = val?val:true
    },
  },
  methods:{
    createArticle(image) {
      request
        .createArticle(this.author, this.link, this.title, image, this.getToken)
        .then(result => {
          this.statusMsg = result.msg
          this.statusType = "success"
          this.openStatus = !this.openStatus
        })
        .catch(err => {
          this.statusMsg = err.msg
          this.statusType = "error"
          this.openStatus = !this.openStatus
        })
    },
    openFilesSelector() {
      this.$refs.file.click()
    },
    handleChosenFiles(image) {
      this.createArticle(image.srcElement.files[0])
    },
  },
  computed:{
    ...mapGetters(['getToken'])
  },
  components:{
    Status
  }  
} 
</script>
