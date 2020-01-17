<template>
  <div>
    <v-card
      style="cursor: pointer"
      :color="backgroundColor"
      @click="openModalWordInformation"
    >
      <v-card-title
        style="color: white"
      >
        {{word}}
      </v-card-title>
        <v-card-subtitle
          style="color: white"
        >
          {{definition}}
        </v-card-subtitle>
    </v-card>
    <ModalWordInformation 
      :open="openCloseModalWordInformation" 
      :word="word"
      action="update">
    </ModalWordInformation>
  </div>
</template>

<script>
import ModalWordInformation from './ModalWordInformation.vue' 

export default {

  name: "Word",
  props:[
    'word',
    'definition'
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
    openCloseModalWordInformation: false
  }),
  created: function(){
    const color =  Math.floor((Math.random() * (this.colors.length)) + 0) 
    this.backgroundColor = this.colors[color]
  },
  methods:{
    openModalWordInformation(){
      this.openCloseModalWordInformation = !this.openCloseModalWordInformation
    }
  },
  components:{
    ModalWordInformation
  }  
} 
</script>
