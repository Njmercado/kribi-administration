<template>
  <v-snackbar
    style="background-color: transparent"
    v-model="realOpener"
    :color="type"
    top
    right
  >
    {{ content }}
    <v-icon 
      style="margin-left: 1em"
      @click="realOpener = false" 
      dark>mdi-close</v-icon>
  </v-snackbar>  
</template>

<script>
  
  export default {

    name: "ModalStatus",
    data: () => ({
      realOpener: false
    }),
    props:[
      "open",
      "content",
      "type"
    ],
    watch:{
      open: function(){
        this.realOpener = true
      }
    },
  } 
</script>

<style>

@media screen and (orientation: landscape){

  .modal--dimensions{
    width: 25%;
    height: auto;
  }
}

@media screen and (orientation: portrait){

  .modal--dimensions{
    width: 10%;
    height: auto;
  }
}
</style>

