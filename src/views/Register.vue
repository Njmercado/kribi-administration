<template>
    <v-row>
      <v-col 
        style="background-color: #8c3420"
        cols="12" md="12" xs="12" sm="12" lg="5" xlg="5"
      >
        <v-container>
          <v-col cols="12">
            <v-btn
              class="text-lowercase"
              color="#E09518"
              style="color:#8c3420"
              to="/"
              small
            >
              atrás 
            </v-btn>
          </v-col>
          <v-row 
            style="height: 20vh"
            align="center"
          >
            <v-col
              style="text-align: center"
              cols="12" md="12" sm="12" xs="12"
            >
              <span style="color:#ffc36b; font-size: 1.2em">Kribí - Registro</span> 
            </v-col>
          </v-row>
          <v-row
            align="center"
            style="height: 50vh"
          >
            <v-col
              cols="12"
              justify="center"
              style="text-align: center; color:white"
            >
              <span>Para poder embarcarse en este lindo barco es necesario que usted tenga </span>
              <span>la aprobación de una persona que ya se encuentre dentro, ya sea un editor o un administrador. </span>
              <span>Es mejor que sea un editor. El editor que autorice su ingreso </span>
              <span>deberá generar un codigo, brindando sú contraseña, e ingresandolo acá para su registro.</span>
              <br>
              <br>
              <span style="color: #ffc36b">Nota: Copie y pegue el codigo tal cual, sin espacios ni caracteres de más.</span>
            </v-col>
          </v-row>
        </v-container>         
      </v-col>


      <!-- Form Area -->
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
                    v-model="name"
                    color="grey"
                    label="name"
                    style="margin-bottom: -1.8em"
                    append-icon="mdi-account-box"
                    filled rounded dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="email"
                    color="grey"
                    label="email"
                    style="margin-bottom: -1.8em"
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
                    type="password"
                    label="password"
                    color="grey"
                    style="margin-bottom: -1.8em"
                    append-icon="mdi-key"
                    filled rounded dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="registeredEmail"
                    label="email registrado"
                    color="grey"
                    style="margin-bottom: -1.8em"
                    append-icon="mdi-email"
                    filled dense rounded
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="code"
                    type="password"
                    label="código"
                    color="grey"
                    style="margin-bottom: -1.8em"
                    append-icon="mdi-lock"
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
                    :loading="processingRegister"
                    dark
                  >
                    registrarse 
                  </v-btn>  
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
      <Status :open="openError" :content="errorMsg" :type="typeMsg"></Status>
    </v-row>
</template>

<script>
import serverRequest from '../controller/serverRequest.js'
import Status from '../components/ModalStatus.vue'
  
  export default {

    name: "Login",
    data: () => ({
      name: '',
      email: '',
      password: '',
      code: '',
      registeredEmail: '',
      openError: false,
      errorMsg: '',
      isTypingCode: 0,
      typeMsg: 'error',
      processingRegister: false
    }),
    methods:{
      verifyData() {
        this.processingRegister = true
        serverRequest.register(
          this.name, 
          this.email, 
          this.password, 
          this.registeredEmail, 
          this.code
        ).then(async result => {
          if(result.status == 200) {
            this.openError = await !this.openError
            this.errorMsg = await result.msg
            this.typeMsg = await 'success'
            this.processingRegister = false
            setTimeout(() => {
              this.redirectToLogin() 
            }, 1000)
          }else{
            this.typeMsg = await 'error'
            this.openError = !this.openError 
            this.errorMsg = result.msg
            this.processingRegister = false
          } 
        })
      },
      redirectToLogin(){
        this.$router.push('/')
      },
    },
    watch: {
      code(){
        if(this.isTypingCode > 3) {
          this.errorMsg = 'Please do not write the code, just copy and paste it!!!'
          this.openError = !this.openError 
          this.isTypingCode = 0
          this.code = '' 
        } else {
          this.isTypingCode += 1
        }
      }

    },
    components:{
      Status
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

