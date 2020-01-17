<template>
  <v-dialog
    width="20em"
    v-model="realOpen"
  >
    <template v-slot:activator=" { on } ">
      <v-icon v-on="on"></v-icon>
    </template>

    <v-card>
      <v-container>
        <v-row
          justify="center"
          style="margin: 3vh 0 6vh 0;"
        >
          <v-avatar color="teal" size="4em">
            <v-icon dark>
              mdi-key
            </v-icon>
          </v-avatar>
        </v-row>

        <v-row
          justify="center"
        >
          <v-col
            cols="10"
          >
            <v-text-field
              placeholder="Contraseña"
              label="Contraseña"
              color="teal"
              type="password"
              @keyup.enter="verifyPassword"
              append-icon="mdi-key"
              rounded
              filled
              dense
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row
          justify="center"
        >
          <v-col
            cols="auto"
          >
              <v-btn
                class="text-lowercase"
                color="grey"
                @click="copyCodeToClipboar"
                :disabled="keyButtonDisable"
                rounded
                dark
              >{{key}}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>    
  </v-dialog>
</template>

<script>

export default {

  name: "KeyGenerator",
  props:[
    'open'
  ],
  data: () => ({
    realOpen: false,
    key:"estenoesuncodigodeconfirmacion",
    keyButtonDisable: false 
  }),
  watch: {
    open: function(){
      this.realOpen = true
    }
  },
  methods:{
    copyCodeToClipboar(){
      if(this.keyButtonDisable){
        alert("Your code have been copied to your clipboard")
      }
    },
    verifyPassword(){
      //call funtion in store to verify password
      //After that make avaliable the key button
    }
  },
  components:{

  }  
} 
</script>

<style>

</style>

