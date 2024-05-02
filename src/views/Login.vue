<template>
    <ion-page>
        <ion-content class="ion-padding login-page">
            <div class="login-container">
                <ion-card style="background-color: #fff">
                    <ion-card-content>
                        <ion-img class="login_img" :src="loginIcon" id="logo"></ion-img>
                        <ion-title class="login-title">MaHIS</ion-title>
                        <span style="text-align: left">
                            <ion-input
                                v-model="username"
                                type="text"
                                label="Username"
                                ref="username"
                                label-placement="floating"
                                fill="outline"
                                placeholder="Enter Username"
                                class="input-fields"
                                required
                                ><ion-label slot="end"> <ion-icon :icon="person" @click="togglePasswordVisibility"></ion-icon> </ion-label
                            ></ion-input>
                            <ion-input
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                ref="Password"
                                label-placement="floating"
                                fill="outline"
                                placeholder="Enter Password"
                                class="input-fields"
                                required
                            >
                                <ion-label slot="end">
                                    <ion-icon :icon="showPassword ? eye : eyeOff" @click="showPassword = !showPassword"></ion-icon>
                                </ion-label>
                            </ion-input>

                            <VueMultiselect
                                v-model="program"
                                @update:model-value="handleInput($event)"
                                :multiple="false"
                                :taggable="false"
                                :hide-selected="true"
                                :close-on-select="true"
                                openDirection="bottom"
                                tag-placeholder="Select Program"
                                placeholder="Select Program"
                                selectLabel=""
                                label="name"
                                :searchable="true"
                                @search-change="$emit('search-change', $event)"
                                track-by="program_id"
                                :options="multiSelectData"
                            />
                        </span>

                        <ion-button
                            expand="block"
                            style="--background: var(--ion-color-primary); font-size: var(--ion-button-font)"
                            @click="doLogin"
                            class="login-button"
                        >
                            Login
                        </ion-button>
                        <p class="signup-link">For help click <a href="#">Here</a></p>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonInput,
    IonImg,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { eye, eyeOff, person } from "ionicons/icons";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import { toastWarning, toastDanger } from "@/utils/Alerts";
import img from "@/utils/Img";
import VueMultiselect from "vue-multiselect";
import { ProgramService } from "@/services/program_service";

export default defineComponent({
    name: "Home",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        Toolbar,
        ToolbarSearch,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        IonInput,
        IonImg,
        VueMultiselect,
    },
    data: function () {
        return {
            multiSelectData: [] as any,
            auth: {} as any,
            password: "" as any,
            username: "" as any,
            program: "" as any,
            togglePasswordVisibility: false,
            showPassword: false,
        };
    },
    computed: {
        loginIcon() {
            return img("mw.png");
        },
    },
    setup() {
        return { eye, person, eyeOff };
    },
    created() {
        this.auth = new AuthService();
    },
    mounted() {
        this.getPrograms();
    },
    methods: {
        async getPrograms() {
            this.multiSelectData = [
                {
                    program_id: 1,
                    concept_id: 1482,
                    creator: 1,
                    date_created: "2007-12-19T11:55:28.000+02:00",
                    changed_by: 1,
                    date_changed: "2012-02-06T18:05:08.000+02:00",
                    retired: 0,
                    name: "HIV PROGRAM",
                    description: "",
                    uuid: "ba3906f0-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 1482,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2006-08-16T02:05:34.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-08-30T20:55:33.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8d10ba0-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 2,
                    concept_id: 1648,
                    creator: 1,
                    date_created: "2008-07-23T07:42:38.000+02:00",
                    changed_by: 1,
                    date_changed: "2002-09-04T04:55:19.000+02:00",
                    retired: 0,
                    name: "TB PROGRAM",
                    description: "Tuberculosis Program",
                    uuid: "ba3908e4-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 1648,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 11,
                        is_set: 0,
                        creator: 1,
                        date_created: "2006-09-18T09:00:46.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-08-30T20:56:02.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8d2567c-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 3,
                    concept_id: 3568,
                    creator: 1,
                    date_created: "2008-08-18T18:42:19.000+02:00",
                    changed_by: 1,
                    date_changed: "2009-11-03T16:27:34.000+02:00",
                    retired: 0,
                    name: "VHW PROGRAM",
                    description: "",
                    uuid: "ba3909fc-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 3568,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2008-08-18T11:19:08.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-09-01T22:28:22.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8e7974e-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 4,
                    concept_id: 3594,
                    creator: 1,
                    date_created: "2008-09-17T21:54:32.000+02:00",
                    changed_by: 1,
                    date_changed: "2013-01-10T17:10:10.000+02:00",
                    retired: 0,
                    name: "EARLY INFANT DIAGNOSIS PROGRAM",
                    description: "",
                    uuid: "ba390aec-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 3594,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2008-09-16T11:51:43.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2013-01-10T17:12:05.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8e7db6e-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 5,
                    concept_id: 2842,
                    creator: 1,
                    date_created: "2008-09-23T23:21:05.000+02:00",
                    changed_by: 1,
                    date_changed: "2011-08-30T21:14:29.000+02:00",
                    retired: 0,
                    name: "MDR-TB PROGRAM",
                    description: "MDR-TB PROGRAM used by the mdrb module.",
                    uuid: "ba390be6-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 2842,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2007-11-03T09:05:45.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-08-30T20:56:29.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8dedb72-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 6,
                    concept_id: 3591,
                    creator: 1,
                    date_created: "2008-09-28T08:49:39.000+02:00",
                    changed_by: 1,
                    date_changed: "2011-12-09T14:49:33.000+02:00",
                    retired: 0,
                    name: "KAPOSIS SARCOMA PROGRAM",
                    description: "Program for patients recieving chemotherapy for Kaposi's Sarcoma.",
                    uuid: "ba390cea-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 3591,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2008-09-16T11:48:13.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-09-01T22:25:57.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8e7d664-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 10,
                    concept_id: 2454,
                    creator: 1,
                    date_created: "2010-10-11T19:24:07.000+02:00",
                    changed_by: 1,
                    date_changed: "2002-11-26T22:00:43.000+02:00",
                    retired: 0,
                    name: "CHRONIC CARE PROGRAM",
                    description: "",
                    uuid: "ba3910c8-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 2454,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2007-06-25T16:45:48.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-09-01T21:58:13.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8db919c-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 11,
                    concept_id: 8009,
                    creator: 1,
                    date_created: "2011-08-30T20:52:55.000+02:00",
                    changed_by: 1,
                    date_changed: "2011-12-09T14:49:21.000+02:00",
                    retired: 0,
                    name: "MATERNITY PROGRAM",
                    description: "MATERNITY PROGRAM",
                    uuid: "ba3911b8-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 8009,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2011-08-30T20:55:00.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b90d504c-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 12,
                    concept_id: 8010,
                    creator: 1,
                    date_created: "2011-08-30T21:20:34.000+02:00",
                    changed_by: 1,
                    date_changed: "2012-02-23T17:11:48.000+02:00",
                    retired: 0,
                    name: "ANC PROGRAM",
                    description: "ANTENATAL PROGRAM",
                    uuid: "ba3912a8-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 8010,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2011-08-30T20:57:18.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b90d52d6-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 13,
                    concept_id: 8264,
                    creator: 1,
                    date_created: "2011-12-02T10:25:03.000+02:00",
                    changed_by: 1,
                    date_changed: "2011-12-12T17:44:22.000+02:00",
                    retired: 0,
                    name: "DIABETES PROGRAM",
                    description: "Diabetes treatment program",
                    uuid: "ba3913a2-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 8264,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2011-12-02T10:26:47.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2011-12-12T17:39:57.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b9105fc6-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 14,
                    concept_id: 8358,
                    creator: 1,
                    date_created: "2012-01-09T16:18:55.000+02:00",
                    changed_by: 1,
                    date_changed: "2012-08-01T12:49:49.000+02:00",
                    retired: 0,
                    name: "OPD Program",
                    description: "Outpatient Program",
                    uuid: "ba39149c-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 8358,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2012-01-12T12:40:14.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2012-01-12T12:42:04.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b9116ca4-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 15,
                    concept_id: 1429,
                    creator: 1,
                    date_created: "2012-01-09T16:20:26.000+02:00",
                    changed_by: 1,
                    date_changed: "2002-10-09T16:18:00.000+02:00",
                    retired: 0,
                    name: "IPD Program",
                    description: "Inpatient Diagnosis Program",
                    uuid: "ba391596-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 1429,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 11,
                        is_set: 0,
                        creator: 1,
                        date_created: "2006-09-27T19:58:49.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2006-09-27T19:58:49.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8d0b1aa-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 16,
                    concept_id: 8885,
                    creator: 1,
                    date_created: "2013-01-11T11:25:27.000+02:00",
                    changed_by: 1,
                    date_changed: "2013-01-11T11:43:55.000+02:00",
                    retired: 0,
                    name: "UNDER 5 PROGRAM",
                    description: "",
                    uuid: "ba391686-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 8885,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 11,
                        is_set: 0,
                        creator: 1,
                        date_created: "2013-01-11T11:24:40.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b9167e74-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 17,
                    concept_id: 9125,
                    creator: 1,
                    date_created: "2002-05-30T11:11:48.000+02:00",
                    changed_by: 1,
                    date_changed: "2002-05-30T13:36:07.000+02:00",
                    retired: 0,
                    name: "CIVIL REGISTRATION PROGRAM",
                    description: "Registration of births and deaths",
                    uuid: "ba391776-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 9125,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 1,
                        class_id: 1,
                        is_set: 0,
                        creator: 1,
                        date_created: "2002-05-30T11:10:52.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2002-05-30T13:27:03.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b917d008-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 18,
                    concept_id: 9424,
                    creator: 1,
                    date_created: "2003-11-27T17:20:08.000+02:00",
                    changed_by: null,
                    date_changed: null,
                    retired: 0,
                    name: "HTC PROGRAM",
                    description: "HIV Testing and Counseling Program",
                    uuid: "ba391870-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 9424,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 1,
                        class_id: 1,
                        is_set: 0,
                        creator: 1,
                        date_created: "2003-11-27T17:16:53.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b9192890-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 19,
                    concept_id: 9442,
                    creator: 1,
                    date_created: "2004-01-07T22:24:48.000+02:00",
                    changed_by: 1,
                    date_changed: "2004-01-08T17:21:02.000+02:00",
                    retired: 0,
                    name: "ANC CONNECT PROGRAM",
                    description: "Programme for ANC connect used in Hotline",
                    uuid: "ba3d3ac2-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 9442,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 11,
                        is_set: 0,
                        creator: 1,
                        date_created: "2004-01-07T22:22:44.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b9194280-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 20,
                    concept_id: 9497,
                    creator: 1,
                    date_created: "2004-01-14T15:58:41.000+02:00",
                    changed_by: 1,
                    date_changed: "2004-01-24T20:57:26.000+02:00",
                    retired: 0,
                    name: "HYPERTENSION PROGRAM",
                    description: "Program for tracking patients with hypertension",
                    uuid: "ba3d3d4c-8d80-11d8-abbb-0024217bb78e",
                    concept: {
                        concept_id: 9497,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2004-01-24T20:56:39.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b919917c-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 21,
                    concept_id: 9743,
                    creator: 1,
                    date_created: "2019-04-30T14:12:34.000+02:00",
                    changed_by: null,
                    date_changed: null,
                    retired: 0,
                    name: "VMMC PROGRAM",
                    description: "Voluntary medical male circumcision program",
                    uuid: "0d6d1a9a-cb91-48db-b8d0-a3ba84af34a2",
                    concept: {
                        concept_id: 9743,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2019-04-30T14:09:08.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "fbc0db0a-772e-462b-851b-3aee5a4b5b59",
                    },
                },
                {
                    program_id: 22,
                    concept_id: 9940,
                    creator: 1,
                    date_created: "2002-01-07T01:12:56.000+02:00",
                    changed_by: 1,
                    date_changed: "2002-01-07T01:13:34.000+02:00",
                    retired: 0,
                    name: "IPT Program",
                    description: "Treatment regimen for Tuberculosis negative minors aged five or less.",
                    uuid: "1d33b928-a6bc-4c4b-be26-750b9e737efa",
                    concept: {
                        concept_id: 9940,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2002-01-07T01:08:20.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "f80a1187-49cd-4045-9799-36d94b74695a",
                    },
                },
                {
                    program_id: 23,
                    concept_id: 1283,
                    creator: 1,
                    date_created: "2021-03-26T10:30:05.000+02:00",
                    changed_by: 1,
                    date_changed: "2021-03-26T10:30:05.000+02:00",
                    retired: 0,
                    name: "Laboratory program",
                    description: null,
                    uuid: "61b80420-67a4-498c-98a1-5a21225a56db",
                    concept: {
                        concept_id: 1283,
                        retired: 0,
                        short_name: "",
                        description: "",
                        form_text: null,
                        datatype_id: 4,
                        class_id: 11,
                        is_set: 0,
                        creator: 1,
                        date_created: "2005-02-24T12:03:06.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "b8ce49ba-8d80-11d8-abbb-0024217bb78e",
                    },
                },
                {
                    program_id: 24,
                    concept_id: 10005,
                    creator: 1,
                    date_created: "2021-03-26T10:30:07.000+02:00",
                    changed_by: 1,
                    date_changed: "2021-03-26T10:30:07.000+02:00",
                    retired: 0,
                    name: "CxCa program",
                    description: null,
                    uuid: "2f9b2c83-2b10-455d-ab52-263d97b218b9",
                    concept: {
                        concept_id: 10005,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 4,
                        class_id: 5,
                        is_set: 0,
                        creator: 1,
                        date_created: "2021-03-26T10:30:06.000+02:00",
                        default_charge: null,
                        version: null,
                        changed_by: null,
                        date_changed: "2021-03-26T10:30:06.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "5a6e2d7f-c5b0-428e-aa1d-dd25d2328669",
                    },
                },
                {
                    program_id: 27,
                    concept_id: 10541,
                    creator: 1,
                    date_created: "2021-09-27T17:23:23.000+02:00",
                    changed_by: 1,
                    date_changed: "2021-09-27T18:26:30.000+02:00",
                    retired: 0,
                    name: "Triage Program",
                    description: "",
                    uuid: "e6381da7-bf85-44ab-ab16-98f72cf175cd",
                    concept: {
                        concept_id: 10541,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2021-09-27T17:21:22.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "a8fba62c-4db4-40be-a073-73835963fe40",
                    },
                },
                {
                    program_id: 28,
                    concept_id: 10570,
                    creator: 1,
                    date_created: "2022-07-07T08:37:25.000+02:00",
                    changed_by: 1,
                    date_changed: "2022-07-07T08:37:25.000+02:00",
                    retired: 0,
                    name: "RADIOLOGY PROGRAM",
                    description: "Radiology Program",
                    uuid: "bebd8184-fdc0-11ec-adbd-0242ac110002",
                    concept: {
                        concept_id: 10570,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2022-07-07T08:37:25.000+02:00",
                        default_charge: null,
                        version: null,
                        changed_by: null,
                        date_changed: "2022-07-07T08:37:25.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "5ee0fc56-fdbf-11ec-adbd-0242ac110002",
                    },
                },
                {
                    program_id: 29,
                    concept_id: 10571,
                    creator: 1,
                    date_created: "2022-08-04T10:25:02.000+02:00",
                    changed_by: 1,
                    date_changed: "2022-08-04T10:25:02.000+02:00",
                    retired: 0,
                    name: "PATIENT REGISTRATION PROGRAM",
                    description: "Patient Registration Program",
                    uuid: "a49d8ba1-13cf-11ed-a597-0242ac110003",
                    concept: {
                        concept_id: 10571,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2022-08-04T10:25:02.000+02:00",
                        default_charge: null,
                        version: null,
                        changed_by: null,
                        date_changed: "2022-08-04T10:25:02.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "d36e8866-13ce-11ed-a597-0242ac110003",
                    },
                },
                {
                    program_id: 30,
                    concept_id: 10690,
                    creator: 1,
                    date_created: "2023-09-22T08:28:00.000+02:00",
                    changed_by: 1,
                    date_changed: "2023-09-22T08:28:00.000+02:00",
                    retired: 0,
                    name: "AETC PROGRAM",
                    description: "Adult Emergency and Trauma Centre",
                    uuid: "f0c354a4-5921-11ee-a02c-0242ac110002",
                    concept: {
                        concept_id: 10690,
                        retired: 0,
                        short_name: "AETC",
                        description: "Adult Emergency and Trauma Centre",
                        form_text: null,
                        datatype_id: 4,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2023-09-22T08:27:43.000+02:00",
                        default_charge: null,
                        version: null,
                        changed_by: 1,
                        date_changed: "2023-09-22T08:27:43.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "e6b328c9-5921-11ee-a02c-0242ac110002",
                    },
                },
                {
                    program_id: 31,
                    concept_id: 10762,
                    creator: 1,
                    date_created: "2023-10-18T09:25:01.000+02:00",
                    changed_by: null,
                    date_changed: null,
                    retired: 0,
                    name: "SPINE PROGRAM",
                    description: "",
                    uuid: "de0ec5af-f31e-43f5-a092-dd6aa41bf30d",
                    concept: {
                        concept_id: 10762,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2023-10-18T09:23:43.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: 1,
                        date_changed: "2023-10-25T14:13:10.000+02:00",
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "814a098a-362f-47dc-b2e0-7d80c5758e7f",
                    },
                },
                {
                    program_id: 32,
                    concept_id: 10779,
                    creator: 1,
                    date_created: "2024-01-26T08:07:11.000+02:00",
                    changed_by: null,
                    date_changed: null,
                    retired: 0,
                    name: "NCD PROGRAM",
                    description: "",
                    uuid: "8866d1ad-d664-4a9a-be27-7cd1212c368c",
                    concept: {
                        concept_id: 10779,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2024-01-26T08:06:33.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "9101bd51-16c4-4cb5-8a83-dee3fde30b04",
                    },
                },
                {
                    program_id: 33,
                    concept_id: 11440,
                    creator: 1,
                    date_created: "2024-04-20T17:16:41.000+02:00",
                    changed_by: null,
                    date_changed: null,
                    retired: 0,
                    name: "IMMUNIZATION PROGRAM",
                    description: "",
                    uuid: "3cf79d08-5a91-4040-a3ce-a29efa8c4cad",
                    concept: {
                        concept_id: 11440,
                        retired: 0,
                        short_name: null,
                        description: null,
                        form_text: null,
                        datatype_id: 3,
                        class_id: 16,
                        is_set: 0,
                        creator: 1,
                        date_created: "2024-04-20T17:15:21.000+02:00",
                        default_charge: null,
                        version: "",
                        changed_by: null,
                        date_changed: null,
                        retired_by: null,
                        date_retired: null,
                        retire_reason: null,
                        uuid: "888021ce-ed5b-4708-8dce-a97b3003ee1e",
                    },
                },
            ];
        },
        doLogin: async function () {
            if (this.username && this.password && this.program) {
                this.auth.setUsername(this.username);
                try {
                    if (this.auth.versionLockingIsEnabled()) {
                        await this.auth.validateIfCorrectAPIVersion();
                    }
                    // if (!(await this.auth.checkTimeIntegrity())) {
                    //     throw "Local date does not match API date. Please Update your device's date";
                    // }
                    await this.auth.login(this.password);
                    this.auth.startSession();
                    this.$router.push("/home");
                } catch (e) {
                    if (e instanceof InvalidCredentialsError) {
                        toastDanger("Invalid username or password");
                    } else {
                        toastDanger(`${e}`, 50000);
                    }
                }
            } else {
                toastWarning("Complete form to log in");
            }
        },
        handleInput(event: any) {
            sessionStorage.setItem("app", JSON.stringify({ programID: event.program_id, applicationName: event.name }));
        },
    },
    togglePasswordVisibility() {
        if (!this.togglePasswordVisibility) return true;
        else return false;
    },
});
</script>

<style scoped>
.login-page {
    background-color: #ffffff;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90vh;
}

.login-title {
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: 700;
    margin-top: 20px;
}

.input-fields {
    margin-bottom: 35px;
}

.password-toggle {
    cursor: pointer;
    position: absolute;
    margin-top: -73px;
    margin-left: 130px;
    z-index: 1000;
}

.login-button {
    color: #ffffff;
    margin-top: 30px;
}

.signup-link {
    margin-top: 50px;
}

.signup-link a {
    text-decoration: underline;
}
.password-toggle {
    font-size: 20px;
}
.login_img {
    width: 90px;
    margin: auto;
}
.multiselect__content-wrapper {
    position: unset !important;
    width: inherit !important;
}
</style>
