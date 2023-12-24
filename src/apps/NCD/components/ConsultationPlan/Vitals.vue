<template>
    <basic-form :contentData="vitals" @update:inputValue="validateColData($event)"></basic-form>
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
    import { iconBloodPressure } from '@/utils/SvgDynamicColor';
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
        BPStatus: {},
        vValidations: '' as any,
        hasValidationErrors: [] as any,
        inputData: [
            {
                validationStatus: false,
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
        this.updateVitalsStores()
        this.validateColData({})
    },
    watch: {
        vitals: {
            handler(newVitals, oldVitals){
                this.updateVitalsStores();
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
        validateColData(inputData: any) {
            const validate = new VitalsService();
            this.hasValidationErrors = []
            this.vitals.forEach(section => {
                section.data.colData.forEach((col: any) => {
                    if (col[0].inputHeader == 'Systolic Pressure*') {
                        const isSystolicValid = validate.validator(col[0]) == null && validate.validator(col[1]) == null;
                        this.BPStatus = isSystolicValid ? this.getBloodPressureStatus() : {};
                        this.updateBP();
                    }

                    if (col[0].inputHeader == 'Height*') {
                        const isHeightValid = validate.validator(col[0]) == null && validate.validator(col[1]) == null;
                        this.BMI = isHeightValid ? this.setBMI() : {};
                        this.updateBMI();
                    }

                    col.some((input: any) => {
                        const validateResult = validate.validator(input);

                        if (validateResult?.length > 0) {
                            this.hasValidationErrors.push('false');
                            if (input.inputHeader === inputData.name) {
                                toastWarning(validateResult,4000);
                                return true;
                            }
                        } else {
                            this.hasValidationErrors.push('true');
                        }

                        return false;
                    });
                });
            });

            this.vitals.validationStatus = !this.hasValidationErrors.includes('false');
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
            const bmiColor = this.BMI?.color ?? [];
            const vitals =this.vitals[0].alerts[0]
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? '';
            vitals.value = this.BMI?.result ?? '';
        },
        async updateBP(){
            const vitals =this.vitals[1].alerts[0]
            const bpColor = this.BPStatus?.colors ?? []
            vitals.icon = iconBloodPressure(bpColor)
            vitals.backgroundColor = bpColor[0];
            vitals.textColor = bpColor[1];
            vitals.index = this.systolicValue+ '/'+ this.diastolicValue ;
            vitals.value = this.BPStatus?.value ?? '';
        },
        getBloodPressureStatus(){
            if(this.diastolicValue && this.systolicValue){
                if( (parseInt(this.diastolicValue) >= 40 && parseInt(this.diastolicValue) <= 60)  &&  (parseInt(this.systolicValue) >= 70 && parseInt(this.systolicValue) <= 90 )){
                    return {colors:["#B9E6FE","#026AA2","#9ADBFE"],value:"Low"}
                }else
                if( (parseInt(this.diastolicValue) >= 60 && parseInt(this.diastolicValue) <= 80)  &&  (parseInt(this.systolicValue) >= 90 && parseInt(this.systolicValue) <= 120 )){
                    return {colors:["#DDEEDD","#016302","#BBDDBC"],value:"Normal"}
                }else
                if( (parseInt(this.diastolicValue) >= 80 && parseInt(this.diastolicValue) <= 90) &&  (parseInt(this.systolicValue) >= 120 && parseInt(this.systolicValue) <= 140) ){
                    return {colors:["#FEDF89","#B54708","#FED667"],value:"Pre-high blood pressure"}
                }else
                if( (parseInt(this.diastolicValue) >= 90 && parseInt(this.diastolicValue) <= 100)  &&  (parseInt(this.systolicValue) >= 140 && parseInt(this.systolicValue) <= 190 )){
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:"High blood pressure"}
                }else{
                    toastWarning("Invalid BP values",4000);
                    this.hasValidationErrors.push('false');
                    return {}
                }
            }else{
                return {colors:[],value:""}
            }
        }
    }
    });
</script>

<style scoped>
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
  