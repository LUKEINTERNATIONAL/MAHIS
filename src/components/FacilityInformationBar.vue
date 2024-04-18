<template>
    <ion-card class="second_bar">
        <ul class="second_bar_list position_content">
            <li>
                Facility Name: <b>{{ demographics.name }}</b>
            </li>
            <li>
                Date: <b>{{ demographics.mrn }}</b>
            </li>
        </ul>
    </ion-card>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController } from "@ionic/vue";
import { defineComponent } from "vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
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
    },
    data: () => ({}),
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
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
            return HisDate.getBirthdateAge(this.demographics.birthdate);
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
    position: fixed;
    width: 100%;
    z-index: 1000;
}
.second_bar_list {
    list-style: none;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    padding: 18px;
}
</style>
