<template>
    <ion-row v-if="showAreReferalsCreated">
       <span class="dash_box">No referals created yet</span> 
    </ion-row>
    <ion-item
        class="ionLbltp" v-for="(item, index) in addedReferals" :key="index"
        @mousemove="highlightItem(index)" @mouseout="undoHighlightItem(index)"
        >
        <ion-col style="display: contents;">
            <ion-label :id="asignLblID(index)" class="drgNmTrpln" style="display: contents; color: #00190E; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.referalName }}</ion-label>
        </ion-col>
        <ion-col>
            <ion-label style="color: #636363; font-weight: 400; font: inter; line-height: 14px; line-height: 21px;">{{ item.selectedReferalType }} / {{ item.referalDate }} / {{ item.addedReferalNote }}</ion-label>
        </ion-col>
        <ion-col class="action_buttons">
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end; flex: auto;" @click="editItemAtIndex(index)"><span v-html="iconsContent.edit" class="modify_buttons"></span></ion-label>
            <ion-label :class="asignSpanLblID(index)" style="cursor: pointer; display: none; text-align: end; margin-left: 16px;" @click="removeItemAtIndex(index)"><span v-html="iconsContent.delete" class="modify_buttons"></span></ion-label>
        </ion-col>
    </ion-item>
    <div v-if="!showReferalInput">
                <ion-row>
                    <ion-col>
                        <ion-item class="input_item">
                            <ion-input v-model="referalName"></ion-input>
                            <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item class="input_item">
                            <ion-input id="chooseType" placeholder="Type" v-model="selectedReferalType" @click="popoverOpenForReferalTypeFn2"></ion-input>
                            <ion-icon v-if="!showPopoverOpenForReferalType"  :icon="chevronDownOutline"></ion-icon>
                            <ion-icon v-if="showPopoverOpenForReferalType" :icon="chevronUpOutline"></ion-icon>
                            <ion-popover
                                class="popover-al"
                                :show-backdrop="false"
                                trigger="chooseType"
                                trigger-action="click"
                                @didDismiss="showPopoverOpenForReferalType = false"
                                >
                                <ion-content color="light" class="ion-padding content-al">
                                    <ion-label>Choose the type:</ion-label>
                                    <ion-list class="list-al">
                                        <div class="item-al" v-for="(item, index) in refralType" :key="index">
                                                    <ion-label  @click="selectAl(index)" style="display: flex; justify-content: space-between;">
                                                        {{ item.name }}
                                                        <ion-icon v-if="item.selected" class="icon-al" :icon="checkmarkOutline"></ion-icon> 
                                                    </ion-label>                                     
                                                </div>
                                    </ion-list>
                                </ion-content>
                            </ion-popover>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item class="input_item">
                            <ion-input id="dateTrigger" placeholder="Date" v-model="referalDate"></ion-input>
                            <ion-popover
                                @didDismiss="prescPopoverOpen = false" 
                                show-backdrop="false" 
                                dismiss-on-select="false"
                                trigger="dateTrigger"
                                trigger-action="click"
                                >
                                <ion-content class="search_card" >
                                    <ion-datetime ref="prescription" @ionChange="getDate($event)" presentation="date"></ion-datetime>
                                </ion-content>
                            </ion-popover>
                        </ion-item>
                    </ion-col>
                    <ion-col size="2"></ion-col>
                </ion-row>
        <ion-row>
                <ion-col size="10">
                    <ion-item class="input_item">
                        <ion-input v-model="addedReferalNote" placeholder="Some reason"></ion-input>
                    </ion-item>
                </ion-col>

                <ion-col class="action_buttons" size="2">
                    <span @click="saveData()">+ Save</span> 
                </ion-col>
        </ion-row>
    </div>
    <ion-row v-if="showReferalInput">
       <span class="add_item" @click="addReferal" style="cursor: pointer;"> + Add New Referal </span> 
    </ion-row>
</template>
  
<script lang="ts">
    import { 
            IonContent, 
            IonHeader,
            IonItem,
            IonList,
            IonTitle, 
            IonToolbar, 
            IonMenu,
            menuController,
            IonLabel,
            IonInput,
            IonPopover,
            IonDatetime,
            IonButton,
        } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { checkmark,pulseOutline,checkmarkOutline, chevronDownOutline,chevronUpOutline } from 'ionicons/icons';
    import { ref } from 'vue';
    import { icons } from '@/utils/svg.ts';

    export default defineComponent({
    name: 'Menu',
    components:{
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonLabel,
        IonInput,
        IonPopover,
        IonButton,
        IonDatetime
       },
        data() {
    return {
        iconsContent: icons,
        showReferalInput: true,
        refralType: [
            {
                name: 'Internal',
                selected: false,
            },
            {
                name: 'External',
                selected: false,
            },
          ],
        addedReferals: [
            {
                referalName: 'qwerty',
                selectedReferalType: 'nnm',
                referalDate: 'bbb',
                addedReferalNote: 'nnn',
            }
        ] as any,
        showPopoverOpenForReferalType: false,
        referalDate: '',
        selectedReferalType: '',
        addedReferalNote: '',
        referalName: '',
        showAreReferalsCreated: true as boolean,
    };
  },
    setup() {
      return { checkmark,pulseOutline,checkmarkOutline,chevronDownOutline,chevronUpOutline };
    },
    watch: {
        addedReferals: {
            handler(addedReferals: Array<any>){
                this.AreReferalsCreated()  
            },
            deep: true,
            immediate: true
        }
    },
    methods:{
        navigationMenu(url: any){
            menuController.close()
            this.$router.push(url);
        },
        addReferal() {
            this.showReferalInput = !this.showReferalInput
        },
        selectAl(index: any) {
            this.refralType.forEach(item => {
                item.selected = false
            })
            this.refralType[index].selected = !this.refralType[index].selected
            this.selectedReferalType = this.refralType[index].name
        },
        popoverOpenForReferalTypeFn2() {
            this.showPopoverOpenForReferalType = true
        },
        getDate(ev: any) {
            const inputDate = new Date(ev.detail.value)
            const year = inputDate.getFullYear()
            const month = inputDate.getMonth() + 1
            const day = inputDate.getDate()
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            this.referalDate = formattedDate
        },
        AreReferalsCreated(){
            if (this.addedReferals.length > 0) {
                this.showAreReferalsCreated = false
            } else {
                this.showAreReferalsCreated = true
            }
        },
        asignLblID(num: any) {
            return num + '_lbl2' as string;
        },
        asignSpanLblID(num: any) {
            return num + '_spanlbl2' as string;
        },
        removeItemAtIndex(index: any) {
            this.addedReferals.splice(index, 1)
        },
        editItemAtIndex(index: any) {
            const dataItem = this.addedReferals[index]
            this.addedReferals.splice(index, 1)
            this.referalName = dataItem.referalName
            this.selectedReferalType = dataItem.selectedReferalType
            this.referalDate = dataItem.referalDate
            this.addedReferalNote = dataItem.addedReferalNote
            this.showReferalInput = !this.showReferalInput
        },
        highlightItem(item: any) {
            const el = document.getElementById(item+'_lbl2')
            if (el) {
                el.style.color = '#006401' 
            }
            this.highlightActionBtns(item)
        },
        undoHighlightItem(item: any) {
            const el = document.getElementById(item+'_lbl2')
            if (el) {
                el.style.color = 'rgb(0,0,0)' 
            }
            this.undohighlightActionBtns(item)
        },
        highlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item+'_spanlbl2') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'block'
            }
        },
        undohighlightActionBtns(item: any) {
            const elements = document.getElementsByClassName(item+'_spanlbl2') as any
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none'
            }
        },
        async saveData(){
            this.showReferalInput = true

            const drugString = {
                referalName: this.referalName,
                selectedReferalType: this.selectedReferalType,
                referalDate: this.referalDate,
                addedReferalNote: this.addedReferalNote,
            }
            this.addedReferals.push(drugString)

            this.referalName = ''
            this.selectedReferalType = ''
            this.referalDate = ''
            this.addedReferalNote = ''
        },
    }
    });
</script>

<style scoped>
#container {
text-align: center;

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

.action_buttons{
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    float: right;
    /* max-width: 210px; */
}
ion-list.list-al {
    --background: #fff;
    -ion-item-background: #fff;
}
.item-al {
    cursor: pointer;
    padding: 5px;
    background-color: #EBEBEB;
    margin-top: 8px;
}
ion-icon.icon-al {
    /* margin-left: 40%; */
    font-size: x-large;
    margin-bottom: -5px;
}
.item-al:hover {
  background-color: #55515148;
  padding: 5px;
  border-radius: 3px;
}
ion-popover.popover-al {
    --background: #fff;
}
ion-content.content-al {
    --background: #fff;
}
ion-item.ionLbltp {
    border-bottom: 2px dotted var(--ion-color-medium);
    --inner-border-width:0;
}
.drgNmTrpln:hover {
    background-color: #006401 !important;
    color: #006401 !important;
    cursor: pointer;
}
</style>
  