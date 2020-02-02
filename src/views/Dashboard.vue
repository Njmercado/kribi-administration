<template>
  <v-container fluid>
    <v-row justify="end">
      <!-- This are options which user could select to manage especific information configurations -->
      <!-- like add, delete or modify words. Also this contains those user configurations, like create a token, or something -->
      <Options></Options>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="10" md="4" lg="4" xl="4">
        <v-text-field
          v-model="searcher"
          :label="searchWordsOrArticles?'Buscar articulo': 'Buscar palabra'"
          color="grey"
          rounded filled dense
          >
        </v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="2" md="3" lg="2" xl="2">
        <v-switch
          style="margin-right: auto; margin-left: auto"
          :label="searchWordsOrArticles?'Articulos': 'Palabras'"
          v-model="searchWordsOrArticles"
          color="blue darken-1"
        >
        </v-switch>
      </v-col>
    </v-row>

    <!-- Words list searched by user -->
    <v-row justify="center" v-if="searchWordsOrArticles === false">
      <v-col
        v-for="(word, index) in words"
        :key="index"
        cols="12" xl="auto" lg="auto" md="auto" sm="12" xs="12"
        @click="findWordInfo(word, index)"
      >
        <Word :word="word"></Word>
      </v-col>
    </v-row>

    <!-- Articles list searched by user -->
    <v-row justify="center" v-if="searchWordsOrArticles === true">
      <v-col
        v-for="(article, index) in articles"
        :key="index"
        cols="12" xl="auto" lg="auto" md="auto" sm="12" xs="12"
        align="center"
        @click="openArticleInfo(article, index)"
      >
        <Article :author="article.author" :photo="article.photo" :link="article.link" :title="article.title" :id="article._id"></Article>
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
      @delete = "wordDeletedHandler"
    >
    </ModalWordInformation>

    <ModalArticle
      :open="openModalArticle"
      action="update"
      :articleData="articleData"
      :index="currentArticleIndex"
      @delete="articleDeleteHandler"
    >
    </ModalArticle>
  </v-container>
</template>

<script>

import Word from '../components/Word.vue'
import Article from '../components/Article.vue'
import ModalArticle from '../components/ModalArticle.vue'
import ModalWordInformation from '../components/ModalWordInformation.vue'
import Options from '../components/Options.vue'
import request from '../controller/serverRequest'
import {mapGetters} from 'vuex'

export default {

  name: "Dashboard",
  data: () => ({
    words: [],
    openCloseWordInformationModal: false,
    openModalArticle: false,
    modalWordInformationAction: "update",
    searcher: '', // this variable is different to foundWord, because this is used to autocomplete
    foundWord: '', // and this is used to get the word information when user click on one
    definitionFoundWord: [],
    examplesFoundWord: '',
    wordLanguage: '',
    wordIndex: '',
    searchWordsOrArticles: false,
    articles: [],
    articleData: {},
    currentArticleIndex: -1,
  }),
  methods:{
    showWordInformationModal(action, index){
      this.modalWordInformationAction = action 
      this.wordIndex = index
      this.openCloseWordInformationModal = !this.openCloseWordInformationModal
    },
    findWordInfo(word, index){
      request
        .getWordInfo(word, this.getToken)
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
    openArticleInfo(article, index) {
      this.articleData = article
      this.currentArticleIndex = index
      this.openModalArticle = !this.openModalArticle
    },
    wordDeletedHandler(index){
      this.words.splice(index, 1) // Delete deleted word from found words
    },
    articleDeleteHandler(index){
      this.articles.splice(index, 1)
    },
    searchSomeWords(word) {
      this.words = [] 
      request.getWord(word, this.getToken)
      .then(result => {
        this.words = result
      }).catch(err => {
        console.log(err)
      })
    },
    searchSomeArticles(article) {
      request
        .getArticles(article, this.getToken)
        .then(result => {
          this.articles = result
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch:{
    // Each time user input on searcher field this
    // gonna get trigger and search on server will be activated
    searcher(val) { 
      if(this.searchWordsOrArticles === true) this.searchSomeArticles(val)
      if(this.searchWordsOrArticles === false) this.searchSomeWords(val)
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getImage', 'getDescription', 'getName', "getEmail"])
  },
  components:{
    Word,
    Article,
    ModalArticle,
    ModalWordInformation,
    Options,
  }
}
</script>
