<template>
    <ion-row v-if="no_item" >
       <span class="dash_box">No Diagnosis added</span> 
    </ion-row>

    <span v-if="display_item" >
        <ion-row class="dashed_bottom_border" v-for="(item,index) in data" :key="index">
            
                <ion-col>
                    <ion-item class="item_no_border">
                        <span>{{ item }}</span>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item class="item_no_border">
                        <span>{{ item }}</span>
                    </ion-item>
                </ion-col>
                <ion-col class="action_buttons">
                    <ion-label><span v-html="iconsContent.edit" class="modify_buttons"></span></ion-label>
                    <ion-label><span v-html="iconsContent.delete" class="modify_buttons"></span></ion-label>
                </ion-col>
            
        </ion-row>
    </span>

    <ion-row v-if="search_item">
        <ion-col>
            <ion-item class="input_item">
                <ion-input  v-model="searchText"  @ionInput="searchInput" fill="outline"></ion-input>
                <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
            </ion-item>
            <ion-popover 
                :is-open="true" 
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
                <ion-input  fill="outline"></ion-input>
                <ion-label><span  class="selectedPatient"></span></ion-label>
            </ion-item>
        </ion-col>
        <ion-col class="action_buttons">
            <span @click="saveData()">+ Save</span> 
        </ion-col>
    </ion-row>

    <ion-row v-if="addItemButton">
        <span class="add_item" @click="addData()"> + Add Diagnosis </span> 
    </ion-row>

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
        IonInput,
        IonPopover
    } from '@ionic/vue';
    import { defineComponent,ref } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { icons } from '@/utils/svg.ts';
    import { PatientDiagnosisService } from "@/services/patient_diagnosis_service"

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
        IonInput,
        IonPopover
    },
    data() {
    return {
        iconsContent: icons,
        no_item: true,
        search_item: false,
        display_item: false,
        addItemButton: true,
        searchText: '' as any,
        data: [] as any,
        diagnosisData: [] as any,
        popoverOpen: false,
        event: null,
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        addData(){
            this.searchText = ""
            this.no_item = false
            this.addItemButton = false
            this.search_item =true
        },
        async saveData(){
            this.search_item= false
            this.display_item= true
            this.addItemButton =true
            this.data.push(this.searchText)
        },
        async searchInput(text: any) {
            const searchText = text.target.value;
            this.openPopover(text)
            this.diagnosisData = await PatientDiagnosisService.getDiagnosis(searchText, 1, 10)
        },
        openPopover(e: any) {
        this.event = e;
        this.popoverOpen = true;
      },
      selectedDiagnosis(diagnosis: any){
          this.searchText = diagnosis
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

.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    max-width: 70px;
}
.modify_buttons{
    padding-left: 20px;
}
.item_no_border{
    --border-color: transparent;
}
.search_result{
    padding: 10px;
  }
</style>
  