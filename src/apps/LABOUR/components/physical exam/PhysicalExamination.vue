<template>
    <div class="container">
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="vitals"></basic-form>
            </ion-card-content>
        </ion-card>
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"> Anaemia</ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="anaemia"></basic-form>
            </ion-card-content>
        </ion-card>
        <ion-card class="section">
            <ion-card-header> <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title></ion-card-header>
            <ion-card-content>
                <basic-form :contentData="otherphysicalExams"></basic-form>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
    IonRadio,
    IonRadioGroup,
} from "@ionic/vue";
import BasicForm from "../../../../components/BasicForm.vue";
import { icons } from "../../../../utils/svg";
import BasicInputField from "../../../../components/BasicInputField.vue";
import { mapState } from "pinia";
import { checkmark, pulseOutline } from "ionicons/icons";

import BasicCard from "@/components/BasicCard.vue";
import { useLabourPhysicalExamStore } from "@/apps/LABOUR/stores/physical exam/physicalExamination";
import { getFieldValue, getRadioSelectedValue, modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
export default defineComponent({
    name: "History",
    components: {
        BasicCard,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonInput,
        BasicInputField,
        BasicForm,
        IonRadio,
        IonRadioGroup,
    },

    data() {
        return {
            iconsContent: icons,
            vValidations: "" as any,
            hasValidationErrors: [] as any,
            height: 0 as number,
        };
    },
    computed: {
        ...mapState(useLabourPhysicalExamStore, ["vitals"]),
        ...mapState(useLabourPhysicalExamStore, ["anaemia"]),
        ...mapState(useLabourPhysicalExamStore, ["otherphysicalExams"]),
    },
    mounted() {
        this.handleOedema();
    },
    watch: {
        otherphysicalExams: {
            handler() {
                this.handleOtherPresentation();
                this.handleContractions();
            },
            deep: true,
        },
        anaemia: {
            handler() {
                this.handleOedema();
            },
            deep: true,
        },
        vitals: {
            handler() {
                this.height = getFieldValue(this.vitals, "Height", "value");
                // this.handleVitalsChange();
            },
            deep: true,
        },
        height: {
            handler() {
                this.handleVitalsChange();
            },
        },
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        handleVitalsChange() {
            //reset alerts
            const heightValue = getFieldValue(this.vitals, "Height", "value");
            //
            if (heightValue < 150 && heightValue != "") {
                this.vitals[2].alerts.push({
                    backgroundColor: "#FFD700",
                    status: "info",
                    icon: "info-circle",
                    textColor: "#000000",
                    value: "Height is less than 150 CM",
                    name: "Height",
                });
                return;
            }
            this.vitals[2].alerts = [];
        },
        handleOtherPresentation() {
            const isOther = getRadioSelectedValue(this.otherphysicalExams, "Presentation") == "Other";

            modifyFieldValue(this.otherphysicalExams, "Other", "displayNone", !isOther);
        },
        handleContractions() {
            const isOther = getRadioSelectedValue(this.otherphysicalExams, "Contractions") == "no Contraction Felt";

            modifyFieldValue(this.otherphysicalExams, "Number of contraction", "displayNone", isOther);
        },
        handleOedema() {
            if (getRadioSelectedValue(this.otherphysicalExams, "Present") == "present") {
                modifyFieldValue(this.otherphysicalExams, "Other", "displayNone", false);
            } else {
                modifyFieldValue(this.otherphysicalExams, "Other", "displayNone", true);
            }

            console.log("_________><><>", getRadioSelectedValue(this.otherphysicalExams, "Present"));
        },

        //       handleFacility(){
        //    if(getRadioSelectedValue(this.ReasonForVisit,'Reason for visit')=='facility')
        //    {
        //      modifyFieldValue(this.ReasonForVisit,'facility for art', 'displayNone', false)

        //    }else {
        //      modifyFieldValue(this.ReasonForVisit,'facility for art', 'displayNone', true)

        //    }
        // },
    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section {
    width: 100%;
    max-width: 1300px;
    margin-bottom: 20px;
}

ion-card {
    box-shadow: none;
    background-color: inherit;
    width: 100%;
    color: black;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
}

@media (max-width: 1500px) {
    .container {
        padding: 10px;
    }
}
.sub_item_header {
    font-weight: bold;
    font-size: 14px;
}
</style>
