<template>
    <ion-row  v-for="(item,index) in contentData" :key="index" class="dashed_bottom_border">
        <ion-col class="item_header_col" v-if="item['sectionHeader'] ">
            <span class="item_header">{{ item['sectionHeader'] }}</span>
        </ion-col>
        <ion-col>
            <!-- rowData -->
            <ion-row v-for="(element, index2) in item.data.rowData" :key="index2">
                <ion-col v-for="(col, colIndex) in element.colData" :key="colIndex" >
                    <BasicInputField 
                        :inputHeader="col.inputHeader"
                        :unit="col.unit"
                        :icon ="col.icon"
                        :inputValue="col.value"
                        :eventType="col.eventType"
                        @update:inputValue="value =>{col.value =value.target.value; handleInput(col)} "
                        @clicked:inputValue="$emit('clicked:inputValue',$event)"
                    />
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
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasicInputField from "@/components/BasicInputField.vue"
import DynamicButton from './DynamicButton.vue';

export default defineComponent({
    components:{
        BasicInputField,
        DynamicButton
    },
    props: {
        contentData: {
            type: Array,
            default: []
        }
    },
    methods: {
        handleInput(col: any) {
            this.$emit("update:inputValue", col);
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

</style>