<template>

      
      <ion-row>
        <ion-col>
            <h1 style="width: 100%; text-align: left; font-weight: 400">Adverse Events Following Immunization - AEFI</h1>
        </ion-col>
      </ion-row>

      <table>
        <colgroup>
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
          <col style="width: 9.09%;" />
        </colgroup>

        <thead>
          <tr>
            <th>Cases</th>
            <th v-for="vaccine in vaccines" :key="vaccine">{{ vaccine }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="category in categories" :key="category.name">
            <tr>
              <td colspan="11" id="hugo"><strong>{{ category.name }}</strong></td>
            </tr>
            <tr v-for="case_ in category.cases" :key="case_.name">
              <td>{{ case_.name }}</td>
              <td v-for="vaccine in vaccines" :key="vaccine">
                {{ case_.data[vaccine] }}
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

export default defineComponent({
  name: 'TableComponent',
  components: { IonContent, IonPage, IonRow, IonCol },
  data() {
    return {
      vaccines: ['BCG', 'OPV', 'IPV', 'DPT-HepB-Hib', 'PCV', 'ROTA', 'Measles/MR', 'TT/Td', 'MV', 'HPV'],
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
  async mounted() {
    await this.initReport()
  },
  methods: {
    async initReport() {
      this.categories[0].cases = await this.getAEFIKnownList(this.categories[0].name);
      this.categories[1].cases = await this.getAEFIKnownList(this.categories[1].name);
    },
    async getAEFIKnownList(concept_set_name: string) {
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

        data.push(
          {
            name: item.name,
            data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
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