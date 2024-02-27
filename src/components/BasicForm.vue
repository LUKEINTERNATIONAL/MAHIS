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
                            v-if="!col.isDatePopover"
                            :inputHeader="col.inputHeader"
                            :sectionHeaderFontWeight = "col.sectionHeaderFontWeight"
                            :unit="col.unit"
                            :icon ="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            :disabled="col.disabled"
                            @update:inputValue="handleInput(contentData, col, $event,'updateInput')"
                            @clicked:inputValue="handleInput(contentData, col, $event,'clickedInput')"
                            :popOverData="col.popOverData"
                            @setPopoverValue ="handleInput(contentData, col, $event,'setPopoverValue')"
                        />
                        <DateInputField 
                            v-if="col.isDatePopover"
                            :inputHeader="col.inputHeader"
                            :sectionHeaderFontWeight = "col.sectionHeaderFontWeight"
                            :unit="col.unit"
                            :icon ="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            :disabled="col.disabled"
                            @update:dateValue="handleInput(contentData, col, $event,'updateDate')"
                           
                        />

                        <div class="alerts_error" v-if="col.alertsError">
                            {{ col.alertsErrorMassage }}
                        </div>
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
            <span v-if="item.radioBtnContent && !item.radioBtnContent.header.displayNone">
                <div style="font-weight: bold;" v-if="item.radioBtnContent?.header">{{ item.radioBtnContent?.header.title }} </div>
                <ion-row class="checkbox_content">
                    <ion-col :size="al.colSize" class="checkout_col" style="" v-for="(al, index3) in item.radioBtnContent?.data" :key="index3">
                        <span v-if="al.header" class="first_col">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-radio-group  
                        v-else 
                        style="width: 100%;"
                        :value="item.radioBtnContent.header.selectedValue "
                        @ionChange="handleInput(contentData, item.radioBtnContent.header, $event,'updateRadioBtnContent')" > 
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
                            @update:inputValue="handleInput(contentData, radioInput, $event,'updateInput') "
                            @clicked:inputValue="handleInput(contentData, radioInput, $event,'clickedInput')"
                        
                        />
                        
                        <div class="alerts_error" v-if="radioInput.alertsError">
                            {{ radioInput.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <div class="alerts_error" v-if="item.radioBtnContent?.header.alertsError">
                            {{ item.radioBtnContent?.header.alertsErrorMassage }}
                        </div>
                </ion-row>
            </span>
            <span v-if="item?.checkboxBtnContent && !item?.checkboxBtnContent?.header?.displayNone">
                <div style="" v-if="item.checkboxBtnContent?.header">{{ item.checkboxBtnContent?.header.title }} </div>
                <ion-row class="checkbox_content">
                    <ion-col :size="al.colSize" class="checkout_col" style="" 
                        v-for="(al, index3) in item.checkboxBtnContent?.data" :key="index3"
                        v-show="!al.displayNone">
                        <span v-if="al.header" class="first_col">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-checkbox v-else :justify="al.justify || 'start'" :checked="al.checked" style="width: 100%;"
                            :disabled="al.disabled"
                            @ionChange="value =>{al.checked =value.detail.checked; $emit('update:inputValue',{al, value })}"
                            :label-placement="al.labelPlacement || 'end'" > 
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
                        
                        <DateInputField 
                            :inputHeader="checkboxInput.inputHeader"
                            :sectionHeaderFontWeight = "checkboxInput.sectionHeaderFontWeight"
                            :unit="checkboxInput.unit"
                            :icon ="checkboxInput.icon"
                            :placeholder="checkboxInput.placeholder"
                            :iconRight="checkboxInput.iconRight"
                            :inputWidth="checkboxInput.inputWidth"
                            :inputValue="checkboxInput.value"
                            :eventType="checkboxInput.eventType"
                            @update:dateValue="handleInput(contentData, checkboxInput, $event,'updateDate') "
                           
                        />
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
        </ion-col>
        <span></span>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicInputField from "@/components/BasicInputField.vue"
import DateInputField from "@/components/DateInputField.vue"
import DynamicButton from './DynamicButton.vue';
import { IonDatetime, IonDatetimeButton, IonCheckbox } from '@ionic/vue';
import HisDate from "@/utils/Date";
import { createModal } from '@/utils/Alerts'

import { modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyRadioValue,
    modifyFieldValue } from '@/services/data_helpers'

export default defineComponent({
    components:{
        BasicInputField,
        DynamicButton,
        IonDatetime,
        IonDatetimeButton,
        IonCheckbox,
        DateInputField
    },
    data() {
        return {
            event: '' as any,
            openPopover: false,
            header: '' as any,
            flow: ['month', 'year', 'calendar'],
            date: ''
        };
    },
    props: {
        contentData: {
            default: [] as any
        }
    },
    methods: {
        handleInput(data: any,col: any, event: any, inputType: any) {
            this.event = event
            if(inputType == 'updateInput'){
                modifyFieldValue(data,col.name,'value',event.target.value) ; 
                this.$emit("update:inputValue", col);
            }

            if(inputType == 'updateDate'){
                modifyFieldValue(data,col.name,'value',event) ; 
                this.$emit("update:inputValue", col);
            }

            if(inputType == 'clickedInput'){
                this.handlePopover(col)
                this.$emit("clicked:inputValue", event)
            }

            if(inputType == 'setPopoverValue'){
                this.handleSelected(col)
                modifyFieldValue(data,col.name,'value',event.name) 
                modifyFieldValue(data,col.value,'value',event.value) 
                modifyFieldValue(data,col.name,'id',event[col.idName]) 
            }

            if(inputType == 'updateRadioBtnContent'){
                this.$emit("update:inputValue", col);
                modifyRadioValue(data,col.name,'selectedValue',event.target.value)
            }

            if(inputType == 'checkboxInput'){
                this.$emit("update:inputValue", col);
                modifyCheckboxInputField(data,col.name,'value',event.target.value)
            }
               
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
        },
        test(e: any){
            console.log(e)
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
.checkout_col ion-checkbox{
  margin-right: 150px;
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

</style>