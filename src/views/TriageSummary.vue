
<template>
  <ion-page>
    <Toolbar />
    <ion-content :fullscreen="true" >
      <div class="position_content">
        <div class="header">
        <span class="title">Triage history</span>
        <ion-button  class="button-native" @click="navigation('home')">Start new triage</ion-button>
      </div>
        <div>
          <DataTable :data="data" class="display" width="100%">
            <thead>
              <tr>
                <th>Date</th>
                <th>BMI</th>
                <th>Height</th>
                <th>Weight</th>
                <th>S. Pressure</th>
                <th>D. Pressure</th>
                <th>Temperature</th>
                <th>Pulse rate</th>
                <th>Respitory rate</th>
                <th>Oxygen Status</th>
                <th>Location</th>
                <th>Pysician</th>
              </tr>
            </thead>
          </DataTable>
        </div>
        <div class="finishBtn">
          <ion-button class="primary_btn" @click="navigation('consultationPlan')">Finish and Save</ion-button>
        </div>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import Toolbar from '@/components/Toolbar.vue'
  import ToolbarSearch from '@/components/ToolbarSearch.vue'
  import Vitals from '@/components/ConsultationPlan/Vitals.vue'
  import { icons } from '@/utils/svg.ts';
  import History from '@/components/HealthEducation.vue'
  import DemographicBar from '@/components/DemographicBar.vue'
  import { chevronBackOutline,checkmark } from 'ionicons/icons';
  export default defineComponent({
    name: "Home",
    components:{
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        Vitals,
        History,
        DemographicBar,
        DataTable
      },
      data() {
    return {
      data: [
        ['2023-09-17', 'button','175cm', '54kg','115 mmHg','65mmHg','36.6C','75 BMP','15 BMP','98%','button','Maroon Peru'],
        ['2023-09-17', 'button','175cm', '54kg','115 mmHg','65mmHg','36.6C','75 BMP','15 BMP','98%','button','Maroon Peru'],
        ['2023-09-17', 'button','175cm', '54kg','115 mmHg','65mmHg','36.6C','75 BMP','15 BMP','98%','button','Maroon Peru'],
        ['2023-09-17', 'button','175cm', '54kg','115 mmHg','65mmHg','36.6C','75 BMP','15 BMP','98%','button','Maroon Peru'],
        ['2023-09-17', 'button','175cm', '54kg','115 mmHg','65mmHg','36.6C','75 BMP','15 BMP','98%','button','Maroon Peru'],
      ],
    };
  },
      setup() {
        return { chevronBackOutline,checkmark };
    },
    methods: {
      navigation(url: any){
        this.$router.push(url)
      }
    }
    })


</script>

<style>
@import 'datatables.net-dt';
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
  .centered-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vitals_title{
    font-weight: 700;
    font-size: 24px;
    border-bottom: 1px solid #B3B3B3;
    border-top: 1px solid #B3B3B3;
    border-top-style:dashed;
    padding: 15px;
    margin-bottom: 30px;
  }
  .header{
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
    height: 20px ;
  }
  .datatable{
    overflow-x: scroll;
  }
  .odd {
  background-color: #fff !important;
}
tbody > tr > td {
  border-top: unset  !important;
  font-size: 12px;

}
table.dataTable > thead > tr > th {
    border-bottom: unset;
    font-size: 12px;
}
table.dataTable tbody th, table.dataTable tbody td {
    padding: 15px 10px;
}
.button-native {
    text-transform: none;
}
button{
  height: unset !important;
}
.title{
  font-weight: 700;
  font-size: 24px;
}
.finishBtn{
  margin-top:30px;
  float: right;
}
</style>
