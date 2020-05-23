<template>
  <div width="90%">
    <v-row justify="center" align="center" no-gutters>
      <div style="height: 100vh">
        <!-- Esta boton se activa cuando la página se abre en smartphones -->
        <!-- Esta parte es para poder desplegar las configuraciones -->
        <!-- Este es el boton que hace trigger del sidebarconfigurations -->
        <v-btn
          class="mt-10"
          color="#8c3420"
          @click="openSideBarConfigurations = !openSideBarConfigurations"
          rounded
          small
          fab
          dark
          absolute
          top
          right
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <SideBarConfigurations :open="openSideBarConfigurations"></SideBarConfigurations>
      </div>

      <v-col align="center">
        <!-- Este div es para poder poner todo el contenido bien organizado en celulares. -->
        <!-- Antes de que este div se pusiese, todo el contenido estaba 'debajo' de los botones de configuración -->
        <div v-if="onMovil" style="margin: 5em 0 5em 0"></div>

        <!-- Realización las busquedas tanto de articulos como palabras. -->
        <v-row justify="center" class="px-4" :style="searchFieldsMarginOnMovil" height="70vh">
          <v-col cols="12" sm="12" xs="12" md="5" lg="5" xl="4">
            <v-card
              color="grey lighten-4"
              width="100%"
              style="padding: 2em; border-radius: 16px"
              height="70vh"
            >
              <!-- Word search input -->
              <v-row justify="center">
                <v-text-field
                  v-model="wordSearcher"
                  label="Buscar palabra"
                  color="grey"
                  rounded
                  filled
                  dense
                ></v-text-field>
              </v-row>

              <!-- Words list searched by user -->
              <v-row justify="center" align="center" class="overflow custom--scroll">
                <Word
                  class="mx-4 my-4"
                  v-for="(word, index) in words"
                  :key="index"
                  :word="word.palabra"
                  :id="word._id"
                  size="13"
                  @click.native="findWordInfo(word.palabra, index)"
                ></Word>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" xs="12" md="6" lg="6" xl="7">
            <v-card
              color="grey lighten-4"
              width="100%"
              style="padding: 2em; border-radius: 16px"
              height="70vh"
            >
              <!-- Articles search input -->
              <v-row>
                <v-text-field
                  v-model="articleSearcher"
                  label="Buscar articulo"
                  color="grey"
                  rounded
                  filled
                  dense
                ></v-text-field>
              </v-row>
              <!-- Articles list searched by user -->
              <v-container justify="center" fluid>
                <v-row justify="center" style="max-height: 16em;" class="overflow custom--scroll">
                  <Article
                    class="mx-4 my-4"
                    v-for="(article, index) in articles"
                    :key="index"
                    :author="article.author"
                    :photo="article.photo"
                    :link="article.link"
                    :title="article.title"
                    :id="article._id"
                    @click.native="openArticleInfo(article, index)"
                  ></Article>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <!-- This are options which user could select to manage especific information configurations -->
        <!-- like add, delete or modify words. Also this contains those user configurations, like create a token, or something -->
        <Options :onMovil="onMovil"></Options>
      </v-col>
    </v-row>

    <ModalWordInformation
      :open="openCloseWordInformationModal"
      :action="modalWordInformationAction"
      :word="foundWord"
      :definitions="definitionFoundWord"
      :examples="examplesFoundWord"
      :language="wordLanguage"
      :id="wordId"
      :wordIndex="wordIndex"
      @delete="wordDeletedHandler"
    ></ModalWordInformation>

    <ModalArticle
      :open="openModalArticle"
      action="update"
      :articleData="articleData"
      :index="currentArticleIndex"
      @delete="articleDeleteHandler"
    ></ModalArticle>
  </div>
</template>

<script>
import Word from "../components/Word.vue";
import Article from "../components/Article.vue";
import ModalArticle from "../components/ModalArticle.vue";
import ModalWordInformation from "../components/ModalWordInformation.vue";
import Options from "../components/Options.vue";
import SideBarConfigurations from "../components/SideBarConfigurations.vue";
import { words as Words, articles as Articles } from "../controller/Server/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data: () => ({
    words: [],
    openCloseWordInformationModal: false,
    openModalArticle: false,
    openSideBarConfigurations: false,
    modalWordInformationAction: "update",
    articleSearcher: "",
    wordSearcher: "",
    foundWord: "", // This is used to get the word information when user click on one
    definitionFoundWord: [],
    wordId: '',
    examplesFoundWord: "",
    wordLanguage: "",
    wordIndex: "",
    searchWordsOrArticles: false,
    articles: [],
    articleData: {},
    currentArticleIndex: -1,
    onMovil: false,
    searchFieldsMarginOnMovil: ""
  }),
  methods: {
    showWordInformationModal(action, index) {
      this.modalWordInformationAction = action;
      this.wordIndex = index;
      this.openCloseWordInformationModal = !this.openCloseWordInformationModal;
    },
    findWordInfo(word, index) {
      Words
        .getWordInfo(word, this.getToken)
        .then(result => {
          this.foundWord = result.palabra;
          this.definitionFoundWord = result.definicion.split("/");
          this.examplesFoundWord = result.ejemplos;
          this.wordLanguage = result.idioma;
          this.wordId = result.id
          this.showWordInformationModal("update", index);
        })
        .catch(err => {
          console.log(err);
        });
    },
    openArticleInfo(article, index) {
      this.articleData = article;
      this.currentArticleIndex = index;
      this.openModalArticle = !this.openModalArticle;
    },
    wordDeletedHandler(index) {
      this.words.splice(index, 1); // Delete deleted word from found words
    },
    articleDeleteHandler(index) {
      this.articles.splice(index, 1);
    },
    searchSomeWords(word) {
      this.words = [];
      Words
        .getWord(word, this.getToken)
        .then(result => {
          this.words = result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchSomeArticles(article) {
      Articles
        .getArticles(article, this.getToken)
        .then(result => {
          this.articles = result.message;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    // Each time user input on searcher field this
    // gonna get trigger and search on server will be activated
    articleSearcher(val) {
      this.searchSomeArticles(val);
    },
    wordSearcher(val) {
      this.searchSomeWords(val);
    }
  },
  computed: {
    ...mapGetters([
      "getToken",
      "getImage",
      "getDescription",
      "getName",
      "getEmail"
    ])
  },
  mounted() {
    if (
      /Mobi/i.test(navigator.userAgent) ||
      /Android/i.test(navigator.userAgent)
    ) {
      this.onMovil = true;
      this.searchFieldsMarginOnMovil = "margin-top: 4em";
    }
  },
  components: {
    Word,
    Article,
    ModalArticle,
    ModalWordInformation,
    Options,
    SideBarConfigurations
  }
};
</script>

<style scoped>
.overflow {
  overflow-y: scroll;
  overflow-x: hidden;
}
.custom--scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 16px;
}
.custom--scroll::-webkit-scrollbar-track {
  border-radius: 16px;
}
.custom--scroll::-webkit-scrollbar-thumb {
  background: lightgrey;
}
.custom--scroll::-webkit-scrollbar-thumb:hover {
  background: grey;
}
</style>
