<template>
  <v-dialog
    v-model="realOpener"
    width="40em"
    persistent
    scrollable
    >
    <template v-slot:activator=" { on } ">
      <v-icon v-on="on"></v-icon>
    </template>

    <v-card color="teal" dark>
      <v-card-title>
        <v-col cols="5">          
          <v-text-field
            placeholder="agregar palabra"
            label="Palabra"
            :value="word"
            rounded filled dense
           ></v-text-field>
        </v-col>
      </v-card-title>

      <v-card-text>
        <v-chip
          v-for="(def, defIndex) in definitionsAux"
          :key="defIndex"
          class="ma-2"
          @click:close="deleteDefinition(def, defIndex)"
          close
          >
          {{def}}
        </v-chip>
        <div style="width: 20em">
          <v-text-field
            label="Definicion"
            placeholder="agregar definición"
            @keyup.enter="addDefinition"
            rounded filled dense
          >
          </v-text-field>
        </div>
        <div style="margin-top: 3vh">Ejemplos</div>
        <v-chip
          v-for="(ex, exIndex) in examplesAux"
          :key="exIndex"
          class="ma-2"
          @click:close="deleteExample(ex, exIndex)"
          close
        >
          {{ex}}
        </v-chip>
        <div style="width: auto">
          <v-text-field
            label="Ejemplo"
            placeholder="agregar ejemplo"
            @keyup.enter="addExample"
            rounded filled dense
          >
          </v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-container fluid>
          <v-row justify="end">
            <v-col cols="4" md="2" sm="2" xs="2">
              <v-btn
                class="text-lowercase"
                color="blue darken-1"
                @click="createOrUpdateWord"
                rounded
              >aceptar</v-btn>
            </v-col>
            <!-- Only gonna be able to see this,
              when 'action' is 'update'.
              This part is to delete actual word
            -->
            <v-col
              v-if="action == 'update'"
              cols="4" md="2" sm="2" xs="2"
            >
              <v-btn
                class="text-lowercase"
                color="warning"
                @click="deleteWord"
                rounded
              >eliminar</v-btn>
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
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {

  name: "ModalWordInformation",
  data: () => ({
    realOpener: false,
    definitionsAux: [],
    examplesAux: []
  }),
  props: [
    "open",
    "word",
    "color",
    "action",
    "examples",
    "definitions"
  ],
  watch: {
    open(){
      this.realOpener = true
    },
    examples(val) {
      if(val) this.examplesAux = val
    },
    definitions(val){
      if(val) this.definitionsAux = val
    }
  },
  methods:{
    deleteDefinition(def, index){
      this.definitionsAux.splice(index, 1)
    },
    deleteExample(ex, index){
      this.examplesAux.splice(index, 1)
    },
    addDefinition(def){
      this.definitionsAux.push(def.srcElement.value)
    },
    addExample(def){
      this.examplesAux.push(def.srcElement.value)
    },
    createOrUpdateWord(){
      if(this.action == "update") this.updateWord()
      if(this.action == "create") this.createWord()
    },
    updateWord(){
      alert("La palabra será actualizada")
    },
    createWord(){
      alert("Esta palabra será agregada")
    },
    deleteWord(){
      alert("Esta palabra será eliminada")
    }
  },
  components:{
  }  
} 
</script>

<style>

</style>

