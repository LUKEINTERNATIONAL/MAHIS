<template>
    <ion-menu side="start" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-accordion-group expand="inset">
                <ion-accordion value="first" @click="navigationMenu('home')">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Home</ion-label>
                    </ion-item>
                </ion-accordion>
                <ion-accordion value="second">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Reports</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <ion-accordion-group>
                            <ion-accordion value="first">
                                <ion-item slot="header">
                                    <ion-label class="header">OPD Reports</ion-label>
                                </ion-item>
                                <div class="content" slot="content">
                                    <ion-list>
                                        <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                                        <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                                    </ion-list>
                                </div>
                            </ion-accordion>
                            <ion-accordion value="second">
                                <ion-item slot="header">
                                    <ion-label class="header">NCD Reports</ion-label>
                                </ion-item>
                                <div class="content" slot="content">
                                    <ion-list>
                                        <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                                        <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                                    </ion-list>
                                </div>
                            </ion-accordion>
                            <ion-accordion value="third">
                                <ion-item slot="header">
                                    <ion-label class="header">ANC Reports</ion-label>
                                </ion-item>
                                <div class="content" slot="content">
                                    <ion-list>
                                        <ion-item @click="navigationMenu('setSessionDate')" class="list-content">MoH</ion-item>
                                        <ion-item @click="navigationMenu('report')" class="list-content">Clinical Reports</ion-item>
                                    </ion-list>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </div>
                </ion-accordion>
                <ion-accordion value="third">
                    <ion-item slot="header" color="light">
                        <ion-label class="header">Settings</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <ion-accordion-group>
                            <ion-accordion value="first">
                                <ion-item slot="header">
                                    <ion-label class="header">Configurations</ion-label>
                                </ion-item>
                                <div class="content" slot="content">
                                    <ion-segment style="display: block">
                                        <ion-segment-button class="list-bottom" @click="navigationMenu('setSessionDate')" value="Session Date">
                                            <ion-label class="label">Session Date</ion-label>
                                        </ion-segment-button>
                                        <ion-segment-button class="list-bottom" @click="navigationMenu('clinicaldays')" value="Session Date">
                                            <ion-label class="label">Clinical Days</ion-label>
                                        </ion-segment-button>
                                        <ion-segment-button class="list-bottom" @click="navigationMenu('setDDE')" value="DDE">
                                            <ion-label class="label">DDE</ion-label>
                                        </ion-segment-button>
                                        <ion-segment-button class="list-bottom" @click="navigationMenu('setLocation')" value="Location">
                                            <ion-label class="label">Location</ion-label>
                                        </ion-segment-button>
                                        <ion-segment-button class="list-bottom" @click="navigationMenu('setPreferences')" value="Preferences">
                                            <ion-label class="label">Preferences</ion-label>
                                        </ion-segment-button>
                                    </ion-segment>
                                </div>
                            </ion-accordion>
                            <ion-accordion value="second">
                                <ion-item slot="header">
                                    <ion-label @click="navigationMenu('users')" class="header">User Management</ion-label>
                                </ion-item>
                            </ion-accordion>
                        </ion-accordion-group>
                    </div>
                </ion-accordion>
            </ion-accordion-group>
        </ion-content>
    </ion-menu>
</template>

<script lang="ts">
import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, menuController } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Menu",
    components: {
        IonAccordionGroup,
        IonAccordion,
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
    },
    methods: {
        navigationMenu(url: any) {
            menuController.close();
            this.$router.push(url);
        },
    },
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
ion-content::part(background) {
    background: #fff;
}
ion-accordion::part(content expanded) {
    /* --background: #fff; */
    background: var(--ion-item-background, var(--ion-background-color, #fff));
}
.header {
    font-weight: 700;
    color: rgb(132, 130, 130);
}
.list-content {
    color: rgb(132, 130, 130);
}
.label {
    text-transform: full-size-kana;
    width: 100%;
    text-align: left;
}
.list-bottom {
    border-bottom: solid 1px #ccc;
    --indicator-height: 1px;
}
</style>
