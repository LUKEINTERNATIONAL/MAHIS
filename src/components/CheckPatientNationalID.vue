<template>

    <div class="modal_wrapper">
        <div class="modal_title diplay_space_between">
            <span></span>
            <span @click="dismiss()" style="cursor: pointer; font-weight: 300;">x</span>
        </div>
        <div>
            <div class="title">
                    Does the patient have <br /> a National ID card?
            </div>
            <div class="content">
                <ion-card class="item" @click="nav('registration/scan')">
                    <div v-html="iconsContent.scanner"></div>
                    <div style="padding-top: 10px;">Yes, I need to scan it</div>
                </ion-card>
                <ion-card class="item"  @click="nav('registration/manual')" >
                    <div v-html="iconsContent.demographics"></div>
                    <div style="padding-top: 10px;">No, I need to enter the demographics manually</div>
                </ion-card>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
    import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            modalController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar    },
        data() {
    return {
        iconsContent: icons,
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      dismiss(){
        modalController.dismiss()
      },
      nav(url: any){
        this.dismiss()
        this.$router.push(url);
      }
    }
    });
</script>

<style scoped>
.title{
    text-align: center;
    padding: 50px 0px 40px 0px;
    font-weight: 700;
    font-size: 24px;
}

.content{
    display: flex;
}
.item{
    padding: 90px 0px 90px 0px;
    width: 50%;
    margin-inline: 5px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
}
</style>
  