<template>
    <ion-row>
        <ion-col>
            <h1 style="width: 100%; text-align: left; font-weight: 400">Adverse Events Following Immunization - AEFI</h1>
        </ion-col>
    </ion-row>

    <table>
        <colgroup v-for="(vaccine, index) in vaccines" :key="index">
            <col :style="{ width: 100 / vaccines.length + '%' }" />
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
                    <td :colspan="vaccines.length + 1" id="hugo">
                        <strong>{{ category.name }}</strong>
                    </td>
                </tr>
                <tr v-for="case_ in category.cases" :key="case_.name">
                    <td>{{ case_.name }}</td>
                    <td v-for="vaccine in case_.data" :key="vaccine">
                        <div style="cursor: pointer" @click="openPersonCardComponent(vaccine.personIds)">{{ vaccine.count }}</div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonContent, IonPage, IonRow, IonCol } from "@ionic/vue";
import { ConceptService } from "@/services/concept_service";
import { mapState } from "pinia";
import { getAefiReport, getunderfiveImmunizationsDrugs } from "@/apps/Immunization/services/vaccines_service";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import { PatientService } from "@/services/patient_service";
import { createModal } from "@/utils/Alerts";
import PersonCardComponent from "@/apps/Immunization/components/Modals/PersonCardComponent.vue";
import { useWorkerStore } from "@/stores/workerStore";
import { useDemographicsStore } from "@/stores/DemographicStore";
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
    name: "TableComponent",
    components: { IonContent, IonPage, IonRow, IonCol },
    data() {
        const personsDemoData = ref([]) as any;
        return {
            route: "",
            vaccines: [] as any,
            categories: [
                {
                    name: "Minor AEFIs",
                    cases: [] as any,
                },
                {
                    name: "Serious AEFIs",
                    cases: [] as any,
                },
            ],
            personsDemoData,
        };
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "EIRReport") await this.initReport();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(EIRreportsStore, ["start_date", "end_date", "navigationPayload"]),
    },
    async mounted() {
        await this.initReport();
    },
    methods: {
        async initReport() {
            this.vaccines = await this.UnderFiveImmunizations();
            this.categories[0].cases = await this.getAEFIKnownList(this.categories[0].name, this.vaccines);
            this.categories[1].cases = await this.getAEFIKnownList(this.categories[1].name, this.vaccines);
            await this.initAefiReport(this.categories);
        },
        async initAefiReport(categories: Category[]): Promise<void> {
            try {
                const data = await getAefiReport(this.start_date, this.end_date);

                // Create a map for faster lookup
                const conceptDrugCountMap = new Map<number, Map<number, DrugData>>();

                // Process data and build the map
                type DrugData = {
                    count: number;
                    personIds: Set<number>;
                };

                data.data.forEach((item: any) => {
                    const drugCountMap = conceptDrugCountMap.get(item.concept_id) || new Map<number, DrugData>();

                    item.drugs.forEach((drug: any) => {
                        const existingData = drugCountMap.get(drug.drug_inventory_id) || { count: 0, personIds: new Set<number>() };

                        drugCountMap.set(drug.drug_inventory_id, {
                            count: existingData.count + 1,
                            personIds: new Set(existingData.personIds).add(item.person_id),
                        });
                    });

                    conceptDrugCountMap.set(item.concept_id, drugCountMap);
                });

                // Update categories
                categories.forEach((category) => {
                    category.cases.forEach((caseItem) => {
                        const drugCountMap = conceptDrugCountMap.get(caseItem.concept_id);
                        if (drugCountMap) {
                            caseItem.data.forEach((d_d: any) => {
                                const drugData = drugCountMap.get(d_d.drug_id);
                                if (drugData) {
                                    d_d.count += drugData.count;
                                    d_d.personIds = new Set([...(d_d.personIds || []), ...drugData.personIds]);
                                }
                            });
                        }
                    });
                });

                const store = EIRreportsStore();
                store.setAEFIReportData({ vaccines: this.vaccines, categories: this.categories });
            } catch (error) {
                console.error("Error in initAefiReport:", error);
            }
        },
        async UnderFiveImmunizations() {
            const data: any = [];
            const UFIs = await getunderfiveImmunizationsDrugs();
            UFIs.forEach((item: any) => {
                data.push(item);
            });
            return data;
        },
        async getAEFIKnownList(concept_set_name: string, vaccines: any) {
            const data: any = [];
            const vaccineEffect = await ConceptService.getConceptSet(concept_set_name);
            vaccineEffect.forEach((item: any) => {
                const updatedVaccines = vaccines.map((vaccine: any) => ({
                    ...vaccine,
                    count: 0,
                }));
                data.push({
                    concept_id: item.concept_id,
                    name: item.name,
                    data: updatedVaccines,
                });
            });
            data.sort((a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name));
            return data;
        },
        async openPersonCardComponent(clientIds: Set<any>) {
            this.personsDemoData.value = await this.getClientsDemoGraphicData(clientIds);
            const iPersonObj = [] as any;
            this.personsDemoData.value.forEach((person: any) => {
                const iPerson = {
                    ...person[0].person,
                    ...person[0].person.addresses[0],
                    ...person[0].person.names[0],
                    patient_id: person[0].patient_id,
                };
                iPersonObj.push(iPerson);
            });

            const handleModalAction = (event: CustomEvent<any>) => {
                this.openPatientProfile(event.detail.client_id);
            };
            const dataToPass = { people: iPersonObj, headingText: `Immunization (Client Drill Down | ${this.navigationPayload.subTxt})` };
            createModal(PersonCardComponent, { class: "large-modal" }, true, dataToPass, { "view-client": handleModalAction });
        },
        async openPatientProfile(client_id: any) {
            this.personsDemoData.value.forEach(async (person: any) => {
                if (person[0].patient_id == client_id) {
                    await useDemographicsStore().setPatientRecord(person[0]);
                    this.$router.push("patientProfile");
                    return;
                }
            });
        },
        async getClientsDemoGraphicData(clientIds: Set<any>): Promise<any[]> {
            try {
                const clientIdArray = Array.from(clientIds);

                const patientDataPromises = clientIdArray.map(async (clientId: any) => {
                    try {
                        const patientData = await PatientService.findByID(clientId);
                        if (!patientData || !patientData.patient_identifiers || patientData.patient_identifiers.length === 0) {
                            console.warn(`No patient data or identifiers found for client ID: ${clientId}`);
                            return null;
                        }
                        const patientData2 = await PatientService.findByNpid(patientData.patient_identifiers[0].identifier);
                        return patientData2;
                    } catch (error) {
                        console.error(`Error processing client ID ${clientId}:`, error);
                        return null;
                    }
                });

                const results = await Promise.all(patientDataPromises);
                return results.filter((result) => result !== null);
            } catch (error) {
                console.error("Error in getClientsDemoGraphicData:", error);
                throw error;
            }
        },
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

th,
td {
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
