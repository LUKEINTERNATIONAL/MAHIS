<template>
   <ion-card  class="second_bar ">
        <ul class="second_bar_list position_content">
            <li>Fullname: <b>Petros Kayange</b></li>
            <li>MRN: <b>102323</b></li>
            <li>Birthday: <b>20 June 1997 </b></li>
            <li>Category: <b>Referal</b></li>
            <li>Sex: <b>Male</b></li>
        </ul>
    </ion-card>
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
            menuController 
        } from '@ionic/vue';
    import { defineComponent } from 'vue';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar
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
.second_bar{
    background-color: rgb(255, 255, 255);
    margin: 0;
    border-radius: unset;
    margin-bottom: 20px;
}
.second_bar_list{
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    padding: 18px;
}
</style>
  