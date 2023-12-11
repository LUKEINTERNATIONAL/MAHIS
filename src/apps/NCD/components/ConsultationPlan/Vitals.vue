<template>
    <ion-row  v-for="(item,index) in inputData" :key="index" class="dashed_bottom_border">
        <ion-col class="item_header_col">
            <span class="item_header">{{ item.sectionHeader }}</span>
        </ion-col>
        <ion-col>
            <ion-row v-for="(element, index2) in item.data" :key="index2">
                <ion-col>
                    <BasicInputField 
                        :inputHeader="element[0].inputHeader"
                        :unit="element[0].unit"
                        :icon ="element[0].icon"
                        :inputValue="vitals[(element[0].name)]"
                        @update:inputValue="value => vitals[element[0].name] = value"
                    />
                </ion-col>
                <ion-col>
                    <BasicInputField 
                        :inputHeader="element[1].inputHeader"
                        :unit="element[1].unit"
                        :icon ="element[1].icon"
                        :inputValue="vitals[element[1].name]"
                        @update:inputValue="value => vitals[element[1].name] = value"
                    />
                </ion-col>
            </ion-row>
            <ion-row class="bmi" :style="'background-color:'+ BMI.color[0]" v-if="BMI.index && index == 0">
                <span class="position_content bmi_results">
                    <span v-html="getBMIIcon(BMI.color)"> </span> 
                    <span :style="'color:'+BMI.color[1]+'; font-weight:600; margin: 0px 20px;'"> {{ BMI.index }}</span> 
                    <span :style="'color:'+BMI.color[1]+';'"> {{ BMI.result }} </span>
                    
                </span>
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
    import { icons } from '@/utils/svg';
    import { BMIService } from "@/services/bmi_service"
    import { useDemographicsStore } from '@/stores/DemographicStore'
    import { useVitalsStore } from '@/stores/VitalsStore'
    import { mapState } from 'pinia';
    import { toastWarning, toastDanger, toastSuccess } from "@/utils/Alerts";
    import { arePropertiesNotEmpty } from "@/utils/Objects";
    import HisDate from "@/utils/Date";
    import BasicInputField from "@/components/BasicInputField.vue"

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
        BasicInputField
    },
    data() {
    return {
        iconsContent: icons,
        BMI: {},
        inputData: [
            {
                sectionHeader: 'Hieght and weight',
                data:
                [
                    [
                        {
                            sectionHeader: 'Hieght and weight',
                            inputHeader: 'Height*',
                            unit: 'cm',
                            icon: icons.height,
                            name: 'height'
                        },
                        {
                            inputHeader: 'Weight*',
                            unit: 'kg',
                            icon: icons.weight,
                            name: 'weight'
                        }
                    ]
                ]   
            },
            {
                sectionHeader: 'Blood pressure',
                data:
                [
                        [
                        {
                            inputHeader: 'Systolic Pressure*',
                            unit: 'mmHg',
                            icon: icons.systolicPressure,
                            name: 'systolic'
                        },
                        {
                            inputHeader: 'Diastolic pressure*',
                            unit: 'kg',
                            icon: icons.diastolicPressure,
                            name: 'diastolic'
                        }
                    ]
                ]   
            },
            {
                sectionHeader: 'Temperature and rates',
                data:
                [
                    [
                        {
                            inputHeader: 'Temperature',
                            unit: 'C',
                            icon: icons.temprature,
                            name: 'temperature'
                        },
                        {
                            inputHeader: 'Pulse rate',
                            unit: 'BMP',
                            icon: icons.pulse,
                            name: 'pulse'
                        }
                    ],
                    [
                        {
                            inputHeader: 'Respiratory rate',
                            unit: 'BMP',
                            icon: icons.respiratory,
                            name: 'respiratory'
                        },
                        {
                            inputHeader: 'Oxygen saturation',
                            unit: '%',
                            icon: icons.oxgenStaturation,
                            name: 'oxygen'
                        }
                    ]
                ]   
            }
               
        ]
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
                this.vitalsValidations()
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
        vitalsValidations() {
            console.log(this.vitals.height)
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
  