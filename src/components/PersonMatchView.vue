<template>
    <ion-row>
        <ion-col size="5">
            <div class="large-card">
                <h3>Matches found: ({{ deduplicationData.length }}):</h3>
                <ion-list>
                    <ion-item
                        button
                        v-for="(result, index) in deduplicationData"
                        :key="index"
                        :detail="true"
                        :color="result.value === selectedResult.value ? 'light' : ''"
                        @click="onSelect(result)"
                    >
                        <ion-avatar>
                            <ion-img src="/assets/images/avatar.svg" />
                        </ion-avatar>
                        <ion-label>
                            {{ result?.person?.given_name }} {{ result?.person?.family_name }}<br />
                            Home District: <b>{{ result?.person?.home_district }}</b> <br />
                            Home TA: <b>{{ result?.person?.home_traditional_authority }}</b> Score: <b> {{ result?.score || "-" }} </b>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </div>
        </ion-col>
        <ion-col size="7">
            <div class="large-card">
                <h1>Match score: {{ selectedResult?.score || "-" }}</h1>
                <ion-list>
                    <ion-item>
                        {{ selectedResult }}
                        <ion-label color="danger">
                            <b>{{ item }}</b>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </div>
        </ion-col>
    </ion-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonRow, IonLabel, IonAvatar, IonCol, IonImg, IonList, IonItem } from "@ionic/vue";
import FieldMixinVue from "@/components/FormElements/FieldMixin.vue";
import { Option } from "@/components/Forms/FieldInterface";

export default defineComponent({
    mixins: [FieldMixinVue],
    components: {
        IonLabel,
        IonAvatar,
        IonRow,
        IonImg,
        IonCol,
        IonList,
        IonItem,
    },
    data: () => ({
        selectedResult: {} as any,
    }),
    methods: {
        async init() {
            this.$emit("onFieldActivated", this);
            this.onSelect(this.deduplicationData[0] || {});
        },
        async onSelect(item: any) {
            if (!item) {
                return;
            }
            if (this.onValue) {
                const ok = await this.onValue(item, this);
                if (!ok) {
                    return;
                }
            }
            this.selectedResult = item;
            this.$emit("onValue", item);
        },
    },
    props: {
        deduplicationData: {
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
</style>
