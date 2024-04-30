<template>
    <basic-card :content="cardData"></basic-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, modalController, IonCheckbox } from "@ionic/vue";
import { defineComponent } from "vue";
import { icons } from "@/utils/svg";

import DispositionModal from "@/components/ProfileModal/OutcomeModal.vue";
import { createModal } from "@/utils/Alerts";
import { useEnrollementStore } from "@/stores/EnrollmentStore";
import { mapState } from "pinia";
import BasicForm from "@/components/BasicForm.vue";
import BasicCard from "@/components/BasicCard.vue";
import { ProgramService } from "@/services/program_service";
import {
    modifyRadioValue,
    getRadioSelectedValue,
    getCheckboxSelectedValue,
    getFieldValue,
    modifyFieldValue,
    modifyCheckboxValue,
} from "@/services/data_helpers";
import { journalOutline } from "ionicons/icons";
export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonCheckbox,
        BasicForm,
        BasicCard,
    },
    data() {
        return {
            iconsContent: icons,
            test: "" as any,
            cardData: {} as any,
        };
    },
    computed: {
        ...mapState(useEnrollementStore, ["NCDNumber"]),
    },
    watch: {
        personInformation: {
            handler() {
                this.updateEnrollmentStores();
                this.buildCards();
            },
            deep: true,
        },
    },
    async mounted() {
        const j = await ProgramService.getNextSuggestedNCDNumber();
        modifyFieldValue(this.NCDNumber, "NCDNumber", "value", j.ncd_number.replace(/^\D+|\s/g, ""));
        modifyFieldValue(this.NCDNumber, "NCDNumber", "leftText", `${j.ncd_number.replace(/\d+/g, "")}-NCD-`);
        this.buildCards();
    },
    methods: {
        buildCards() {
            this.cardData = {
                mainTitle: "Enrollment",
                cards: [
                    {
                        cardTitle: "NCD number",
                        content: this.NCDNumber,
                    },
                ],
            };
        },
        openModal() {
            createModal(DispositionModal);
        },
        updateEnrollmentStores() {
            const enrollmentStore = useEnrollementStore();
            enrollmentStore.setNCDNumber(this.NCDNumber);
        },
        testF(data: any) {
            console.log(data);
        },
    },
});
</script>

<style scoped>
.sub_title {
    font-weight: 400;
    font-size: 14px;
    color: #636363;
    padding-top: 20px;
    line-height: 25px;
}

.sub_title {
    line-height: 40px;
}
.diagnosis_col {
    display: flex;
    justify-content: center;
    align-items: center;
}
.diplay_space_between {
    color: var(--text_color, #00190e);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
}
ion-radio {
    margin-right: 35px;
}
.dashed_bottom_border {
    margin-top: 15px;
    margin-bottom: 15px;
}
.diagnosis_checkbox {
    display: flex;
    justify-content: space-between;
}
.diagnosis_input {
    width: 220px;
    margin-bottom: 20px;
}
.tb_content {
    text-align: left;
    line-height: 3;
}
.small_font {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #636363;
}
.checkbox_header {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #00190e;
}
</style>
