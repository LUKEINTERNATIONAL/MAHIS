<template>
    <div class="container">
        <!-- Caffeine -->
        <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="dailyCaffeineIntake"></basic-form>
            </ion-card-content>
        </ion-card>

        <!-- tobbaco -->
        <ion-card class="section">
            <ion-card-header>
                <ion-card-title class="dashed_bottom_border sub_item_header"></ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <basic-form :contentData="Tobacco"></basic-form>
            </ion-card-content>
        </ion-card>
        <!--    &lt;!&ndash; Navigation Buttons &ndash;&gt;-->
        <!--    <div class="navigation-buttons">-->
        <!--      <ion-button @click="goToPreviousSection" expand="block" color="primary" size="medium">Previous</ion-button>-->
        <!--      <ion-button @click="goToNextSection" expand="block" color="primary" size="medium">Next</ion-button>-->
        <!--    </div>-->
    </div>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu,
    menuController,
    IonToggle,
    IonSelectOption,
    IonInput,
    IonSelect,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, pulseOutline } from "ionicons/icons";
import { ref } from "vue";
import { icons } from "@/utils/svg";
import BasicInputField from "@/components/BasicInputField.vue";
import BasicForm from "@/components/BasicForm.vue";
import { mapState } from "pinia";
import { useWomanBehaviourStore } from "@/apps/ANC/store/profile/womanBehaviourStore";
import { getCheckboxSelectedValue, modifyCheckboxValue } from "@/services/data_helpers";

export default defineComponent({
    name: "Menu",
    components: {
        BasicForm,
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
    },
    data() {
        return {
            iconsContent: icons,
            currentSection: 0, // Initialize currentSection to 0
        };
    },
    mounted() {
        const dailyCaffeineIntake = useWomanBehaviourStore();
        const Tobacco = useWomanBehaviourStore();
        this.handleNone();
    },
    watch: {
        dailyCaffeineIntake: {
            handler() {
                this.handleNone();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(useWomanBehaviourStore, ["dailyCaffeineIntake"]),
        ...mapState(useWomanBehaviourStore, ["Tobacco"]),
    },

    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        handleNone() {
            const checkBoxes = [
                "More than 2 cups of coffee",
                "More than 4 cups of tea",
                "More than 12 bars of chocolate",
                "More than one bottle of soda, energy, soft drink",
            ];

            if (getCheckboxSelectedValue(this.dailyCaffeineIntake, "None")?.checked) {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.dailyCaffeineIntake, checkbox, "checked", false);
                    modifyCheckboxValue(this.dailyCaffeineIntake, checkbox, "disabled", true);
                });
            } else {
                checkBoxes.forEach((checkbox) => {
                    modifyCheckboxValue(this.dailyCaffeineIntake, checkbox, "disabled", false);
                });
            }
        },
        //Method for navigating
        goToNextSection() {
            if (this.currentSection < 1) {
                this.currentSection++;
            }
        },
        goToPreviousSection() {
            if (this.currentSection > 0) {
                this.currentSection--;
            }
        },
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
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
    max-width: 1300px; /* Adjust max-width as needed */
    margin-bottom: 20px;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px; /* Adjust max-width as needed */
}

@media (max-width: 1500px) {
    .container {
        padding: 10px;
    }
}
.sub_item_header {
    font-weight: bold;
    font-size: medium;
}
ion-card {
    box-shadow: none;
    background-color: inherit;
}
</style>
