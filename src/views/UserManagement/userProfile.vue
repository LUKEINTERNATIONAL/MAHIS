<template>
    <ion-page>
      <Toolbar />
      <ion-content :fullscreen="true">
        <div id="container">
            <ion-card style="margin-bottom: 20px; background-color: #fff">
                <div class="m-cointainer">
                    <ion-row>
                        <ion-col>
                            <div>
                                <ion-label class="n-lbl">John Doe</ion-label>
                                <hr class="m-line"/>  
                            </div> 
                        </ion-col>
                    </ion-row>
                </div>

                <div class="m-cointainer">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    <ion-label class="n-lbl-1">About You</ion-label>
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text">First Name</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your first name"
                                        v-model="name"
                                    >
                                </ion-input>
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text"> Last Name</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your last name"
                                        v-model="name"
                                    >
                                </ion-input>
                            </ion-col>
                        
                        </ion-row>
                    </ion-grid>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text">Date Of Birth</span>
                                </ion-label>
                                <BasicInputField
                                    :placeholder="DOBPlaceHolders"
                                    :inputValue="DOB"
                                    :icon="DOBIcon"
                                    @update:inputValue="DOB"
                                    @clicked:inputValue="openDate"
                                />

                                <ion-popover
                                    :show-backdrop="false"
                                    :keep-contents-mounted="true"
                                    :is-open="dateOpen"
                                    :event="dateOpenEvent"
                                    @didDismiss="dateOpen = false"
                                >
                                    <ion-datetime @ionChange="saveTheDate" id="datetime" presentation="date" :show-default-buttons="true"></ion-datetime>
                                </ion-popover>
                                <!-- <div>
                                    <ion-label v-if="show_error_msg_for_ref_date" class="error-label">{{ refDateErrMsg }}</ion-label>
                                </div> -->
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text">Gender</span>
                                </ion-label>
                                <BasicInputField
                                    :placeholder="genderPlaceHolders"
                                    :inputValue="gender"
                                    :icon="GenderIcon"
                                    @update:inputValue="gender"
                                    @clicked:inputValue="openGenderDropdown"
                                />

                                
                                <SelectionPopover
                                    :content="GenderOptionsData"
                                    :keyboardClose="keyboardClose"
                                    :title="genderPlaceHolders"
                                    :popoverOpen="genderPopoverOpen"
                                    :event="GenderEvent"
                                    @closePopoover="(value: boolean) => (genderPopoverOpen = value)"
                                    @setSelection="setSelection"
                                />
                            </ion-col>
                        </ion-row>
                        <hr class="m-line-ds"/>
                    </ion-grid>
                </div>

                <div class="m-cointainer">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    <ion-label class="n-lbl-1">Contact Details</ion-label>
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text">Phone</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your first name"
                                        v-model="name"
                                    >
                                </ion-input>
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text">Email</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your last name"
                                        v-model="name"
                                    >
                                </ion-input>
                            </ion-col>
                        
                        </ion-row>
                        <hr class="m-line-ds"/>
                    </ion-grid>
                </div>

                <div class="m-cointainer">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    <ion-label class="n-lbl-1">Access Control</ion-label>
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text">Old Password</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your first name"
                                        v-model="name"
                                    >
                                </ion-input>
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text">New Password</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your last name"
                                        v-model="name"
                                    >
                                </ion-input>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <div class="">
                                    
                                </div> 
                            </ion-col>
                            <ion-col>
                                <ion-label style="display: flex">
                                    <span  class="left-text">Old Password</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your first name"
                                        v-model="name"
                                    >
                                </ion-input>
                                
                            </ion-col>
                            <ion-col style="padding-right: 0px;">
                                <ion-label style="display: flex">
                                    <span  class="left-text">New Password</span>
                                </ion-label>
                                <ion-input
                                        fill="outline"
                                        type="text"
                                        class="m-input"
                                        placeholder="Enter your last name"
                                        v-model="name"
                                    >
                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <hr class="m-line-ds"/>
                    </ion-grid>
                </div>

                

                
                
            </ion-card>
        </div>  
      </ion-content>
    </ion-page>
  </template>
<script lang="ts">
import { defineComponent } from "vue";
import { text } from "ionicons/icons";
export default defineComponent({
    watch: {},
    name: "xxxComponent",
});
</script>
<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonCol,
    IonItem,
    IonList,
    IonButton,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonLabel,
    IonRow,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    AccordionGroupCustomEvent,
} from "@ionic/vue";
import Toolbar from '@/components/Toolbar.vue'
import ToolbarSearch from '@/components/ToolbarSearch.vue'
import BasicInputField from "@/components/BasicInputField.vue"
import { ref, watch, computed, onMounted, onUpdated } from "vue"
import { icons } from "@/utils/svg"


const iconsContent = icons
const name = ref()
const DOB = ref()
const DOBPlaceHolders = ref("Enter date of birth")
const DOBIcon = icons.calendar
const dateOpen = ref(false)
const dateOpenEvent = ref({} as Event)
const gender = ref()
const genderPlaceHolders = ref("Select gender")
const GenderIcon = icons.gender
const GenderOptionsData = ref([
    {>
        name: "Female",
        selected: false,
    },
    {
        name: "Male",
        selected: false,
    },
    {
        name: "Other",
        selected: false,
    }
])
const keyboardClose = ref(true)
const genderPopoverOpen = ref(false)
const GenderEvent =  ref({} as Event)

function openDate(event: any) {
    dateOpen.value = true
    dateOpenEvent.value = event
}

function saveTheDate(event: any) {
    DOB.value = event.detail.value
    DOB.value = formatDate(DOB.value)
}

function formatDate(date: any) {
    let theDate = new Date(date);
    let tempDate = new Date(theDate.getFullYear() + "-" + ("0" + (theDate.getMonth() + 1)).slice(-2) + "-" + ("0" + theDate.getDate()).slice(-2));
    let options: Intl.DateTimeFormatOptions = { day: "2-digit", weekday: "long", month: "short", year: "numeric" };
    let formattedDate = tempDate.toLocaleDateString("en-US", options);
    return formattedDate;
}

function openGenderDropdown() {

}

function setSelection() {

}
</script>

<style scoped>
#container {
  
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
.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-lbl {
    text-align: left;
    display: flex;
    align-items: left;
    padding-left: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 29.05px;
    color: #b4b0b0;
}
.n-lbl-1 {
    text-align: left;
    display: flex;
    align-items: left;
    font-size: 18px;
    font-weight: 600;
    line-height: 29.05px;
    color:#b4b0b0
}
.m-cointainer {
    width: 95%;
    margin-left: 2%;
}
.m-line {
    margin: 0;
    margin-top: 12px;
    border: 0;
    border-top: 3px solid #b4b0b0;
}
.m-line-ds {
    margin: 0;
    margin-top: 50px;
    border: 0;
    border-top: 3px dashed #b4b0b0;
}
.left-text {
    font-size: 15px;
    color: #b4b0b0;
}
.m-input {
    margin-top: 10px;
}
</style>