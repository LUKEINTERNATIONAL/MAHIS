<template>
    <ion-row >
       <span class="dash_box">No referals created yet</span> 
    </ion-row>
    <div v-if="!showReferalInput">
        <ion-row style="width: 900px;">
        <ion-col>
            <ion-item class="input_item">
                <ion-input></ion-input>
                <ion-label><span v-html="iconsContent.search" class="selectedPatient"></span></ion-label>
            </ion-item>
        </ion-col>
        <ion-col>
            <ion-item class="input_item">
                <ion-input id="chooseType" placeholder="Type" v-model="selectectedThisReferalType" @click="popoverOpenForReferalTypeFn2"></ion-input>
                <ion-icon v-if="!showPopoverOpenForReferalType" :icon="chevronDownOutline"></ion-icon>
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
                <ion-input></ion-input>
            </ion-item>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <ion-item class="input_item">
                <ion-input ></ion-input>
            </ion-item>
        </ion-col>
        <ion-col class="action_buttons">
            <span @click="">+ Save</span> 
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
            IonPopover
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
        IonPopover
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
        showPopoverOpenForReferalType: false,
        selectectedThisReferalType: '',
    };
  },
    setup() {
      return { checkmark,pulseOutline,checkmarkOutline,chevronDownOutline,chevronUpOutline };
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
            this.selectectedThisReferalType = this.refralType[index].name
        },
        popoverOpenForReferalTypeFn2() {
            this.showPopoverOpenForReferalType = true
        }
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
    max-width: 210px;
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
</style>
  