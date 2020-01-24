<template>
  <div>
    <v-dialog
      v-model="openClose"
      width="46em"
      height="auto"
    >
      <v-card style="padding: 1em" color="teal">
        <v-container>
          <v-row justify="center" align="center">
            <label 
              style="color: white; 
              font-weight: bold; 
              font-size: 1.4em; 
              text-align: center
              ">Palabras más buscadas</label>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                <v-card-title>
                  <label style="color: grey; margin-left:auto; margin-right:auto">Español</label>
                </v-card-title>
                <v-card-text style="overflow-y: scroll; max-height: 25em; padding: 1em">
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
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card>
                <v-card-title>
                  <label style="color: grey; margin-left:auto; margin-right:auto">Palenque</label>
                </v-card-title>
                <v-card-text style="overflow-y: scroll; max-height: 25em; padding: 1em">
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
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
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
