<template>
  <v-container fluid>
    <v-row justify="start">
      <v-speed-dial
        style="margin-top: -1em"
        direction="right"
        transition="fade-transition"
        top left
        open-on-hover
      >
        <template v-slot:activator>
          <v-btn fab dark color="grey">
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
          <v-btn
            color="#CD982B"
            @click="showConfigurationModal"
            small fab dark
          >
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
        <v-btn
          color="blue darken-1"
          @click="showWordInformationModal('create')"
          small fab dark
        >
          <v-icon>mdi-alpha-w</v-icon>
        </v-btn>
        <v-btn
          color="#8c3420"
          @click="showWordInformationModal('create')"
          small fab dark
        >
          <v-icon>mdi-file-document-outline</v-icon>
        </v-btn>
      </v-speed-dial>

      <v-spacer></v-spacer>

      <!-- Top Words-->
      <v-btn 
        style="margin-right: 1em"
        color="teal"
        @click="openTopWordsSideBarHandler"
        fab dark
      >
        <v-icon large>
          mdi-numeric-10
        </v-icon>
      </v-btn>
      <!---->

    </v-row>
    <v-row justify="center" style="margin-top: 5vh">
      <v-col cols="12" md="3" lg="3" xl="3" xs="12" sm="8">
        <v-text-field
          v-model="wordToFind"
          label="Buscar palabra"
          color="grey"
          rounded filled dense
          >
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Words list searched by user -->
    <v-row justify="center" style="margin-top: 3vh">
      <v-col
        v-for="(word, index) in words"
        :key="index"
        cols="12" xl="auto" lg="auto" md="auto" sm="12" xs="12"
        @click="findWordInfo(word, index)"
      >
        <Word :word="word"></Word>
      </v-col>
    </v-row>

    <!-- Dialog callers -->
    <ModalConfigurations
      :open="openCloseConfigurationModal"
      :email="getEmail"
      :name="getName"
      :description="getDescription"
      :token="getToken"
      :image="getImage"
      >
    </ModalConfigurations>
    <ModalWordInformation
      :open="openCloseWordInformationModal"
      :action="modalWordInformationAction"
      :word="foundWord"
      :definitions="definitionFoundWord"
      :examples="examplesFoundWord"
      :language="wordLanguage"
      :wordIndex="wordIndex"
      @wordDeleted = "wordDeletedHandler"
    >
    </ModalWordInformation>
    <TopWords
      :open="openTopWordsSideBar"
      :palenque="topPalenqueWords"
      :espanol="topEspanolWords"
    >
    </TopWords>
  </v-container>
</template>

<script>

import Word from '../components/Word.vue'
import ModalConfigurations from '../components/ModalConfigurations.vue'
import ModalWordInformation from '../components/ModalWordInformation.vue'
import TopWords from '../components/TopWordsSideBar.vue'
import request from '../controller/serverRequest'
import {mapGetters} from 'vuex'

export default {

  name: "",
  data: () => ({
    words: [],
    openCloseConfigurationModal: false,
    openCloseWordInformationModal: false,
    openTopWordsSideBar: false,
    modalWordInformationAction: "update",
    wordToFind: '', // this variable is different to foundWord, because this is used to autocomplete
    foundWord: '', // and this is used to get the word when user click on one
    definitionFoundWord: [],
    examplesFoundWord: '',
    wordLanguage: '',
    wordIndex: '',
    topPalenqueWords: [],
    topEspanolWords: [],
  }),
  methods:{
    showConfigurationModal(){
      this.openCloseConfigurationModal= !this.openCloseConfigurationModal
    },
    showWordInformationModal(action, index){
      this.modalWordInformationAction = action 
      this.wordIndex = index
      this.openCloseWordInformationModal = !this.openCloseWordInformationModal
    },
    findWordInfo(word, index){
      request.getWordInfo(word)
      .then(result => {
        this.foundWord = result.palabra
        this.definitionFoundWord = result.definicion.split("/")
        this.examplesFoundWord = result.ejemplos
        this.wordLanguage = result.idioma
        this.showWordInformationModal('update', index)
      }).catch(err => {
        console.log(err)
      })
    },
    wordDeletedHandler(index){
      this.words.splice(index, 1) // Delete deleted word from found words
    },
    openTopWordsSideBarHandler(){

      if(this.topEspanolWords.length == 0){// Solo va a realizar la busqueda una sola vez

        request
          .getTopWords(this.getToken)
          .then(result => {
  
            this.topPalenqueWords = result.palenque
            this.topEspanolWords = result.espanol
            this.openTopWordsSideBar = !this.openTopWordsSideBar
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.openTopWordsSideBar = !this.openTopWordsSideBar
      }
    }
  },
  watch:{
    wordToFind(val) { // Each time user input on searcher field this
      this.words = [] // gonna get trigger and search on server will be activated
      request.getWord(val, '')
      .then(result => {
        this.words = result
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getImage', 'getDescription', 'getName', "getEmail"])
  },
  components:{
    Word,
    ModalConfigurations,
    ModalWordInformation,
    TopWords
  }
}
</script>
