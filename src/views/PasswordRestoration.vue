<template>
    <v-row>
      <ModalErrors :open="openCloseModalError" :content="modalMessage"></ModalErrors>
      <v-col
        cols="12"
        md="12"
        xs="12"
        sm="12"
        lg="5"
        xlg="5"
        style="background-color: #8c3420"
      >
        <v-container>
          <v-col 
            cols="12"
          >
            <v-btn
              class="text-lowercase"
              small
              color="#E09518"
              style="color:#8c3420"
              to="/"
            >
              atrás 
            </v-btn>
          </v-col>
          <v-row 
            style="height: 20vh"
            align="center"
          >
            <v-col
              cols="12"
              md="12"
              sm="12"
              xs="12"
              style="text-align: center"
            >
              <span style="color:#ffc36b; font-size: 1.2em">Kribí - Restauración contraseña</span> 
            </v-col>
          </v-row>
          
          <v-row
            align="center"
            style="height: auto"
          >
            <v-col
              cols="12"
              justify="center"
              style="text-align: center; color:white"
            >
              <span>Si desea recuperar su contraseña, por favor presione el boton </span>
              <span style="color: lightgreen">Enviar </span>
              <span>que se encuentra en la parte de abajo, una vez hecho esto se le estará </span>
              <span>enviando un codigo de verificación a su correo el cual debe ingresar en la </span>
              <span style="color: #ffc36b">parte derecha(o debajo) de su pantalla.</span>
              <br>
              <br>
              <span>Cuando el codigo sea escrito y verificado, entonces el campo de ingreso </span>
              <span>de su nueva contraseña será activado.</span>
              <br>
              <br>
              <span style="color: #ffc36b">Nota: copie y pegue el codigo tal cual, sin espacios ni caracteres de más.</span>
              <br>
              <br>
              <br>
              <v-btn
                class="text-lowercase"
                small
                color="green"
                dark
              >
                enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>         
      </v-col>
      <v-col
        cols="12" 
        sm="12"
        xs="12"
        md="12"
        lg="7"
        xlg="7"
      >
        <v-container>
          <v-row 
            align="center"
            justify="center"
            style="height:90vh; text-align: center"
          >
            <v-card
              class="card--dimensions"
            >
              <v-row justify="center">
                <v-col cols="10">
                  <v-img 
                    src="https://i.ibb.co/Bg3xkB0/icono.png" 
                    max-width="64" 
                    max-height="64"
                    style="margin: 30px auto 30px auto;"
                  >
                  </v-img>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    filled
                    rounded
                    append-icon="mdi-email"
                    dense
                    label="email"
                    color="grey"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    type="password"
                    filled
                    rounded
                    append-icon="mdi-lock"
                    dense
                    label="código"
                    color="grey"
                    @keyup="checkIfUserTypingCode"
                    v-model="codeTextFieldValue"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    type="password"
                    :disabled="activateDesactivatePasswordField"
                    filled
                    rounded
                    append-icon="mdi-key"
                    dense
                    label="nueva contraseña"
                    color="grey"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col 
                  cols="12"
                  xs="12"
                  sm="12"
                  md="6"
                >
                  <v-btn
                    class="text-lowercase"
                    color="#CD982B"
                    dark
                    @click="showModal"
                  >
                    cambiar 
                  </v-btn>  
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
</template>

<script>

import ModalErrors from '../components/ModalErrors.vue'

  export default {

    name: "Login",
    data: () => ({

      activateDesactivatePasswordField: true,
      openCloseModalError: false,
      isUserTypingCode: 0,
      modalMessage: "",
      codeTextFieldValue: ""
    }),
    methods:{

      showModal(modalMessage){

        this.modalMessage = modalMessage
        this.openCloseModalError = !this.openCloseModalError
      },
      checkIfUserTypingCode(){
        
        const userAlreadyTypingCode = 6;

        if(this.isUserTypingCode == userAlreadyTypingCode) {

          this.isUserTypingCode = 0
          this.codeTextFieldValue = ""

          this.showModal("No escriba el codigo, solo copielo y peguelo en el campo de ingreso indicado!")
          return 0
        }

        this.isUserTypingCode++
      },
    },
    components:{

      ModalErrors,
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

