<template>
    <div class="delete_popover">
        <div>
            Do you want to delete it? {{ actionButtons[0] }}
        </div>
        <ion-row>
            <ion-col size="5">
                <ion-button color="danger" size="small" @click="actionButtons[0].onClick(test())">
                    <span v-html="iconsContent.delete" ></span>
                    Delete
                  </ion-button>
            </ion-col>
            <ion-col size="2"></ion-col>
            <ion-col size="5">
                <ion-button size="small" fill="clear">Cancle</ion-button>
            </ion-col>
        </ion-row>
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
            modalController,
            IonButton,
            IonIcon,
            IonPopover
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
        IonToolbar,
        IonButton,
        IonIcon,   },
        data() {
    return {
        iconsContent: icons,
    };
  }, 
props:{
  actionButtons: '' as any
},
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      test(){
        return this.actionButtons.map((btn: any) => {
                btn.size = 'large'
                btn.color = btn.color || 'primary'
                btn.visible = true
                btn.styleClass = 'full-width-ion-btn'
                if (!btn.onClick) {
                    btn.onClick = async () => {
                        await modalController.dismiss({action: btn.name })
                    }
                }
                return btn
            })
      }
    }
    });
</script>

<style scoped>

  
  .delete_popover{
    padding: 20px;
    text-align: center;
  }
  ion-popover {
  --width: 215px;
}
ion-button{
    text-transform: unset;
}
</style>
  