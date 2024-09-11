<template>
  <div class="privacy-policy-view">
    <ion-header :translucent="true" class="primary_color_background">
      <div class="content_manager" style="margin-top: unset">
        <ion-toolbar class="content_width primary_color_background">
          <ion-title style="cursor: pointer" @click="">
            <b>Privacy Policy</b>
          </ion-title>
        </ion-toolbar>
      </div>
    </ion-header>

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
  </div>
</template>

<script lang="ts">
import { getBaseURl } from "@/utils/GeneralUti";
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      pdfUrl: '',
    };
  },
  mounted() {
    let baseURL = getBaseURl();
    if (baseURL.length > 0) {
        baseURL = baseURL;
    }
    this.pdfUrl = `../../${baseURL}/public/assets/MaHIS_Privacy_Policy.pdf`;
  },
};
</script>

<style scoped>
.privacy-policy-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.primary_color_background {
  background-color: #4CAF50; /* Use the same primary green color */
}

.pdf-viewer {
  flex-grow: 1;
  overflow: hidden;
}
</style>