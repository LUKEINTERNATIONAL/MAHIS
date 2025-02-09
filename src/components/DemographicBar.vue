<template>
    <ion-card class="second_bar" style="display: flex">
        <div style="width: 97%; overflow: scroll">
            <ul class="second_bar_list">
                <li>
                    Fullname:
                    <b
                        >{{ patient?.personInformation?.given_name }} {{ patient?.personInformation?.middle_name }}
                        {{ patient?.personInformation?.family_name }}</b
                    >
                </li>
                <li>
                    NCDNumber: <b>{{ patient.NcdID }}</b>
                </li>
                <li>
                    MRN: <b>{{ patient.ID }}</b>
                </li>
                <li>
                    Birthday: <b>{{ formatBirthdate() }} </b>
                </li>
                <li>
                    Gender: <b>{{ patient?.personInformation?.gender }}</b>
                </li>
                <li>
                    Address: <b>{{ formatCurrentAddress(patient) }}</b>
                </li>
            </ul>
        </div>

        <div style="margin-top: 15px">
            <ion-icon :icon="ellipsisVerticalSharp"></ion-icon>
        </div>
    </ion-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import { ellipsisVerticalSharp } from "ionicons/icons";
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
        IonIcon,
    },
    setup() {
        return { ellipsisVerticalSharp };
    },
    data: () => ({}),

    computed: {
        ...mapState(useDemographicsStore, ["patient"]),
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        covertGender(gender: any) {
            return ["Male", "M"].includes(gender) ? "Male" : ["Female", "F"].includes(gender) ? "Female" : "";
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.patient?.personInformation?.birthdate);
        },
        formatCurrentAddress(data: any) {
            const addressComponents = [
                data?.personInformation?.current_district,
                data?.personInformation?.current_traditional_authority,
                data?.personInformation?.current_village,
            ];
            return addressComponents.filter(Boolean).join(",");
        },
    },
});
</script>

<style scoped>
.second_bar {
    background-color: rgb(255, 255, 255);
    margin: 0;
    border-radius: unset;
    margin-bottom: 20px;
    /* position: fixed; */
    width: 100%;
    z-index: 1000;
}
.second_bar_list {
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    padding: 18px;
    min-width: fit-content;
    white-space: nowrap;
    gap: 20px;
}
</style>
