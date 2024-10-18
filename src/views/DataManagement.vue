<template>
    <Toolbar />
    <ion-content style="--background: #fff">
      <div class="container">
        <h4 style="width: 100%; text-align: center; font-weight: 700; padding-bottom: 1em" >Client Duplicate Management</h4>
        
        <div :class="mergeSuccess ? 'table-container animate' : 'table-container'">
          <table>

<colgroup></colgroup>
<colgroup></colgroup>
<colgroup></colgroup>
<colgroup></colgroup>

<thead>
  <tr>
      <th>&nbsp;</th>
      <th>
          <h2>Client A</h2>
          <p>
          <VueMultiselect
    v-model="selectedPersonA"
    :max-height="150"
    :multiple="false"
    :hide-selected="false"
    :close-on-select="true"
    :openDirection="'bottom'"
    :prevent-autofocus="true"
    tabindex="-1"
    class="no-focus"
    tag-placeholder=""
    placeholder="Search for people"
    selectLabel=""
    label="fullName"
    :searchable="true"
    @search-change="onSearchChangeA"
    :track-by="'patient_id'"
    :options="flattenedPeopleListA"
    :internal-search="false"
  /></p>
      </th>
      
      <th>
          <h2>Client B</h2>
          <p>
              
              <VueMultiselect
    v-model="selectedPersonB"
    :max-height="150"
    :multiple="false"
    :hide-selected="false"
    :close-on-select="true"
    :openDirection="'bottom'"
    :prevent-autofocus="true"
    tabindex="-1"
    class="no-focus"
    tag-placeholder=""
    placeholder="Search for people"
    selectLabel=""
    label="fullName"
    :searchable="true"
    @search-change="onSearchChangeB"
    :track-by="'patient_id'"
    :options="flattenedPeopleListB"
    :internal-search="false"
  />       
          </p>
      </th>
  </tr>
</thead>

<tfoot>
  <tr>
      <th></th>
      <td><ion-button class="addBtn" color="primary" @click="mergepatients(`clientA`)">
            <div>
              <div class="centerBigBtnContain">Merge A into B</div>
            </div>
          </ion-button>
      </td>
      <td><ion-button class="addBtn" color="primary" @click="mergepatients(`clientB`)">
            <div>
              <div class="centerBigBtnContain">Merge B into A</div>
            </div>
          </ion-button>
      </td>
  </tr>
</tfoot>

<tbody>
  <tr>
      <th>Firstname</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.names[0].given_name }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.names[0].given_name }}</td>
  </tr>
  <tr>
      <th>Middle Name</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.names[0].middle_name }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.names[0].middle_name }}</td>
  </tr>
  <tr>
      <th>Lastname</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.names[0].family_name }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.names[0].family_name }}</td>
  </tr>
  <tr>
      <th>Date of Birth</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.birthdate  }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.birthdate  }}</td>
  </tr>
  <tr>
      <th>Gender</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.gender === 'M' ? 'Male' : selectedPersonA?.person.gender === 'F' ? 'Female' : "" }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.gender === 'M' ? 'Male' : selectedPersonB?.person.gender === 'F' ? 'Female' : "" }}</td>
  </tr>
  <tr>
      <th>Village</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.addresses[0].city_village  }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.addresses[0].city_village  }}</td>
  </tr>
  <tr>
      <th>City</th>
      <td :class="{ slideA: isMergingA }">{{ selectedPersonA?.person.addresses[0].address2  }}</td>
      <td :class="{ slideB: isMergingB }">{{ selectedPersonB?.person.addresses[0].address2  }}</td>
  </tr>
</tbody>

</table>
</div>
        </div>
        <!-- Merge button -->
     
    </ion-content>
</template>

<script lang="ts">
import {
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonCard,
    IonButton,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { Service } from "@/services/service";
import img from "@/utils/Img";
import { mapState } from "pinia";
import { PatientService } from "@/services/patient_service";
import VueMultiselect from "vue-multiselect";
import DynamicButton from "@/components/DynamicButton.vue";
import BasicForm from "@/components/BasicForm.vue";
import { toastSuccess, toastWarning, popoverConfirmation } from "@/utils/Alerts";
import {
    medkit,
    chevronBackOutline,
    checkmark,
    grid,
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
    add,
    person,
} from "ionicons/icons";
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonRow,
        IonCol,
        IonCard,
        DynamicButton,
        BasicForm,
        IonIcon,
        IonFab,
        IonFabButton,
        IonFabList,
        IonButton,
        VueMultiselect
    },
    data() {
        return {
            searchQuery: '',
            peopleListA: [] as any, 
            peopleListB: [] as any, 
            paginationSize: 10,
            page: 1,
            selectedPersonA: null as any,
            selectedPersonB: null as any,
            selectedButton: "all",
            isLoading: false,
            primaryid: null as any,
            secondaryid: null as any,
            mergeSuccess: false, 
            isMergingA: false, 
            isMergingB: false,
        };
    },
    setup() {
        const currentPage = ref(1);

        return {
            currentPage,
            chevronBackOutline,
            checkmark,
            grid,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            medkit,
            add,
            person,
        };
    },
    computed: {
        flattenedPeopleListA() {
      return this.peopleListA.map((person: any) => {
        return {
          patient_id: person.patient_id,
          fullName: `${person.person.names[0].given_name} ${person.person.names[0].family_name}`,
          ...person,
        };
      });
    },
    flattenedPeopleListB() {
      return this.peopleListB.map((person: any) => {
        return {
          patient_id: person.patient_id,
          fullName: `${person.person.names[0].given_name} ${person.person.names[0].family_name}`,
          ...person,
        };
      });
    },
    },
    watch: {
        stock: {
            async handler() {
            },
            deep: true,
        },
        $route: {
            async handler() {
            },
            deep: true,
        },
    },
    async mounted() {
    },
    methods: {
       
        async onSearchChangeA(query:any) {
                    this.searchQuery = query;
              await this.fetchPeople("listA");   
         },
         async onSearchChangeB(query:any) {
                    this.searchQuery = query;
              await this.fetchPeople("listB");   
         },

   async fetchPeople(listType:any) {

      if (this.searchQuery.length > 2) {  
        try {
            const splittedArray = this.searchQuery.split(" ");
            const payload = {
                given_name: splittedArray[0],
                family_name: splittedArray.length >= 2 ? splittedArray[1] : "",
                gender: splittedArray.length >= 3 ? splittedArray[2] : "",
                page: this.page.toString(),
                per_page: this.paginationSize.toString(),
            };

          const response = await PatientService.search(payload);
          if(listType == "listA"){  this.peopleListA = response }
          else if (listType == "listB"){ this.peopleListB = response }
                 
        } catch (error) {
          console.error('Error fetching people:', error);
        }
      } 

    },
    async mergepatients(client:any) {

        if(client == "clientA"){ 
            //this.primaryid = this.selectedPersonB.patient_id
            //this.secondaryid = this.selectedPersonA.patient_id
            this.selectedPersonA = null
            this.isMergingA = true;
        }else{
            //this.primaryid = this.selectedPersonA.patient_id
            //this.secondaryid = this.selectedPersonB.patient_id
            this.selectedPersonB = null
            this.isMergingB = true;
        }

        /*const payload = {
                primary: {patient_id: this.primaryid},
                secondary: [{patient_id: this.secondaryid}]
            };*/

        //const response = await PatientService.mergePatients(payload);
        toastSuccess("Successfully merged client");
        this.mergeSuccess = true;
        setTimeout(() => {
            //this.mergeSuccess = false;
        this.isMergingA = false;
        this.isMergingB = false;
            //this.mergeSuccess = false;
        }, 2000); // adjust timeout to match the animation duration

        this.mergedsuccess()
           
    },
    mergedsuccess(){

       

    }
       
       
    },
});
</script>
<style>
/* For Client A merging into Client B */
.slideA {
  animation: slideRight 0.5s forwards;
}
.slideB {
  animation: slideLeft 0.5s forwards;
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

/* For Client B merging into Client A */
.slideA.slideB {
  animation: slideRightReverse 0.90s forwards;
}

@keyframes slideRightReverse {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideLeftReverse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
    
body { background: #fff; font: 400 1em/1.4 "Open Sans", "Helvetica Neue", sans-serif; color: #333; text-align: center; padding: 4em 2em; }

h1 { font-weight: 300; font-size: 5em; line-height: 1.35; margin: 0 0 .125em; }
h1 + p { font-size: 1.5em; color: #999; max-width: 30em; margin: 0 auto 3em; }

table { width: 100%; text-align: left; border-spacing: 0; border-collapse: collapse; -webkit-box-sizing: border-box; 
         -moz-box-sizing: border-box; box-sizing: border-box; }

th, td { font-family: inherit; font-size: .875em; line-height: 1.45; color: #444; vertical-align: middle; padding: 1em; }
th { font-weight: 600; }

colgroup:nth-child(1) { width: 6%; border: 0 none; text-align: center;}
colgroup:nth-child(2) { width: 22%; border: 5px solid #ccc; }
colgroup:nth-child(3) { width: 25%; border: 5px solid #ccc; }

/* Tablehead */

thead th { background: #def4fe; background: -moz-linear-gradient(top,  #ffffff 0%, #f5f5f5 100%); 
           background: -webkit-linear-gradient(top,  #ffffff 0%,#f5f5f5 100%); 
           background: -o-linear-gradient(top,  #ffffff 0%,#f5f5f5 100%);
           background: -ms-linear-gradient(top,  #ffffff 0%,#f5f5f5 100%); 
           background: linear-gradient(to bottom,  #ffffff 0%,#f5f5f5 100%); 
           text-align: center; position: relative; border-bottom: 1px solid #ccc; 
           padding: 2em 0 1em; font-weight: 400; color: #999; }
thead th:nth-child(1) { background: transparent;  }
thead th h2 { font-weight: 300; font-size: 2.4em; line-height: 1.2; color: #59c7fb; }
thead th h2 + p { font-size: 1.25em; line-height: 1.4; }
thead th:nth-child(2) h2 + p { font-size: 2.4em; padding: 0em 0.5em 0em 0.5em; }
thead th:nth-child(3) h2 + p { font-size: 1.5em; padding: 0em 0.5em 0em 0.5em; }

/* Tablebody */

tbody th { background: #fff; border-left: 1px solid #ccc; text-align: center;}
tbody th span { font-weight: normal; font-size: 87.5%; color: #999; display: block; text-align: center;}

tbody td { background: #fff; text-align: center; padding: 0.5em; }

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td { background: #f5f5f5; border: 1px solid #ccc; border-width: 1px 0 1px 1px; }
tbody tr:last-child td { border-bottom: 0 none; }

/* Tablefooter */

tfoot th  { padding: 2em 1em; border-top: 1px solid #ccc; }
tfoot td  { text-align: center; padding: 2em 1em; border-top: 1px solid #ccc; }

tfoot a  { font-weight: bold; color: #fff; text-decoration: none; text-transform: uppercase; display: block; padding: 1.125em 2em; background: #59c7fb; border-radius: .5em; }

</style>
