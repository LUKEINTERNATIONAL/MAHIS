<template>
      <ion-row>
        <ion-col>
            <h1 style="width: 100%; text-align: left; font-weight: 400">Adverse Events Following Immunization - AEFI</h1>
        </ion-col>
      </ion-row>

      <table>
        <colgroup v-for="(vaccine, index) in vaccines" :key="index">
          <col :style="{ width: (100 / vaccines.length) + '%' }" />
        </colgroup>

        <thead>
          <tr>
            <th>Cases</th>
            <th v-for="vaccine in vaccines" :key="vaccine">{{ vaccine.name }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="category in categories" :key="category.name">
            <tr>
              <td :colspan="vaccines.length+1" id="hugo"><strong>{{ category.name }}</strong></td>
            </tr>
            <tr v-for="case_ in category.cases" :key="case_.name">
              <td>{{ case_.name }}</td>
              <td v-for="vaccine in case_.data" :key="vaccine">
                {{ vaccine.count }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonRow, IonCol } from '@ionic/vue';
import { ConceptService } from "@/services/concept_service";
import { mapState } from "pinia";
import { getAefiReport, getunderfiveImmunizationsDrugs } from "@/apps/Immunization/services/vaccines_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
interface Category {
  cases: Case[];
}

interface Case {
  concept_id: number;
  data: DrugData[];
}

interface DrugData {
  drug_id: number;
  count: number;
}

interface Item {
  concept_id: number;
  drugs: Drug[];
}

interface Drug {
  drug_inventory_id: number;
}

interface AefiReportData {
  data: Item[];
}

export default defineComponent({
  name: 'TableComponent',
  components: { IonContent, IonPage, IonRow, IonCol },
  data() {
    return {
      // vaccines: ['BCG', 'OPV', 'IPV', 'DPT-HepB-Hib', 'PCV', 'ROTA', 'Measles/MR', 'TT/Td', 'MV', 'HPV'] as any,
      vaccines: [] as any,
      categories: [
        {
          name: 'Minor AEFIs',
          cases: [] as any
        },
        {
          name: 'Serious AEFIs',
          cases: [] as any
        }
      ]
    };
  },
  watch: {
    $route: {
        async handler(data) {
          if (data.name == "EIRReport")
          await this.initReport()
        },
        deep: true,
    },
  },
  computed: {
    ...mapState(EIRreportsStore, ["start_date", "end_date"]), 
  },
  async mounted() {
    await this.initReport()
  },
  methods: {
    async initReport() {
      this.vaccines = await this.UnderFiveImmunizations()
      this.categories[0].cases = await this.getAEFIKnownList(this.categories[0].name, this.vaccines);
      this.categories[1].cases = await this.getAEFIKnownList(this.categories[1].name, this.vaccines);
      await this.initAefiReport(this.categories)
    },
    async initAefiReport(categories: Category[]): Promise<void> {
    try {
      const data = await getAefiReport(this.start_date, this.end_date);

      // Create a map for faster lookup
      const conceptDrugCountMap = new Map<number, Map<number, number>>();

      // Process data and build the map
      data.data.forEach((item: any) => {
        const drugCountMap = conceptDrugCountMap.get(item.concept_id) || new Map<number, number>();
        item.drugs.forEach((drug: any) => {
          drugCountMap.set(drug.drug_inventory_id, (drugCountMap.get(drug.drug_inventory_id) || 0) + 1);
        });
        conceptDrugCountMap.set(item.concept_id, drugCountMap);
      });

      // Update categories
      categories.forEach(category => {
        category.cases.forEach(caseItem => {
          const drugCountMap = conceptDrugCountMap.get(caseItem.concept_id);
          if (drugCountMap) {
            caseItem.data.forEach(d_d => {
              d_d.count += drugCountMap.get(d_d.drug_id) || 0;
            });
          }
        });
      });

      const store = EIRreportsStore()
      store.setAEFIReportData({'vaccines': this.vaccines, 'categories': this.categories})
    } catch (error) {
      console.error('Error in initAefiReport:', error);
    }
  },
    async UnderFiveImmunizations() {
      const data: any = [];
      const UFIs = await getunderfiveImmunizationsDrugs()
      UFIs.forEach((item: any) => {data.push(item)})
      return data
    }, 
    async getAEFIKnownList(concept_set_name: string, vaccines: any) {
      const data: any = [];
      const vaccineEffect = await ConceptService.getConceptSet(concept_set_name);
      vaccineEffect.forEach((item: any) => {
        const updatedVaccines = vaccines.map((vaccine: any) => ({
          ...vaccine,
          count: 0,
        }));
        data.push(
          {
            concept_id: item.concept_id,
            name: item.name,
            data: updatedVaccines
          }
        )
      })
      data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
      return data
    }
  }
});
</script>

<style scoped>
  ::v-deep(ion-content) {
      --background: white;
  }
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  /* border: 1px solid #ddd; */
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #006401;
}

thead th {
  background-color: #f3f3f3;
}

th:nth-child(1),
td:nth-child(1) {
  border-right: 1px solid #006401;
}

#hugo {
  border-right: 0px;
  text-align: left;
  background-color: #f3f3f3;
}

tbody td:first-child {
  border-right: 1px solid #006401;
}

tbody td {
  border-left: none;
  border-right: none;
}

tbody td {
  border-bottom: 1px solid #acabab;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #ffffff;
}
</style>