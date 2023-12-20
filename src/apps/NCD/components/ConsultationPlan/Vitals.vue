<template>
    <basic-form :contentData="vitals"></basic-form>
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
    import { VitalsService } from "@/services/vitals_service";
    import BasicForm from '@/components/BasicForm.vue';

    export default defineComponent({
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        BasicInputField,
        BasicForm
    },
    data() {
    return {
        iconsContent: icons,
        BMI: {},
        vValidations: '' as any,
        inputData: [
            {
                sectionHeader: 'Hieght and weight',
                data:
                    { 
                        colData:[
                            [
                                {
                                    inputHeader: 'Height*',
                                    unit: 'cm',
                                    icon: icons.height,
                                    name: 'height',
                                    value: ''
                                },
                                {
                                    inputHeader: 'Weight*',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    name: 'weight',
                                    value: ''
                                },
                                
                            ],
                        ]
                    }
                ,
                alerts:
                [
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        index: ''
                    }
                ]    
            },
            {
                sectionHeader: 'Blood pressure',
                data:
                    { 
                        colData:[
                            [
                                {
                                    inputHeader: 'Systolic Pressure*',
                                    unit: 'mmHg',
                                    icon: icons.systolicPressure,
                                    name: 'systolic',
                                    value: ''
                                },
                                {
                                    inputHeader: 'Diastolic pressure*',
                                    unit: 'kg',
                                    icon: icons.diastolicPressure,
                                    name: 'diastolic',
                                    value: ''
                                }
                            ]
                        ]
                    },
                alerts:[
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        index: ''
                    }
                ]
            },
            {
                sectionHeader: 'Temperature and rates',
                data:
                    { 
                        colData:[
                            [
                                {
                                    inputHeader: 'Temperature',
                                    unit: 'C',
                                    icon: icons.temprature,
                                    name: 'temperature',
                                    value: ''
                                },
                                {
                                    inputHeader: 'Pulse rate',
                                    unit: 'BMP',
                                    icon: icons.pulse,
                                    name: 'pulse',
                                    value: ''
                                }
                            ],
                            [
                                {
                                    inputHeader: 'Respiratory rate',
                                    unit: 'BMP',
                                    icon: icons.respiratory,
                                    name: 'respiratory',
                                    value: ''
                                },
                                {
                                    inputHeader: 'Oxygen saturation',
                                    unit: '%',
                                    icon: icons.oxgenStaturation,
                                    name: 'oxygen',
                                    value: ''
                                }
                            ]
                        ]
                    }
            }
               
        ]
    };
  },
  computed:{
        ...mapState(useDemographicsStore,["demographics"]),
        ...mapState(useVitalsStore,["vitals"]),
    },
    mounted(){
        if(this.vitals.length == 0){
            const vitalsStore = useVitalsStore()
            vitalsStore.setVitals(this.inputData)
        }
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
            this.vValidations = new VitalsService();
            const test =this.vValidations.validator({'label':'Weight',other: {
            modifier: "KG",
            icon: "weight",
            required: true,
          },'value':this.vitals[0].data.colData[0][1].value
        })
            console.log(test)
            if(this.vitals[0].data.colData[0][0].value 
            && this.vitals[0].data.colData[0][1].value 
            && this.demographics.gender && this.demographics.birthdate){
                this.patientBMI()
            }else{
                this.BMI = {}
            }
            if(arePropertiesNotEmpty(this.vitals,['height', 'weight', 'systolic', 'diastolic'])){
                // toastWarning('Vitals tempra saved')
                
            }
           this.updateVitalsStores()
        },
        async patientBMI(){
           this.BMI = await BMIService.getBMI(
                parseInt(this.vitals[0].data.colData[0][1].value),
                parseInt(this.vitals[0].data.colData[0][0].value) , 
                this.demographics.gender,
                HisDate.calculateAge(this.demographics.birthdate,HisDate.currentDate())
            )
            this.vitals[0].alerts[0].icon = this.getBMIIcon(this.BMI.color)
            this.vitals[0].alerts[0].backgroundColor = this.BMI.color[0]
            this.vitals[0].alerts[0].textColor = this.BMI.color[1]
            this.vitals[0].alerts[0].index = this.BMI.index
            this.vitals[0].alerts[0].value = this.BMI.result

            this.updateVitalsStores()
            
        },
        getBMIIcon(data: any){
            return BMIService.iconBMI(data)
        },
        updateVitalsStores(){
            const vitalsStore = useVitalsStore()
            vitalsStore.setVitals(this.vitals)

            
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
  