<template>
        <ion-card style="margin-top: 0px; background-color: inherit;">
          <ion-row>
            <ion-col>
              <ListPicker
                  :multiSelection="list_picker_prperties[0].multi_Selection"
                  :show_label="list_picker_prperties[0].show_list_label"
                  :uniqueId="list_picker_prperties[0].unqueId"
                  :name_of_list="list_picker_prperties[0].name_of_list"
                  :choose_place_holder="list_picker_prperties[0].placeHolder"
                  :items_-list="searchFieldS"
                  :use_internal_filter="list_picker_prperties[0].use_internal_filter"
                  :disabled="list_picker_prperties[0].disabled.value"
                  @item-list-up-dated="list_picker_prperties[0].listUpdatedFN"
                  @item-list-filtered="list_picker_prperties[0].listFilteredFN"
                  @item-search-text="list_picker_prperties[0].searchTextFN"
              />
            </ion-col>
            
            <ion-col style="margin-top: 5px;">
                <ion-row>
                  <ion-col size="9">
                    <BasicInputField
                      :placeholder="note_properties[0].placeHolder"
                      :icon="searchOutline"
                      :inputValue="note_properties[0].dataValue.value"
                      @update:inputValue="note_properties[0].dataHandler"
                    />
                  </ion-col>
                  <ion-col>
                    <dynamic-button
                      class="btn-cls-2"
                        v-if="dynamic_button_properties[2].addItemButton"
                            :name="dynamic_button_properties[2].name"
                            :fill="dynamic_button_properties[2].btnFill"
                            :icon="personAddOutline"
                            @clicked:btn="OpenAddUserModal"
                            :color="'secondary'"
                      />
                  </ion-col>
                </ion-row>
           
            </ion-col>
          </ion-row>
        </ion-card>

        <ion-card style="margin-top: 0px;">
          <EasyDataTable
            table-class-name="modern-table"
            :headers="headers"
            :items="items_local"
            :rows-per-page="10"
            :search-field="searchField"
            :search-value="searchValue"
            :loading="pageIsLoading"
            :body-row-class-name="getBodyRowClassName"
            @click-row="showRow"
          >

            <div id="row-clicked"></div>
              <!-- 
              <template #loading>
                <img
                  src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                  style="width: 100px; height: 80px;"
                />
              </template> -->
              
              <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">

                <ion-row class="spc_btwn" v-if="dynamic_button_properties[0].showAddItemButton">
                  <dynamic-button
                    class="btn-cls"
                      v-if="dynamic_button_properties[0].addItemButton"
                          :name="dynamic_button_properties[0].name"
                          :fill="dynamic_button_properties[0].btnFill"
                          :icon="returnUpBackOutline"
                          @clicked:btn="prevPage"
                          :color="''"
                    />

                  <dynamic-button
                  class="btn-cls"
                    v-if="dynamic_button_properties[1].addItemButton"
                        :name="dynamic_button_properties[1].name"
                        :fill="dynamic_button_properties[1].btnFill"
                        :icon="returnUpForwardOutline"
                        @clicked:btn="nextPage"
                        :color="''"
                  />
                </ion-row>
              </template>
          </EasyDataTable>
        </ion-card>

        <addUserModal
            :is_open="isPopooverOpen"
            :user_id="user_id"
            @close-popoover="isPopooverOpen = false"
        />
        
  </template>
  
  <script setup lang="ts">
  import type { Header, Item, BodyRowClassNameFunction, HeaderItemClassNameFunction, BodyItemClassNameFunction } from "vue3-easy-data-table"
  import { IonRow, IonCard, IonCol, IonButton, IonLabel } from "@ionic/vue"
  import { ref, watch, computed, onMounted, onUpdated } from "vue"
  import BasicInputField from "@/components/BasicInputField.vue"
  import ListPicker from "./ListPicker.vue"
  import DynamicButton from "@/components/DynamicButton.vue"
  import addUserModal from "../views/UserManagement/addUserModal.vue"
  import {
    addOutline,
    pencilOutline,
    searchOutline,
    returnUpBackOutline,
    returnUpForwardOutline,
    personAddOutline
    
} from "ionicons/icons"

  const searchField = ref("username")
  const searchValue = ref("")

  const getBodyRowClassName: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
    let cls = rowNumber % 2 === 0 ? "even-row" : "odd-row"
    return cls
  }

  const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
    if (item.score < 60) return 'fail-row'
    return 'pass-row'
  }


  const searchFieldS = ref([]) as any
  const pageIsLoading = ref(true)
  const isPopooverOpen = ref(false)
  const user_id = ref('')

  const headers = ref<Header[]>( [] )
  const items_local = ref<Item[]>([])

  type ClickRowArgument = Item & {
    isSelected?: boolean,
    indexInCurrentPage?: number,
  }

  const props = defineProps<{
    colums: any,
    items: any,
    search_fields: [{}],
  }>()

watch(
    () => props.colums,
    async (newValue) => {
      headers.value = newValue 
    }
)

watch(
    () => props.items,
    async (newValue) => {
      // console.log(newValue)

      items_local.value = newValue 

      // console.log("qwweerrtkkk....")
      // console.log(items_local.value)
    }
)

onMounted(async ()=>{
  headers.value = props.colums
})

onMounted(async ()=>{
  searchFieldS.value = props.search_fields
  // console.log("*&*&^%#$")
  // console.log(searchFieldS.value)
})

watch(() => props.search_fields,
    async (newValue) => {
      // searchFieldS.value = newValue 
    }
)

onMounted(async ()=>{
  items_local.value = props.items
  // console.log("qwweerrt....")
  //
  // console.log(items_local.value)
})

watch(() => props.items,
    async (newValue) => {
      items_local.value = newValue
      pageIsLoading.value = false 
    }
)

const note_properties = [
    {
        placeHolder: searchValue.value,
        dataHandler: notesUpDated_fn1,
        dataValue: ref(),
        show_error: ref(false),
        error_message: 'please provide a reason'
    },
]

function OpenAddUserModal() {
    isPopooverOpen.value = true
    user_id.value = ''
}

const dynamic_button_properties = [
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "prev page",
        btnFill: 'clear',
        fn: ()=>{},
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "next page",
        btnFill: 'clear',
        fn: ()=>{},
    },
    {
        showAddItemButton: true,
        addItemButton: true,
        name: "ADD USER",
        btnFill: 'fill',
        fn: ()=>{},
    },
    
  ]

const list_picker_prperties = [
    {
        multi_Selection: true as any,
        show_list_label: true as any,
        unqueId: 'qwerty_3' as any,
        name_of_list: 'search field' as any,
        placeHolder: 'Search for a field' as any,
        items: [],
        listUpdatedFN: listUpdated1,
        listFilteredFN: ()=>{},
        searchTextFN: ()=>{},
        use_internal_filter: true as any,
        show_error: ref(false),
        error_message: 'please select a User',
        disabled: ref(false) as any,
    }
]

function notesUpDated_fn1(event: any) {
    const reason = event.target.value
    searchValue.value = reason
}

function listUpdated1(data: any) {
  searchFieldS.value = data
  searchFieldS.value.forEach((item: any) => {
    if (item.selected == true) {
      searchField.value = item.value
    }
  })
}

const emit = defineEmits<{
    (e: "clickRow", ObjectsArray: any): void
}>()

function clickRow(data: any) {
    emit("clickRow", data)
}

const showRow = (item: ClickRowArgument) => {
  clickRow(item)
}
</script>
<style>
.modern-table {
  --easy-table-border: 1px solid #e0e0e0;
  --easy-table-row-border: 1px solid #f0f0f0;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #333;
  --easy-table-header-background-color: #f9f9f9;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #333;
  --easy-table-body-even-row-background-color: #ffffff;

  --easy-table-body-row-font-color: #333;
  --easy-table-body-row-background-color: #f9f9f9;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #000;
  --easy-table-body-row-hover-background-color: #f0f0f0;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #f9f9f9;
  --easy-table-footer-font-color: #333;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #f1f1f1;
  --easy-table-scrollbar-color: #e1e1e1;
  --easy-table-scrollbar-thumb-color: #c1c1c1;
  --easy-table-scrollbar-corner-color: #f1f1f1;

  --easy-table-loading-mask-background-color: rgba(255, 255, 255, 0.5);

  /* Modern additions */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Additional modern styles */
.modern-table th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-table td, .modern-table th {
  transition: all 0.3s ease;
}

.modern-table tbody tr {
  cursor: pointer;
}

.modern-table tbody tr:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-table {
    --easy-table-body-row-font-size: 12px;
    --easy-table-body-item-padding: 8px 10px;
  }
}

.even-row {
  --easy-table-body-row-background-color: #f5f5f5;
  --easy-table-body-row-font-color: #333;
}

.odd-row {
  --easy-table-body-row-background-color: #e0e0e0;
  --easy-table-body-row-font-color: #333;
}


.btn-cls {
  font-size: 30px;
  font-weight: 400;
  color: #c0c7d2 !important;
}

.btn-cls-2 {
  font-size: 30px;
  font-weight: 400;
  color: #1d1d16 !important;
}

</style>