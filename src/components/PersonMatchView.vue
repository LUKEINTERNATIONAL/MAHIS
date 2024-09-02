<template>
    <!-- Spinner -->
    <div v-if="isLoading" class="spinner-overlay">
        <ion-spinner name="bubbles"></ion-spinner>
        <div class="loading-text">Please wait...</div>
    </div>
    <ion-header>
        <div class="header position_content">
            <div style="display: flex; align-items: center" @click="dismiss('back')">
                <ion-icon slot="separator" size="large" :icon="iconsContent.arrowLeft"></ion-icon>
            </div>
            <div style="font-size: 1.2em; font-weight: 700">Matches found: ({{ deduplicationData.length }})</div>
        </div>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" style="--background: #fff">
        <ion-accordion-group ref="accordionGroup" class="previousView" value="0" @ionChange="updateAccordionState">
            <ion-accordion
                style="margin-bottom: 15px"
                :value="index"
                toggle-icon-slot="start"
                class="custom_card"
                button
                v-for="(result, index) in deduplicationData"
                :key="index"
                :detail="true"
                :color="result.value === selectedResult.value ? 'light' : ''"
                @click="setData(result)"
            >
                <ion-item slot="header">
                    <ion-label class="previousLabel"> {{ result?.person?.given_name }} {{ result?.person?.family_name }}</ion-label>
                    <div class="due_date">
                        Score: <b> {{ probabilityToPercentage(result?.score) || "-" }} </b>
                    </div>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <ion-row>
                        <ion-col><b>To be Registered</b></ion-col>
                        <ion-col><b>Already Registered</b></ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                Name: <b>{{ to_be_registered?.given_name }} {{ to_be_registered?.family_name }}</b></ion-row
                            >
                            <ion-row
                                >Gender: <b>{{ to_be_registered?.gender }}</b></ion-row
                            >
                            <ion-row
                                >Birthdate: <b>{{ to_be_registered?.birthdate }}</b></ion-row
                            >
                            <ion-row
                                >Home District: <b>{{ to_be_registered?.home_district }}</b></ion-row
                            >
                            <ion-row
                                >Home TA: <b>{{ to_be_registered?.home_traditional_authority }}</b></ion-row
                            >
                        </ion-col>
                        <ion-col>
                            <ion-row>
                                Name: <b>{{ result?.person?.given_name }} {{ result?.person?.family_name }}</b></ion-row
                            >
                            <ion-row
                                >Gender: <b>{{ result?.person?.gender }}</b></ion-row
                            >
                            <ion-row
                                >Birthdate: <b>{{ dateFormat(result?.person?.birthdate) }}</b></ion-row
                            >
                            <ion-row
                                >Home District: <b>{{ result?.person?.home_district }}</b></ion-row
                            >
                            <ion-row
                                >Home TA: <b>{{ result?.person?.home_traditional_authority }}</b></ion-row
                            >
                        </ion-col>
                    </ion-row>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-content>
    <ion-footer collapse="fade" class="ion-no-border">
        <div style="display: flex; justify-content: end; gap: 10px">
            <ion-button fill="solid" color="secondary" @click="dismiss('dismiss')"> Not Duplicate </ion-button>
            <ion-button @click="onSelect()" fill="solid" :disabled="!isAnyAccordionOpen">Select </ion-button>
        </div>
    </ion-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonRow, IonLabel, IonAvatar, IonCol, IonImg, IonList, IonItem, modalController, IonIcon, IonButton } from "@ionic/vue";
import FieldMixinVue from "@/components/FormElements/FieldMixin.vue";
import { Option } from "@/components/Forms/FieldInterface";
import { icons } from "@/utils/svg";
import HisDate from "@/utils/Date";

export default defineComponent({
    components: {
        IonLabel,
        IonAvatar,
        IonRow,
        IonImg,
        IonCol,
        IonList,
        IonItem,
        IonIcon,
        IonButton,
    },
    data: () => ({
        selectedResult: {} as any,
        iconsContent: icons,
        isAnyAccordionOpen: true,
    }),
    methods: {
        updateAccordionState(event: CustomEvent) {
            const accordionGroup = this.$refs.accordionGroup as HTMLIonAccordionGroupElement;
            this.isAnyAccordionOpen = accordionGroup.value !== undefined;
        },
        dismiss(dismiss: any) {
            modalController.dismiss(dismiss);
        },
        async init() {
            this.setData(this.deduplicationData[0] || {});
        },
        async onSelect() {
            modalController.dismiss(this.selectedResult);
        },
        setData(data: any) {
            this.selectedResult = data;
        },
        dateFormat(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        probabilityToPercentage(probability: any) {
            return (probability * 100).toFixed(2) + "%";
        },
    },
    props: {
        deduplicationData: {
            default: [] as any,
        },
        to_be_registered: {
            default: [] as any,
        },
    },
    mounted() {
        this.init();
    },
    activated() {
        this.init();
    },
});
</script>

<style scoped>
.large-card {
    padding: 5%;
    border-radius: 15px;
    border: 1px solid #ccc;
    height: 82vh;
    background-color: rgb(255, 255, 255);
    overflow-y: auto;
    -webkit-box-shadow: 0px -2px 19px -2px rgba(196, 190, 196, 1);
    -moz-box-shadow: 0px -2px 19px -2px rgba(196, 190, 196, 1);
    box-shadow: 0px -2px 19px -2px rgba(196, 190, 196, 1);
}
.header {
    display: flex;
    gap: 20px;
    padding: 10px 20px 10px 20px;
}
.position_content {
    max-width: 100vw;
}
.accordion-expanded {
    background-color: #ddeedd;
}
button[aria-expanded="false"] {
    background: rgba(var(--ion-color-rose-rgb), 0.25);
}
ion-accordion.accordion-expanding ion-item[slot="header"],
ion-accordion.accordion-expanded ion-item[slot="header"] {
    --background: #ddeedd;
}
</style>
