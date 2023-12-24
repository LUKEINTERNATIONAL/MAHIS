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
    import { Service } from "@/services/service";

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
        vitalsInstance: {} as any,
        inputData: [
            {
                dbData: [],
                isFinishBtn: false,
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
                                    name: 'Height',
                                    required: true
                                },
                                {
                                    inputHeader: 'Weight*',
                                    unit: 'kg',
                                    icon: icons.weight,
                                    value: '',
                                    name: 'Weight',
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
                        name: '',
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
                                    name: 'Systolic',
                                    required: true
                                },
                                {
                                    inputHeader: 'Diastolic pressure*',
                                    unit: 'kg',
                                    icon: icons.diastolicPressure,
                                    value: '',
                                    name: 'Diastolic',
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
                        name: '',
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
                                    value: '',
                                    name: 'Temp'
                                },
                                {
                                    inputHeader: 'Pulse rate',
                                    unit: 'BMP',
                                    icon: icons.pulse,
                                    value: '',
                                    name: 'Pulse'
                                }
                            ],
                            [
                                {
                                    inputHeader: 'Respiratory rate',
                                    unit: 'BMP',
                                    icon: icons.respiratory,
                                    value: '',
                                    name: 'Respiratory rate'
                                },
                                {
                                    inputHeader: 'Oxygen saturation',
                                    unit: '%',
                                    icon: icons.oxgenStaturation,
                                    value: '',
                                    name: 'SP02'
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
        const userID: any  = Service.getUserID()
        this.vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
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
        async validateColData(inputData: any) {
            this.hasValidationErrors = []
            
            this.vitals.forEach(section => {
                section.data.colData.forEach((col: any) => {
                    if (col[0].inputHeader == 'Systolic Pressure*') {
                        const isSystolicValid = this.vitalsInstance.validator(col[0]) == null && this.vitalsInstance.validator(col[1]) == null;
                        this.BPStatus = isSystolicValid ? this.getBloodPressureStatus(col[0].value,col[1].value) : {};
                        this.updateBP(col[0].value,col[1].value);
                    }

                    if (col[0].inputHeader == 'Height*') {
                        const isHeightValid = this.vitalsInstance.validator(col[0]) == null && this.vitalsInstance.validator(col[1]) == null;
                        this.BMI = isHeightValid ? this.setBMI() : {};
                        this.updateBMI();
                    }

                    col.some((input: any) => {
                        const validateResult = this.vitalsInstance.validator(input);

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
            if(this.vitals.validationStatus){
                this.mapObs()
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
            const bmiColor = this.BMI?.color ?? [];
            const vitals =this.vitals[0].alerts[0]
            vitals.icon = BMIService.iconBMI(bmiColor);
            vitals.backgroundColor = bmiColor[0];
            vitals.textColor = bmiColor[1];
            vitals.index = this.BMI?.index ?? '';
            vitals.value = this.BMI?.result ?? '';
        },
        async updateBP(systolic: any,diastolic: any){
            const vitals =this.vitals[1].alerts[0]
            const bpColor = this.BPStatus?.colors ?? []
            vitals.icon = iconBloodPressure(bpColor)
            vitals.backgroundColor = bpColor[0];
            vitals.textColor = bpColor[1];
            vitals.index = systolic+ '/'+ diastolic;
            vitals.value = this.BPStatus?.value ?? '';
        },
        getBloodPressureStatus(systolic: any,diastolic: any){
            if(diastolic && systolic){
                if( (parseInt(diastolic) >= 40 && parseInt(diastolic) <= 60)  &&  (parseInt(systolic) >= 70 && parseInt(systolic) <= 90 )){
                    return {colors:["#B9E6FE","#026AA2","#9ADBFE"],value:"Low"}
                }else
                if( (parseInt(diastolic) >= 60 && parseInt(diastolic) <= 80)  &&  (parseInt(systolic) >= 90 && parseInt(systolic) <= 120 )){
                    return {colors:["#DDEEDD","#016302","#BBDDBC"],value:"Normal"}
                }else
                if( (parseInt(diastolic) >= 80 && parseInt(diastolic) <= 90) &&  (parseInt(systolic) >= 120 && parseInt(systolic) <= 140) ){
                    return {colors:["#FEDF89","#B54708","#FED667"],value:"Pre-high blood pressure"}
                }else
                if( (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 100)  &&  (parseInt(systolic) >= 140 && parseInt(systolic) <= 190 )){
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:"High blood pressure"}
                }else{
                    toastWarning("Invalid BP values",4000);
                    this.hasValidationErrors.push('false');
                    return {}
                }
            }else{
                return {colors:[],value:""}
            }
        },
        async onFinish(formData: any) {
      const encounter = await this.vitalsInstance.createEncounter();

      if (!encounter) return toastWarning("Unable to create treatment encounter");

      const obs = this.mapObs();
      console.log(obs)
      const observations = await this.vitalsInstance.saveObservationList(obs);

      if (!observations) return toastWarning("Unable to save patient observations");

      toastSuccess("Observations and encounter created!");

      // this.nextTask();
    },
        async mapObs() {
            console.log("tttttttttt")
            const labelsAndValues: any[] = [];
            // Process other vitals using Promise.all
            const promises = await Promise.all(
                this.vitals.flatMap(section =>
                    section.data.colData.flat().map(async (item: any) => {
                        this.setBMI()
                        const obs = await this.vitalsInstance.buildValueNumber(item.name, item.value);
                        labelsAndValues.push(obs);
                    })
                )
            );

            // Process BMI
            if (this.BMI.index) {
                const bmiObs = await this.vitalsInstance.buildValueNumber('BMI',String(this.BMI.index));
                labelsAndValues.push(bmiObs);
            }
            console.log(labelsAndValues)
            return labelsAndValues;
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
  