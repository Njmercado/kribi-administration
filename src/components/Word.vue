<template>
    <v-card
      style="cursor: pointer; color: white; margin: .8em; border-radius: 16px"
      :color="backgroundColor"
    >
      <v-card-title>
        <label :style="fontSize">{{popularity}}</label>
        <label class="center-x" :style="fontSize">{{word}}</label>
      </v-card-title>
        <v-card-subtitle> 
          <label class="center-x" :style="fontSize">{{definitions}}</label>
        </v-card-subtitle>
    </v-card>
</template>

<script>

export default {

  name: "Word",
  props:[
    'word',
    'definitions',
    'popularity',
    'size'
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
  }),
  created: function(){
    const color =  Math.floor((Math.random() * (this.colors.length)) + 0) 
    this.backgroundColor = this.colors[color]
    this.fontSize = `font-size: ${this.size}px` 
  },
} 
</script>

<style >
.center-x {
  text-align: center;
  margin-left: auto;
  margin-right: auto
}
</style>
