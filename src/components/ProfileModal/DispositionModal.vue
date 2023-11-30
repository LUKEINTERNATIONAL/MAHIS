<template>
        <ion-modal id="example-modal" ref="modal" trigger="open-custom-dialog">
            <div class="wrapper">
                <h1>Dialog header</h1>

                <ion-list lines="none">
                <ion-item :button="true" :detail="false" @click="dismiss()">
                    <ion-label>Item 1</ion-label>
                </ion-item>
                <ion-item :button="true" :detail="false" @click="dismiss()">
                    <ion-label>Item 2</ion-label>
                </ion-item>
                <ion-item :button="true" :detail="false" @click="dismiss()">
                    <ion-label>Item 3</ion-label>
                </ion-item>
                </ion-list>
            </div>
        </ion-modal>
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
            menuController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';

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
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        }
        
    }
    });
</script>

<style scoped>

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }

  ion-modal#example-modal .wrapper {
    margin-bottom: 10px;
  }
</style>
  