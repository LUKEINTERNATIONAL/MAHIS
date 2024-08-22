<template>
    <div class="content">
        <div class="header"> National id scanner</div>
        <div class="camera">
            <qrcode-stream @decode="onDecode"></qrcode-stream>
            <p v-if="extractedDetails">Scanned QR Code: {{ extractedDetails }}</p>
            <button @click="simulateScan">Simulate QR Code Scan</button>
        </div>
        <ion-row>
            <ion-col>
                <ion-card class="scan_card">
                    <div class="tree_dots">...</div>
                    <div class="scan_status">
                        Scanning in progress...
                    </div>
                </ion-card>
            </ion-col>
            <ion-col>
                <div class="scan_instraction">
                    To have the successful Scanning
                    <ul class="checklist">
                        <li>Find the lighter place</li>
                        <li>Put the National ID in the center of the screen</li>
                        <li>Focus the camera on National ID</li>
                    </ul>
                </div>
            </ion-col>
        </ion-row>
    </div>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
    IonMenu
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { icons } from '@/utils/svg';
import { useRegistrationStore } from '@/stores/registrationStore';

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
},
  data() {
return {
    iconsContent: icons,
    qrCodeData: '' as string | null,
    extractedDetails: null as Record<string, string> | null,
    };
},
computed: {
        personalInformation() {
            const registrationStore = useRegistrationStore();
            return registrationStore.personInformation;
        },
    },
methods:{
    onDecode(content: any) {
        this.qrCodeData = content;
        this.extractedDetails = this.extractDetails(this.qrCodeData);
        const registrationStore = useRegistrationStore();

            // Assuming the personal information in the store matches the structure of extractedDetails
            registrationStore.setPersonalInformation([
                {
                    selectedData: [],
                    isFinishBtn: false,
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: "National ID",
                                        iconRight: this.iconsContent.scannerIcon,
                                        icon: this.iconsContent.nationalID,
                                        value: this.extractedDetails.idNumber,
                                        name: "nationalID",
                                        eventType: "input",
                                        alertsErrorMassage: "",
                                        required: true,
                                        placeholder: "__-__-__-__",
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: "First name*",
                                        icon: this.iconsContent.fullName,
                                        value: this.extractedDetails.firstName,
                                        name: "firstname",
                                        eventType: "input",
                                        alertsErrorMassage: "",
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: "Last name*",
                                        icon: this.iconsContent.fullName,
                                        value: this.extractedDetails.lastName,
                                        name: "lastname",
                                        eventType: "input",
                                        alertsErrorMassage: "",
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: "Middle name",
                                        icon: this.iconsContent.fullName,
                                        value: this.extractedDetails.middleName,
                                        name: "middleName",
                                        eventType: "input",
                                        alertsErrorMassage: "",
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    data: {
                        rowData: [
                            {
                                colData: [
                                    {
                                        inputHeader: "Date of birth*",
                                        icon: this.iconsContent.calenderPrimary,
                                        value: this.extractedDetails.dob,
                                        name: "birthdate",
                                        eventType: "input",
                                        alertsErrorMassage: "",
                                        required: true,
                                        isDatePopover: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    radioBtnContent: {
                        header: {
                            title: "Gender*",
                            selectedValue: this.extractedDetails.sex,
                            name: "gender",
                            alertsErrorMassage: "",
                        },
                        data: [
                            {
                                name: "Male",
                                value: "M",
                                colSize: "4",
                            },
                            {
                                name: "Female",
                                value: "F",
                            },
                        ],
                    },
                },
            ]);
        this.nav('./manual');
    },
    extractDetails(inputString: string) {
        const parts = inputString.split("~");
        const idNumber = parts[1].slice(6, 14).trim();
        const dob = new Date(parts[9]);
        const sex = parts[8].charAt(0);
        const lastName = parts[4];
        const firstName = parts[6];
        const middleName = parts[7];
      return {
        idNumber,
        sex,
        dob,
        firstName,
        middleName,
        lastName
      };
    },
    simulateScan() {
      // Test data similar to your QR code input
      const testData = "03~I<MWI0SAX855JA6<<<<<<<<<<<<<<<~8707121M3307124MWI<<<<<<<<<<<6~BOLOKONYA<<MWAYANJANA<MAZIKO<<~BOLOKONYA~SAX855JA~MWAYANJANA~MAZIKO~Male~12 Jul 1987~19 Jul 2017~";
      this.onDecode(testData);
    },
    nav(url: any) {
            this.$router.push(url);
    },
}
});
</script>

<style scoped>
    .content{
        margin: 0 auto;
        width: 844px;
        width: 47vw;
        align-items: center;
    }
.header{
    color: var(--text_color, #00190E);
    text-align: center;
    /* h1 */
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 50px;
    margin-bottom: 20px;
}
.camera{
    align-items: center;
    width: 45vw;
    height: 350px;
    margin: 0 auto;
    border-radius:16px ;
}
.tree_dots{
    font-size: 30px;
    font-weight: 700;
    color: #000;
    text-align: center;
    padding-top: 20px;
    padding-bottom:10px;
}
.scan_status{
    color: var(--text_color, #00190E);
    text-align: center;
    /* title-xs */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    padding-bottom: 50px;
}
.scan_card{
    display: flex;
    width: 392px;
    height: 149px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
.scan_instraction{
    display: flex;
    width: 392px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;

    color: var(--Secondary, #636363);
    /* text-md */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
}
.checklist {
    list-style-type: none;
    padding-left: 0;
}

.checklist li:before {
    content: "\2713"; /* Unicode character for a check mark */
    color: green; /* Change the color of the check mark if needed */
    margin-right: 5px; /* Add some spacing between the check mark and the text */
}
</style>



