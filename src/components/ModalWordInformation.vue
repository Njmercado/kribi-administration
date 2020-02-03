<template>
  <div>
    <v-dialog v-model="realOpener" width="40em" persistent scrollable>
      <template v-slot:activator=" { on } ">
        <v-icon v-on="on"></v-icon>
      </template>

      <v-card style="border-radius: 16px" color="teal" dark>
        <v-card-title>
          <label style="margin-left: auto; margin-right: auto"> {{ languageAux }} </label>
        </v-card-title>

        <v-card-text>
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
            <v-text-field
              style="margin-bottom: -4vh"
              label="Palabra"
              v-model="wordAux"
              :readonly="action === 'create'? false: true"
              prepend-icon="mdi-file-word-box"
              rounded filled dense
            ></v-text-field>
          </v-col>

          <div style="margin-left: 2em">Definiciones</div>
          <v-chip
            v-for="(def, defIndex) in definitionsAux"
            :key="defIndex"
            class="ma-2"
            @click:close="deleteDefinition(def, defIndex)"
            close
          >{{def}}</v-chip>
          <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">
            <v-text-field
              style="margin-bottom: -4vh"
              label="Definicion"
              @keyup.enter="addDefinition"
              prepend-icon="mdi-tooltip-text"
              rounded filled dense
            ></v-text-field>
          </v-col>
          <div style="margin-left: 2em">Ejemplos</div>
          <v-chip
            v-for="(ex, exIndex) in examplesAux"
            :key="exIndex"
            class="ma-2"
            @click:close="deleteExample(ex, exIndex)"
            close
          >{{ex}}</v-chip>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-text-field 
              label="Ejemplo" 
              @keyup.enter="addExample" 
              prepend-icon="mdi-lightbulb"
              rounded filled dense></v-text-field>
          </v-col>
          <v-switch 
            v-if="action == 'create'"
            style="margin-left: 2em"
            :label="languageAux" 
            v-model="languageAuxAux"></v-switch>
        </v-card-text>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-col cols="4" md="2" sm="2" xs="2">
            <v-btn
              class="text-lowercase"
              color="blue darken-1"
              @click="createOrUpdateWord"
              rounded
            >{{action=="create"?"crear":"actualizar"}}</v-btn>
          </v-col>
          <!-- Only gonna be able to see this,
              when 'action' is 'update'.
              This part is to delete actual word
          -->
          <v-col 
            v-if="action == 'update'" 
            cols="4" md="2" sm="2" xs="2">
            <v-btn 
              class="text-lowercase" 
              color="warning" 
              @click="deleteWord" 
              rounded>eliminar</v-btn>
          </v-col>
          <!------------------------------------>
          <v-col cols="4" md="2" sm="2" xs="2">
            <v-btn
              class="text-lowercase"
              color="#8c3420"
              @click="realOpener = false"
              rounded
            >cancelar</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Status :open="openError" :content="errorMsg" :type="typeMsg"></Status>
  </div>
</template>

<script>
import server from "../controller/serverRequest";
import Status from "../components/ModalStatus";
import {mapGetters} from 'vuex'

export default {
  name: "ModalWordInformation",
  data: () => ({
    realOpener: false,
    definitionsAux: [],
    examplesAux: [],
    wordAux: "",
    openError: false,
    errorMsg: "",
    languageAux: 'Palenque',
    languageAuxAux: false,
    typeMsg: 'error',
  }),
  props: ["open", "word", "color", "action", "examples", "definitions", "language", "wordIndex"],
  watch: {
    open() {
      this.realOpener = true;
    },
    examples(val) {
      if (val) this.examplesAux = val;
    },
    definitions(val) {
      if (val) this.definitionsAux = val;
    },
    word(val) {
      if (val) this.wordAux = val;
    },
    language(val) {
      if(val) this.languageAux = val
    },
    languageAuxAux(val) {
      this.languageAux = val?'Espanol':'Palenque'
    }
  },
  methods: {
    deleteDefinition(def, index) {
      this.definitionsAux.splice(index, 1);
    },
    deleteExample(ex, index) {
      this.examplesAux.splice(index, 1);
    },
    addDefinition(def) {
      this.definitionsAux.push(def.srcElement.value);
    },
    addExample(def) {
      this.examplesAux.push(def.srcElement.value);
    },
    createOrUpdateWord() {
      if (this.action == "update") this.updateWord();
      if (this.action == "create") this.createWord();
    },
    updateWord() {
      server
        .updateWord(
          this.wordAux,
          this.definitionsAux,
          this.examplesAux,
          this.getToken
        )
        .then(result => {
          this.errorMsg = result.msg
          this.typeMsg = 'success'
          this.openError = !this.openError
          this.realOpener = false
        })
        .catch(err => {
          console.log("ERROR:")
          console.log(err)
        })
    },
    createWord() {
      server
        .createWord(
          this.wordAux,
          this.definitionsAux,
          this.examplesAux,
          this.languageAux,
          this.getToken
        )
        .then(result => {
          if(result.err) {
            this.openError = !this.openError
            this.errorMsg = result.msg
            this.typeMsg = "error"
          }
        }).catch(err => {
          console.log(err)
        })
    },
    deleteWord() {

      server.deleteWord(this.word, this.languageAux, this.getToken)
      .then(result => {
        this.openError = !this.openError
        this.errorMsg = result
        this.typeMsg = 'success'
        this.realOpener = false
        this.$emit('delete', this.wordIndex)
      })
      .catch(err => {
        this.openError = !this.openError
        this.errorMsg = err.msg
        this.typeMsg = 'error'
        this.realOpener = false
      })
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  components: {
    Status
  }
};
</script>
