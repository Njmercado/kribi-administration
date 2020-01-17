<template>
  <div>

    <v-dialog
      v-model="opener"
      width="30em"
      >
      <template v-slot:activator=" { on } ">
        <v-icon v-on="on"></v-icon>
      </template>

      <v-card>
        <v-img
          src="https://i.ibb.co/34c9z3j/Angie-Zu-iga.png"
          class="align-end"
          height="15em"
          >
          <v-card-title class="name">
            Cristina de la Hoz Martinez Correa
          </v-card-title>
        </v-img>
        <v-card-text
          class="text--primary"
          style="margin-top: 3vh"
        >
          <v-btn
            style="margin-top: 1vh"
            class="text-capitalize"
            color="teal"
            block
            dark
           >
            <v-icon
              small
              style="margin-right: 1vw"
            >mdi-lock</v-icon>
            Cambiar Contraseña
          </v-btn>
          <v-btn
            style="margin-top: 1vh"
            class="text-capitalize"
            color="teal"
            block
            dark
          >
            <v-icon
              small
              style="margin-right: 1vw"
            >mdi-email</v-icon>
              Cambiar Correo
          </v-btn>
          <v-btn
            style="margin-top: 1vh"
            class="text-capitalize"
            color="teal"
            block
            dark
            @click="showKeyGeneratorModal"
          >
            <v-icon
              small
              style="margin-right: 1vw"
            >mdi-key</v-icon>
              Generar Key
          </v-btn>
          <v-btn
            style="margin-top: 1vh"
            class="text-capitalize"
            color="grey"
            @click="openRecordsView"
            block
            dark
          >
            <v-icon
              small
              style="margin-right: 1vw"
            >mdi-history</v-icon>
              Historial
            </v-btn>
            <v-btn
              style="margin-top: 1vh"
              class="text-capitalize"
              color="#8c3420"
              @click="logout"
              block
              dark
            >
              <v-icon
                small
                style="margin-right: 1vw"
              >mdi-logout</v-icon>
                Salir
            </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal callers -->
    <KeyGenerator :open="openCloseKeyGeneratorModal"></KeyGenerator>
  </div>
</template>

<script>
import  KeyGenerator from '../components/KeyGenerator.vue'
import { mapMutations } from 'vuex'

export default {

  name: "ModalConfigurations",
  data: () => ({
    opener: false,
    openCloseKeyGeneratorModal: false
  }),
  props: [
    "open"
  ],
  watch: {
    open: function(){
      this.opener = true
    }
  },
  methods:{
    ...mapMutations(['setToken']),
    showKeyGeneratorModal(){
      this.openCloseKeyGeneratorModal = !this.openCloseKeyGeneratorModal
    },
    openRecordsView(){
      this.$router.push("/records")
    },
    logout() {
      this.setToken('')
      this.$router.push('/')
    }
  },
  components:{
    KeyGenerator
  }
}
</script>

<style>

.name{
  color: white;
  background-color: teal;
  width: auto;
  margin: 0 11vw 1vw 1vw;
  padding: .3vw;
  border-radius: 5px;
  font-size: .9em
}
</style>
