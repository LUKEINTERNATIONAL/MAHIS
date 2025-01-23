<template>
  <ion-row class="search-container">
    <!-- Search Input and Button -->
    <ion-row class="search-row">
      <ion-col class="input-col">
        <BasicInputField
          :placeholder="note_properties[0].placeHolder"
          :icon="searchOutline"
          :inputValue="note_properties[0].dataValue.value"
          @update:inputValue="note_properties[0].dataHandler"
          :minHeight="40"
        />
      </ion-col>
      <ion-col class="button-col">
        <ion-button fill="solid" @click="OpenAddUserModal" class="btn-cls-2" style="float: right;">
          <ion-icon :icon="personAddOutline" slot="start" style="margin-right: 5px;"></ion-icon>
          {{ 'Add User' }}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-row>

  <!-- User Card List -->
  <ion-row>
    <user-card-list :users="items" :filterValue="searchValue" @reload="closeModal" />
  </ion-row>

  <!-- Add User Modal -->
  <addUserModal
    :is_open="isPopooverOpen"
    :user_id="user_id"
    @close-popoover="isPopooverOpen = false"
    @updated="reload"
  />
</template>

<script setup lang="ts">
import { IonRow, IonCol, IonIcon, IonButton } from "@ionic/vue";
import { ref, watch } from "vue";
import BasicInputField from "@/components/BasicInputField.vue";
import UserCardList from './userCardList.vue';
import addUserModal from "../views/UserManagement/addUserModal.vue";
import { personAddOutline, searchOutline } from "ionicons/icons";

const searchValue = ref("");
const isPopooverOpen = ref(false);
const user_id = ref('');

const props = defineProps<{
  items: any;
  search_fields: any;
}>();

const note_properties = [
  {
    placeHolder: 'Search for username',
    dataHandler: notesUpDated_fn1,
    dataValue: ref(),
    show_error: ref(false),
    error_message: 'Please provide a reason',
  },
];

function OpenAddUserModal() {
  isPopooverOpen.value = true;
  user_id.value = '';
}

function notesUpDated_fn1(event: any) {
  const reason = event.target.value;
  searchValue.value = reason;
}

function reload(user_id: any) {
  emit("reload", user_id);
}

function closeModal(data: any) {
  emit("closeModal", data);
}

const emit = defineEmits<{
  (e: "reload", ObjectsArray: any): void;
  (e: "closeModal", value: any): void;
}>();
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center; /* Center the search row horizontally */
  align-items: center; /* Center the search row vertically */
  width: 100%;
  padding: 16px; /* Add some padding */
}

.search-row {
  display: flex;
  justify-content: space-between; /* Space between input and button */
  align-items: center; /* Center items vertically */
  width: 100%;
  max-width: 800px; /* Limit the width for larger screens */
}

.input-col {
  flex: 1; /* Allow the input to grow and take available space */
}

.button-col {
  flex: 0 0 auto; /* Prevent the button from growing */
}

.btn-cls-2 {
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .search-row {
    flex-direction: column; /* Stack input and button vertically on small screens */
    gap: 8px; /* Reduce gap for small screens */
  }

  .input-col,
  .button-col {
    width: 100%; /* Full width for small screens */
    margin-right: 0; /* Remove margin on small screens */
  }

  .btn-cls-2 {
    width: 100%; /* Full width button on small screens */
  }
}
</style>