<template>
    <ion-row  v-for="(item,index) in contentData" :key="index" :class="contentData[index].classDash">
        <ion-col class="item_header_col" v-if="item['sectionHeader'] ">
            <span class="item_header"  :style="'font-weight:'+ item.sectionHeaderFontWeight">{{ item['sectionHeader'] }}</span>
        </ion-col>
        <ion-col>
            <!-- rowData -->
            <span v-if="item.data">
                <ion-row v-for="(element, index2) in item.data.rowData" :key="index2">
                    <ion-col v-for="(col, colIndex) in element.colData" :key="colIndex" v-show="!col.displayNone">
                        <BasicInputField 
                            :inputHeader="col.inputHeader"
                            :sectionHeaderFontWeight = "col.sectionHeaderFontWeight"
                            :unit="col.unit"
                            :icon ="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            @update:inputValue="value =>{col.value =value.target.value; handleInput(col)} "
                            @clicked:inputValue="value =>{event =value; handlePopover(col); $emit('clicked:inputValue',event)}"
                            :popOverData="col.popOverData"
                            @setPopoverValue ="value => {col.value = value.name; col.id = value[col.idName]; handleSelected(col)}"
                            
                        />
                        <div class="alerts_error" v-if="col.alertsError">
                            {{ col.alertsErrorMassage }}
                        </div>
                        <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="openPopover"
                            :event="event" @didDismiss="openPopover = false" v-if="col.isDatePopover">
                            <ion-datetime @ionChange=" event => { col.value = formatDate(event.detail.value); $emit('update:inputValue', col); }" id="datetime" presentation="date"
                                :show-default-buttons="true" ></ion-datetime>
                        </ion-popover>
                    </ion-col>
                    <ion-col size="btn.btn_col_size || 1.7" class="btn_col" v-for="(btn, btnIndex) in element.btns" :key="btnIndex" >
                        <DynamicButton
                            :name="btn.name"
                            :fill="btn.fill"
                            :icon="btn.icon"
                            @click="$emit('clicked:button',btn.name)"
                        />
                    </ion-col>
                </ion-row>
            </span>
            <span v-if="item.radioBtnContent">
                <div style="" v-if="item.radioBtnContent?.header">{{ item.radioBtnContent?.header.title }} </div>
                <ion-row class="checkbox_content">
                    <ion-col :size="al.colSize" class="checkout_col" style="" v-for="(al, index3) in item.radioBtnContent?.data" :key="index3">
                        <span v-if="al.header" class="first_col">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-radio-group  
                        v-else 
                        style="width: 100%;"
                        :value="item.radioBtnContent.header.selectedValue "
                        @ionChange="value => {item.radioBtnContent.header.selectedValue = value.target.value; handleInput(item.radioBtnContent.header)}" > 
                            <span style="display: flex;width: 100%;" >
                                <ion-radio :value="al.value" :justify="al.justify || 'start'"  :label-placement="al.labelPlacement || 'end'" >{{ al.name }}</ion-radio>
                            </span>         
                        </ion-radio-group>
                    </ion-col>
                    <ion-col  v-for="(radioInput, radioInputIndex) in item.radioBtnContent.inputFields" :key="radioInputIndex">
                        <BasicInputField
                            :inputHeader="radioInput.inputHeader"
                            :unit="radioInput.unit"
                            :icon ="radioInput.icon"
                            :placeholder="radioInput.placeholder"
                            :iconRight="radioInput.iconRight"
                            :inputWidth="radioInput.inputWidth"
                            :inputValue="radioInput.value"
                            :eventType="radioInput.eventType"
                            @update:inputValue="value =>{radioInput.value =value.target.value; handleInput(radioInput)} "
                            @clicked:inputValue="value =>{event =value; handlePopover(radioInput); $emit('clicked:inputValue',event)}"
                        />
                        <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="openPopover"
                            :event="event" @didDismiss="openPopover = false" >
                            <ion-datetime @ionChange="event => radioInput.value = formatDate(event.detail.value)" id="datetime"
                                presentation="date" :show-default-buttons="true"></ion-datetime>
                        </ion-popover>
                        <div class="alerts_error" v-if="radioInput.alertsError">
                            {{ radioInput.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <div class="alerts_error" v-if="item.radioBtnContent?.header.alertsError">
                            {{ item.radioBtnContent?.header.alertsErrorMassage }}
                        </div>
                </ion-row>
            </span>
            <span v-if="item.checkboxBtnContent">
                <div style="" v-if="item.checkboxBtnContent?.header">{{ item.checkboxBtnContent?.header.title }} </div>
                <ion-row class="checkbox_content">
                    <ion-col :size="al.colSize" class="checkout_col" style="" v-for="(al, index3) in item.checkboxBtnContent?.data" :key="index3">
                        <span v-if="al.header" class="first_col">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-checkbox v-else :justify="al.justify || 'start'" :checked="al.checked" style="width: 100%;"
                        @ionChange="value =>{al.checked =value.detail.checked; $emit('update:inputValue',{al, value })}" :label-placement="al.labelPlacement || 'end'" > 
                            <span style="line-height: 1;">
                                <p class="checkbox_header">{{ al.name }}</p>
                                <p v-if="al.example " class="small_font">{{ al.example }}</p>
                            </span>
                        </ion-checkbox>
                        <div class="alerts_error" v-if="al.alertsError">
                            {{ al.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <ion-col v-show="!item.checkboxBtnContent.inputFields[0].displayNone" v-for="(checkboxInput, checkboxInputIndex) in item.checkboxBtnContent.inputFields" :key="checkboxInputIndex">
                        <BasicInputField
                            :inputHeader="checkboxInput.inputHeader"
                            :unit="checkboxInput.unit"
                            :icon ="checkboxInput.icon"
                            :placeholder="checkboxInput.placeholder"
                            :iconRight="checkboxInput.iconRight"
                            :inputWidth="checkboxInput.inputWidth"
                            :inputValue="checkboxInput.value"
                            :eventType="checkboxInput?.eventType || 'input'"
                            @update:inputValue="value =>{checkboxInput.value =value.target.value; handleInput(checkboxInput)} "
                            @clicked:inputValue="value =>{event =value; handlePopover(checkboxInput); $emit('clicked:inputValue',event)}"
                        />
                        <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="openPopover"
                            :event="event" @didDismiss="openPopover = false" >
                            <ion-datetime @ionChange="event => checkboxInput.value = formatDate(event.detail.value)" id="datetime"
                                presentation="date" :show-default-buttons="true"></ion-datetime>
                        </ion-popover>
                        <div class="alerts_error" v-if="checkboxInput.alertsError">
                            {{ checkboxInput.alertsErrorMassage }}
                        </div>
                    </ion-col>
                </ion-row>
            </span>
            <span v-for="(al, index3) in item.alerts" :key="index3"  >
                <ion-row v-if="al.value"  :style="'border-radius: 5px;  margin-top:10px; margin-bottom:10px;background-color:'+ al.backgroundColor">
                    <span class="position_content alert_content">
                        <span v-html="al.icon"> </span> 
                        <span :style="'color:'+al.textColor+'; font-weight:600; margin: 0px 20px;'"> {{ al.index }}</span> 
                        <span :style="'color:'+al.textColor+';'"> {{ al.value }} </span>
                    </span>
                </ion-row>
            </span>
            <ion-row v-if="item.previousView">
                <ion-accordion-group ref="accordionGroup" class="previousView">
                    <ion-accordion value="first" toggle-icon-slot="start" style="border-radius: 10px; background-color: #fff;">
                        <ion-item slot="header" color="light">
                            <ion-label class="previousLabel">Previous measurements</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            <PreviousVitals v-if="item.previousView.name == 'vitals'" />
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-row>
        </ion-col>
        <span></span>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from './DynamicButton.vue';
import { IonDatetime, IonDatetimeButton, IonCheckbox } from '@ionic/vue';
import HisDate from "@/utils/Date";
import { createModal } from '@/utils/Alerts'
import PreviousVitals from '@/apps/NCD/components/ConsultationPlan/previousVitals.vue'

export default defineComponent({
    components:{
        BasicInputField,
        DynamicButton,
        IonDatetime,
        IonDatetimeButton,
        PreviousVitals,
        IonCheckbox
    },
    data() {
        return {
            event: '' as any,
            openPopover: false,
            header: '' as any
        };
    },
    props: {
        contentData: {
            default: [] as any
        }
    },
    methods: {
        handleInput(col: any) {
            this.$emit("update:inputValue", col);
        },
        handleSelected(col: any) {
            this.$emit("update:selected", col);
        },
        handlePopover(col: any){
            if(col.isDatePopover){
                this.openPopover = true
                this.header=col.inputHeader;
            }else{
                this.openPopover = false
            }
        },
        formatDate(date: any){
           return HisDate.toStandardHisDisplayFormat(date)
        }
    },
})

</script>

<style scoped>
._padding{
  padding-bottom: 18px;
  padding-top: 18px;
}
.alert_content{
    padding: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_header{
    --border-width: 0 0 0 0;
    font-weight: 700;
    color:#00190E;
}

.item_header_col{
    max-width: 300px;
    margin-top: 23px;
}
.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    max-width: 70px;
    margin-top: 48px
}
.btn_col{
    display: flex;
    align-items: end;
    justify-content: right;
}
.radio_content{
    padding-top: 10px;
}
.radio_title{
    margin-top: 50px;
}
ion-radio {
   margin-right: 23px;
   margin-top: 20px;
   width: 100%;
}
.checkout_col{
    display: flex;
    align-items: center;
}
.alerts_error{
    background: #f5dad8;
    margin-top: 2px;
    color: #B42318;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    overflow:scroll;
    padding: 5px;
    border-radius: 3px;
}
.previousView{
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}
.previousLabel{
    font-weight: 600;
    color: #000;
}
.first_col
{
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  color: #636363;
}
.alerts_error{
    background: #f5dad8;
    margin-top: 2px;
    color: #B42318;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    overflow:scroll;
    padding: 5px;
    border-radius: 3px;
}
.previousView{
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
}
.previousLabel{
    font-weight: 600;
    color: #000;
}
</style>