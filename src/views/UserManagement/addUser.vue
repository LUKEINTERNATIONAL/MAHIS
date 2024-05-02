<template>
    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="input_properties[1].placeHolder"
                :icon="personOutline"
                :inputValue="first_name"
                @update:inputValue="input_properties[1].dataHandler"
            />

            <div>
                <ion-label v-if="input_properties[1].show_error.value" class="error-label">
                    {{ input_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <BasicInputField
                :placeholder="input_properties[2].placeHolder"
                :icon="peopleOutline"
                :inputValue="last_name"
                @update:inputValue="input_properties[2].dataHandler"
            />

            <div>
                <ion-label v-if="input_properties[2].show_error.value" class="error-label">
                    {{ input_properties[2].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>

    <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="input_properties[0].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="user_name"
                    @update:inputValue="input_properties[0].dataHandler"
                />

                <div>
                    <ion-label v-if="input_properties[0].show_error.value" class="error-label">
                        {{ input_properties[0].error_message }}
                    </ion-label>
                </div>
            </ion-col>
            <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <sselectionList :labels="labels" @selection-event="sselectionListUpdated"/>

            <!-- <div>
                <ion-label v-if="note_properties[4].show_error.value" class="error-label">
                    {{ note_properties[4].error_message }}
                </ion-label>
            </div> -->
        </ion-col>
        <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="password_input_properties[0].placeHolder"
                :icon="keyOutline"
                :inputValue="password_input_properties[0].dataValue.value"
                @update:inputValue="password_input_properties[0].dataHandler"
            />

            <div>
                <ion-label v-if="password_input_properties[0].show_error.value" class="error-label">
                    {{ password_input_properties[0].error_message }}
                </ion-label>
            </div>
        </ion-col>
        <ion-col>
            <BasicInputField
                :placeholder="password_input_properties[1].placeHolder"
                :icon="keyOutline"
                :inputValue="password_input_properties[1].dataValue.value"
                @update:inputValue="password_input_properties[1].dataHandler"
            />

            <div>
                <ion-label v-if="password_input_properties[1].show_error.value" class="error-label">
                    {{ password_input_properties[1].error_message }}
                </ion-label>
            </div>
        </ion-col>
    </ion-row>


    <ion-accordion-group ref="accordionGroup" class="previousView">
            <ion-accordion value="fourth" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff">

            </ion-accordion>
        </ion-accordion-group>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    watch: {},
    name: "xxxComponent",
})
</script>
<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonCol, IonToolbar, IonMenu, IonAccordionGroup, IonAccordion, AccordionGroupCustomEvent } from "@ionic/vue"
import BasicInputField from "@/components/BasicInputField.vue"
import sselectionList from "@/components/SselectionList.vue"
import { areFieldsValid, getFieldsValuesObj, isPasswordValid } from "@/utils/GeneralUti"
import _ from "lodash"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import {
    addOutline,
    pencilOutline,
    removeOutline,
    personCircleOutline,
    keyOutline,
    transgenderOutline,
    personOutline,
    peopleOutline
} from "ionicons/icons"

const user_name = ref()
const first_name = ref()
const last_name = ref()
const labels = [
    'Male',
    'Female',
]
const sselectionListSelectedValue = ref()

const props = defineProps<{
    action: any
}>()

watch(
    () => props.action,
    async (newValue) => {
        trigerSaveFn()
    }
)

function trigerSaveFn() {
    console.log(sselectionListSelectedValue.value)
    areFieldsValid(input_properties)
    const payload = getFieldsValuesObj(input_properties)
    console.log(payload)
}

function ValidatePassword() {

}

const input_properties = [
    {
        placeHolder: 'username',
        property_name: 'username',
        dataHandler: inputUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
    {
        placeHolder: 'firstname',
        property_name: 'firstname',
        dataHandler: inputUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
    {
        placeHolder: 'last name',
        property_name: 'last_name',
        dataHandler: inputUpDated_fn3,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
        type: 'text',
    },
]

const password_input_properties = [
    {
        placeHolder: 'new password',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
    },
    {
        placeHolder: 'confirm password',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
    },
]

function sselectionListUpdated(data: any) {
    sselectionListSelectedValue.value = data.label 
}

function inputUpDated_fn1(event: any) {
    const reason = event.target.value
    input_properties[0].dataValue.value = reason
}
function inputUpDated_fn2(event: any) {
    const reason = event.target.value
    input_properties[1].dataValue.value = reason
}
function inputUpDated_fn3(event: any) {
    const reason = event.target.value
    input_properties[2].dataValue.value = reason
}


</script>
<style scoped>
   .error-label {
        background: #fecdca;
        color: #b42318;
        text-transform: none;
        padding: 6%;
        border-radius: 10px;
        margin-top: 7px;
        display: flex;
        text-align: center;
    }
</style>