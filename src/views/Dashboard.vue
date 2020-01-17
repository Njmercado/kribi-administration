<template>
  <v-container fluid>
    <v-row justify="end" align="center">
      <v-col cols="2" md="1" sm="1" xs="1" lg="1">
        <v-btn
          color="teal"
          @click="showConfigurationModal"
          small fab dark
          >
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2" md="1" sm="1" xs="1" lg="1">
        <v-btn
          color="teal"
          @click="showWordInformationModal('create')"
          small fab dark
          >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align="center" lg="1" md="2" sm="3" xs="12">
        <v-btn
          color="#8c3420"
          class="text-lowercase"
          @click="espanolOrPalenque = true"
          dark
          >
          <v-icon v-if="espanolOrPalenque" small>
            mdi-checkbox-blank-circle
          </v-icon>
          Español
        </v-btn>
      </v-col>
      <v-col align="center" lg="1" md="2" sm="3" xs="12">
        <v-btn
          color="#CD982B"
          class="text-lowercase"
          @click="espanolOrPalenque = false"
          dark
          >
          <v-icon v-if="!espanolOrPalenque" small>
            mdi-checkbox-blank-circle
          </v-icon>
          Palenque
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" style="margin-top: 5vh">
      <v-col cols="12" md="3" lg="3" xs="12" sm="8">
        <v-text-field
          placeholder="buscar palabra"
          label="Bucador"
          color="error"
          rounded filled dense
          >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" style="margin-top: 3vh">
      <v-col
        v-for="(word, index) in words"
        :key="index"
        cols="12" xlg="auto" lg="auto" md="auto" sm="auto" xs="12"
      >
        <Word :word="word.word" :definition="word.definition"></Word>
      </v-col>
    </v-row>
    <!-- Dialog callers -->

    <ModalConfigurations
      :open="openCloseConfigurationModal"
      >
    </ModalConfigurations>
    <!-- <SideBarSettings :open="openCloseConfigurationModal"> -->
    <!-- </SideBarSettings> -->
    <ModalWordInformation
      :open="openCloseWordInformationModal"
      :action="modalWordInformationAction"
      word="Troja"
      >
    </ModalWordInformation>
  </v-container>
</template>

<script>

import Word from '../components/Word.vue'
import ModalConfigurations from '../components/ModalConfigurations.vue'
import ModalWordInformation from '../components/ModalWordInformation.vue'

export default {

  name: "",
  data: () => ({
    words: [
      {word:"Esternocleidomastoideo", definition: "This is a really really long word to describe something"},
      {word:"Esternocleidomastoideo", definition: "This is a really really long word to describe something"},
      {word:"Esternocleidomastoideo", definition: "This is a really really long word to describe something"},
      {word:"Esternocleidomastoideo", definition: "This is a really really long word to describe something"},
      {word:"Esternocleidomastoideo", definition: "This is a really really long word to describe something"},
    ],
    openCloseConfigurationModal: false,
    openCloseWordInformationModal: false,
    modalWordInformationAction: "update",
    espanolOrPalenque: false // true --> españon; false --> palenque
  }),
  methods:{
    showConfigurationModal(){
      this.openCloseConfigurationModal= !this.openCloseConfigurationModal
    },
    showWordInformationModal(val){
      this.modalWordInformationAction = val
      this.openCloseWordInformationModal = !this.openCloseWordInformationModal
    },
  },
  components:{
    Word,
    ModalConfigurations,
    ModalWordInformation,
  }
}
</script>

<style>

</style>

