<template>
    <ion-accordion-group :value="['1']">
        <ion-accordion value="1">
            <ion-item slot="header">
                <ion-label>Health Education <span class="small_text">Saved 30 minutes ago by pk</span></ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
                <ion-list>
                    <ion-item> 
                        <ion-checkbox label-placement="end"> <span class="checkbox_header">Has the client been informed about drug adherence?</span></ion-checkbox>
                    </ion-item> 
                    <ion-card style=" background-color: #fff;"> 
                        <ion-card-content>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Take your medication at the same time every day.</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Tie taking your medications with a daily routine like brushing your teeth or getting ready for bed. 
                                    Before choosing mealtime for your routine, check if your medication should be taken on a full or empty stomach.</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Keep a “medicine calendar” with your pill bottles and note each time you take a dose.</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Use a pill container. Some types have sections for multiple doses at different times, such as morning, lunch, evening, and night.</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">When using a pill container, refill it at the same time each week. For example, every Sunday morning after breakfast.</span>
                            </div>
                        </ion-card-content>
                    </ion-card>
                    <ion-item> 
                        <ion-checkbox label-placement="end"> 
                            <span class="checkbox_header">Has the client been informed about the importance of physical activity and the different kinds of physical activity?</span>
                        </ion-checkbox>
                    </ion-item> 
                    <ion-card style=" background-color: #fff;"> 
                        <ion-card-content>
                            <p class="checkbox_text">
                                If you have diabetes, being active makes your body more sensitive to insulin 
                                (the hormone that allows cells in your body to use blood sugar for energy), which helps manage your diabetes. 
                                Physical activity also helps control blood sugar levels and lowers your risk of heart disease and nerve damage.
                            </p>
                            <p class="checkbox_text">
                                Types of physical activity you can do:
                            </p>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Take your medication at the same time every day.</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Walking 30 minutes</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Working in the fields</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Running or jogging</span>
                            </div>
                            <div class="checkbox_content">
                                <span v-html="iconsContent.checkboxtick"> </span>
                                <span class="checkbox_text">Cycling</span>
                            </div>
                        </ion-card-content>
                    </ion-card>

                    <ion-item> 
                        <ion-checkbox label-placement="end"> 
                            <span class="checkbox_header">Has the client been informed about the importance of good personal hygiene?</span>
                        </ion-checkbox>
                    </ion-item> 
                        <ion-card style=" background-color: #fff;"> 
                        <ion-card-content>
                            <p class="checkbox_text">Washing your feet every day, caring for your toenails and checking for cuts, redness, 
                                swelling, sores, blisters, corns and calluses are all great ways to maintain good foot hygiene.
                                 There's so much to think about when living with diabetes. But it's a great idea to pay attention now, 
                                 to avoid potential problems later.</p>
                            
                        </ion-card-content>
                    </ion-card>
                </ion-list>
            </div>
        </ion-accordion>
    </ion-accordion-group>
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
            IonAccordion, 
            IonAccordionGroup,
            IonLabel 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { icons } from '@/utils/svg.ts';

    export default defineComponent({
    name: 'History',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonAccordion, 
        IonAccordionGroup,
        IonLabel
    },
    data() {
    return {
        iconsContent: icons,
    };
  },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
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
.title{
    font-weight: bold;
    padding: 20px;
}
ion-item[slot='header']{
    font-size: 20px;
    padding-top:25px;
    font-weight: 600;
    border-bottom: solid 1px #B3B3B3;
  }
  ion-item{
    --border-color: transparent;
  }
  .small_text{
    font-size: 12px;
    font-weight: 400;
  }
  ion-checkbox{
    width: unset;
  }
  .checkbox_content
    {
        display: flex;
        margin-bottom: 10px;
        color: #00190E;
    }
    .checkbox_text{
        margin-left:20px;
    }
    .checkbox_header{
        color: #00190E;
        font-weight: 600;
    }
  
</style>
  