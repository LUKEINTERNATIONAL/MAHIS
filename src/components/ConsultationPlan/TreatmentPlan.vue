<template>
    <ion-list>
        <ion-label>Medical allergies</ion-label>
        <ion-row>
            <ion-item lines="none" class="medicalAl">
                <ion-row>
                    <div v-for="(item, index) in medicalAllergiesList" :key="index">
                        <ion-button v-if="item.selected" @click="selectAl(item)" class="medicalAlBtn">
                        {{ item.name }}
                        <ion-icon slot="end" style="font-size: x-large;" :icon="closeOutline"></ion-icon>
                    </ion-button>
                    </div>
                    <div>
                        <ion-button id="click-trigger" fill="clear" class="medicalAlAddBtn">
                            <ion-icon :icon="addOutline"></ion-icon>
                        </ion-button>
                        <ion-popover class="popover-al" :show-backdrop="false" trigger="click-trigger" trigger-action="click">
                            <ion-content color="light"  class="ion-padding content-al">
                                <ion-label>Choose the allergy:</ion-label>
                                <ion-list class="list-al">
                                    <div class="item-al" v-for="(item, index) in medicalAllergiesList" :key="index">
                                        <ion-label  @click="selectAl(item)" style="display: flex; justify-content: space-between;">
                                            {{ item.name }}
                                            <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon> 
                                        </ion-label>                                     
                                    </div>
                                </ion-list>
                            </ion-content>
                        </ion-popover>
                    </div>
                </ion-row>
            </ion-item>
        </ion-row>
        <ion-item lines="none">
            <ion-label>List of medications</ion-label>
        </ion-item>
        <ion-item>
            <ion-label style="display: contents; color: #00190E; font-weight: 400; font: inter; line-height: 14px;">Metformin Extentend</ion-label>
            <ion-label style="margin-left: 15px; color: #636363; font-weight: 400; font: inter; line-height: 14px;">750mg / twice / daily / 30days / until 2023-09-23</ion-label>        
        </ion-item>
    </ion-list>
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
            menuController,
            IonButton
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline,addOutline,closeOutline, checkmarkOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonButton,
        IonMenu,
        IonTitle,
        IonToolbar    },
        data() {
    return {
        iconsContent: icons,
        medicalAllergiesList: [
            {
                name: 'Eye too short',
                selected: false,
            },
            {
                name: 'Glibenclamide 2',
                selected: false,
            },
            {
                name: 'Gliben',
                selected: false,
            },
            {
                name:  'Metformin',
                selected: false,
            },
            {
                name: 'Short acting insulin',
                selected: false,
            },
            {
                name: 'Glibenclamide',
                selected: false,
            }
          ]
    };
  },
    setup() {
      return { checkmark, pulseOutline, closeOutline, addOutline, checkmarkOutline };
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        selectAl(item: any) {
            item.selected = !item.selected
        },
    }
    });
</script>

<style scoped>
#container {
text-align: center;

position: absolute;
left: 0;
right: 0;
top: 50%;
transform: translateY(-50%);
}

#container strong {
font-size: 20px;
line-height: 26px;
}

#container p {
font-size: 16px;
line-height: 22px;

color: #8c8c8c;

margin: 0;
}

#container a {
text-decoration: none;
}
ion-item.medicalAl {
    --background: #fff;
    --border-radius: 5px;
}
ion-button.medicalAlBtn {
    --background: #FECDCA;
    --color: #B42318;
    text-transform: none;
}
ion-button.medicalAlAddBtn {
    font-size: large;
}
ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #EBEBEB;
    margin-top: 8px;
}
.item-al:hover {
  background-color: #55515148;
  padding: 5px;
  border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-content.content-al {
    --background: #fff;
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}
</style>
  