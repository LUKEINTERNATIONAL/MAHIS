<template>
    <ion-card>
        <div style="">
            <ion-accordion-group ref="accordionGroup" class="previousView" @ionChange="accordionGroupChangeFn1">
                <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                    <ion-item slot="header" color="light">
                        <ion-label class="previousLabel">Documented medications timeline</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <div class="ionLbltp" v-for="(item, index) in PreviuosSelectedMedicalDrugsList" :key="index">
                            <div v-if="index == 0">
                                <div>
                                    <ion-label class="previousLabelDate">{{ item.prescriptionDate }}</ion-label>
                                </div>

                                <div class="previousSecDrgs">
                                    <dynamic-list
                                        :_selectedMedicalDrugsList="item.previousPrescriptions"
                                        :show_actions_buttons="false"
                                        :key="componentKey"
                                    />
                                </div>
                            </div>
                        </div>

                        <ion-accordion-group @ionChange="accordionGroupChange">
                            <ion-accordion value="second" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                                <ion-item slot="header" color="light">
                                    <ion-label class="" color="primary">{{ showMoreMedicationsMsg }}</ion-label>
                                </ion-item>
                                <div class="ion-padding" slot="content">
                                    <div class="ionLbltp" v-for="(item, index) in PreviuosSelectedMedicalDrugsList" :key="index">
                                        <div v-if="itemWasExpanded && index > 0">
                                            <div>
                                                <ion-label class="previousLabelDate">{{ item.prescriptionDate }}</ion-label>
                                            </div>

                                            <div class="previousSecDrgs">
                                                <dynamic-list
                                                    :_selectedMedicalDrugsList="item.previousPrescriptions"
                                                    :show_actions_buttons="false"
                                                    :key="componentKey"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
        </div>
    </ion-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonAccordion, IonAccordionGroup, IonItem, IonLabel, AccordionGroupCustomEvent } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import { PreviousTreatment } from "@/apps/NCD/services/treatment";
import DynamicList from "@/components/DynamicList.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import { useNCDMedicationsStore } from "@/stores/NCDMedicationStore";

import SetUser from "@/views/Mixin/SetUser.vue";
export default defineComponent({
    name: "Home",
    mixins: [SetUser],
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        Toolbar,
        IonRow,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        DynamicList,
        IonCard,
    },
    data() {
        const componentKey = ref(0);
        const showMoreMedicationsMsg = ref("Show more medications");
        // const values = ["first", "second", "third"];
        const itemWasExpanded = ref(false);
        const PreviuosSelectedMedicalDrugsList = ref();

        const accordionGroupChangeFn1 = (ev: AccordionGroupCustomEvent) => {}
        const accordionGroupChange = (ev: AccordionGroupCustomEvent) => {
            // const collapsedItems = values.filter((value) => value !== ev.detail.value);
            const selectedValue = ev.detail.value;
            // console.log(
            //     `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
            // )
            if (selectedValue !== undefined) {
                if (selectedValue == "second") {
                    showMoreMedicationsMsg.value = "Show less medications";
                    itemWasExpanded.value = !itemWasExpanded.value;
                }
            } else {
                // its a hack
                showMoreMedicationsMsg.value = "Show more medications";
                itemWasExpanded.value = !itemWasExpanded.value;
            }
        }

        const loadPreviousMedications = async () => {
            const previousTreatment = new PreviousTreatment();
            const { previousDrugPrescriptions } = await previousTreatment.getPatientEncounters();
            PreviuosSelectedMedicalDrugsList.value = previousDrugPrescriptions;
        }

        return {
            componentKey,
            accordionGroupChange,
            showMoreMedicationsMsg,
            itemWasExpanded,
            accordionGroupChangeFn1,
            PreviuosSelectedMedicalDrugsList,
            loadPreviousMedications,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
        ...mapState(useNCDMedicationsStore, ["selectedNCDMedicationList"]),  
    },
    $route: {
        async handler() {},
        deep: true,
    },
    watch: {
        patient: {
            handler() {
                this.loadPreviousMedications()
            },
            deep: true,
        },
        selectedNCDMedicationList: {
            handler() {
                this.loadPreviousMedications()
            },
            deep: true,
        }
    },
    async mounted() {
        this.loadPreviousMedications()
    },
});
</script>
<style scoped>
    .previousView {
        width: 100%;
        border-radius: 10px;
        margin-top: 10px;
    }
</style>