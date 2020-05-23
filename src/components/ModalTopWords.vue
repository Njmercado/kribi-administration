<template>
  <div>
    <v-dialog
      v-model="openClose"
      width="46em"
      height="auto"
    >
      <v-card style="padding: 1em; border-radius: 16px" color="#843420">
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
              <v-card color="grey lighten-2" style="border-radius: 16px">
                <v-card-title>
                  <label style="color: grey; margin-left:auto; margin-right:auto">Español</label>
                </v-card-title>
                <v-card-text> 
                  <div class="overflow round custom--scroll" style="max-height: 25em">
                    <div
                      v-for="(word, index) in espanol"
                      :key="index"
                      @click.stop="openWordInfoModalHandler(word.palabra)"
                      >
                      <Word
                        :word="word.palabra"
                        :popularity="word.popularidad"
                        size="13"
                        >
                      </Word>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card color="grey lighten-2" style="border-radius: 16px">
                <v-card-title>
                  <label style="color: grey; margin-left:auto; margin-right:auto">Palenque</label>
                </v-card-title>
                <v-card-text>
                  <div class="overflow round custom--scroll" style="max-height: 25em">
                    <div
                      v-for="(word, index) in palenque"
                      :key="index"
                      @click.stop="openWordInfoModalHandler(word.palabra)"
                    >
                      <Word
                        :word="word.palabra"
                        :popularity="word.popularidad"
                        size="13"
                        >
                      </Word>
                    </div>
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
      :id="chosenWordId"
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
import {words as Words} from '../controller/Server/index.js'
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
    chosenWordId: '',
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
      Words
        .getWordInfo(word, this.getToken)
        .then(result => {
          this.languageAux = result.idioma
          this.wordAux = word
          this.chosenWordId = result.id
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

<style scoped>

.overflow {
  overflow-y: scroll
}
.custom--scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-track {
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-thumb {
  background: lightgrey; 
}
.custom--scroll::-webkit-scrollbar-thumb:hover {
  background: grey; 
}

.round {
  border-radius: 8px;
}
</style>
