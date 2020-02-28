<template>
  <v-dialog v-model="realOpener" width="38em" persistent scrollable>
    <v-card style="border-radius: 20px" color="#CD982B" dark>
      <v-card-title>
        <label style="margin-left: auto; margin-right: auto">Árticulos</label>
      </v-card-title>
        <v-avatar 
          color="#DFA85C" 
          size="160" 
          style="cursor: pointer; margin-left: auto; margin-right: auto" 
          @click="openFilesSelector"
        >
          <v-img :src="imageAsBase64"></v-img>
        </v-avatar>
      <v-card-text class="custom--scroll">
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
            <v-textarea
              label="Descripción"
              v-model="description"
              prepend-icon="mdi-comment"
              rounded dense filled counter
            >
            </v-textarea>
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
        <v-btn class="text-lowercase" color="blue darken-1" @click="handleAction" :loading="isLoading" rounded>
          {{ action === "create"? "crear": "actualizar" }}
        </v-btn>
        <v-btn v-if="action === 'update'" class="text-lowercase" color="warning" @click="deleteArticle" rounded>
          Eliminar
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
    isLoading: false,
    link: '',
    author: '',
    title: '',
    id: '',
    description: '',
    openStatus: false,
    statusMsg: '',
    statusType: 'error',
    chosenArticleImage: '', // This is used to catch image chosen from user pc. Object
    imageAsBase64: '', // This is used to show image. This is why is necesary convert it to base64
  }),
  props: [
    "open",
    "action",
    "articleData",
    "index"
  ],
  watch: {
    open(val){
      this.realOpener = val?val:true
    },
    articleData(data) {
      this.title = data.title
      this.link = data.link
      this.author = data.author
      this.imageAsBase64 = data.photo
      this.id = data._id
    }
  },
  methods:{
    createArticle() {
      this.isLoading = true
      request
        .createArticle(
          this.author, 
          this.link, 
          this.title, 
          this.chosenArticleImage, 
          this.description,
          this.getToken
        )
        .then(result => {
          this.statusMsg = result.msg
          this.statusType = "success"
          this.openStatus = !this.openStatus
          this.imageAsBase64 = result.imageUrl
          this.isLoading = false
        })
        .catch(err => {
          this.statusMsg = err.msg
          this.statusType = "error"
          this.openStatus = !this.openStatus
          this.isLoading = false
        })
    },
    deleteArticle(){
      this.isLoading = true
      request
        .deleteArticle(this.id, this.imageAsBase64, this.getToken)
        .then(result => {
          this.statusMsg = result.msg
          this.statusType = "success"
          this.openStatus = !this.openStatus
          this.isLoading = false
          this.$emit("delete", this.index)
        })
        .catch(err => {
          this.statusMsg = err.msg
          this.statusType = "error"
          this.openStatus = !this.openStatus
          this.isLoading = false
        })
    },
    updateArticle() {
      this.isLoading = true
      request
        .updateArticle(
          this.id, 
          this.articleData.photo, 
          this.chosenArticleImage, 
          this.title, 
          this.link, 
          this.author, 
          this.description, 
          this.getToken
        )
        .then(result => {
          this.statusMsg = result.msg
          this.statusType = "success"
          this.openStatus = !this.openStatus
          this.chosenArticleImage = ''
          this.imageAsBase64 = result.imageUrl
          this.isLoading = false
        })
        .catch(err => {
          this.statusMsg = err.msg
          this.statusType = "error"
          this.openStatus = !this.openStatus
          this.isLoading = false
        })
    },
    handleAction() {
      if(this.action === "create") this.createArticle()
      if(this.action === "update") this.updateArticle()
    },
    openFilesSelector() {
      this.$refs.file.click()
    },
    handleChosenFiles(image) {
      this.chosenArticleImage = image.srcElement.files[0]
      this.imageToBase64(this.chosenArticleImage, this.setImageAsBase64Value)
    },
    setImageAsBase64Value(base64) {
      this.imageAsBase64 = base64
    },
    imageToBase64(image, callback) {
      const reader = new FileReader()
      reader.onloadend = function() {
        callback(reader.result)
      }
      reader.readAsDataURL(image)
    }
  },
  computed:{
    ...mapGetters(['getToken'])
  },
  components:{
    Status
  }  
} 
</script>

<style scope>

.custom--scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-track {
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-thumb {
  background: #DFA85C; 
}
.custom--scroll::-webkit-scrollbar-thumb:hover {
  background: lightgrey; 
}
</style>
