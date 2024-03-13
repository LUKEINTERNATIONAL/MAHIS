<template>
    <!--  Presenting signs-->
    <ion-row>
        <ion-col class="left_row_col_separator">
            <ion-list>
                <ion-item class="dashed_bottom_border" style="font-weight: bold"> Any signs of injury? </ion-item>
                <div class="sub_item_body content_container">
                    <basic-form> </basic-form>
                </div>
                <ion-item class="sub_item_body_close" />
            </ion-list>
        </ion-col>
        <ion-col class="right_row_col_separator">
            <ion-list>
                <ion-item class="dashed_bottom_border" style="font-weight: bold"> Is there traumatic injury to abdomen? </ion-item>
                <div class="sub_item_body content_container">
                    <basic-form> </basic-form>
                </div>
                <ion-item class="sub_item_body_close" />
            </ion-list>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col>
            <ion-list>
                <ion-item class="dashed_bottom_border" style="font-weight: bold"> Any other signs indicative of violence? </ion-item>
                <div class="sub_item_body content_container">
                    <basic-form> </basic-form>
                </div>
                <ion-item class="sub_item_body_close" />
            </ion-list>
        </ion-col>
    </ion-row>
    <ion-row>
        <ion-col class="left_row_col_separator">
            <ion-list>
                <ion-item class="dashed_bottom_border" style="font-weight: bold"> Clinical enquiry for IPV conducted? </ion-item>
                <div class="sub_item_body content_container">
                    <basic-form> </basic-form>
                </div>
                <ion-item class="sub_item_body_close" />
            </ion-list>
        </ion-col>
        <ion-col class="right_row_col_separator">
            <ion-list>
                <ion-item class="dashed_bottom_border" style="font-weight: bold"> Has the woman subjected to any form of violence? </ion-item>
                <div class="sub_item_body content_container">
                    <basic-form> </basic-form>
                </div>
                <ion-item class="sub_item_body_close" />
            </ion-list>
        </ion-col>
    </ion-row>
</template>
<script setup lang="ts">
import { IonItem, IonList } from "@ionic/vue";
import BasicForm from "@/components/BasicForm.vue";
</script>
