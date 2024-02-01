<template>
    <ion-row>
        <ion-col size="5.4"></ion-col>
        <ion-col size="6">
            <ion-row>
                <ion-col>
                    <div class="demographics_title">{{ content.mainTitle }}</div>
                </ion-col>
                <ion-col class="icon_col">
                    <div class="icon_div">
                        <ion-icon :class="iconListStatus" :icon="list"
                        @click="setDisplayType('list')"></ion-icon>
                        <ion-icon :class="iconGridStatus" style="font-size: 21px; margin-top: 1.5px;" :icon="grid"
                        @click="setDisplayType('grid')"></ion-icon>
                    </div>
                </ion-col>
            </ion-row>
            
            
        </ion-col>
    </ion-row>
    <ion-row class="card_row" v-if="registrationDisplayType=='grid'">
        <ion-col size="3" v-for="(item, index) in content.data" :key="index">
            <ion-card class="registration_ion_card" v-for="(card, cardIndex) in item.cards" :key="cardIndex">
                <div class="card_content">
                    <div class="card_hearder">
                        {{ card.cardTitle }}            
                    </div>
                    <basic-form :contentData="card.content" @update:selected="$emit('update:selected',$event)" @update:inputValue="$emit('update:inputValue',$event)"></basic-form>
                </div>
            </ion-card>
        </ion-col>
    </ion-row>

    <span v-if="registrationDisplayType=='list'">
        <ion-row class="card_row" v-for="(item, index) in content.data" :key="index">
            <ion-col style="display: flex; justify-content: center;">
                <ion-card class="registration_ion_card" style="width:500px">
                    <div class="card_content">
                        <div class="card_hearder">
                            {{ item.cards[0].cardTitle }}            
                        </div>
                        <basic-form :contentData="item.cards[0].content" @update:selected="$emit('update:selected',$event)" @update:inputValue="$emit('update:inputValue',$event)"></basic-form>
                    </div>
                </ion-card>
            </ion-col>
        </ion-row>
    </span>  
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import BasicForm from '@/components/BasicForm.vue';
import { grid,list } from 'ionicons/icons';
import { useConfigurationStore } from '@/stores/ConfigurationStore'
import { mapState } from 'pinia';

export default defineComponent({
    name: 'Menu',
    components: {
        IonContent,
        IonHeader,
        IonItem,
        BasicForm
    },
    data(){
        return {
            iconListStatus: 'active_icon',
            iconGridStatus: 'inactive_icon',
        }
    },
    mounted(){
        this.setIconClass()
    },
    setup() {
      return { grid,list };
    },
    computed:{
      ...mapState(useConfigurationStore,["registrationDisplayType"]),
    },
    props: {
        content: {
            default: '' as any
        },
        size: {
            default: '' as any
        }

    },
    methods:{
        setDisplayType(type: any){
            const demographicsStore = useConfigurationStore()
            demographicsStore.setRegistrationDisplayType(type)
            this.setIconClass()
        },
        setIconClass(){
            this.iconListStatus = 'inactive_icon'
            this.iconGridStatus = 'inactive_icon'
            if(this.registrationDisplayType=='list'){
                this.iconListStatus = 'active_icon'
            }else if(this.registrationDisplayType=='grid'){
                this.iconGridStatus = 'active_icon'
            }
        }
    }
});
</script>

<style scoped>
.demographics_title{
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 20px;
    text-align: left;
    padding-top: 20px ;
}
.demographics{
    display: flex; 
    width: unset;
}
.card_row{
    justify-content: center;
}
.registration_header{
    display: flex;
}
.icon_col{
    justify-content: right;
    display: flex;
    align-items: center;
}
.icon_div{
    display: flex;
  justify-content: space-between;
  width: 70px;
}
.active_icon{
    font-size: 25px; 
    background-color: #DDEEDD; 
    color: #6fbd70; 
    border-radius: 5px;
}
.inactive_icon{
    font-size: 25px; 
    color: #ccc;
}
</style>
  