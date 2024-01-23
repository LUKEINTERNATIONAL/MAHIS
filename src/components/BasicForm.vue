<template>
    <ion-row  v-for="(item,index) in contentData" :key="index" :class="contentData[0].classDash">
        <ion-col class="item_header_col" v-if="item['sectionHeader'] ">
            <span class="item_header">{{ item['sectionHeader'] }}</span>
        </ion-col>
        <ion-col>
            <!-- rowData -->
            <span v-if="item.data">
                <ion-row v-for="(element, index2) in item.data.rowData" :key="index2">
                    <ion-col v-for="(col, colIndex) in element.colData" :key="colIndex" v-show="!col.displayNone">
                        <BasicInputField 
                            
                            :inputHeader="col.inputHeader"
                            :unit="col.unit"
                            :icon ="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            @update:inputValue="value =>{col.value =value.target.value; handleInput(col)} "
                            @clicked:inputValue="value =>{event =value; handlePopover(col.isDatePopover,col.inputHeader); $emit('clicked:inputValue',event)}"
                            :popOverData="col.popOverData"
                            @setPopoverValue ="value => {col.value = value.name; col.id = value[col.idName]; handleSelected(col)}"
                            
                        />
                        <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="openPopover"
                            :event="event" @didDismiss="openPopover = false" v-if="col.isDatePopover">
                            <ion-datetime @ionChange="event => col.value = formatDate(event.detail.value)" id="datetime" presentation="date"
                                :show-default-buttons="true" ></ion-datetime>
                        </ion-popover>
                    </ion-col>
                    <ion-col size="1.7" class="btn_col" v-for="(btn, btnIndex) in element.btns" :key="btnIndex" >
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
                <br />
                <ion-label >
                    <span class="radio_title"> {{ item.radioBtnContent?.header.title }}</span>
                </ion-label>
                <ion-row >
                    <ion-col>
                        <ion-radio-group :value="item.radioBtnContent.header.selectedValue " class="radio_content" @ionChange="value => item.radioBtnContent.header.selectedValue = value.target.value" >
                            <span v-for="(al, index3) in item.radioBtnContent?.data" :key="index3">
                                <ion-radio :value="al.value" aria-label="Custom checkbox" label-placement="end">{{ al.name }}</ion-radio>
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
                            :inputValue="radioInput.value"
                            :eventType="radioInput.eventType"
                            @update:inputValue="value =>{radioInput.value =value.target.value; handleInput(radioInput)} "
                            @clicked:inputValue="$emit('clicked:inputValue',$event)"
                        />
                    </ion-col>
                </ion-row>
            </span>
            <span v-if="item.checkboxBtnContent">
                <div style="margin-top: 20px;" v-if="item.checkboxBtnContent?.header">{{ item.checkboxBtnContent?.header.title }} </div>
                <ion-row class="checkbox_content">
                    <ion-col size="4" class="checkout_col" style="" v-for="(al, index3) in item.checkboxBtnContent?.data" :key="index3">
                        <ion-checkbox :checked="al.checked" @ionChange="value =>al.checked =value.detail.checked" label-placement="end" > 
                            <span style="line-height: 1;">
                                <p class="checkbox_header">{{ al.name }}</p>
                                <p v-if="al.example " class="small_font">{{ al.example }}</p>
                            </span>
                        </ion-checkbox>
                    </ion-col>
                    <ion-col  v-for="(radioInput, radioInputIndex) in item.checkboxBtnContent.inputFields" :key="radioInputIndex">
                        <BasicInputField
                            :inputHeader="radioInput.inputHeader"
                            :unit="radioInput.unit"
                            :icon ="radioInput.icon"
                            :placeholder="radioInput.placeholder"
                            :iconRight="radioInput.iconRight"
                            :inputValue="radioInput.value"
                            :eventType="radioInput.eventType"
                            @update:inputValue="value =>{radioInput.value =value.target.value; handleInput(radioInput)} "
                            @clicked:inputValue="value =>{event =value; radioInput.showDatePopover =true; handlePopover(radioInput.isDatePopover,radioInput.inputHeader); $emit('clicked:inputValue',event)}"
                        />
                        <ion-popover :show-backdrop="false" :keep-contents-mounted="true" :is-open="radioInput.showDatePopover"
                            :event="event" @didDismiss="radioInput.showDatePopover = false" >
                            <ion-datetime @ionChange="event => radioInput.value = formatDate(event.detail.value)" id="datetime"
                                presentation="date" :show-default-buttons="true"></ion-datetime>
                        </ion-popover>
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
import DynamicButton from './DynamicButton.vue';
import { IonDatetime, IonDatetimeButton } from '@ionic/vue';
import HisDate from "@/utils/Date";

export default defineComponent({
    components:{
        BasicInputField,
        DynamicButton,
        IonDatetime,
        IonDatetimeButton
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
        handlePopover(isDatePopover: any,header: any){
            if(isDatePopover){
                this.openPopover = true
                this.header=header;

            }
        },
        formatDate(date: any){
           return HisDate.toStandardHisDisplayFormat(date)
        }
    },
})

</script>

<style scoped>
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
}
.checkout_col{
    display: flex;
    align-items: center;
}
.dashed_bottom_border {
  padding-bottom: 18px;
}
</style>