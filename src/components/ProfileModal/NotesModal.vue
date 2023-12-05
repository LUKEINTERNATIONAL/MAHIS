<template>
  <div class="modal_wrapper">
    <div class="modal_title diplay_space_between">
        <span>Clinical Notes</span>
        <span @click="dismiss()" style="cursor: pointer; font-weight: 300;">x</span>
    </div>
    <div class="vitals_overview">
        <div>
            Vitals
        </div>
        <div>
            <span v-html="iconsContent.vitals_graph" ></span> 
        </div>
    </div>
    <div class="v_result">
        <div class="obese">
            <div>
                <span v-html="iconsContent.obese" ></span> 
            </div>
            <div style="margin-left:40px"> 
                <span style="font-weight: 700;"> 25.6</span> obese
            </div>
        </div>
        <div class="bmi">
            <div>
                <span v-html="iconsContent.bmi_rusults" ></span> 
            </div>
            <div style="margin-left:40px">
                110/70
            </div>
        </div>
    </div>
    <div>
        Notes
        <ul class="notes_content">
            <li>The patient presents today with concerns related to diabetes 
                management and seeks guidance on optimizing</li>
            <li>The patient appears well-nourished and in no acute distress</li>
            <li>The patient appears well-nourished and in no acute distress .....</li>
        </ul>
    </div>
  </div>
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
            modalController 
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
        IonToolbar    },
        data() {
    return {
        iconsContent: icons,
    };
  },
    setup() {
      return { checkmark,pulseOutline };
    },
    methods:{
      dismiss(){
        modalController.dismiss()
      }
    }
    });
</script>

<style scoped>


</style>
  