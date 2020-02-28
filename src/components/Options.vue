<template>
  <div>
    <!-- Estas son las opciones disponibles para cuando el usuario esté usando la app desde un movil. -->
    <!-- La fisolofia es la misma que cuando se encuentra en un pc -->
    <v-speed-dial v-if="onMovil" direction="bottom" transition="fade-transition" absolute top left>
      <template v-slot:activator>
        <v-btn fab dark color="green darken-2">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <!-- Words informations -->
      <v-btn
        v-for="(option, index) in options"
        :key="index"
        :color="option.color"
        @click="openTarget(option.text)"
        small
        fab
        dark
      >
        <v-icon>{{option.icon}}</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- Este container es usado para poder visualizar las opciones de creacion, disponibles, con las que el usuario cuenta -->
    <!-- Entre las opciones está: crear palabras, crear articulos, top 5 palabras más buscadas. -->
    <!-- Estas opciones están en un loop, porque a futuro se planea el poder agregar más configuraciones. -->
    <v-row class="mt-4 px-4" justify="center" v-if="!onMovil">
      <v-card color="grey lighten-4" style="border-radius: 16px" width="90%">
        <v-container>
          <v-row justify="space-around">
            <v-col cols="3" v-for="(option, index) in options" :key="index">
              <v-card
                style="border-radius: 16px"
                @click="openTarget(option.text)"
                :color="option.color"
                dark
              >
                <v-card-title>
                  <v-icon class="mx-auto" large>{{option.icon}}</v-icon>
                </v-card-title>
                <v-card-subtitle>
                  <label class="mx-auto">{{option.text}}</label>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <!-- Dialog callers -->
    <ModalWordInformation :open="openCloseWordInformationModal" action="create"></ModalWordInformation>
    <TopWords :open="openTopWords" :palenque="topPalenque" :espanol="topEspanol"></TopWords>
    <ModalArticle :open="openArticleModal" action="create"></ModalArticle>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalWordInformation from "../components/ModalWordInformation.vue";
import ModalArticle from "../components/ModalArticle.vue";
import TopWords from "../components/ModalTopWords.vue";
import request from "../controller/serverRequest";

export default {
  name: "Options",
  data: () => ({
    openTopWords: false,
    openCloseWordInformationModal: false,
    openArticleModal: false,
    topEspanol: [],
    topPalenque: [],
    options: [
      { color: "teal", icon: "mdi-alpha-w", text: "words" },
      { color: "#CD982B", icon: "mdi-file-document-outline", text: "articles" },
      { color: "#8c3420", icon: "mdi-numeric-5", text: "top 5" }
    ]
  }),
  props: ["onMovil"],
  methods: {
    openTopWordsHandler() {
      if (this.topEspanol.length == 0) {
        // Solo va a realizar la busqueda una sola vez

        request
          .getTopWords(this.getToken)
          .then(result => {
            this.topPalenque = result.palenque;
            this.topEspanol = result.espanol;
            this.openTopWords = !this.openTopWords;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.openTopWords = !this.openTopWords;
      }
    },
    openTarget(target) {
      if (target === "words")
        this.openCloseWordInformationModal = !this
          .openCloseWordInformationModal;
      if (target === "articles") this.openArticleModal = !this.openArticleModal;
      if (target === "top 5") this.openTopWordsHandler();
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  components: {
    ModalWordInformation,
    ModalArticle,
    TopWords
  }
};
</script>
