<template>
  <div width="90%" style="background-color: grey">
    <v-row justify="center" no-gutters>
      <div style="height: 100vh">
        <!-- Esta boton se activa cuando la página se abre en smartphones -->
        <!-- Esta parte es para poder desplegar las configuraciones -->
        <!-- Este es el boton que hace trigger del sidebarconfigurations -->
        <v-btn
          color="#8c3420"
          @click="openSideBarConfigurations = !openSideBarConfigurations"
          icon
          absolute
          top
          left
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <SideBarConfigurations :open="openSideBarConfigurations"></SideBarConfigurations>
      </div>

      <v-container>
        <!-- Word search input -->
        <v-row justify="center">
          <v-col cols="10" md="5" lg="5" xl="4">
            <v-text-field
              v-model="valueOfWordsToSearch"
              @keydown.enter="searchSomeWords(valueOfWordsToSearch)"
              label="Buscar palabra"
              append-icon="mdi-magnify"
              color="grey"
              rounded
              filled
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Words list searched by user -->
        <v-row justify="center">
          <v-col cols="10" md="8" lg="8" xl="6">
            <Word
              class="my-4"
              v-for="(word, index) in words"
              :key="index"
              :word="word.palabra"
              :definitions="word.definicion"
              :id="word._id"
              size="20"
            ></Word>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import Word from "../components/Word.vue";
import SideBarConfigurations from "../components/SideBarConfigurations.vue";
import {
  words as Words,
} from "../controller/Server/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data: () => ({
    words: [],
    openSideBarConfigurations: false,
    valueOfWordsToSearch: "",
    lastWordsRequested: ''
  }),
  computed: {
    ...mapGetters([
      "getToken",
      "getImage",
      "getDescription",
      "getName",
      "getEmail"
    ])
  },
  methods: {
    wordDeletedHandler(index) {
      this.words.splice(index, 1); // Delete deleted word from found words
    },
    async searchSomeWords(wordsToSearch) {
      if(wordsToSearch.length > 0) {
        let currentArrayOfWordsToSearch = wordsToSearch.split(",").map(el => el.trim())
        let lastArrayOfWords = this.lastWordsRequested.split(",")

        let cleanedRequest = await this.deleteWordsThanHasBeenSearchBefore(currentArrayOfWordsToSearch, lastArrayOfWords)

        cleanedRequest = cleanedRequest.join(',')

        if(cleanedRequest.length > 0) {

          this.lastWordsRequested = cleanedRequest

          Words.getWord(cleanedRequest, this.getToken)
          .then(result => {
            this.addNewWordsToDashboard(result)
          })
          .catch(err => {
            console.log(err);
          });
        }
      } 
    },
    //Elimina las palabras del array de palabras, que ya se ha buscado con anterioridad,
    //que el usuario haya decidido no ver más. Esto se define dentro de la lista
    // de palabras que el usuario vaya a buscar nuevamente.
    deleteWordsThanHasBeenSearchBefore(currentArrayOfWordsToSearch, lastArrayOfWords) {
      console.log(currentArrayOfWordsToSearch)
      console.log(lastArrayOfWords)
      return currentArrayOfWordsToSearch.filter(el => lastArrayOfWords.indexOf(el) < 0 )
    },
    addNewWordsToDashboard(foundWords) {
      foundWords.forEach(el => {
        this.words.push(el);
      })
    }
  },
  watch: {
    valueOfWordsToSearch(val) {
      if(val.length === 0) this.words = []
    }
  },
  components: {
    Word,
    SideBarConfigurations
  }
};
</script>

<style scope>
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
