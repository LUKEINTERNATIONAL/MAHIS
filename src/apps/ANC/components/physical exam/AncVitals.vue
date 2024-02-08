<template>

  <ion-row >
    <!--   height and weight-->
    <ion-col  class="left_row_col_separator">
      <ion-list>
        <ion-item :lines="heightAndWeight" class="dashed_bottom_border" style="font-weight: bold">
          Height and Weight
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="heightWeight">
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
    <!--  blood pressure-->
    <ion-col class="right_row_col_separator">
      <ion-list>
        <ion-item :lines="bloodP" class="dashed_bottom_border" style="font-weight: bold">
          Blood pressure
        </ion-item>
        <div class="sub_item_body content_container">
          <basic-form
              :contentData="bloodPressure" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>

    </ion-col>
  </ion-row>

<!--  respiratory exam and Pre-eclampsia-->
  <ion-row>
    <ion-col  class="left_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Respiration exam result
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="respiration" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close"/>
      </ion-list>
    </ion-col>

    <ion-col class="right_row_col_separator">
      <ion-list>
        <ion-item class="dashed_bottom_border" style="font-weight: bold">
          Pre-eclampsia with severe features
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="preEclampsia" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>


  <ion-row>
    <!--  temperature-->
    <ion-col  class="left_row_col_separator">
      <ion-list>
        <ion-item :lines="temp" class="dashed_bottom_border" style="font-weight: bold">
          Temperature
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="temperature" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close"/>
      </ion-list>
    </ion-col>
    <!--  pulse-->
    <ion-col class="right_row_col_separator">
      <ion-list>
        <ion-item :lines="pulseReading" class="dashed_bottom_border" style="font-weight: bold">
          Pulse
        </ion-item>
        <div class="sub_item_body content_container" >
          <basic-form
              :contentData="pulse" >
          </basic-form>
        </div>
        <ion-item class="sub_item_body_close" />
      </ion-list>
    </ion-col>
  </ion-row>
<!--    <basic-form :contentData="vitals" @update:inputValue="validaterowData($event)"></basic-form>-->
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
  IonInput, IonToggle
} from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { icons } from '@/utils/svg';
    import { iconBloodPressure } from '@/utils/SvgDynamicColor';
    import { BMIService } from "@/services/bmi_service"
    import { useDemographicsStore } from '@/stores/DemographicStore'
    import { useAncVitalsStore} from "@/apps/ANC/store/physical exam/AncVitalsStore";
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
      IonToggle,
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
        heightAndWeightChecked: true,
        heightAndWeight:'',
        respirationExamChecked: true,
        respirationExam: '',
        bloodPressureChecked: true,
        bloodP: '',
        temperatureChecked: true,
        temp: '',
        pulseReading:'',
        pulseChecked: true,
        vValidations: '' as any,
        hasValidationErrors: [] as any,
        vitalsInstance: {} as any,
    };
  },
  computed:{

        ...mapState(useAncVitalsStore,["vitals"]),
        ...mapState(useAncVitalsStore,["heightWeight"]),
        ...mapState(useAncVitalsStore,["bloodPressure"]),
        ...mapState(useAncVitalsStore,["respiration"]),
        ...mapState(useAncVitalsStore,["temperature"]),
        ...mapState(useAncVitalsStore,["pulse"]),
        ...mapState(useAncVitalsStore,["preEclampsia"]),
    },
    mounted(){
        const userID: any  = Service.getUserID()
        this.vitalsInstance = new VitalsService(this.demographics.patient_id,userID);
        this.updateVitalsStores()
        this.validaterowData({})
    },
    watch: {
        vitals: {
            handler(){
                this.updateVitalsStores();
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
      heightAndWeightMeasurements(){
        this.heightAndWeightChecked = !this.heightAndWeightChecked
        if (this.heightAndWeightChecked) {
          this.heightAndWeight = 'none'
        } else {this.heightAndWeight = ''}
      },
      bloodPressureMeasurements(){
        this.bloodPressureChecked = !this.bloodPressureChecked
        if (this.bloodPressureChecked) {
          this.bloodP = 'none'
        } else {this.bloodP = ''}
      },
      respirationExams(){
        this.respirationExamChecked = !this.respirationExamChecked
        if (this.respirationExamChecked) {
          this.respirationExam = 'none'
        } else {this.respirationExam = ''}
      },
      temperatureReadings(){
        this.temperatureChecked = !this.temperatureChecked
        if (this.temperatureChecked) {
          this.temp = 'none'
        } else {this.temp = ''}
      },
      pulseReadings(){
        this.pulseChecked = !this.pulseChecked
        if (this.pulseChecked) {
          this.pulseReading = 'none'
        } else {this.pulseReading = ''}
      },

        updateVitalsStores(){
            const vitalsStore = useVitalsStore()
            vitalsStore.setVitals(this.vitals)
        },
        async validaterowData(inputData: any) {
            this.hasValidationErrors = []
            
            this.vitals.forEach((section,sectionIndex) => {
                section.data.rowData.forEach((col: any,colIndex) => {
                    if (col.colData[0].inputHeader == 'Systolic Pressure*') {
                            const isSystolicValid = this.vitalsInstance.validator(col.colData[0]) == null && this.vitalsInstance.validator(col.colData[1]) == null;
                            this.BPStatus = isSystolicValid ? this.getBloodPressureStatus(col.colData[0].value,col.colData[1].value) : {};
                            this.updateBP(col.colData[0].value,col.colData[1].value);
                        }

                        if (col.colData[0].inputHeader == 'Height*') {
                            const isHeightValid = this.vitalsInstance.validator(col.colData[0]) == null && this.vitalsInstance.validator(col.colData[1]) == null;
                            this.BMI = isHeightValid ? this.setBMI(col.colData[1].value,col.colData[0].value) : {};
                            this.updateBMI();
                        }
                        
                        col.colData.some((input: any, inputIndex: any) => {
                            const validateResult = this.vitalsInstance.validator(input);
                            if (validateResult?.length > 0) {
                                this.hasValidationErrors.push('false');
                                if (input.inputHeader === inputData.inputHeader) {
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = true
                                    this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = validateResult.flat(Infinity)[0]
                                    return true;
                                }
                            } else {
                                this.hasValidationErrors.push('true');
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsError = false
                                this.vitals[sectionIndex].data.rowData[colIndex].colData[inputIndex].alertsErrorMassage = ''
                                    
                            }

                            return false;
                        });
                });
            });

            this.vitals.validationStatus = !this.hasValidationErrors.includes('false');
          
            
        },
        async setBMI(weight: any,height: any){
            if(this.demographics.gender && this.demographics.birthdate){
                this.BMI = await BMIService.getBMI(
                    parseInt(weight),
                    parseInt(height) , 
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
                if( (parseInt(diastolic) >= 30 && parseInt(diastolic) <= 60)  &&  (parseInt(systolic) >= 40 && parseInt(systolic) <= 90 )){
                    return {colors:["#B9E6FE","#026AA2","#9ADBFE"],value:"Low"}
                }else
                if( (parseInt(diastolic) >= 60 && parseInt(diastolic) <= 80)  &&  (parseInt(systolic) >= 90 && parseInt(systolic) <= 120 )){
                    return {colors:["#DDEEDD","#016302","#BBDDBC"],value:"Normal"}
                }else
                if( (parseInt(diastolic) >= 80 && parseInt(diastolic) <= 90) &&  (parseInt(systolic) >= 120 && parseInt(systolic) <= 140) ){
                    let value = "Pre-high blood pressure"
                    if( (parseInt(diastolic) >= 85 && parseInt(diastolic) <= 89) &&  (parseInt(systolic) >= 130 && parseInt(systolic) <= 139) )
                        value = "Pre-high blood pressure (Class: Borderline)"
                    return {colors:["#FEDF89","#B54708","#FED667"],value:value}
                }else
                if( (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 109)  &&  (parseInt(systolic) >= 140 && parseInt(systolic) <= 190 )){
                    let value = "High blood pressure"
                    if( (parseInt(diastolic) >= 90 && parseInt(diastolic) <= 99)  &&  (parseInt(systolic) >= 140 && parseInt(systolic) <= 159 ))
                        value = "High blood pressure (Class: Mild/ I)"
                    if( (parseInt(diastolic) >= 100 && parseInt(diastolic) <= 109)  &&  (parseInt(systolic) >= 160 && parseInt(systolic) <= 179 ))
                        value = "High blood pressure (Class: Moderate/ II)"
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:value}
                }else
                if( (parseInt(diastolic) >= 110 && parseInt(diastolic) <= 200)  &&  (parseInt(systolic) >= 180 && parseInt(systolic) <= 250 ) ){
                    return {colors:["#FECDCA","#B42318","#FDA19B"],value:"The patient has hypertension (Class: Severe/ III)"}
                }else{
                    toastWarning("Invalid BP values",4000);
                    this.hasValidationErrors.push('false');
                    return {}
                }
            }else{
                return {colors:[],value:""}
            }
        },
      
    }
    });

</script>

<style scoped>
.content_container{
  padding-left: 10px;
}
.left_row_col_separator{
  padding-right: 50px
}
.right_row_col_separator{
  padding-left: 50px
}
.content_container_for_radio{
  padding-left: 30px;
  margin-right: 400px;
}
.separator {
  border-top: none; /* or border: none; */
  margin: 0;
  padding: 0;
  height: 0;
  display: none;
}
</style>
  