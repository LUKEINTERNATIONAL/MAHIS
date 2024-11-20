<template>
    <basic-form :contentData="visualScreening"> </basic-form>
    <ion-list>
        <ion-item :lines="footSC" class="dashed_bottom_border textSectionFormat">
            <span>Foot screening</span>
        </ion-item>
        <div class="sub_item_body">
            <basic-form :contentData="FootScreening"> </basic-form>
        </div>
    </ion-list>
    <basic-form :contentData="cvScreening"> </basic-form>
    <ion-row>
        <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">
                <ion-item slot="header" color="light">
                    <ion-label class="previousLabel">Previous Visits</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <previousDiagnosis />
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-row>
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
import { mapState } from "pinia";
import { useComplicationsStore } from "@/stores/ComplicationsStore";
import BasicForm from "@/components/BasicForm.vue";
import DynamicButton from "@/components/DynamicButton.vue";

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
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonInput,
        BasicInputField,
        BasicForm,
        DynamicButton,
    },
    data() {
        return {
            iconsContent: icons,
            footChecked: false,
            showVisualAcuityTest: false,
            visualAT: "" as any,
            footSC: "" as any,
            cvdRiskObj: {
                btnColor: "secondary",
                btnName: "No risk",
            },
        };
    },
    computed: {
        ...mapState(useComplicationsStore, ["FootScreening", "visualScreening", "cvScreening"]),
    },
    setup() {
        return { checkmark, pulseOutline };
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
        footScreening() {
            this.footChecked = !this.footChecked;
            if (this.footChecked) {
                this.footSC = "none";
            } else {
                this.footSC = "";
            }
        },
        toggleShowVisualAcuityTest() {
            this.showVisualAcuityTest = !this.showVisualAcuityTest;
            if (this.showVisualAcuityTest) {
                this.visualAT = "none";
            } else {
                this.visualAT = "";
            }
        },
        cvdRisk() {
            if (this.cvdRiskObj.btnColor != "secondary") {
                this.cvdRiskObj = {
                    btnColor: "secondary",
                    btnName: "No risk",
                };
            } else {
                this.cvdRiskObj = {
                    btnColor: "danger",
                    btnName: "High risk",
                };
            }
        },
    },
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
.foot_title {
    color: #636363;
    text-align: center;
}
.foot_content {
    color: #00190e;
    text-align: center;
    border-bottom: solid 1px #ccc;
    border-bottom-style: dashed;
    padding: 10px 0px;
    font-weight: 500;
    font-size: 14px;
}
.first_col {
    text-align: left;
    font-weight: 400;
    font-size: 14px;
}
.sub_item_body {
    margin-left: 45px;
}
.foot_input {
    width: 100%;
    color: #636363;
    text-align: left;
}
.item-content {
    background-color: #ffffff;
}
ion-select._item_eye {
    --background: #fff;
}
ion-item.item_eye_ {
    --inner-border-width: 0;
    --background-hover: none;
}
/* ion-toggle {
    --track-background-checked: #006401
} */
ion-item.sub_item_body_close {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width: 0;
}
.textSectionFormat {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
}
.due_date {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #636363;
}
.toggle_content {
    display: flex;
    justify-content: space-between;
    width: 370px;
    align-items: center;
}
.other_content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
