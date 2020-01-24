<template>
  <v-dialog 
    v-model="realOpener"
    width="38em"
  >
    <v-card color="teal" dark>
      <v-card-title>
        <label style="margin-left: auto; margin-right: auto">Árticulos</label>
      </v-card-title>
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="autor"
              v-model="author"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="link"
              v-model="link"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-text-field
              label="link foto"
              v-model="linkPhoto"
              rounded dense filled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-lowercase" color="blue darken-1" @click="createArticle" rounded>
          agregar
        </v-btn>
        <v-btn class="text-lowercase" color="#8c3420" @click="realOpener = !realOpener" rounded>
          cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import request from '../controller/serverRequest.js'
import {mapGetters} from 'vuex'

export default {
  name: "ModalArticle",
  data: () => ({
    realOpener: false,
    link: '',
    linkPhoto: '',
    author: ''
  }),
  props: [
    "open"
  ],
  watch: {
    open(val){
      this.realOpener = val?val:true
    }
  },
  methods:{
    createArticle() {
      request
        .createArticle(this.author, this.link, this.title, this.getToken)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed:{
    ...mapGetters(['getToken'])
  },
  components:{
  }  
} 
</script>

