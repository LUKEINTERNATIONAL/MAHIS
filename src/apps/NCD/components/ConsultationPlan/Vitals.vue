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
        BPIcolors: '',
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
                                    value: '',
                                    required: true
                                },
                                {
                                    inputHeader: 'Weight*',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    value: '',
                                    required: true
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
                                    value: '',
                                    required: true
                                },
                                {
                                    inputHeader: 'Diastolic pressure*',
                                    unit: 'kg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    required: true
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
                                    value: ''
                                },
                                {
                                    inputHeader: 'Pulse rate',
                                    unit: 'BMP',
                                    icon: icons.pulse,
                                    value: ''
                                }
                            ],
                            [
                                {
                                    inputHeader: 'Respiratory rate',
                                    unit: 'BMP',
                                    icon: icons.respiratory,
                                    value: ''
                                },
                                {
                                    inputHeader: 'Oxygen saturation',
                                    unit: '%',
                                    icon: icons.oxgenStaturation,
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
    heightValue() {
      return this.getInputValue(0, 0, 0);
    },
    weightValue() {
      return this.getInputValue(0, 0, 1);
    },
    systolicValue() {
      return this.getInputValue(1, 0, 0);
    },
    diastolicValue() {
      return this.getInputValue(1, 0, 1);
    },
    temperatureValue() {
      return this.getInputValue(2, 0, 0);
    },
    pulseValue() {
      return this.getInputValue(2, 0, 1);
    },
    respiratoryValue() {
      return this.getInputValue(2, 1, 0);
    },
    oxygenValue() {
      return this.getInputValue(2, 1, 1);
    },
    },
    mounted(){
        this.validateColData()
    },
    watch: {
        vitals: {
            handler(newVitals, oldVitals){
                this.validateColData()
            },
            deep: true
        }
    },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
        getInputValue(sectionIndex: any, colIndex: any, inputIndex: any) {
        return this.vitals[sectionIndex]?.data.colData[colIndex]?.[inputIndex]?.value || '';
        },
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        updateVitalsStores(){
            const vitalsStore = useVitalsStore()
            this.vitals.length == 0 ? vitalsStore.setVitals(this.inputData) : vitalsStore.setVitals(this.vitals)
        },
        validateColData() {
            const targetedInputs = ['height', 'weight', 'systolic', 'diastolic'];
            const validate = new VitalsService();
            
            this.vitals.every(section =>
                section.data.colData.every((col: any) =>
                !col.some((input: any) => {
                    const validateResult = validate.validator(input)
                    
                    if(validateResult?.length > 0){
                        if((input.inputHeader == 'Weight*' || input.inputHeader == 'Height*')){
                            this.BMI = {}
                            this.updateBMI()
                            console.log("tttttttttttt")
                        }else{
                            console.log("uuuuuuuuuuuuu")
                            this.setBMI()
                        }


                        toastWarning(validateResult)
                        return true;
                    }else{
                        
                    }
                })
                )
            );
            this.updateVitalsStores()
            
            
        },

        vitalsValidations() {

            if(this.vitals.diastolic && this.vitals.systolic){
                this.BPIcolors = ''
                if( parseInt(this.vitals.diastolic) >= 40 && parseInt(this.vitals.diastolic) <= 60  &&  parseInt(this.vitals.systolic) >= 70 && parseInt(this.vitals.systolic) <= 90 ){
                    this.BPIcolors =this.getBloodPressureColors(['#B9E6FE','#026AA2'])
                }else
                if( parseInt(this.vitals.diastolic) > 60 && parseInt(this.vitals.diastolic) <= 80  &&  parseInt(this.vitals.systolic) >= 90 && parseInt(this.vitals.systolic) < 120 ){
                    this.BPIcolors =this.getBloodPressureColors(['#DDEEDD','#016302'])
                }else
                if( parseInt(this.vitals.diastolic) >= 80 && parseInt(this.vitals.diastolic) <= 90 &&  parseInt(this.vitals.systolic) >= 120 && parseInt(this.vitals.systolic) < 140 ){
                    this.BPIcolors =this.getBloodPressureColors(['#FEDF89','#B54708'])
                }else
                if( parseInt(this.vitals.diastolic) >= 90 && parseInt(this.vitals.diastolic) <= 100  &&  parseInt(this.vitals.systolic) >= 140 && parseInt(this.vitals.systolic) < 190 ){
                    this.BPIcolors =this.getBloodPressureColors(['#FECDCA','#B42318'])
                }else{
                    this.BPIcolors =this.getBloodPressureColors(['purple'])
                }

            }
        },
        async setBMI(){
            if(this.demographics.gender && this.demographics.birthdate){
                this.BMI = await BMIService.getBMI(
                    parseInt(this.vitals[0].data.colData[0][1].value),
                    parseInt(this.vitals[0].data.colData[0][0].value) , 
                    this.demographics.gender,
                    HisDate.calculateAge(this.demographics.birthdate,HisDate.currentDate())
                )
            }
            this.updateBMI()
        },
        async updateBMI(){
            const defaultValues = {
            icon: '',
            backgroundColor: '',
            textColor: '',
            index: 0,
            value: ''
            };
            const bmiColor = this.BMI?.color ?? [];

            this.vitals[0].alerts[0].icon = BMIService.iconBMI(bmiColor);
            this.vitals[0].alerts[0].backgroundColor = bmiColor[0] || '';
            this.vitals[0].alerts[0].textColor = bmiColor[1];
            this.vitals[0].alerts[0].index = this.BMI?.index ?? defaultValues.index;
            this.vitals[0].alerts[0].value = this.BMI?.result ?? defaultValues.value;
            this.updateVitalsStores()
        },
        getBloodPressureColors(color: any){
            console.log(color)
            return iconBloodPressure(color)
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
  