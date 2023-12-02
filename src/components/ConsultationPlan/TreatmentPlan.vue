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
        <div style="margin-left: 30px; margin-bottom: 14px;">
            <ion-item class="ionLbltp">
                <ion-label style="display: contents; color: #00190E; font-weight: 400; font: inter; line-height: 14px;">Metformin Extentend</ion-label>
                <ion-label style="margin-left: 15px; color: #636363; font-weight: 400; font: inter; line-height: 14px;">750mg / twice / daily / 30days / until 2023-09-23</ion-label>        
            </ion-item>
            <ion-button fill="clear" @click="" class="addMedicalAlBtn">
                Add new medication
                <ion-icon slot="start" style="font-size: x-large;" :icon="addOutline"></ion-icon>
            </ion-button>
            <ion-row>
                <ion-button class="addMedicalTpBtn">Send to pharmacy</ion-button>
                <ion-button class="addMedicalTpBtn" style="margin-left: 4%;">Send to dispensation</ion-button>
            </ion-row>
        </div>
        <div class="checkLbltp">
            <ion-checkbox label-placement="end" style="font-size: 16px; font-weight: 600; line-height: 24px; margin: 15px; marg">Use of traditional medicine</ion-checkbox>
        </div>
        <div style="margin-top: 14px; margin-left: 10px;">
            <ion-label class="tpStndCls">Non-pharmalogical therapy and other notes</ion-label>
            <ion-item class="input_item" style="min-height: 120px; margin-top: 14px;">
                <ion-label><span v-html="iconsContent.editPen"></span></ion-label>
                <ion-textarea  style="min-height: 120px;" class="inputTpln" :auto-grow="true"  fill="outline"></ion-textarea >
            </ion-item>

        </div>
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
ion-button.addMedicalAlBtn {
    --color: #006401;
    text-transform: none;
}
ion-button.addMedicalTpBtn {
    --background: #DDEEDD;
    --color: #006401;
    text-transform: none;
    font-weight: 600;
    font-size: 16px;
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
ion-item.ionLbltp {
        border-bottom: 2px dotted var(--ion-color-medium);
        --inner-border-width:0;
    }
.checkLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
.tpStndCls {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}
</style>
  