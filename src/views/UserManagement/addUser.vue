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
            <sselectionList
                :labels="isSSelection_properties[0].labels"
                @selection-event="isSSelection_properties[0].dataHandler"
            />

            <div>
                <ion-label v-if="isSSelection_properties[0].show_error.value" class="error-label">
                    {{ isSSelection_properties[0].error_message }}
                </ion-label>
            </div>
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
const passwordErrorMsgs = [
    'Input must be at least 4 characters long, containing only letters, numbers, and symbols',
    'Password does not match'
]

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
    const _areFieldsValid_ = areFieldsValid(input_properties)
    const _isSSelectionValid_ = isSSelectionValid()
    const _ValidatePassword_ = ValidatePassword()

    console.log(_areFieldsValid_)
    console.log(_isSSelectionValid_)
    console.log(_ValidatePassword_)

    if (_areFieldsValid_ == true && _ValidatePassword_ == true && _isSSelectionValid_ == true) {
        const payload = getFieldsValuesObj(input_properties)
    
        console.log(payload)
    }
}

function isSSelectionValid() {
    let is_valid = false
    if (isSSelection_properties[0].dataValue.value == undefined) {
        isSSelection_properties[0].show_error.value = true
    }
    if (isSSelection_properties[0].dataValue.value != undefined) {
        isSSelection_properties[0].show_error.value = false
        is_valid = true
    }
    return is_valid
}

function ValidatePassword(): boolean {
    let is_valid = false
    let error_foundP_p1 = false
    let error_foundP_p2 = false
    let is_password1_valid
    let is_password2_valid

    password_input_properties[0].error_message = passwordErrorMsgs[0]
    password_input_properties[1].error_message = passwordErrorMsgs[0]

    if (password_input_properties[0].dataValue.value == undefined || password_input_properties[0].dataValue.value == "") {
        password_input_properties[0].show_error.value = true
        error_foundP_p1 = true
    }

    if (password_input_properties[1].dataValue.value == undefined || password_input_properties[1].dataValue.value == "") {
        password_input_properties[1].show_error.value = true
        error_foundP_p2 = true
    }


    if (error_foundP_p1 == false) {
        is_password1_valid = isPasswordValid(password_input_properties[0].dataValue.value)

        if (is_password1_valid == false) {
            password_input_properties[0].show_error.value = true
            error_foundP_p1 = true
        }

        if (is_password1_valid == true) {
            password_input_properties[0].show_error.value = false
        }
    }

    if (error_foundP_p2 == false) {
        is_password2_valid = isPasswordValid(password_input_properties[1].dataValue.value)

        if (is_password2_valid == false) {
            password_input_properties[1].show_error.value = true
            error_foundP_p2 = true
        }

        if (is_password2_valid == true) {
            password_input_properties[1].show_error.value = false
        }
    }

    if (error_foundP_p1 == false && error_foundP_p2 == false) {
        if (is_password1_valid == true && is_password2_valid == true) {
            if (password_input_properties[0].dataValue.value === password_input_properties[1].dataValue.value) {
                password_input_properties[0].show_error.value = false
                password_input_properties[1].show_error.value = false
                is_valid = true
            }

            if (password_input_properties[0].dataValue.value != password_input_properties[1].dataValue.value) {
                password_input_properties[0].error_message = passwordErrorMsgs[1]
                password_input_properties[1].error_message = passwordErrorMsgs[1]
                password_input_properties[0].show_error.value = true
                password_input_properties[1].show_error.value = true
                is_valid = false
            }

        }
    }
    return is_valid
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
        dataHandler: passwordInputUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: passwordErrorMsgs[0],
    },
    {
        placeHolder: 'confirm password',
        dataHandler: passwordInputUpDated_fn2,
        dataValue: ref(),
        show_error: ref(false),
        error_message: passwordErrorMsgs[0],
    },
]

const isSSelection_properties = [
    {
        labels: ['Male','Female',],
        dataHandler: sselectionListUpdated,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Please make a selection',

    }
]

function sselectionListUpdated(data: any) {
    isSSelection_properties[0].dataValue.value = data.label 
}

function inputUpDated_fn1(event: any) {
    const input = event.target.value
    input_properties[0].dataValue.value = input
}
function inputUpDated_fn2(event: any) {
    const input = event.target.value
    input_properties[1].dataValue.value = input
}
function inputUpDated_fn3(event: any) {
    const input = event.target.value
    input_properties[2].dataValue.value = input
}
function passwordInputUpDated_fn1(event: any) {
    const input = event.target.value
    password_input_properties[0].dataValue.value = input
}
function passwordInputUpDated_fn2(event: any) {
    const input = event.target.value
    password_input_properties[1].dataValue.value = input
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