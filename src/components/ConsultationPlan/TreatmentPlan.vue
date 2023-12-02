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
            <ion-item @mousemove="highlightItem($event)" @mouseout="undoHighlightItem($event)" class="ionLbltp" v-for="(item, index) in selectedMedicalDrugsList" :key="index">
                <ion-label class="drgNmTrpln" style="display: contents; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.drugName }}</ion-label>
                <ion-label style="min-width: 700px; margin-left: 15px; color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.dose }} / {{ item.frequency }} / daily / {{ item.duration }} / until {{ item.prescription }}</ion-label>
                <ion-label style="cursor:pointer;"><span v-html="iconsContent.edit" class="modify_buttons"></span></ion-label>
                <ion-label style="cursor:pointer;"><span v-html="iconsContent.delete" class="modify_buttons"></span></ion-label>      
            </ion-item>

            <ion-row v-if="!addItemButton" style="margin-bottom: 20px;">
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input  v-model="drugName"  @ionInput="searchInput" fill="outline"></ion-input>
                        <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <ion-popover 
                        :is-open="popoverOpen" 
                        :event="event" 
                        @didDismiss="popoverOpen = false" 
                        :keyboard-close="false" 
                        :show-backdrop="false" 
                        :dismiss-on-select="true"
                        style="top: 10px;left: -25px;"
                        >
                        <ion-content class="search_card" >
                        
                            <ion-row class="search_result" v-for="(item, index) in diagnosisData" :key="index" >
                                <ion-col @click="selectedDiagnosis(item.name)">{{ item.name }} </ion-col>
                            </ion-row>
                        </ion-content>
                    </ion-popover>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Dose" v-model="dose"  fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Frequency" v-model="frequency" fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Duration" v-model="duration"  fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="input_item">
                        <ion-input placeholder="Prescription" v-model="prescription" @click="onprescInput()" fill="outline"></ion-input>
                        <ion-label><span  class="selectedPatient"></span></ion-label>
                    </ion-item>
                    <ion-popover 
                        :is-open="prescPopoverOpen" 
                        :event="prescEvent" 
                        @didDismiss="prescPopoverOpen = false" 
                        :keyboard-close="false" 
                        :show-backdrop="false" 
                        :dismiss-on-select="false"
                        style="top: 10px;left: -25px;"
                        >
                        <ion-content class="search_card" >
                            <ion-datetime ref="prescription" presentation="date"></ion-datetime>
                        </ion-content>
                    </ion-popover>
                </ion-col>
                <ion-col class="action_buttons">
                    <span @click="saveData()">+ Save</span> 
                </ion-col>
            </ion-row>

            <ion-button v-if="addItemButton" fill="clear" @click="addData" class="addMedicalAlBtn">
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
            IonButton,
            IonInput,
            IonDatetime
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
        IonToolbar,
        IonInput,
        IonDatetime
      },
        data() {
    return {
        iconsContent: icons,
        searchText: '' as any,
        no_item: true,
        search_item: false,
        display_item: false,
        addItemButton: true,
        popoverOpen: false,
        prescPopoverOpen: false,
        datetime: ref(),
        event: null,
        prescEvent: null,
        selectedMedicalDrugsList: [
            {
                drugName: 'Metformin Extentend',
                dose: '750mg',
                frequency: 'twice',
                duration: '30days',
                prescription: '2023-09-23'
            },
            {
                drugName: 'Metformin Extentend',
                dose: '750mg',
                frequency: 'twice',
                duration: '30days',
                prescription: '2023-09-29'
            }
        ] as any,
        diagnosisData: [] as any,
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
          ],
          drugName: '' as any,
          dose: '' as any,
          frequency: '' as any,
          duration: '' as any,
          prescription: '' as any,
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
        addData(){
            // this.searchText = ""
            // this.drugName = ""
            // this.dose = ""
            // this.frequency = ""
            // this.duration = ""
            // this.no_item = false
            this.addItemButton = false
            this.search_item =true
        },
        async saveData(){
            console.log(this.prescription)
            this.search_item= false
            this.display_item= true
            this.addItemButton =true

            console.log(this.drugName)
            console.log(this.dose)

            const drugString = {
                drugName: this.drugName,
                dose: this.dose,
                frequency: this.frequency,
                duration: this.duration,
                prescription: '2023-09-23'
            }
            this.selectedMedicalDrugsList.push(drugString)
        },
        async searchInput(text: any) {
            const searchText = text.target.value;
            this.openPopover(text)
            //this.diagnosisData = await PatientDiagnosisService.getDiagnosis(searchText, 1, 10)
        },
        onprescInput() {
            this.openPrescPopover('ev')
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
        }, 
        openPrescPopover(e: any) {
            this.prescEvent = e
            this.prescPopoverOpen = true
        },
        selectedDiagnosis(diagnosis: any){
            this.searchText = diagnosis
        },
        highlightItem(item: any) {
            // console.log("highlight", item.target)
            // console.log("highlight", item.target.childNodes)
            try {
                const firstChild = item.target.childNodes[0];
                firstChild.style.color = '#006401';
            } catch (error) {
                
            }


        },
        undoHighlightItem(item: any) {
            try {
                const firstChild = item.target.childNodes[0];
                firstChild.style.color = 'rgb(0, 0, 0)';
            } catch (error) {
                
            }
        }
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
.drgNmTrpln:hover {
    background-color: #006401 !important;
    color: #006401 !important;
    cursor: pointer;
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
.modify_buttons{
    padding-left: 20px;
}
.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
</style>
  