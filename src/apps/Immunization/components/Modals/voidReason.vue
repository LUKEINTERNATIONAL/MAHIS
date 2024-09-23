<template>
    <ion-row class="centered-content">
        <div class="text-container">
            <div>
                Do you want to void this?
            </div>
            <div>
                Please specify reason for voiding?
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
        <ion-row class="ion-justify-content-between">
            <ion-col size="auto">
                <ion-button @click="cancel" id="cbtn" class="btnText cbtn" fill="solid" style="width: 130px">
                    Cancel
                </ion-button>
            </ion-col>
            <ion-col size="auto">
                <ion-button @click="voidRe" class="btnText" fill="solid" style="width: 130px">
                    Void
                </ion-button>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { IonCol, IonRow, IonItem, IonList, IonRadio, IonRadioGroup, modalController, IonButton } from "@ionic/vue";
    import { toastWarning, popoverConfirmation, toastSuccess } from "@/utils/Alerts";
    import _ from 'lodash';
    export default defineComponent({
        components: {
            IonRow,
            IonItem,
            IonList,
            IonRadio,
            IonRadioGroup,
            IonButton,
            IonCol,
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
            cancel() {
                try {
                    modalController.dismiss();   
                } catch (error) {
                    
                }
            },
            dismiss() {
                try {
                    modalController.dismiss(this.selectedOption);
                } catch (error) {
                    
                }
            },
            checkIfSelected() {
                if ( _.has(this.selectedOption, 'name') == true) {
                    return true;
                } else {
                    toastWarning("Select a reason!");
                    return false;
                }
            }, 
            voidRe() {
                if (this.checkIfSelected() == true) {
                    this.$emit('void-item', this.selectedOption);
                    this.dismiss();
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