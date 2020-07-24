<template>
    <v-card
      style="color: white; border-radius: 100px"
      :color="backgroundColor"
    >
      <v-row align="center">
        <v-col align="center" cols="12" xs="12" sm="12" md="3" lg="3" xl="2">
          <input
            type="text"
            style="text-align: center; font-weight: 500; padding: 0 1.6em"
            v-model="wordAux"
          >
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7" align="center">
          <v-chip 
            @click:close="deleteDefinition(index)" 
            close 
            v-for="(def, index) in definitionsAux" 
            :key="index"
          >{{def}}</v-chip>
        </v-col>
        <v-col style="display: flex; justify-content: space-around; margin-right: 1em">
          <v-btn icon small dark @click="deleteWord"><v-icon>mdi-delete</v-icon></v-btn>
          <v-btn icon small dark @click="editWord"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon small dark @click="updateWord"><v-icon>mdi-check</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>

export default {

  name: "Word",
  props:[
    'word',
    'definitions',
    'size',
    'id'
  ],
  data: () => ({
    backgroundColor: "white",
    colors: [
      "#CD982B",
      "#8c3420",
      "#E09518",
      "teal",
      "blue darken-1",
    ],
    fontSize: '',
    wordAux: '',
    definitionsAux: '',
  }),
  mounted: function() {
    this.wordAux = this.word
    this.definitionsAux = this.definitions
  },
  created: function(){
    const color =  Math.floor((Math.random() * (this.colors.length)) + 0) 
    this.backgroundColor = this.colors[color]
    this.fontSize = `font-size: ${this.size}px` 
  },
  methods: {
    updateWord() {
      if(this.wordAux.length !== this.word.length) this.$emit("onChangeWordName", this.wordAux)
      if(this.definitions.length !== this.word.length) this.$emit("onChangeDefinitions", this.definitions)
    },
    deleteWord() {
      this.$emit("onDelete", this.id)
    },
    editWord() {
      this.$emit("onEdit", this.id)
    },
    deleteDefinition(index) {
      this.definitionsAux.splice(index, 1)
    }
  }
} 
</script>

<style scope>
.title-input {
  width: 20px;
}
</style>
