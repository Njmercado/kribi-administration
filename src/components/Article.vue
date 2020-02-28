<template>
  <v-card style="border-radius: 16px" color="#8c3420" width="10em" height="auto" dark>
    <v-img style="cursor: pointer" :src="photo"></v-img>
    <v-card-title>
      <label style="font-size: .6em">{{title}}</label>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="text-lowercase" :href="link" target="_blank" color="teal" small rounded>ver</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Article",
  data: () => ({}),
  props: ["author", "link", "photo", "title", "id"],
  watch: {},
  methods: {},
  components: {}
};
</script>

