<template>
        <ion-card style="margin-top: 0px;">
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
            
            <ion-col>
                <BasicInputField
                style="margin: 1%;"
                :placeholder="note_properties[0].placeHolder"
                :icon="searchOutline"
                :inputValue="note_properties[0].dataValue.value"
                @update:inputValue="note_properties[0].dataHandler"
            />
           
            </ion-col>
          </ion-row>

            <EasyDataTable
                table-class-name="customize-table"
                :headers="headers"
                :items="items_local"
                :rows-per-page="10"
                :search-field="searchField"
                :search-value="searchValue"
                :loading="pageIsLoading"
                @click-row="showRow"
            >

            <div id="row-clicked"></div>

              <template #loading>
                <img
                  src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                  style="width: 100px; height: 80px;"
                />
              </template>
              
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
  </template>
  
  <script setup lang="ts">
  import type { Header, Item } from "vue3-easy-data-table"
  import { IonRow, IonCard, IonCol, IonButton, IonLabel } from "@ionic/vue"
  import { ref, watch, computed, onMounted, onUpdated } from "vue"
  import BasicInputField from "@/components/BasicInputField.vue"
  import ListPicker from "./ListPicker.vue"
  import DynamicButton from "@/components/DynamicButton.vue"
  import {
    addOutline,
    pencilOutline,
    searchOutline,
    returnUpBackOutline,
    returnUpForwardOutline
    
} from "ionicons/icons"

  const searchField = ref("username")
  const searchValue = ref("")

  const searchFieldS = ref([]) as any
  const pageIsLoading = ref(true)

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
      console.log(newValue)

      items_local.value = newValue 

      console.log("qwweerrtkkk....")
      console.log(items_local.value)
    }
)

onMounted(async ()=>{
  headers.value = props.colums
})

onMounted(async ()=>{
  searchFieldS.value = props.search_fields
  console.log("*&*&^%#$")
  console.log(searchFieldS.value)
})

watch(() => props.search_fields,
    async (newValue) => {
      // searchFieldS.value = newValue 
    }
)

onMounted(async ()=>{
  items_local.value = props.items
  console.log("qwweerrt....")
  //
  console.log(items_local.value)
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
  ]

const list_picker_prperties = [
    {
        multi_Selection: false as any,
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
<style scoped>
  .customize-table {
  /* --easy-table-border: 1px solid #445269; */
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #006401;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #01060e;
  /* --easy-table-body-row-background-color: #2d3a4f; */
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 15px;

  /* --easy-table-body-row-hover-font-color: #2d3a4f; */
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1e8635;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

.btn-cls {
  font-size: 30px;
  font-weight: 400;
  color: #c0c7d2 !important;
}

</style>