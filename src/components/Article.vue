<template>
  <v-card>
    <v-img 
      :src="photo"
      max-width="100"
      max-height="100"
    >
    </v-img>
    <v-card-title>
      {{title}}
    </v-card-title>
    <v-card-text>
        {{author}} 
    </v-card-text>
    <v-card-actions>
      <v-btn :href="link">
        ir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Article",
  data: () => ({
  }),
  props: [
    "author",
    "link",
    "photo",
    "title"
  ],
  watch: {

  },
  methods:{
  },
  components:{
  }  
} 
</script>

