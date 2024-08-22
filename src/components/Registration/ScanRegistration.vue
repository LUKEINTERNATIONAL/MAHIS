<template>
    <div class="flex flex-col gap-2 mx-4 my-2">
        <div class="header"> National id scanner</div>
        <ScannerReader @scannerData="onDecode" class="w-fit" />
    </div>
</template>

<script setup lang="ts">
import ScannerReader from '@/components/ScannerReader.vue';
import { useRegistrationStore } from '@/stores/RegistrationStore';
import { modifyFieldValue, modifyRadioValue } from '@/services/data_helpers';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const $router = useRouter();
const status = useRegistrationStore();
const { personInformation } = storeToRefs(status);


const onDecode = async (content: string) => {
    const extractedDetails = await extractDetails(content);
   try{
    modifyFieldValue(personInformation.value, "nationalID", "value", extractedDetails.idNumber);
    modifyFieldValue(personInformation.value, "firstname", "value", extractedDetails.firstName);
    modifyFieldValue(personInformation.value, "middleName", "value", extractedDetails.middleName || "");
    modifyFieldValue(personInformation.value, "lastname", "value", extractedDetails.lastName);
    modifyFieldValue(personInformation.value, "birthdate", "value", extractedDetails.dob);
    modifyRadioValue(personInformation.value, "gender", "selectedValue", extractedDetails.sex);
   }catch(e){
       console.log(e);
       return;
   }
   $router.push('/registration/manual');
    // a service call will be done here
};

const extractDetails = async (inputString: string) => {
    const parts = inputString.split("~");
    const idNumber = parts[1].slice(6, 14).trim();
    const dob = parts[9];
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
}
</script>

<style scoped>
.content {
    margin: 0 auto;
    width: 844px;
    width: 47vw;
    align-items: center;
}

.header {
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

.camera {
    align-items: center;
    width: 45vw;
    height: 350px;
    margin: 0 auto;
    border-radius: 16px;
}

.tree_dots {
    font-size: 30px;
    font-weight: 700;
    color: #000;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;
}

.scan_status {
    color: var(--text_color, #00190E);
    text-align: center;
    /* title-xs */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    /* 24px */
    padding-bottom: 50px;
}

.scan_card {
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

.scan_instraction {
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
    line-height: 150%;
    /* 21px */
}

.checklist {
    list-style-type: none;
    padding-left: 0;
}

.checklist li:before {
    content: "\2713";
    /* Unicode character for a check mark */
    color: green;
    /* Change the color of the check mark if needed */
    margin-right: 5px;
    /* Add some spacing between the check mark and the text */
}
</style>
