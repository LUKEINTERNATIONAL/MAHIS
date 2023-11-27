<template>
    <ion-list>
        <ion-item>
            <ion-toggle :checked="showVisualAcuityTest" @ionChange="toggleShowVisualAcuityTest">Visual acuity test</ion-toggle>
        </ion-item>
            <div class="sub_item_body" v-if="showVisualAcuityTest">
                <ion-row>
                    <ion-col>
                        <div style="margin: 1%;">
                            <ion-label style="margin-left: 3%;">Left Eye</ion-label>
                            <ion-list>
                                <ion-item class="item_eye_">
                                    <ion-select 
                                        label="---"
                                        aria-label=""
                                        placeholder="select complaints"
                                        :multiple="true"
                                        @ionChange="leftEyeComplaintSelect($event)"
                                        @ionCancel="leftEyeHandleCancel()"
                                        @ionDismiss="leftEyeHandleDismiss()"
                                        fill="outline"
                                        class="_item_eye"
                                        
                                    >
                                        <ion-select-option v-for="item in complaintsList" :value="item">{{ item }}</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-list>
                        </div>
                    </ion-col>
                    <ion-col>
                        <div style="margin: 1%;">
                            <ion-label style="margin-left: 3%;">Right Eye</ion-label>
                            <ion-list>
                                <ion-item class="item_eye_">
                                    <ion-select fill="outline" class="_item_eye" label="---" aria-label="Fruit" placeholder="select complaints" :multiple="true">
                                        <div v-for="(item, index) in complaintsList" :key="index">
                                            <ion-select-option :value="item">{{ item }}</ion-select-option>
                                        </div>
                                    </ion-select>
                                </ion-item>
                            </ion-list>
                        </div>
                    </ion-col>
                </ion-row>
            </div>

        <ion-item>
            <ion-toggle>Retinopathy screening</ion-toggle>            
        </ion-item>

        <ion-item>
            <ion-toggle :checked="footChecked" @ionChange="footScreening">Foot screening</ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="footChecked">
            <ion-row class="foot_title">
                <ion-col class="first_col">Physical Exam</ion-col>
                <ion-col>Left foot</ion-col>
                <ion-col>Right foot</ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Previous Ulcer</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Previous Amputation</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Deformity</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Ingrown toenail</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Absent Pedal Pulses</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_title">
                <ion-col class="first_col">Foot Lesions</ion-col>
                <ion-col>Left foot</ion-col>
                <ion-col>Right foot</ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Active Ulcer</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Blisters</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Calluses</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Fissure/Linear Crack</ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
                <ion-col>
                    <ion-checkbox label-placement="end"> 
                        <span class="checkbox_header"></span>
                    </ion-checkbox>
                </ion-col>
            </ion-row>
            <ion-row class="foot_content">
                <ion-col class="first_col">Neuropathy/Monofilament Exam</ion-col>
                <ion-col>
                    <span class="foot_input">Negative piprics (left foot)</span>
                    <ion-item class="input_item">
                        <ion-input  fill="outline"></ion-input>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <span class="foot_input">Negative pinprics (right foot)</span>
                    <ion-item class="input_item">
                        <ion-input  fill="outline"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
        </div>
        <ion-item>
            <ion-toggle>CVD risk screening</ion-toggle>
        </ion-item>
        <ion-item>
            <ion-toggle>Diabetic kidney desease</ion-toggle>
        </ion-item>

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
            IonToggle,
            IonSelectOption,
            IonSelect,
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';

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
        IonToggle,
        IonSelect,
        IonSelectOption,
        },
        data() {
    return {
        iconsContent: icons,
        footChecked : false,
        showVisualAcuityTest: false,
        complaintsList: [
            "Redness",
            "Itching",
            "Burning",
            "Blurry Vision",
            "Dryness",
            "Tearing",
            "Sensitivity to Light",
            "Swelling",
            "Foreign Body Sensation",
            "Pain"
            ],
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
        footScreening(){
            this.footChecked = !this.footChecked
        },
        toggleShowVisualAcuityTest() {
            this.showVisualAcuityTest = !this.showVisualAcuityTest
        },
        leftEyeComplaintSelect(ev: any) {
            console.log('ionChange fired with value: ' + ev.detail.value);
        },
        leftEyeHandleCancel() {

        },
        leftEyeHandleDismiss() {

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
.foot_title{
    color: #636363;
    text-align: center;
}
.foot_content{
    color:#00190E;
    text-align: center;
}
.first_col{
    text-align: left;
}
.sub_item_body{
    margin-left: 45px;
}
.foot_input{
    width: 100%;
    color: #636363;
    text-align: left;

}
.item-content {
  background-color:#ffffff;
}
.input_item {
  border: 1px solid transparent;
}
ion-select._item_eye {
    --background: #fff;
    
}
ion-item.item_eye_ {
    --inner-border-width:0;
    --background-hover: none;
}
/* ion-toggle {
    --track-background-checked: #006401
} */
</style>
  