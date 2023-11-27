<template>
    <ion-list>
        <ion-item>
            <ion-toggle>Visual acuity test</ion-toggle>
        </ion-item>
        <ion-item>
            <ion-toggle>Retinopathy screening</ion-toggle>            
        </ion-item>
        <ion-item>
            <ion-toggle :checked="footChecked" @ionChange="footScreening">Foot screening</ion-toggle>
        </ion-item>
        <div class="foot_body" v-if="footChecked">
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
            IonToggle 
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
        IonToggle
        },
        data() {
    return {
        iconsContent: icons,
        footChecked : false
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
.foot_body{
    margin-left: 45px;
}
.foot_input{
    width: 100%;
    color: #636363;
    text-align: left;

}
.input_item {
  border: 1px solid transparent;
}
</style>
  