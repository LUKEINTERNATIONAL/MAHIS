<template>
    <ion-searchbar
      v-model="searchQuery"
      @ionInput="handleInput"
      placeholder="Search client by MRN or Diabete clinical No."
      class="searchField"
    ></ion-searchbar>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      handleInput(event) {
        const searchText = event.target.value;
        this.$emit("search", searchText);
      },
    },
  };
  </script>
  
  <style scoped>
  .searchField{
    --border-radius:10px;
    --box-shadow: inset 0 -3em 3em rgba(207, 250, 207, 0.3),
    0 0 0 2px white,
    0.3em 0.3em 1em rgba(44, 44, 44, 0.6);
    width:25vw;
  }
  </style>
  