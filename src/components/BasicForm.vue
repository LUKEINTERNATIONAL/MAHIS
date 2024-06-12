<template>
    <ion-row
        v-for="(item, index) in contentData"
        :key="index"
        :class="contentData[index].classDash"
        style="width: 100%"
        v-show="
            !contentData[index]?.radioBtnContent?.header?.displayNone &&
            !contentData[index]?.checkboxBtnContent?.header?.displayNone &&
            !contentData[index]?.data?.rowData[0]?.colData[0]?.displayNone
        "
    >
        <ion-col
            class="item_header_col"
            v-if="item['sectionHeader'] || item['sideColSize'] || item['sectionHeader'] == 'null'"
            :size="item['sideColSize']"
        >
            <span class="item_header" :style="'font-weight:' + item.sectionHeaderFontWeight" v-if="item['sectionHeader'] != 'null'"
                >{{ item["sectionHeader"] }}
            </span>
        </ion-col>
        <ion-col v-if="!item.displayNone">
            <!-- rowData -->
            <span v-if="item.data">
                <ion-row v-for="(element, index2) in item.data.rowData" :key="index2">
                    <ion-col v-for="(col, colIndex) in element.colData" :key="colIndex" v-show="!col.displayNone" :size="col.colSize">
                        <BasicInputField
                            v-if="!col.isDatePopover && !col.isMultiSelect && !col.isSingleSelect && !col.isChangeUnits"
                            :inputHeader="col.inputHeader"
                            :sectionHeaderFontWeight="col.sectionHeaderFontWeight"
                            :bold="col.class"
                            :unit="col.unit"
                            :input="col.input"
                            :disabled="col.disabled"
                            :icon="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :leftText="col.leftText"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            @update:inputValue="handleInput(contentData, col, $event, 'updateInput')"
                            @clicked:inputValue="handleInput(contentData, col, $event, 'clickedInput')"
                            :popOverData="col.popOverData"
                            @setPopoverValue="handleInput(contentData, col, $event, 'setPopoverValue')"
                            @handleInnerActionBtnPropetiesFn="$emit('click:innerBtn', col)"
                            :InnerActionBtnPropeties="col.InnerBtn"
                        />
                        <BasicInputChangeUnits
                            v-if="col.isChangeUnits"
                            :inputHeader="col.inputHeader"
                            :unitsData="col.unitsData"
                            :sectionHeaderFontWeight="col.sectionHeaderFontWeight"
                            :bold="col.class"
                            :unit="col.unit"
                            :input="col.input"
                            :disabled="col.disabled"
                            :icon="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :leftText="col.leftText"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            @update:inputValue="handleInput(contentData, col, $event, 'updateInput')"
                            @clicked:inputValue="handleInput(contentData, col, $event, 'clickedInput')"
                            @update:units="handleInput(contentData, col, $event, 'updateUnits')"
                            :popOverData="col.popOverData"
                            @setPopoverValue="handleInput(contentData, col, $event, 'setPopoverValue')"
                            @handleInnerActionBtnPropetiesFn="$emit('click:innerBtn', col)"
                            :InnerActionBtnPropeties="col.InnerBtn"
                        />
                        <div v-if="col.isMultiSelect">
                            <h6 v-if="col.inputHeader">
                                {{ col.inputHeader.replace(/\*/g, "") }} <span style="color: red" v-if="col.inputHeader.includes('*')"> *</span>
                            </h6>
                            <VueMultiselect
                                v-if="col.isMultiSelect"
                                v-model="col.value"
                                @update:model-value="handleInput(contentData, col, $event, 'updateMultiselect')"
                                :multiple="true"
                                :taggable="true"
                                :hide-selected="true"
                                :close-on-select="false"
                                :openDirection="col.openDirection || 'bottom'"
                                tag-placeholder=""
                                placeholder=""
                                selectLabel=""
                                label="name"
                                :searchable="true"
                                @search-change="$emit('search-change', $event)"
                                :track-by="col.trackBy || 'concept_id'"
                                :options="col.multiSelectData"
                            />
                        </div>
                        <div v-if="col.isSingleSelect">
                            <h6 v-if="col.inputHeader">
                                {{ col.inputHeader.replace(/\*/g, "") }} <span style="color: red" v-if="col.inputHeader.includes('*')"> *</span>
                            </h6>
                            <VueMultiselect
                                v-if="!col.inputFieldDisplayNone"
                                v-model="col.value"
                                :max-height="150"
                                @update:model-value="handleInput(contentData, col, $event, 'updateMultiselect')"
                                :multiple="false"
                                :hide-selected="false"
                                :close-on-select="true"
                                :openDirection="col.openDirection || 'bottom'"
                                tag-placeholder=""
                                placeholder=""
                                selectLabel=""
                                label="name"
                                :searchable="true"
                                @search-change="$emit('search-change', $event)"
                                :track-by="col.trackBy || 'concept_id'"
                                :options="col.multiSelectData"
                            />
                        </div>

                        <DateInputField
                            v-if="col.isDatePopover"
                            :inputHeader="col.inputHeader"
                            :sectionHeaderFontWeight="col.sectionHeaderFontWeight"
                            :bold="col.bold"
                            :unit="col.unit"
                            :icon="col.icon"
                            :placeholder="col.placeholder"
                            :iconRight="col.iconRight"
                            :inputWidth="col.inputWidth"
                            :inputValue="col.value"
                            :eventType="col.eventType"
                            :minDate="col.minDate"
                            :maxDate="col.maxDate"
                            @update:dateValue="handleInput(contentData, col, $event, 'updateDate')"
                        />

                        <div class="alerts_error" v-if="col.alertsErrorMassage">
                            {{ col.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <ion-col :size="btn.btn_col_size || 1.7" class="btn_col" v-for="(btn, btnIndex) in element.btns" :key="btnIndex">
                        <DynamicButton
                            :name="btn.name"
                            :showName="btn.showName"
                            :size="btn.size"
                            :fill="btn.fill"
                            :icon="btn.icon"
                            @click="$emit('clicked:button', btn.name)"
                        />
                    </ion-col>
                </ion-row>
            </span>
            <span v-if="item.radioBtnContent && !item?.radioBtnContent?.header?.displayNone">
                <div style="font-size: 1rem" v-if="item.radioBtnContent?.header" :class="item.radioBtnContent?.header?.class">
                    {{ item.radioBtnContent?.header.title.replace(/\*/g, "") }}
                    <span style="color: red" v-if="item.radioBtnContent?.header.title.includes('*')"> *</span>
                </div>
                <ion-row class="checkbox_content">
                    <ion-col
                        :size="al.colSize"
                        class="checkout_col"
                        style=""
                        v-for="(al, index3) in item.radioBtnContent?.data || item.radioBtnContent?.groupedData"
                        :key="index3"
                    >
                        <span v-if="al.header" class="first_col">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-radio-group
                            v-else
                            style="width: 100%"
                            :value="item.radioBtnContent.header.selectedValue"
                            @ionChange="handleInput(contentData, item.radioBtnContent.header, $event, 'updateRadioBtnContent')"
                        >
                            <span style="display: flex; width: 100%">
                                <ion-radio :value="al.value" :justify="al.justify || 'start'" :label-placement="al.labelPlacement || 'end'">{{
                                    al.name
                                }}</ion-radio>
                            </span>
                        </ion-radio-group>
                    </ion-col>
                    <ion-col v-for="(radioInput, radioInputIndex) in item.radioBtnContent.inputFields" :key="radioInputIndex">
                        <BasicInputField
                            :inputHeader="radioInput.inputHeader"
                            :unit="radioInput.unit"
                            :input="radioInput.input"
                            :icon="radioInput.icon"
                            :placeholder="radioInput.placeholder"
                            :iconRight="radioInput.iconRight"
                            :inputWidth="radioInput.inputWidth"
                            :inputValue="radioInput.value"
                            :eventType="radioInput.eventType"
                            @update:inputValue="handleInput(contentData, radioInput, $event, 'updateInput')"
                            @clicked:inputValue="handleInput(contentData, radioInput, $event, 'clickedInput')"
                        />

                        <div class="alerts_error" v-if="radioInput.alertsErrorMassage">
                            {{ radioInput.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <div class="alerts_error" v-if="item.radioBtnContent?.header.alertsErrorMassage">
                        {{ item.radioBtnContent?.header.alertsErrorMassage }}
                    </div>
                </ion-row>
            </span>
            <span v-if="item.groupedRadioBtnContent">
                <ion-row class="checkbox_content">
                    <ion-col class="checkout_col" style="" v-for="(al, index3) in item.groupedRadioBtnContent.groupedData" :key="index3">
                        <ion-col :size="radioBtn.colSize" class="checkout_col" v-for="(radioBtn, index3) in al.data" :key="index3">
                            <span v-if="radioBtn.header" :class="'first_col ' + radioBtn.headClassName">
                                <ion-label>{{ radioBtn.name }} </ion-label>
                            </span>
                            <ion-radio-group
                                v-else
                                style="width: 100%"
                                :value="al.header.selectedValue"
                                @ionChange="handleInput(contentData, al.header, $event, 'updateGroupedRadioBtnContent')"
                            >
                                <span style="display: flex; width: 100%">
                                    <ion-radio
                                        :value="radioBtn.value"
                                        :justify="radioBtn.justify || 'start'"
                                        :label-placement="radioBtn.labelPlacement || 'end'"
                                        >{{ radioBtn.name }}</ion-radio
                                    >
                                </span>
                            </ion-radio-group>
                        </ion-col>
                    </ion-col>
                    <!-- <div class="alerts_error" v-if="item.groupedRadioBtnContent?.header.alertsErrorMassage">
                        {{ item.groupedRadioBtnContent?.header.alertsErrorMassage }}
                    </div> -->
                </ion-row>
            </span>
            <span v-if="item?.checkboxBtnContent && !item?.checkboxBtnContent?.header?.displayNone">
                <div style="" v-if="item.checkboxBtnContent?.header" :class="item.checkboxBtnContent?.header?.class">
                    {{ item.checkboxBtnContent?.header.title }}
                </div>
                <ion-row class="checkbox_content">
                    <ion-col
                        :size="al.colSize"
                        class="checkout_col"
                        style=""
                        v-for="(al, index3) in item.checkboxBtnContent?.data"
                        :key="index3"
                        v-show="!al.displayNone"
                    >
                        <span v-if="al.header" :class="'first_col ' + al.headClassName">
                            <ion-label>{{ al.name }} </ion-label>
                        </span>
                        <ion-checkbox
                            v-else
                            :justify="al.justify || 'start'"
                            :checked="al.checked"
                            style="width: 100%"
                            :disabled="al.disabled"
                            @ionChange="handleInput(contentData, al, $event, 'updateCheckbox')"
                            :label-placement="al.labelPlacement || 'end'"
                        >
                            <span style="line-height: 1">
                                <p class="checkbox_header">{{ al.name }}</p>
                                <p v-if="al.example" class="small_font">{{ al.example }}</p>
                            </span>
                        </ion-checkbox>
                        <div class="alerts_error" v-if="al.alertsErrorMassage">
                            {{ al.alertsErrorMassage }}
                        </div>
                    </ion-col>
                    <ion-col
                        v-show="!item.checkboxBtnContent.inputFields[0].displayNone"
                        v-for="(checkboxInput, checkboxInputIndex) in item.checkboxBtnContent.inputFields"
                        :key="checkboxInputIndex"
                    >
                        <DateInputField
                            v-if="!checkboxInput.isMultiSelect"
                            :inputHeader="checkboxInput.inputHeader"
                            :sectionHeaderFontWeight="checkboxInput.sectionHeaderFontWeight"
                            :unit="checkboxInput.unit"
                            :input="checkboxInput.input"
                            :icon="checkboxInput.icon"
                            :placeholder="checkboxInput.placeholder"
                            :iconRight="checkboxInput.iconRight"
                            :inputWidth="checkboxInput.inputWidth"
                            :inputValue="checkboxInput.value"
                            :eventType="checkboxInput.eventType"
                            :minDate="checkboxInput.minDate"
                            :maxDate="checkboxInput.maxDate"
                            @update:dateValue="handleInput(contentData, checkboxInput, $event, 'updateDate')"
                        />
                        <div v-if="checkboxInput.isMultiSelect">
                            <h6 v-if="checkboxInput.inputHeader">
                                {{ checkboxInput.inputHeader.replace(/\*/g, "") }}
                                <span style="color: red" v-if="checkboxInput.inputHeader.includes('*')"> *</span>
                            </h6>
                            <VueMultiselect
                                v-if="checkboxInput.isMultiSelect"
                                v-model="checkboxInput.value"
                                @update:model-value="handleInput(contentData, checkboxInput, $event, 'updateMultiselect')"
                                :close-on-select="true"
                                openDirection="bottom"
                                tag-placeholder=""
                                placeholder=""
                                selectLabel=""
                                label="name"
                                :searchable="true"
                                @search-change="$emit('search-change', $event)"
                                :track-by="checkboxInput.trackBy || 'id'"
                                :options="checkboxInput.multiSelectData"
                            />
                        </div>
                        <div class="alerts_error" v-if="checkboxInput.alertsErrorMassage">
                            {{ checkboxInput.alertsErrorMassage }}
                        </div>
                    </ion-col>
                </ion-row>
            </span>
            <span v-for="(al, index3) in item.alerts" :key="index3">
                <ion-row v-if="al.value" :style="'border-radius: 5px;  margin-top:10px; margin-bottom:10px;background-color:' + al.backgroundColor">
                    <span class="position_content alert_content">
                        <ion-icon slot="start" :icon="al.icon" aria-hidden="true"></ion-icon>
                        <span :style="'color:' + al.textColor + '; font-weight:600; margin: 0px 20px;'"> {{ al.index }}</span>
                        <span :style="'color:' + al.textColor + ';'"> {{ al.value }} </span>
                    </span>
                </ion-row>
            </span>
        </ion-col>
        <span></span>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import BasicInputChangeUnits from "@/components/BasicInputChangeUnits.vue";
import DateInputField from "@/components/DateInputField.vue";
import DynamicButton from "./DynamicButton.vue";
import { IonDatetime, IonDatetimeButton, IonCheckbox } from "@ionic/vue";
import HisDate from "@/utils/Date";
import VueMultiselect from "vue-multiselect";
import { createModal } from "@/utils/Alerts";
import Validation from "@/validations/StandardValidations";

import {
    modifyCheckboxInputField,
    getCheckboxSelectedValue,
    getRadioSelectedValue,
    modifyCheckboxValue,
    modifyRadioValue,
    modifyFieldValue,
    modifyGroupedRadioValue,
    modifyUnitsValue,
} from "@/services/data_helpers";

export default defineComponent({
    components: {
        BasicInputField,
        DynamicButton,
        IonDatetime,
        IonDatetimeButton,
        IonCheckbox,
        DateInputField,
        VueMultiselect,
        BasicInputChangeUnits,
    },
    data() {
        return {
            event: "" as any,
            openPopover: false,
            header: "" as any,
            flow: ["month", "year", "calendar"],
            date: "",
            value: [] as any,
            options: [] as any,
        };
    },
    props: {
        contentData: {
            default: [] as any,
        },
        initialData: {
            default: [] as any,
        },
    },
    methods: {
        addTag(newTag: any) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
            };
            this.options.push(tag);
            this.value.push(tag);
        },
        handleInput(data: any, col: any, event: any, inputType: any) {
            this.event = event;
            if (inputType == "updateInput") {
                this.validateData(data, col, event.target.value);
                modifyFieldValue(data, col.name, "value", event.target.value);
                this.$emit("update:inputValue", col);
            }
            if (inputType == "updateMultiselect") {
                this.validateData(data, col, event?.name);
                modifyFieldValue(data, col.name, "value", event);
                this.$emit("update:inputValue", col);
            }
            if (inputType == "updateUnits") {
                this.validateData(data, col, event?.name);
                modifyUnitsValue(data, col.name, "value", event?.name);
                this.$emit("update:inputValue", col);
            }

            if (inputType == "updateDate") {
                this.validateData(data, col, event);
                modifyFieldValue(data, col.name, "value", event);
                modifyCheckboxInputField(data, col.name, "value", event);
                this.$emit("update:inputValue", col);
            }

            if (inputType == "clickedInput") {
                this.handlePopover(col);
                this.$emit("clicked:inputValue", event);
            }

            if (inputType == "setPopoverValue") {
                modifyFieldValue(data, col.name, "value", event.name);
                modifyFieldValue(data, col.value, "value", event.value);
                modifyFieldValue(data, col.name, "id", event[col.idName]);
                modifyFieldValue(data, col.name, "selectedID", event.id);
                this.handleSelected(col);
            }

            if (inputType == "updateRadioBtnContent") {
                this.validateData(data, col, event.target.value);
                modifyRadioValue(data, col.name, "selectedValue", event.target.value, this.initialData);
                this.$emit("update:inputValue", col);
            }
            if (inputType == "updateGroupedRadioBtnContent") {
                this.validateData(data, col, event.target.value);
                modifyGroupedRadioValue(data, col.name, "selectedValue", event.target.value);
                this.$emit("update:inputValue", col);
            }

            if (inputType == "checkboxInput") {
                this.validateData(data, col, event.target.value);
                modifyCheckboxInputField(data, col.name, "value", event.target.value);
                this.$emit("update:inputValue", col);
            }
            if (inputType == "updateCheckbox") {
                this.validateData(data, col, event.detail.checked);
                modifyCheckboxValue(data, col.name, "checked", event.detail.checked, this.initialData);
                this.$emit("update:inputValue", { col, event });
            }
        },
        validateData(data: any, col: any, value: any) {
            if (col.validationFunctionName) {
                const validationMessage = Validation[col.validationFunctionName](value);
                modifyFieldValue(data, col.name, "alertsErrorMassage", validationMessage);
            }
        },
        handleSelected(col: any) {
            this.$emit("update:selected", col);
        },
        handlePopover(col: any) {
            if (col.isDatePopover) {
                this.openPopover = true;
                this.header = col.inputHeader;
            } else {
                this.openPopover = false;
            }
        },
        formatDate(date: any) {
            return HisDate.toStandardHisDisplayFormat(date);
        },
        test(e: any) {
            console.log(e);
        },
    },
});
</script>

<style scoped>
._padding {
    padding-bottom: 18px;
    padding-top: 18px;
}
.alert_content {
    padding: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_header {
    --border-width: 0 0 0 0;
    font-weight: 700;
    color: #00190e;
}

.item_header_col {
    max-width: 300px;
    margin-top: 23px;
}
.action_buttons {
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    max-width: 70px;
    margin-top: 48px;
}
.btn_col {
    display: flex;
    align-items: end;
    justify-content: right;
}
.radio_content {
    padding-top: 10px;
}
.radio_title {
    margin-top: 50px;
}
ion-radio {
    margin-right: 23px;
    margin-top: 20px;
    width: 100%;
}
.checkout_col {
    display: flex;
    align-items: center;
}
.checkout_col ion-checkbox {
    margin-right: 20%;
}
@media screen and (max-width: 768px) {
    .checkout_col ion-checkbox {
        margin-right: 10%;
    }
}
.alerts_error {
    margin-top: 2px;
    color: #b42318;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    overflow: scroll;
    padding: 5px;
    border-radius: 3px;
}

.first_col {
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    color: #636363;
}
.bold {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #00190e;
}
.alerts_error {
    font-size: 14px;
    margin-top: 2px;
    color: #b42318;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    overflow: scroll;
    padding: 5px;
    border-radius: 3px;
}
.multiselect__content-wrapper {
    width: 400px;
}
h6 {
    margin-top: 0px;
}
ion-radio,
ion-checkbox {
    font-size: 1rem;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
