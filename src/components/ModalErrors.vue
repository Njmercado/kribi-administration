<template>
  <v-dialog 
    v-model="realOpener"
    width="40em"
  >
    <template v-slot:activator=" { on } " id="cosa">
      <v-icon v-on="on" id="ac"></v-icon>
    </template>
    <v-card
      color="error"
    >
      <v-card-title>
        <v-row 
          justify="center"
        >
          <v-col 
            style="text-align: center; color: white"
          >
            <div>Error</div>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row
          justify="center"
        >
          <v-col
            style="text-align: center; color: white"
          >
            <div>
              {{content}}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>   
</template>

<script>
  
  export default {

    name: "ModalErrors",
    data: () => ({
      realOpener: false
    }),
    props:[
      "open",
      "content"
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

