<template>
    <div>
        <ion-segment :value="segmentContent" style="margin-top: 5px; margin-left: 20px; justify-content: left">
            <ion-segment-button value="Internal referrals" @click="setSegmentContent('Internal referrals')">
                <ion-label>Internal referrals</ion-label>
            </ion-segment-button>
            <ion-segment-button value="External referrals" @click="setSegmentContent('External referrals')">
                <ion-label>External referrals</ion-label>
            </ion-segment-button>
        </ion-segment>
    </div>
    <div v-if="segmentContent == 'Internal referrals'">
        <div style="display: flex; margin-top: 10px">
            <div style="width: 50vw; background-color: #fff; border-radius: 5px; margin-right: 5px" v-if="checkUnderFive"></div>
            <div style="width: 50vw; background-color: #fff; border-radius: 5px; margin-right: 5px"></div>
            <div style="width: 50vw; background-color: #fff; border-radius: 5px" v-if="!checkUnderFive"></div>
        </div>
    </div>
    <div v-if="segmentContent == 'External referrals'">
        <VisitsHistory />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "referrals",
    components: {},
    data() {
        return {
            segmentContent: "Internal referrals",
            checkUnderFive: false,
        };
    },
    methods: {
        setSegmentContent(name: any) {},
    },
});
</script>
<style scoped>
ion-segment-button {
    background: #fff;
    margin-right: 1px;
    font-size: 12px;
    text-transform: unset;
}
</style>
