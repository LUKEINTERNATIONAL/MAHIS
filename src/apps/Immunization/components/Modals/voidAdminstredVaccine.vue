<template>
    <ion-row class="centered-content">
        <div class="text-container">
            <div>
                Do you want to void this vaccine?
            </div>
            <div>
                Please specify reason for voiding this administered vaccine?
            </div>
        </div>
    </ion-row>
    <ion-row>
        <ion-list style="width: 100%;">
            <ion-radio-group :compareWith="compareWith" @ionChange="handleChange($event)" value="start">
            <ion-item v-for="reason in reasons">
                <ion-radio :value="reason">{{ reason.name }}</ion-radio>
            </ion-item>
            </ion-radio-group>
        </ion-list>
    </ion-row>
    <div class="saveBtn">
        <ion-row>
            <ion-col>
                <ion-button @click="dismiss" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px">
                    Cancel
                    <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
                </ion-button>
            </ion-col>

            <ion-col>
                <ion-button @click="voidVaccine1" class="btnText" fill="solid" style="width: 130px; text-align: right;">
                    Void
                    <!-- <ion-icon slot="end" size="small" :icon="iconsContent.calenderwithPlus"></ion-icon> -->
                </ion-button>
            </ion-col>
        </ion-row>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from "vue";
    import { IonContent, IonRow, IonItem, IonList, IonRadio, IonRadioGroup, modalController } from "@ionic/vue";
    import { useAdministerVaccineStore } from "@/apps/Immunization/stores/AdministerVaccinesStore";
    import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts"
    import { voidVaccine } from "@/apps/Immunization/services/vaccines_service";
    import _ from 'lodash';
    export default defineComponent({
        components: {
            IonRow,
            IonItem,
            IonList,
            IonRadio,
            IonRadioGroup,
        },
        data() {
            return {
                reasons: [
                    {
                        id: 1,
                        name: 'Mistake/ Wrong Entry',
                        type: 'Mistake/ Wrong Entry',
                    },
                    {
                        id: 2,
                        name: 'Duplicate',
                        type: 'Duplicate',
                    },
                    {
                        id: 3,
                        name: 'System Error',
                        type: 'System Error',
                    },
                ],
                selectedOption: {} as any,
            }
        },
        computed: {
            
        },
        async mounted() {
        },
        props: {
            // customSchedule: {
            //     type: [],
            //     default: [],
            // } as any,
        },
        methods: {
            compareWith(o1: any, o2: any) {
                return o1.id === o2.id;
            },
            handleChange(ev: any) {
                this.selectedOption = ev.detail.value
                // console.log('Current value:', JSON.stringify(ev.detail.value));
            },
            dismiss() {
                modalController.dismiss();
            },
            checkIfSelected() {
                if ( _.has(this.selectedOption, 'name') == true) {
                    return true;
                } else {
                    toastWarning("Select a reason!");
                    return false;
                }
            }, 
            async voidVaccine1() {
                if (this.checkIfSelected() == true) {

                    try {
                        const store = useAdministerVaccineStore();
                        const AdministrdVaccine = store.getVaccineToBeVoided();
                        await voidVaccine(AdministrdVaccine.drug.order_id, this.selectedOption.name)
                        toastSuccess("Vaccine was successfully voided!");
                        store.setVaccineReload(!store.getVaccineReload());
                        modalController.dismiss({voided: true});
                    } catch (error) {
                        
                    }
                }
            }
        }
    })
</script>
<style scoped>
    .saveBtn {
        display: flex;
        justify-content: space-between;
        margin: 20px;
        align-items: center;
    }
    ion-row.centered-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-container {
        text-align: center;
        padding: 20px;
        border-radius: 10px; /* Rounded corners */
    }

    .text-container div {
        margin-bottom: 10px; /* Spacing between the two divs */
        font-family: 'Arial', sans-serif; /* Modern, clean font */
        color: #333; /* Dark text color for contrast */
    }

    .text-container div:last-child {
        margin-bottom: 0; /* Remove bottom margin from last div */
    }

</style>