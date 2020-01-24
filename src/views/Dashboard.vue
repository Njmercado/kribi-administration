<template>
  <v-container fluid>
    <v-row justify="end">
      <!-- This are options which user could select to manage especific information configurations -->
      <Options></Options>
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
  </v-container>
</template>

<script>

import Word from '../components/Word.vue'
import ModalWordInformation from '../components/ModalWordInformation.vue'
import Options from '../components/Options.vue'
import request from '../controller/serverRequest'
import {mapGetters} from 'vuex'

export default {

  name: "",
  data: () => ({
    words: [],
    openCloseWordInformationModal: false,
    modalWordInformationAction: "update",
    wordToFind: '', // this variable is different to foundWord, because this is used to autocomplete
    foundWord: '', // and this is used to get the word when user click on one
    definitionFoundWord: [],
    examplesFoundWord: '',
    wordLanguage: '',
    wordIndex: '',
  }),
  methods:{
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
    ModalWordInformation,
    Options,
  }
}
</script>
