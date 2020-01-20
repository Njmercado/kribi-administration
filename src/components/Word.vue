<template>
    <v-card
      style="cursor: pointer"
      :color="backgroundColor"
    >
      <v-card-title style="color: white">
        <label style="margin-left: auto; margin-right: auto">{{word}}</label>
      </v-card-title>
        <v-card-subtitle style="color: white">
          {{definitions}}
        </v-card-subtitle>
    </v-card>
</template>

<script>

export default {

  name: "Word",
  props:[
    'word',
    'definitions',
    'examples'
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
  }),
  created: function(){
    const color =  Math.floor((Math.random() * (this.colors.length)) + 0) 
    this.backgroundColor = this.colors[color]
  },
} 
</script>
