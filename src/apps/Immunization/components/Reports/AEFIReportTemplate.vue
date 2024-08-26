<template>
  <ion-page>
    <ion-content class="ion-padding">
      
      <ion-row>
        <ion-col>
            <h1 style="width: 100%; text-align: left; font-weight: 400">Adverse Events Following Immunization - AEFI</h1>
        </ion-col>
      </ion-row>

      <table>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonRow, IonCol } from '@ionic/vue';

export default defineComponent({
  name: 'TableComponent',
  components: { IonContent, IonPage, IonRow, IonCol },
  data() {
    return {
      vaccines: ['BCG', 'OPV', 'IPV', 'DPT-HepB-Hib', 'PCV', 'ROTA', 'Measles/MR', 'TT/Td', 'MV', 'HPV'],
      categories: [
        {
          name: 'Minor AEFIs',
          cases: [
            {
              name: 'Bacteria abscesses',
              data: { BCG: 0, OPV: 0, IPV: 4, 'DPT-HepB-Hib': 4, PCV: 4, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Severe local reaction',
              data: { BCG: 0, OPV: 0, IPV: 1, 'DPT-HepB-Hib': 1, PCV: 1, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Lymphadenitis',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Sepsis',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            }
          ] as any
        },
        {
          name: 'Serious AEFIs',
          cases: [
            {
              name: 'High fever >38°c',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 1, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Death',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Encephalopathy',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Seizures',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Paralysis',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Significant Disability',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Birth Defect',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            },
            {
              name: 'Toxic Shock syndrome',
              data: { BCG: 0, OPV: 0, IPV: 0, 'DPT-HepB-Hib': 0, PCV: 0, ROTA: 0, 'Measles/MR': 0, 'TT/Td': 0, MV: 0, HPV: 0 }
            }
          ] as any
        }
      ]
    };
  },
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

th:nth-child(1),
td:nth-child(1) {
  border-right: 1px solid #006401;
}

#hugo {
  border-right: 0px;
  text-align: left;
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