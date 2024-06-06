<template>
    <div class="pim-cls-1 modal_wrapper">
        <div class="ion-padding pim-cls-1">
            <div>
                <div class="center text_12">
                    <h4 class="PI-cls-1">Personal Information</h4>
                    <ion-row>
                        <ion-col>
                            <ion-label class="lbl-tl">Full Name:</ion-label>
                        </ion-col>
                        <ion-col>
                            <ion-label class="lbl-ct">{{ demographics.name }}</ion-label>
                        </ion-col>
                        <ion-col offset="1.6">
                            <ion-label class="lbl-tl">Sex:</ion-label>
                        </ion-col>
                        <ion-col>
                            <ion-label class="lbl-ct">{{ demographics.gender == "M" ? "Male" : "Female" }}</ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-label class="lbl-tl">Date of Birth:</ion-label>
                        </ion-col>
                        <ion-col>
                            <ion-label class="lbl-ct">{{ formatBirthdate() }}</ion-label>
                        </ion-col>
                        <ion-col>
                            <ion-label class="lbl-tl">Contacts:</ion-label>
                        </ion-col>
                        <ion-col>
                            <ion-label class="lbl-ct">{{ demographics.phone }}</ion-label>
                        </ion-col>
                    </ion-row>

                    <hr class="dashed-hr" />

                    <h4 class="PI-cls-1">Gurdian Information</h4>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Full Name:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Jane Doe</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>

                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Age</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">42</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Relationship:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Mother</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>

                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Contacts</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">0999526423</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>

                    <hr class="dashed-hr" />

                    <h4 class="PI-cls-1">Addresses</h4>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">Current Address:</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Kaluluma, Side B</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col></ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <ion-label class="lbl-tl">District(s):</ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="lbl-ct">Mzimba</ion-label>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col></ion-col>
                    </ion-row>

                    <hr class="dashed-hr" style="margin-bottom: 0px !important" />
                </div>
            </div>
        </div>
        <ion-footer :translucent="true" class="ion-no-border">
            <DynamicButton name="Edit Info" fill="solid" :icon="createOutline" style="float: right; margin: 2%" />
        </ion-footer>
    </div>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonIcon, IonToolbar, IonSearchbar, IonPopover } from "@ionic/vue";
import { notificationsOutline, personCircleOutline, createOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { mapState } from "pinia";
import HisDate from "@/utils/Date";
import DynamicButton from "@/components/DynamicButton.vue";
export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon,
        IonPopover,
        DynamicButton,
    },
    data() {
        return {
            popoverOpen: false,
            event: null as any,
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics"]),
    },
    setup() {
        return { notificationsOutline, personCircleOutline, createOutline };
    },
    methods: {
        nav(url: any) {
            this.$router.push(url);
        },
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics.birthdate);
        },
    },
});
</script>
<style scoped>
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.lbl-ct {
    white-space: nowrap;
    color: #636363;
}
pim-cls-1 {
    --background: #ffff;
}
.custom-toolbar-cls {
    --background: #ffff;
}
ion-footer {
    --ion-toolbar-background: #fff;
}
ion-modal {
    --width: 94%;
    --height: 70%;
    --border-radius: 10px;
}
.dashed-hr {
    border: none;
    border-top: 1px dashed #b3b3b3;
    margin: 20px 0; /* Adjust as needed */
}
.modal_wrapper {
    padding: 0px 19px;
    background: #fff;
}
.PI-cls-1 {
    color: #1f2221d4;
}
</style>
