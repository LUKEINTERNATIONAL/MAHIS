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
import { getAefiReport } from "@/apps/Immunization/services/vaccines_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";

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
    async initAefiReport(categories: any) {
      // const data = await getAefiReport(this.start_date, this.end_date)
      const data = await getAefiReport('2024-08-28', '2024-08-28')
      // 

      categories.forEach((category: any) => {
        // console.log(category)
        category.cases.forEach((caseItem: any) => {
          data.data.forEach((item: any) => {
            // console.log(item.concept_id)
            if (caseItem.concept_id == item.concept_id) {
              item.drugs.forEach((drug: any) => {

                // console.log(drug.drug_inventory_id)

                // console.log(caseItem.data)

                // caseItem.data.forEach((d_d: any) => {
                //   // drug_inventory_id
                //   console.log("kkkkkkkkkkkkkkkk::   ",d_d.drug_inventory_id)
                //   console.log("QQQQQQQQQQQQQQQQQQQQQ::   ",drug.drug_inventory_id)
                //   if (d_d.drug_inventory_id == drug.drug_inventory_id) {
                //     console.log(d_d)

                //   }
                //   // console.log(d_d)
                // })

              })
              
            }
          })
        });
      });

    },
    async UnderFiveImmunizations() {
      const data: any = [];
      const UFIs = await ConceptService.getConceptSet('Under five immunizations');
      UFIs.forEach((item: any) => {
        console.log(item)
        data.push(
          {
            concept_id: item.concept_id,
            name: item.name,
          }
        )
      })
      return data
    }, 
    async getAEFIKnownList(concept_set_name: string, vaccines: any) {
      const data: any = [];
      const vaccineEffect = await ConceptService.getConceptSet(concept_set_name);
      vaccineEffect.forEach((item: any) => {

        // ({
        //   concept_id: item.concept_id,
        //   name: item.name,
        //   value: item.name,
        //   checked: false,
        //   colSize: "12",
        // });


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