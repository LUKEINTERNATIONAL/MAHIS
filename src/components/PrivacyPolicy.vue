<template>
    <div class="pdf-viewer">
      <iframe
        v-if="pdfUrl"
        :src="pdfUrl"
        type="application/pdf"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "PrivacyPolicy",
    data() {
      return {
        pdfUrl: null,
      };
    },
    mounted() {
      this.pdfUrl = "../../public/assets/MaHIS_Privacy_Policy.pdf";
    },
  };
  </script>
  
  <style scoped>
  .pdf-viewer {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  </style>