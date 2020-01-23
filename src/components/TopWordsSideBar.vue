<template>
  <div>
  <v-navigation-drawer
    v-model="openClose"
    width="16em"
    color="teal"
    absolute temporary right
  >
    <v-container fill-height>
        <v-row justify="center">
          <v-card width="14em">
            <v-card-title>
              <label style="color: grey; margin-left:auto; margin-right:auto">Español</label>
            </v-card-title>
            <v-card-text style="overflow-y: scroll; max-height: 16em; padding: 1em">
              <div
                v-for="(word, index) in espanol" 
                :key="index"
                @click.stop="openWordInfoModalHandler(word._id)"
              >
                <Word 
                  :word="word._id"
                  :popularity="word.popularidad"
                  size="13"
                >
                </Word>
              </div>
            </v-card-text>
          </v-card>
        </v-row>
        <v-row justify="center" style="margin-top: 2em">
          <v-card width="14em">
            <v-card-title>
              <label style="color: grey; margin-left:auto; margin-right:auto">Palenque</label>
            </v-card-title>
            <v-card-text style="overflow-y: scroll; max-height: 16em">
              <div
                v-for="(word, index) in palenque" 
                :key="index" 
                @click.stop="openWordInfoModalHandler(word._id)"
              >
                <Word 
                  :word="word._id" 
                  :popularity="word.popularidad"
                  size="13"
                >
                </Word>
              </div>
            </v-card-text>
          </v-card>
        </v-row>
    </v-container>
  </v-navigation-drawer>
  <WordInfo 
    :open="openWordInfoModal"
    :word="wordAux"
    :definitions="definitionsAux"
    :examples="examplesAux"
    :language="languageAux"
    action="update"
  ></WordInfo>
  </div>
</template>

<script>
import Word from '../components/Word.vue'
import WordInfo from '../components/ModalWordInformation.vue'
import request from '../controller/serverRequest.js'
import {mapGetters} from 'vuex'

export default {
  name: "TopWordsSideBar",
  data: () => ({
    openClose: false,
    openWordInfoModal: false,
    wordAux: '',
    definitionsAux: '',
    examplesAux: '',
    languageAux: '',
  }),
  props: [
    "open",
    "espanol",
    "palenque"
  ],
  watch: {
    open(val) {
      this.openClose = val?val:true
    }
  },
  methods:{
    openWordInfoModalHandler(word){
      request
        .getWordInfo(word, '')
        .then(result => {
          this.languageAux = result.idioma
          this.wordAux = word
          this.definitionsAux = result.definicion.split("/")
          this.examplesAux = result.ejemplos
          this.openWordInfoModal = !this.openWordInfoModal
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  components:{
    Word,
    WordInfo,
  }
}
</script>
