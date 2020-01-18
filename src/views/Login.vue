<template>
    <v-row>
      <v-col 
        cols="12" md="12" xs="12" sm="12" lg="5" xlg="5"
        style="background-color: #8c3420"
      >
        <v-container>
          <v-row 
            style="height: 20vh"
            align="center"
          >
            <v-col
              cols="12" md="12" sm="12" xs="12"
              style="text-align: center"
            >
              <span style="color:#ffc36b; font-size: 1.2em">Kribí - Login</span> 
            </v-col>
          </v-row>
          
          <v-row align="center" style="height: 60vh">
            <v-col
              cols="12"
              justify="center"
              style="text-align: center; color:white"
            >
              <span>Este es el centro de administracion para el diccionario 'Palenque - Español', </span>
              <span>y viceversa, de la Universidad del Norte. En este medio podrá editar, </span>
              <span>agregar y eliminar palabras del diccionario brindado en la pagina web </span>
              <span style="color:#ffc36b">kribi.com.co</span>
              <br>
              <br>
              <span>Para poder ingresar debe estar registrado con anterioridad.</span>
              <br>
              <br>
              <span>Mucha suerte!!!!</span>
            </v-col>
          </v-row>
          <v-row 
            style="text-align: center"
            d-flex
          >
            <v-col cols="12" xs="12" sm="12" md="5">
              <v-btn
                class="text-lowercase"
                color="primary"
                to="/registrarse"
                dark
              >
                registrarse 
              </v-btn>  
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="7">
              <v-btn
                color="green"
                class="text-lowercase"
                to="/contraseña"
                dark
              >
                ¿Olvidaste tu contraseña?
              </v-btn>
            </v-col>
          </v-row>
        </v-container>         
      </v-col>
      <v-col cols="12" sm="12" xs="12" md="12" lg="7" xlg="7">
        <v-container>
          <v-row 
            style="height:90vh; text-align: center"
            align="center" justify="center"
          >
            <v-card class="card--dimensions">
              <v-row justify="center">
                <v-col cols="10">
                  <v-img 
                    style="margin: 30px auto 30px auto;"
                    src="https://i.ibb.co/Bg3xkB0/icono.png" 
                    max-width="64" 
                    max-height="64"
                  >
                  </v-img>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="email"
                    placeholder="username"
                    label="email"
                    color="grey"
                    style="margin-bottom: -1.4em"
                    append-icon="mdi-email"
                    filled rounded dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="password"
                    placeholder="password"
                    type="password"
                    append-icon="mdi-key"
                    label="password"
                    color="grey"
                    style="margin-bottom: -1.4em"
                    filled rounded dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" xs="12" sm="12" md="6">
                  <v-btn
                    class="text-lowercase"
                    color="#CD982B"
                    @click="verifyData"
                    dark
                  >
                    ingresar
                  </v-btn>  
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
      <Error :open="openError" :content="errorMsg"></Error>
    </v-row>
</template>

<script>
import serverRequest from '../controller/serverRequest.js'
import Error from '../components/ModalErrors.vue'
import { mapMutations } from 'vuex'
  
  export default {

    name: "Login",
    data: () => ({
      email: '',
      password: '',
      errorMsg: '',
      openError: false
    }),
    methods:{
      ...mapMutations(['setToken', 'setEmail', 'setName', 'setImage']),
      verifyData(){
        const response = serverRequest.login(this.email, this.password)
        response.then(res => {
          if(res.status == 200){

            this.password = ''
            this.email = ''

            this.setToken(res.data.token)
            this.setEmail(res.data.data[0]._id)
            this.setName(res.data.data[0].nombre)
            this.setImage(res.data.data[0].imagen)
            
            this.openPrincipalView()
          } 
          else{
            this.openError = !this.openError
            this.errorMsg = res.msg
          } 
        })
      },
      openPrincipalView(){
        this.$router.push("/dashboard")
      }
    },
    components:{
      Error
    }  
  } 
</script>

<style>

.card--dimensions{
  padding: 0 0 3vh 0;
}

@media screen and (orientation: landscape){
  .card--dimensions{
    width: 30vw
  }
}

@media screen and (orientation: portrait){
  .card--dimensions{
    height: auto;
    width: 90vw
  } 
}
</style>

