<template>
    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[1].placeHolder"
                :icon="personOutline"
                :inputValue="first_name"
                @update:inputValue="note_properties[1].dataHandler"
            />
        </ion-col>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[4].placeHolder"
                :icon="peopleOutline"
                :inputValue="last_name"
                @update:inputValue="note_properties[4].dataHandler"
            />
        </ion-col>
    </ion-row>

    <ion-row>
            <ion-col>
                <BasicInputField
                    :placeholder="note_properties[0].placeHolder"
                    :icon="personCircleOutline"
                    :inputValue="user_name"
                    @update:inputValue="note_properties[0].dataHandler"
                />
            </ion-col>
            <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <sselectionList/>
        </ion-col>
        <ion-col></ion-col>
    </ion-row>

    <ion-row>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[2].placeHolder"
                :icon="keyOutline"
                :inputValue="note_properties[2].dataValue.value"
                @update:inputValue="note_properties[2].dataHandler"
            />
        </ion-col>
        <ion-col>
            <BasicInputField
                :placeholder="note_properties[3].placeHolder"
                :icon="keyOutline"
                :inputValue="note_properties[3].dataValue.value"
                @update:inputValue="note_properties[3].dataHandler"
            />
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

const note_properties = [
    {
        placeHolder: 'username',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
    },
    {
        placeHolder: 'firstname',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
    },
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
    {
        placeHolder: 'last name',
        dataHandler: ()=>{},
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'Input required, Only letters are allowed',
    },
]
</script>
<style scoped>
</style>