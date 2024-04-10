<template>
        <ion-card>
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
                :placeholder="note_properties[0].placeHolder"
                :icon="searchOutline"
                :inputValue="note_properties[0].dataValue.value"
                @update:inputValue="note_properties[0].dataHandler"
            />
           
            </ion-col>
          </ion-row>

            <EasyDataTable
                :headers="headers"
                :items="items_local"
                :rows-per-page="10"
                :search-field="searchField"
                :search-value="searchValue"
            >
            <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
              <button :disabled="isFirstPage" @click="prevPage">
                prev page
              </button>
              <button :disabled="isLastPage" @click="nextPage">
                next page
              </button>
            </template>
          </EasyDataTable>
        </ion-card>
  </template>
  
  <script setup lang="ts">
  import type { Header, Item } from "vue3-easy-data-table"
  import { IonRow, IonCard, IonCol, IonList, IonLabel } from "@ionic/vue"
  import { ref, watch, computed, onMounted, onUpdated } from "vue"
  import BasicInputField from "@/components/BasicInputField.vue"
  import ListPicker from "./ListPicker.vue"
  import {
    addOutline,
    pencilOutline,
    searchOutline
} from "ionicons/icons"

  const searchField = ref("username")
  const searchValue = ref("")

  const searchFieldS = ref([]) as any

  const headers = ref<Header[]>( [] )
    // { text: "PLAYER", value: "player" },
  const items_local = ref<Item[]>([])
    // { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"}
  
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
  console.log(items_local.value)
})

watch(() => props.items,
    async (newValue) => {
      items_local.value = newValue 
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
</script>