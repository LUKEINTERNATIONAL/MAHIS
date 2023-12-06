<template>
    <ion-row class="dashed_bottom_border">
        <ion-col class="item_header_col">
            <span class="item_header">Hieght and weight</span>
        </ion-col>
        <ion-col>
            <ion-row>
                <ion-col>
                    <h5>Height*</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.height" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.height" fill="outline"></ion-input>
                        <ion-label>cm</ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <h5>Weight*</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.weight" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.weight" fill="outline"></ion-input>
                        <ion-label>kg</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="bmi" :style="'background-color:'+ BMI.color[0]" v-if="BMI.index">
                <span class="position_content bmi_results">
                    <span v-html="getBMIIcon(BMI.color)"> </span> 
                    <span :style="'color:'+BMI.color[1]+'; font-weight:600; margin: 0px 20px;'"> {{ BMI.index }}</span> 
                    <span :style="'color:'+BMI.color[1]+';'"> {{ BMI.result }} </span>
                    
                </span>
            </ion-row>
        </ion-col>
    </ion-row>
    <ion-row class="dashed_bottom_border">
        <ion-col class="item_header_col">
            <span class="item_header">Blood pressure</span>
        </ion-col>
        <ion-col>
            <ion-row>
                <ion-col>
                    <h5>Systolic Pressure*</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.systolicPressure" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.systolic" fill="outline"></ion-input>
                        <ion-label>mmHg</ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <h5>Diastolic pressure*</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.diastolicPressure" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.diastolic" fill="outline"></ion-input>
                        <ion-label>mmHg</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-col>
    </ion-row>
    <ion-row class="dashed_bottom_border">
        <ion-col class="item_header_col">
            <span class="item_header">Temperature and rates</span>
        </ion-col>
        <ion-col>
            <ion-row>
                <ion-col>
                    <h5>Temperature</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.temprature" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.temperature" fill="outline"></ion-input>
                        <ion-label>C</ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <h5>Pulse rate</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.pulse" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.pulse" fill="outline"></ion-input>
                        <ion-label>BMP</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <h5>Respiratory rate</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.respiratory" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.respiratory" fill="outline"></ion-input>
                        <ion-label>BMP</ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <h5>Oxygen saturation</h5>
                    <ion-item class="input_item">
                        <ion-label><span v-html="iconsContent.oxgenStaturation" class="selectedPatient"></span></ion-label>
                        <ion-input @ionInput="vitalsValidations()" v-model="vitals.oxygen" fill="outline"></ion-input>
                        <ion-label>%</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-col>
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
            IonInput 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';
    import { BMIService } from "@/services/bmi_service"
    import { useDemographicsStore } from '@/stores/DemographicStore'
    import { useVitalsStore } from '@/stores/VitalsStore'
    import { mapState } from 'pinia';
    import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
    import { arePropertiesNotEmpty } from "@/utils/Objects";
    import HisDate from "@/utils/Date";

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
        IonInput
        },
        data() {
    return {
        iconsContent: icons,
        BMI: {}
    };
  },
  computed:{
        ...mapState(useDemographicsStore,["demographics"]),
        ...mapState(useVitalsStore,["vitals"]),
    },
    mounted(){
        this.patientBMI() 
    },
    watch: {
        vitals: {
            handler(newVitals, oldVitals){
                this.patientBMI() 
            },
            deep: true
        }
    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        vitalsValidations(){
            if(this.vitals.weight && this.vitals.height && this.demographics.gender && this.demographics.birthdate){
                this.patientBMI()
            }else{
                this.BMI = {}
            }
            if(arePropertiesNotEmpty(this.vitals,['height', 'weight', 'systolic', 'diastolic'])){
                // toastWarning('Vitals tempra saved')
                
            }
            const vitalsStore = useVitalsStore()
            vitalsStore.setVitals(this.vitals)
        },
        async patientBMI(){
           this.BMI = await BMIService.getBMI(
                parseInt(this.vitals.weight),
                parseInt(this.vitals.height) , 
                this.demographics.gender,
                HisDate.calculateAge(this.demographics.birthdate,HisDate.currentDate())
            )
        },
        getBMIIcon(data: any){
            return BMIService.iconBMI(data)
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
.vitals_title{
    border-bottom: 1px solid #B3B3B3;
    margin-bottom: 50px ;
}
.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: gray; /* Adjust the color as needed */
}

.item_header{
    --border-width: 0 0 0 0;
    font-weight: 700;
    color:#00190E;
}
.bmi{
    border-radius: 5px;
}
.bmi_results{
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_header_col{
    max-width: 300px;
}
ion-col{
    padding-bottom:15px ;
}
h5{
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
  