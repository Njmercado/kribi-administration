<template>
  <div>
    <v-dialog v-model="realOpener" width="40em" persistent scrollable>
      <v-card style="border-radius: 16px" color="teal" dark>
        <v-card-title>
          <label style="margin-left: auto; margin-right: auto">{{ languageAux }}</label>
        </v-card-title>

        <v-card-text class="custom--scroll">
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">

            <!-- Palabra a ser agregada -->
            <v-text-field
              style="margin-bottom: -4vh"
              label="Palabra"
              v-model="wordAux"
              prepend-icon="mdi-file-word-box"
              rounded
              filled
              dense
            ></v-text-field>
          </v-col>

          <!-- Lista de definiciones a ser agregadas a la palabra -->
          <v-chip
            v-for="(def, defIndex) in definitionsAux"
            :key="defIndex"
            class="ma-2"
            @click:close="deleteDefinition(def, defIndex)"
            close
          >{{def}}</v-chip>
          <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">

            <!-- Input para poder agregar una definicion -->
            <v-text-field
              style="margin-bottom: -4vh"
              label="Definicion"
              @keyup.enter="addDefinition"
              prepend-icon="mdi-tooltip-text"
              rounded
              filled
              dense
            ></v-text-field>
          </v-col>

          <!-- Lista de ejemplos a ser agregados a la palabra -->
          <v-chip
            v-for="(ex, exIndex) in examplesAux"
            :key="exIndex"
            class="ma-2"
            @click:close="deleteExample(ex, exIndex)"
            close
          >{{ex}}</v-chip>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">

            <!-- Input para poder agregar un ejemplo-->
            <v-text-field
              label="Ejemplo"
              @keyup.enter="addExample"
              prepend-icon="mdi-lightbulb"
              rounded
              filled
              dense
            ></v-text-field>
          </v-col>

          <!-- Switch para poder elegir a que idioma corresponde la palabra a ser agregada. -->
          <v-switch
            v-if="action == 'create'"
            style="margin-left: 2em"
            :label="languageAux"
            v-model="languageAuxAux"
          ></v-switch>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- Only gonna be able to see this,
              when 'action' is 'update'.
              This part is to delete actual word
          -->
          <!-- Boton para crear, o actulizar, una palabra -->
          <v-col cols="4" md="2" sm="2" xs="2">
            <v-btn
              class="text-lowercase"
              color="blue darken-1"
              @click="createOrUpdateWord"
              :loading="isLoading"
              rounded
            >{{action=="create"?"crear":"actualizar"}}</v-btn>
          </v-col>
          <!------------------------------------>

          <!-- Boton para eliminar una palabra -->
          <v-col v-if="action == 'update'" cols="4" md="2" sm="2" xs="2">
            <v-btn class="text-lowercase" color="warning" @click="deleteWord" rounded>eliminar</v-btn>
          </v-col>
          <!------------------------------------>

          <!-- Cancelar -->
          <v-col cols="4" md="2" sm="2" xs="2">
            <v-btn
              class="text-lowercase"
              color="#8c3420"
              @click="realOpener = false"
              rounded
            >cancelar</v-btn>
          </v-col>
          <!------------------------------------>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Status :open="openError" :content="errorMsg" :type="typeMsg"></Status>
  </div>
</template>

<script>
import { words as Words } from "../controller/Server/index.js";
import Status from "../components/ModalStatus";
import { mapGetters } from "vuex";

export default {
  name: "ModalWordInformation",
  data: () => ({
    realOpener: false,
    isLoading: false,
    definitionsAux: [],
    examplesAux: [],
    wordAux: "",
    openError: false,
    errorMsg: "",
    languageAux: "Palenque",
    languageAuxAux: false,
    typeMsg: "error"
  }),
  props: [
    "open",
    "word",
    "id",
    "color",
    "action",
    "examples",
    "definitions",
    "language",
    "wordIndex"
  ],
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
      if (val) this.languageAux = val;
    },
    languageAuxAux(val) {
      this.languageAux = val ? "Espanol" : "Palenque";
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
      this.isLoading = true;
      if (this.action == "update") this.updateWord();
      if (this.action == "create") this.createWord();
    },
    updateWord() {
      Words
        .updateWord(
          this.id,
          this.wordAux,
          this.definitionsAux,
          this.examplesAux,
          this.getToken
        )
        .then(result => {
          console.log(result)
          this.errorMsg = result.message;
          this.typeMsg = "success";
          this.openError = !this.openError;
          this.realOpener = false;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    createWord() {
      Words
        .createWord(
          this.wordAux,
          this.definitionsAux,
          this.examplesAux,
          this.languageAux,
          this.getToken
        )
        .then(result => {
          this.isLoading = false;
          this.openError = !this.openError;
          this.errorMsg = result.message;
          this.typeMsg = result.error ? "error": "success";
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    deleteWord() {
      this.isLoading = true;
      Words
        .deleteWord(this.id, this.getToken)
        .then(result => {
          console.log(result)
          this.openError = !this.openError;
          this.errorMsg = result.message;
          this.typeMsg = "success";          
          this.realOpener = false; // Esta variable es usada para poder cerrar el modal cuando se presione sobre eliminar la palabra
          this.isLoading = false;
          this.$emit("delete", this.wordIndex);
        })
        .catch(err => {
          this.openError = !this.openError;
          this.errorMsg = err.msg;
          this.typeMsg = "error";
          this.realOpener = false;
          this.isLoading = false;
        });
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  components: {
    Status
  }
};
</script>

<style scope>

.custom--scroll::-webkit-scrollbar {
  width: 8px;
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-track {
  border-radius: 16px
}
.custom--scroll::-webkit-scrollbar-thumb {
  background: teal; 
}
.custom--scroll::-webkit-scrollbar-thumb:hover {
  background: lightgrey; 
}
</style>
