<template>
    <action-header :title="title" :subtitle="subtitle" :color="color"></action-header>
    <ion-content class="ion-text-center">
        {{ list }}
        <ion-list>
            <ion-radio-group :compare-with="compareWith" @ion-change="onclick">
                <ion-item class="his-md-text" v-for="(item, index) in list" :key="index">
                    <ion-radio label-placement="end" :value="item">
                        {{ getLabel(item) }}
                    </ion-radio>
                </ion-item>
            </ion-radio-group>
        </ion-list>
    </ion-content>
    <action-footer :buttons="buttons"> </action-footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ActionSheetMixin from "@/components/DataViews/actionsheet/ActionSheetMixin.vue";
import { NavBtnInterface } from "@/components/HisDynamicNavFooterInterface";
import { modalController } from "@ionic/vue";
import { toastWarning } from "@/utils/Alerts";
import { IonList, IonItem, IonContent, IonRadio, IonRadioGroup } from "@ionic/vue";

export default defineComponent({
    components: { IonList, IonItem, IonContent, IonRadio, IonRadioGroup },
    mixins: [ActionSheetMixin],
    data: () => ({
        selection: undefined as any,
    }),
    props: {
        list: {
            type: Array as PropType<Array<any>>,
            required: true,
        },
        labelKey: {
            type: String,
            default: "label",
        },
        valueKey: {
            type: String,
            default: "value",
        },
    },
    methods: {
        onclick(evt: any) {
            this.selection = evt.detail.value;
        },
        compareWith(o1: any, o2: any) {
            if (typeof o1 === "object" && typeof o2 === "object") {
                return o1[this.valueKey] === o2[this.valueKey];
            }
            return o1 === o2;
        },
        getLabel(item: any) {
            return typeof item === "object" ? item[this.labelKey] : item;
        },
    },
    computed: {
        buttons(): Array<NavBtnInterface> {
            return this.actionButtons.map((b: NavBtnInterface) => ({
                ...b,
                onClick: async () => {
                    if (b.role && b.role.match(/default/i)) {
                        return modalController.dismiss({ action: b.name });
                    }
                    if (b.role && b.role.match(/action/i) && !this.selection) {
                        return toastWarning("Please select one of the options");
                    }
                    await modalController.dismiss({
                        selection: this.selection,
                        action: b.name,
                    });
                },
            }));
        },
    },
});
</script>
<style scoped>
ion-item {
    font-size: 20px;
}
action-header {
    padding-bottom: 2rem;
}
</style>
