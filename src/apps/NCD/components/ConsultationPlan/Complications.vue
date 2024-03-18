<template>
    <ion-list>
        <ion-item :lines="visualAT" class="dashed_bottom_border textSectionFormat">
            <ion-toggle :checked="showVisualAcuityTest" @ionChange="toggleShowVisualAcuityTest">
                <div class="toggle_content">
                    <div>Visual acuity test</div>
                    <div class="due_date">2023-04-13</div>
                    <div>
                        <DynamicButton color="danger" name="Overdue" />
                    </div>
                </div>
            </ion-toggle>
        </ion-item>
        <div class="sub_item_body" v-if="showVisualAcuityTest">
            <ion-row>
                <ion-col>
                    <basic-input-field inputType="number" inputHeader="Left Eye"></basic-input-field>
                </ion-col>
                <ion-col>
                    <basic-input-field inputType="number" inputHeader="Right Eye"></basic-input-field>
                </ion-col>
            </ion-row>
        </div>
        <ion-item class="sub_item_body_close" v-if="showVisualAcuityTest" />

        <ion-item class="dashed_bottom_border textSectionFormat">
            <ion-toggle>Retinopathy screening</ion-toggle>
        </ion-item>

        <ion-item :lines="footSC" class="dashed_bottom_border textSectionFormat">
            <ion-toggle :checked="footChecked" @ionChange="footScreening">Foot screening</ion-toggle>
        </ion-item>

        <div class="sub_item_body" v-if="footChecked">
            <basic-form :contentData="FootScreening"> </basic-form>
        </div>
        <ion-item class="sub_item_body_close" v-if="footChecked" />

        <ion-item class="dashed_bottom_border textSectionFormat">
            <div class="other_content">
                <div>CVD risk screening</div>
                <div style="color: #007d7d; font-size: 14px; text-decoration: underline">Send to referral ></div>
                <div style="width: 250px">
                    <DynamicButton expand="full" size="large" color="secondary" class="" name="No risk" />
                </div>
            </div>
        </ion-item>
        <ion-item class="dashed_bottom_border textSectionFormat">
            <div class="other_content">
                <div>Diabetic kidney disease</div>
                <div style="width: 250px">
                    <DynamicButton expand="full" size="large" color="danger" class="" name="Proteinuria" subName="4+ (High risk)" />
                </div>
                <div style="width: 250px">
                    <DynamicButton expand="full" size="large" color="secondary" class="" name="Ceatinine (mg/dl)" subName="22.1 (No risk)" />
                </div>
            </div>
        </ion-item>
    </ion-list>
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
        };
    },
    computed: {
        ...mapState(useComplicationsStore, ["FootScreening"]),
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
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
}
.due_date {
    font-family: "Inter";
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
