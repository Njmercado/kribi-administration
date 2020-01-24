<template>
  <div>
    <v-speed-dial
      style="margin-top: -1em"
      direction="left"
      transition="fade-transition"
      top right
      >
      <template v-slot:activator>
        <v-btn fab dark color="grey">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>

      <!-- Settings -->
      <v-btn
        color="#CD982B"
        @click="showConfigurationModal"
        small fab dark
        >
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>

      <!-- Words informations -->
      <v-btn
        color="blue darken-1"
        @click="openCloseWordInformationModal = !openCloseWordInformationModal"
        small fab dark
        >
        <v-icon>mdi-alpha-w</v-icon>
      </v-btn>

      <!-- Articles -->
      <v-btn
        color="#8c3420"
        @click="openArticleModal = !openArticleModal"
        small fab dark
        >
        <v-icon>mdi-file-document-outline</v-icon>
      </v-btn>

      <!-- Top Words-->
      <v-btn
        style="margin-right: 1em"
        color="teal"
        @click="openTopWordsSideBarHandler"
        small fab dark
        >
        <v-icon large>
          mdi-numeric-10
        </v-icon>
      </v-btn>
      <!---->
    </v-speed-dial>

    <!-- Dialog callers -->
    <ModalConfigurations
      :open="openCloseConfigurationModal"
      :email="getEmail"
      :name="getName"
      :description="getDescription"
      :token="getToken"
      :image="getImage"
      >
    </ModalConfigurations>
    <ModalWordInformation
      :open="openCloseWordInformationModal"
      action="create"
    >
    </ModalWordInformation>
    <TopWords
      :open="openTopWordsSideBar"
      :palenque="topPalenque"
      :espanol="topEspanol"
      >
    </TopWords>
    <ModalArticle
      :open="openArticleModal"
      >
    </ModalArticle>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ModalConfigurations from '../components/ModalConfigurations.vue'
import ModalWordInformation from '../components/ModalWordInformation.vue'
import ModalArticle from '../components/ModalArticle.vue'
import TopWords from '../components/ModalTopWords.vue'
import request from '../controller/serverRequest'


export default {
  name: "Options",
  data: () => ({
    openCloseConfigurationModal: false,
    openTopWordsSideBar: false,
    openCloseWordInformationModal: false,
    openArticleModal: false,
    topEspanol: [],
    topPalenque: [],
  }),
  methods:{
    showConfigurationModal(){
      this.openCloseConfigurationModal= !this.openCloseConfigurationModal
    },
    openTopWordsSideBarHandler(){

      if(this.topEspanol.length == 0){// Solo va a realizar la busqueda una sola vez

        request
          .getTopWords(this.getToken)
          .then(result => {
  
            this.topPalenque = result.palenque
            this.topEspanol = result.espanol
            this.openTopWordsSideBar = !this.openTopWordsSideBar
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.openTopWordsSideBar = !this.openTopWordsSideBar
      }
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getName', 'getDescription', 'getEmail', 'getImage'])
  },
  components:{
    ModalConfigurations,
    ModalWordInformation,
    ModalArticle,
    TopWords
  }
}
</script>

