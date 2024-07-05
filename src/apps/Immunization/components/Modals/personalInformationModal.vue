<template>
    <div v-if="showModal"  class="pim-cls-1 modal_wrapper">
      <div class="ion-padding pim-cls-1">        
        <div>
          <div class="center text_12">
            <ion-button style="color:white;background-color:#54B4D3;" class="PI-cls-1" @click="toggleSection('personalInfo')">Personal Information</ion-button>
            <div v-show="activeSection === 'personalInfo'">
            <div v-if="!editMode" v-show="activeSection === 'personalInfo'">
              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Fullname:</ion-label>
                    </ion-col>
                    <ion-col>
                         <ion-label class="lbl-ct">{{ demographics.name }}</ion-label>                     
                    </ion-col>
                  </ion-row>
                </ion-col>                
              </ion-row>
            </div>
            <div v-else>
                  <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.given_name" class="lbl-tl">First Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <BasicInputField
                          v-model="editableDemographics.given_name"
                             :placeholder="'First Name'"
                             :inputValue="editableDemographics.given_name"
                      @update:inputValue="updateFieldDemographics($event,'given_name')"
                             :icon="personCircleOutline"/>                    
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.middle_name" class="lbl-tl">Middle Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <BasicInputField
                              v-model="editableDemographics.middle_name"
                              :placeholder="'Middle Name'"
                              :inputValue="editableDemographics.middle_name" 
                              @update:inputValue="updateFieldDemographics($event,'middle_name')"
                              :icon="personCircleOutline"/>
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.family_name" class="lbl-tl">Family Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <BasicInputField
                              v-model="editableDemographics.family_name"
                         :placeholder="'Family Name'"
                         :inputValue="editableDemographics.family_name"
                         @update:inputValue="updateFieldDemographics($event,'family_name')"
                                :icon="personCircleOutline"/>
                  </ion-col>
                </ion-row>
            </div>

              
              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Sex:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'personalInfo'">
                        <ion-label class="lbl-ct">{{ demographics.gender == "M" ? "Male" : "Female" }}</ion-label>
                      </div>
                      <div v-else>                             
                        <vue-multiselect
                          v-model="selectedGender"
                           :options="genderOptions"
                           :inputValue="editableDemographics.gender"
                           :multiple="false"
                           :hide-selected="false"
                           :close-on-select="true"
                           :searchable="true"
                           :track-by="'value'"
                           :label="'name'"
                          :open-direction="'bottom'">
                        </vue-multiselect>
                      </div>
                     
                    </ion-col>
                  </ion-row>
                </ion-col>
                
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Date of Birth:</ion-label>
                    </ion-col>
                    <ion-col >
                        <div v-if="!editMode" v-show="activeSection === 'personalInfo'">
                            <ion-label class="lbl-ct">{{ formatBirthdate() }}</ion-label>
                        </div>
                        <div v-else> 
                          <DateInputField
                            v-model="editableDemographics.birthdate"                            
                            :icon="calendarOutline"
                            :iconRight="'right'"
                            :inputValue="editableDemographics.birthdate"
                            @update:dateValue ="updateFieldDemographics($event,'birthdate')"
                            :maxDate="new Date().toISOString().split('T')[0]"
                        />
                        </div>
                    </ion-col>
                  </ion-row>
                </ion-col>                
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Phone:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'personalInfo'">
                        <ion-label class="lbl-ct">{{ demographics.phone }}</ion-label>
                      </div>
                      <div v-else> 
                        <BasicInputField
                              v-model="editableDemographics.phone"
                                :icon="clipboardOutline"
                         :inputValue="editableDemographics.phone"
                         @update:inputValue ="updateFieldDemographics($event,'phone')"
                                />
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>
            </div>
  
            <hr class="dashed-hr" />
            
              <ion-button style="color:white;width:200px"  class="PI-cls-1" @click="toggleSection('socialHistory')">Social History</ion-button>
              <div  v-show="activeSection === 'socialHistory'">
                <ion-row class="form-row">
                  <ion-col >
                    <ion-label class="lbl-tl">Religion:</ion-label>
                  </ion-col>
                  <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'socialHistory'">
                         <ion-label class="lbl-ct">{{ editableSocialhistory.religion }}</ion-label>
                      </div>
                      <div v-else>
                      <vue-multiselect
                        v-model="selectedReligion"
                       :options="religionData"
                       :max-height="150"
                       :inputValue="editableSocialhistory.religion"
                       :multiple="false"
                       :hide-selected="false"
                       :close-on-select="true"
                       :searchable="true"
                       :track-by="'name'"
                       :label="'name'"
                       :open-direction="'bottom'"
                       ></vue-multiselect>
                       </div>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Occuption:</ion-label>
                  </ion-col>
                  <ion-col>
                    <div v-if="!editMode" v-show="activeSection === 'socialHistory'">
                       <ion-label class="lbl-ct">{{ editableSocialhistory.occupation }}</ion-label>
                    </div>
                    <div v-else>
                      <vue-multiselect
                        v-model="selectedOccupation"
                       :options="occupationData"
                       :inputValue="editableSocialhistory.occupation"
                       :multiple="false"
                       :max-height="150"
                       :hide-selected="false"
                       :close-on-select="true"
                       :searchable="true"
                       :track-by="'value'"
                       :label="'name'"
                      :open-direction="'bottom'"
                       ></vue-multiselect>
                      </div>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Marital Status:</ion-label>
                  </ion-col>
                  <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'socialHistory'">
                        <ion-label class="lbl-ct">{{ editableSocialhistory.maritalstatus }}</ion-label>
                      </div>
                      <div v-else>
                      <vue-multiselect
                        v-model="selectedMarital"
                       :options="maritalStatusData"
                       :inputValue="editableSocialhistory.maritalstatus"
                       :multiple="false"
                       :max-height="150"
                       :hide-selected="false"
                       :close-on-select="true"
                       :searchable="true"
                       :track-by="'value'"
                       :label="'name'"
                       :open-direction="'bottom'"
                       ></vue-multiselect>
                       </div>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">                  
                    <ion-col >
                       <ion-label class="lbl-tl">Highest Level of Education:</ion-label>
                  </ion-col>
                  <ion-col>
                        <div v-if="!editMode" v-show="activeSection === 'socialHistory'">
                             <ion-label class="lbl-ct">{{ editableSocialhistory.highesteducation }}</ion-label>
                        </div>
                        <div v-else>
                        <vue-multiselect
                        v-model="selectedEducation"
                       :options="educationData"
                       :inputValue="editableSocialhistory.highesteducation"
                       :multiple="false"
                       :max-height="150"
                       :hide-selected="false"
                       :close-on-select="true"
                       :searchable="true"
                       :track-by="'value'"
                       :label="'name'"
                      :open-direction="'bottom'"
                       ></vue-multiselect>
                       </div>
                  </ion-col>
                </ion-row>
                </div>
              <hr class="dashed-hr" />
                    
  
            <ion-button style="color:white;" class="PI-cls-1" @click="toggleSection('guardianInfo')">Guardian Information</ion-button>
            <div v-show="activeSection === 'guardianInfo'">  
            <div v-if="!editMode">              
              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">FullName:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">{{ `${editableGuardian.given_name} ${editableGuardian.middle_name} ${editableGuardian.family_name}`  }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>                
              </ion-row>
            </div>
            <div v-else>
              <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Given name:</ion-label>
                      </ion-col>
                      <ion-col>
                        <BasicInputField
                              v-model="editableGuardian.given_name"
                                :icon="personCircleOutline"
                            :inputValue="editableGuardian.given_name"
                            @update:inputValue ="updateFieldGuardian($event,'given_name')"
                                />
                       </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Middle name:</ion-label>
                      </ion-col>
                      <ion-col>
                        <BasicInputField
                              v-model="editableGuardian.middle_name"
                                :icon="personCircleOutline"
                            :inputValue="editableGuardian.middle_name"
                            @update:inputValue ="updateFieldGuardian($event,'middle_name')"
                                />
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Family Name</ion-label>
                      </ion-col>
                      <ion-col>
                        <BasicInputField
                              v-model="editableGuardian.family_name"
                                :icon="personCircleOutline"
                            :inputValue="editableGuardian.family_name"
                            @update:inputValue ="updateFieldGuardian($event,'family_name')"
                                />
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row> 

            </div>

              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Relationship:</ion-label>
                    </ion-col>
                    <ion-col>
                          <div v-if="!editMode" v-show="activeSection === 'guardianInfo'"> 
                             <ion-label class="lbl-ct">{{ editableGuardian.relationship }}</ion-label>
                          </div>
                          <div v-else>
                            <vue-multiselect
                               v-model="selectedRelationship"
                                 :options="relationshipsData"
                                 :inputValue="editableGuardian.relationship"
                                 :multiple="false"
                                 :max-height="150"
                                 :hide-selected="false"
                                 :close-on-select="true"
                                 :searchable="true"
                                 :track-by="'value'"
                                 :label="'b_is_to_a'"
                                 :open-direction="'bottom'">
                                </vue-multiselect>
                       </div>
                    </ion-col>
                  </ion-row>
                </ion-col>                
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Phone:</ion-label>
                    </ion-col>
                    <ion-col>
                       <div v-if="!editMode" v-show="activeSection === 'guardianInfo'"> 
                            <ion-label class="lbl-ct">{{ editableGuardian.phone }}</ion-label>
                       </div>
                       <div v-else>
                           <BasicInputField
                                 v-model="editableGuardian.phone"
                                :icon="clipboardOutline"
                                :inputValue="editableGuardian.phone"
                                 @update:inputValue ="updateFieldGuardian($event,'phone')"
                                />
                       </div>
                    </ion-col>
                  </ion-row>
                </ion-col>                
              </ion-row>
            
            </div>
            </div>
  
            <hr class="dashed-hr" />
  
            <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" @click="toggleSection('addressInfo')">Current Location</ion-button>
            <div v-show="activeSection === 'addressInfo'">
              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">District:</ion-label>
                    </ion-col>
                    <ion-col>
                            <div v-if="!editMode" v-show="activeSection === 'addressInfo'">
                               <ion-label class="lbl-ct">{{ patient.person.addresses[0].state_province }}</ion-label>
                            </div>
                            <div v-else>
                              <vue-multiselect
                                v-model="selectedDistrict"
                                 :options="districtList"
                                 :inputValue="editableAddress.current_district"
                                 :multiple="false"
                                 :max-height="150"
                                 :hide-selected="false"
                                 :close-on-select="true"
                                 :searchable="true"
                                 :track-by="'name'"
                                 :label="'name'"
                                 :open-direction="'bottom'"
                                 @update:model-value="fetchTraditionalAuthorities($event.name,'current_location')"
                        ></vue-multiselect>

                            </div>
                    </ion-col>
                  </ion-row>
                </ion-col>

              </ion-row>
              <ion-row>
                <ion-col>
                    <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Traditional Authority:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'addressInfo'">
                            <ion-label class="lbl-ct">{{ patient.person.addresses[0].township_division }}</ion-label>
                      </div>
                      <div v-else>
                        <vue-multiselect
                        v-model="selectedTaList"
                        :options="taList"
                        :max-height="150"
                        :inputValue="editableAddress.current_traditional_authority"
                        :multiple="false"
                        :hide-selected="false"
                        :close-on-select="true"
                        :searchable="true"
                        :track-by="'name'"
                        :label="'name'"
                        :open-direction="'bottom'"
                        @update:model-value="fetchVillages(taList,$event.name,'current_location')"
                        ></vue-multiselect>

                      </div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Village:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'addressInfo'">
                          <ion-label class="lbl-ct">{{ patient.person.addresses[0].city_village }}</ion-label>
                      </div>
                      <div v-else>
                        <vue-multiselect
                          v-model="selectedVillageList"
                          :options="villageList"
                          :inputValue="editableAddress.current_village"
                          :multiple="false"
                          :max-height="150"
                          :hide-selected="false"
                          :close-on-select="true"
                          :searchable="true"
                          :track-by="'name'"
                          :label="'name'"
                          :open-direction="'bottom'">
                          </vue-multiselect>
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                    <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Closet Landmark:</ion-label>
                    </ion-col>
                    <ion-col>
                        <div v-if="!editMode" v-show="activeSection === 'addressInfo'">
                            <ion-label class="lbl-ct">{{ editableAddress.landmark }}</ion-label>
                        </div>
                        <div v-else>
                          <vue-multiselect
                          v-model="selectedlandmark"
                          :options="landMarkData"
                          :inputValue="editableAddress.landmark"
                          :multiple="false"
                          :hide-selected="false"
                          :close-on-select="true"
                          :searchable="true"
                          :max-height="150"
                          :track-by="'name'"
                          :label="'name'"
                          :open-direction="'bottom'">
                          </vue-multiselect>
                        </div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
            </div>
            </div>
            <hr class="dashed-hr" />

            <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" @click="toggleSection('homeInfo')">Home Location</ion-button>
            <div v-show="activeSection === 'homeInfo'">
              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">District:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'homeInfo'">
                            <ion-label class="lbl-ct">{{ patient.person.addresses[0].address2 }}</ion-label>
                     </div>
                    <div v-else>                         
                      <vue-multiselect
                        v-model="selectedDistrictHome"
                        :options="districtList"
                        :inputValue="editableHomelocation.home_district"
                        :multiple="false"
                        :max-height="150"
                        :hide-selected="false"
                        :close-on-select="true"
                        :searchable="true"
                        :track-by="'name'"
                        :label="'name'"
                        :open-direction="'bottom'"
                        @update:model-value="fetchTraditionalAuthorities($event.name,'home_location')">
                       </vue-multiselect>                      
                    </div>
                    </ion-col>
                  </ion-row>
                </ion-col>

              </ion-row>
              <ion-row>
                <ion-col>
                    <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Traditional Authority:</ion-label>
                    </ion-col>
                    <ion-col>
                      <div v-if="!editMode" v-show="activeSection === 'homeInfo'">
                            <ion-label class="lbl-ct">{{ patient.person.addresses[0].county_district }}</ion-label>
                      </div>
                      <div v-else>
                        <vue-multiselect
                        v-model="selectedTaHome"
                        :options="HometaList"
                        :inputValue="editableHomelocation.home_traditional_authority"
                        :multiple="false"
                        :max-height="150"
                        :hide-selected="false"
                        :close-on-select="true"
                        :searchable="true"
                        :track-by="'name'"
                        :label="'name'"
                        :open-direction="'bottom'"
                        @update:model-value="fetchVillages(HometaList,$event.name,'home_location')"
                        ></vue-multiselect>
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Village:</ion-label>
                    </ion-col>
                    <ion-col>
                       <div v-if="!editMode" v-show="activeSection === 'homeInfo'">
                                 <ion-label class="lbl-ct">{{ patient.person.addresses[0].neighborhood_cell }}</ion-label>
                       </div>
                       <div v-else>
                        <vue-multiselect
                        v-model="selectedVillageHome"
                        :options="HomevillageList"
                        :inputValue="editableHomelocation.home_village"
                        :multiple="false"
                        :max-height="150"
                        :hide-selected="false"
                        :close-on-select="true"
                        :searchable="true"
                        :track-by="'name'"
                        :label="'name'"
                        :open-direction="'bottom'">
                        </vue-multiselect>

                       </div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>            
            </div> 
            </div> 
            <hr class="dashed-hr" style="margin-bottom: 0px !important" />
        
      <ion-footer :translucent="true" class="ion-no-border">
        <ion-row>
          <ion-col>
            <ion-button
              id="cbtn"
           class="btnText cbtn"
            fill="solid"
           style="width: 130px"
           @click="handleCancel"
          >
           Cancel
         </ion-button>

          </ion-col>
          <ion-col>
            <DynamicButton
              :name="editMode ? 'Save' : 'Edit Info'"
              fill="solid"
              :icon="editMode ? '' : createOutline"
              style="float: right; margin: 2%;width: 130px"
              @click="toggleEditMode"
            />
          </ion-col>
        </ion-row>
      </ion-footer>
    </div>
  </template>
  

<script lang="ts">
import { defineComponent, ref, computed, onMounted  } from "vue";
import { modalController,IonItem, IonList, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonIcon, IonToolbar, IonSearchbar, IonPopover, IonRow, IonCol, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonFooter } from "@ionic/vue";
import { notificationsOutline, personCircleOutline, createOutline, clipboardOutline,calendarOutline } from "ionicons/icons";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { PatientRegistrationService } from "@/services/patient_registration_service";
import { mapState,mapActions } from "pinia";
import HisDate from "@/utils/Date";
import { modifyFieldValue, getFieldValue, getRadioSelectedValue } from "@/services/data_helpers";
import BasicInputField from "@/components/BasicInputField.vue";
import { PersonService } from "@/services/person_service";
import { PatientService } from "@/services/patient_service";
import { RelationshipService } from "@/services/relationship_service";
import { RelationsService } from "@/services/relations_service";
import { LocationService } from "@/services/location_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import vSelect from "vue-select";
import VueMultiselect from "vue-multiselect";
import DateInputField from "@/components/DateInputField.vue";
import "vue-select/dist/vue-select.css";

type DemographicFields = 'given_name' | 'middle_name' | 'family_name' | 'phone' | 'birthdate';
type GuardianFields = 'given_name' | 'middle_name' | 'family_name' | 'phone' ;

export default defineComponent({
    name: "Home",
    username: "",
    components: {
        IonContent,
        IonHeader,
        IonMenuButton,
        IonSearchbar,
        IonPage,
        IonTitle,
        IonToolbar,
        ToolbarSearch,
        IonIcon,
        IonPopover,
        IonRow,
        IonCol,
        IonLabel,
        IonInput,
        IonDatetime,
        IonSelect,
        IonSelectOption,
        IonFooter,
        DynamicButton,
        BasicInputField,
        vSelect,
        VueMultiselect,
        DateInputField,
    },
    data() {
        return {
                   vaccineName: "" as string,
                     showModal: true,
         editableDemographics : ref({ given_name: "",
                middle_name: "",
                family_name: "",
                gender: "",
                birthdate: "",
                phone: ""}),
          editableGuardian :ref({
                given_name: "Unknown",
                middle_name: "Unknown",
                family_name: "Unknown",
                relationship: "Unknown",
                phone: "Unknown",
            }),
          editableAddress : ref({
              current_district: "",
               current_village: "",
              current_traditional_authority: "",
              landmark:""

            }),
          editableHomelocation : ref({
                home_district: "",
                home_village: "",
                home_traditional_authority: ""
            }),
            editableSocialhistory :ref({
                occupation: "",
                religion: "",
                maritalstatus: "",
                highesteducation: "",
            }),
          editMode :ref(false),
          activeSection :ref('personalInfo'),
             popoverOpen: false,
                   event: null as any,
                guardianData: [] as any,
                district_id: 0,
                districtList: [] as any,
                taList: [] as any,
                villageList: [] as any,
                HometaList: [] as any,
                HomevillageList: [] as any,
                religionData: [],
                occupationData: [{ name: "Employed", value: "employed" },
                                 { name: "Student",  value: "Student"  },
                                 { name: "Unemployed",alue: "unemployed"},
                                 { name: "Other",    value: "Other" }],
                landMarkData: [],
              relationshipsData: [] as any,
                genderOptions: [
                                 { name: 'Male', value: 'M' },
                                 { name: 'Female', value: 'F' }
                               ],                
             maritalStatusData: [],
               educationData: [
                                { name: "No education", value: "No education"},
                                { name: "Primary school", value: "primary school"},
                                { name: "Secondary school", value: "secondary school"},
                                { name: "Tertiary education",value: "tertiary education"},
                              ]   
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics","patient"]), 
        ...mapState(useRegistrationStore, ["personInformation","socialHistory","homeLocation","currentLocation","guardianInformation"]),

  selectedGender: {
      get() {   return this.genderOptions.find( (option:any) => option.value === this.editableDemographics.gender ); },
      set(newValue: any) {  if(newValue!=null) this.editableDemographics.gender = newValue.value;
                            else this.editableDemographics.gender = ""},
    }, 
  selectedReligion: {
     get() { return this.religionData.find( (option: any) => option.name === this.editableSocialhistory.religion);},
     set(newValue: any) {  if(newValue !=null) this.editableSocialhistory.religion = newValue.name;
                           else this.editableSocialhistory.religion = ""  },
  },
  selectedOccupation: {
    get() { return this.occupationData.find((option:any) => option.value === this.editableSocialhistory.occupation );},
    set(newValue: any) { if(newValue!=null) this.editableSocialhistory.occupation = newValue.value;
                         else this.editableSocialhistory.occupation = "" },
  },
  selectedEducation: {
    get() { return this.educationData.find( option => option.value === this.editableSocialhistory.highesteducation);},
    set(newValue: any) { if(newValue!=null) this.editableSocialhistory.highesteducation = newValue.value;
                         else this.editableSocialhistory.highesteducation = "" },
  },
  selectedMarital: {
    get() { return this.maritalStatusData.find((option: any) => option.value === this.editableSocialhistory.maritalstatus);},
    set(newValue: any) { if(newValue!=null) this.editableSocialhistory.maritalstatus = newValue.value;
                         else this.editableSocialhistory.maritalstatus = ""},
  }, 
  selectedRelationship: {
    get() {return this.relationshipsData.find((option:any) => option.b_is_to_a === this.editableGuardian.relationship);},
    set(newValue: any) { if(newValue!=null) this.editableGuardian.relationship = newValue.b_is_to_a;
                         else this.editableGuardian.relationship = ""},
  },
  selectedDistrict: {
      get() {return this.districtList.find((option:any) => option.name === this.editableAddress.current_district); },
      set(newValue: any) { if(newValue!=null) this.editableAddress.current_district = newValue.name;
                           else this.editableAddress.current_district = "" },
    }, 
    selectedTaList: {
       get() { return this.taList.find((option:any) => option.name === this.editableAddress.current_traditional_authority );},
      set(newValue: any) { if(newValue!=null) this.editableAddress.current_traditional_authority = newValue.name; 
                           else this.editableAddress.current_traditional_authority = ""},
    },
    selectedVillageList: {
      get() { return this.villageList.find((option:any) => option.name === this.editableAddress.current_village );},
      set(newValue: any) {if(newValue!=null) this.editableAddress.current_village = newValue.name; 
                          else this.editableAddress.current_village = "" }
    },
    selectedlandmark: {
      get() { return this.landMarkData.find((option:any) => option.name === this.editableAddress.landmark); },
      set(newValue: any) { if(newValue!=null) this.editableAddress.landmark = newValue.name; 
                           else this.editableAddress.landmark = ""},
    },
    selectedDistrictHome: {
      get() { return this.districtList.find((option:any) => option.name === this.editableHomelocation.home_district);},
      set(newValue: any) {if(newValue!=null) this.editableHomelocation.home_district = newValue.name;
                          else this.editableHomelocation.home_district = ""},
    },
     selectedTaHome: {
      get() { return this.HometaList.find((option:any) => option.name === this.editableHomelocation.home_traditional_authority);},
      set(newValue: any) { if(newValue!=null) this.editableHomelocation.home_traditional_authority = newValue.name;
                           else this.editableHomelocation.home_traditional_authority = ""},
    },
    selectedVillageHome: {
      get() { return this.HomevillageList.find((option:any) => option.name === this.editableHomelocation.home_village );},
      set(newValue: any) { if(newValue!=null) this.editableHomelocation.home_village = newValue.name;
                           else this.editableHomelocation.home_village = "" },
    }
          
         
    },
    watch: {
        demographics: {
            handler() {          
                this.setEditableValues();
            },
            immediate: true,
        },
    },
    async mounted() {           
           this.religionData = getFieldValue(this.socialHistory, "religion", "multiSelectData");
           this.landMarkData = getFieldValue(this.currentLocation, "closestLandmark", "multiSelectData");
           this.maritalStatusData = this.getRadioValue(this.socialHistory, 2);
           this.buildCurrentLocations();           
    },
    setup() {  
      const createSelector = (dataList: any[], editableField: any, key: string) => {
      return {
        get() {
          return dataList.find(option => option[key] === editableField.value);
        },
        set(newValue: { [x: string]: any; } | null) {
          if (newValue != null) {
            editableField.value = newValue[key];
          }
        }
      };
    };   
            return {notificationsOutline,personCircleOutline,createOutline,clipboardOutline,calendarOutline};          
    },
    methods: {
        ...mapActions(useDemographicsStore, ["setDemographics","setPatient"]),
        nav(url: any) {
            this.$router.push(url);
        },
        getRadioValue(data: any, section: any) {
            return data[section].radioBtnContent.data;
        },
        toggleEditMode() {
            if (this.editMode) {
                this.saveDetails();
            }
            this.editMode = !this.editMode;           
        },
      handleCancel() {
         if (this.editMode) {
                  this.closePopup();
          } else {
            modalController.dismiss()
          }
       },
        closePopup() {
            this.editMode = false;
        },
        closeModal(){
          this.showModal = false;
        },
        toggleSection(section: string) {
          this.activeSection = this.activeSection === section ? "" : section;
        },
        updateFieldDemographics(event: any, fields: DemographicFields) {
              const isValidDate = (date: any): boolean => !isNaN(new Date(date).getTime());
           this.editableDemographics[fields] = isValidDate(event) ? event : event.target.value;
        },
        updateFieldGuardian (event: any, fields: GuardianFields) {
                this.editableGuardian[fields] = event.target.value;
       },
        openPopover(e: Event) {
            this.event = e;
            this.popoverOpen = true;
        },
        async buildCurrentLocations() {            
            
            this.districtList = [];
            for (let i of [1, 2, 3]) {
                const districts: any = await LocationService.getDistricts(i);
                this.districtList.push(...districts);
            }
            
              if(this.editableAddress.current_district) {
                const defaultDistrict = this.districtList.find(
                  (districts: any) => districts.name === this.patient.person.addresses[0].state_province
                 );
             
               if (defaultDistrict) {
                    this.editableAddress.current_district = defaultDistrict.name;
                    this.district_id = defaultDistrict.district_id;     
                     await this.fetchTraditionalAuthorities(defaultDistrict.name,"current_location")
                    this.fetchVillages(this.taList,this.patient.person.addresses[0].township_division,"current_location")                   
               }
            }

            if(this.editableHomelocation.home_district) {
                const defaultDistrict = this.districtList.find(
                  (districts: any) => districts.name === this.patient.person.addresses[0].address2
                 );
             
               if (defaultDistrict) {
                    this.editableHomelocation.home_district = defaultDistrict.name;
                   await this.fetchTraditionalAuthorities(defaultDistrict.name,"home_location") 
                    this.fetchVillages(this.HometaList,this.patient.person.addresses[0].county_district,"home_location")                 
               }
            }
        },
       
       
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics.birthdate);
        },
        async setEditableValues() {  
          
            this.relationshipsData = await RelationsService.getRelations();
            this.guardianData = await RelationshipService.getRelationships(this.demographics.patient_id);
           if (this.guardianData && this.guardianData.length > 0) {

                 this.editableGuardian = {
                  given_name: this.guardianData[0].relation.names[0].given_name,
                 middle_name: this.guardianData[0].relation.names[0].middle_name,
                 family_name: this.guardianData[0].relation.names[0].family_name,
                relationship: this.guardianData[0].type.b_is_to_a,
                       phone: this.setAttribute("Cell Phone Number", this.guardianData[0].relation),
            };
            
           } 
           this.editableDemographics = {
                 given_name: this.patient.person.names[0].given_name,
                middle_name: this.patient.person.names[0].middle_name,
                family_name: this.patient.person.names[0].family_name,
                     gender: this.demographics.gender,
                  birthdate: this.demographics.birthdate,
                      phone: this.demographics.phone,
            };
            this.editableAddress = {
                              current_village: this.patient.person.addresses[0].city_village,
                             current_district: this.patient.person.addresses[0].state_province,
                current_traditional_authority: this.patient.person.addresses[0].township_division,
                                     landmark: this.setAttribute("Landmark Or Plot Number",this.patient.person),
            };
            this.editableHomelocation = {
                              home_village: this.patient.person.addresses[0].neighborhood_cell,
                             home_district: this.patient.person.addresses[0].address2,
                home_traditional_authority: this.patient.person.addresses[0].county_district
            };
            this.editableSocialhistory = {
                                religion: this.setReligion(),
                              occupation: this.setAttribute("Occupation",this.patient.person),
                           maritalstatus: this.setAttribute("Civil Status",this.patient.person),
                        highesteducation: this.setAttribute("EDUCATION LEVEL",this.patient.person),
            };
        },
        setReligion(){
            
            var str = this.patient.person.person_attributes.find( (x:any) => x.type.name == "Religion");
            if (str == undefined) return;
            else            
            var jsonObject = str.value.replace(/=>/g, ':');
            if (jsonObject.includes("{")) {
                jsonObject = JSON.parse(jsonObject);
                return jsonObject.name;
              } 
            return str.value
                
        },
        setAttribute(name: string|undefined, data:any){
            if( Object.keys(data).length === 0 ) return;
            let str = data.person_attributes.find( (x:any) => x.type.name == name)
            if (str == undefined) return;
            else
            return str.value

        },
        async fetchTraditionalAuthorities(district_name: any,name: string) {
               const district = this.districtList.find((d:any) => d.name === district_name);
              const selectedDistrictId = district ? district.district_id : '';              
              var tas: any = await LocationService.getTraditionalAuthorities(selectedDistrictId,""); 
                   if(name == "current_location"){ this.taList = tas; } 
              else if(name == "home_location"){ this.HometaList = tas; }            
      },
      async fetchVillages(data:any,ta_name: any,name: string) {                    
                   const villages = data.find((d:any) => d.name === ta_name);
                    const selectedTAId = villages ? villages.traditional_authority_id : '';
                     const villagelist: any = await LocationService.getVillages(selectedTAId,"");      
                   if(name == "current_location"){ this.villageList = villagelist; } 
              else if(name == "home_location" ){   this.HomevillageList = villagelist; } 
        },
       
        async saveDetails() {

            try {
                 const updatedDemodata = await this.updateDemographics(); 
                 const updatedGuardian = await this.updateGuardian();
                 if (updatedGuardian) await this.updateRelationship(updatedGuardian);               
                await this.updatePatientDemographics(updatedDemodata);
                this.setEditableValues(); // Update local data after save   
                toastSuccess("Successfully Updated Patient");            
              
            } catch (error) {
                 console.log(error,"...........ppp")
                toastWarning("Failed to save details",);
            }
        },
        async updateDemographics() {
            const updatedData = {
                person_id: this.demographics.patient_id,
                given_name: this.editableDemographics.given_name,
                family_name: this.editableDemographics.family_name,
                middle_name: this.editableDemographics.middle_name,
                gender: this.editableDemographics.gender,
                birthdate: this.editableDemographics.birthdate,
                cell_phone_number: this.editableDemographics.phone,
                birthdate_estimated: false, 
                home_district: this.editableHomelocation.home_district, 
                home_traditional_authority: this.editableHomelocation.home_traditional_authority, 
                home_village: this.editableHomelocation.home_village, 
                current_district: this.editableAddress.current_district,
                current_traditional_authority: this.editableAddress.current_traditional_authority,
                current_village: this.editableAddress.current_village,
                landmark: this.editableAddress.landmark, 
                occupation: this.editableSocialhistory.occupation, 
                religion: this.religionData.find( (x:any) => x.name == this.editableSocialhistory.religion), 
                marital_status:this.editableSocialhistory.maritalstatus,
                education_level: this.editableSocialhistory.highesteducation,
                facility_name: "", 
                patient_type: "", 
            };
            const personService = new PersonService(updatedData);
            const data = await personService.update(this.demographics.patient_id);
            return data
        },
        async updateGuardian() {

            let guardianDetails: any = {
                        given_name: this.editableGuardian.given_name,
                       family_name: this.editableGuardian.family_name,
                       middle_name: this.editableGuardian.middle_name,
                 cell_phone_number: this.editableGuardian.phone,  
                            gender: "",
                         birthdate: "",
               birthdate_estimated: false, 
                     home_district: "", 
                home_traditional_authority: "", 
                      home_village: "", 
                  current_district: "",
                current_traditional_authority: "",
                    current_village: "",
                           landmark: "", 
                         occupation: "", 
                           religion: "", 
                     marital_status:"",
                    education_level: "",
                      facility_name: "", 
                       patient_type: "",
                        national_id: ""              
            };

            if (this.guardianData.length > 0){

                   guardianDetails.person_id = this.guardianData[0].person_b
                  const personService = new PersonService(guardianDetails);
                  await personService.update(this.guardianData[0].person_b);
                  let data = await RelationshipService.getRelationships(this.demographics.patient_id);
                  return data[0];

            }else{
                    const guardian: any = new PatientRegistrationService();
                    await guardian.registerGuardian(guardianDetails);
                    const guardianID = guardian.getPersonID();
                    if (this.editableGuardian.relationship == "Unknown") return; 
                    let selectedID = this.relationshipsData.find( (x:any) => x.b_is_to_a == this.editableGuardian.relationship || x.a_is_to_b == this.editableGuardian.relationship)["relationship_type_id"]
                    return await RelationsService.createRelation(this.demographics.patient_id, guardianID, selectedID);
            }
        },

        async updateRelationship(guardianInfo:any) {
                     let patient_id = this.demographics.patient_id
                     let guardian_id = guardianInfo.person_b
             let current_relation_id = guardianInfo.relationship_id
                 let new_relation_id = this.relationshipsData.find( (x:any) => x.b_is_to_a == this.editableGuardian.relationship || x.a_is_to_b == this.editableGuardian.relationship)["relationship_type_id"]
                  return await RelationsService.amendRelation(patient_id,guardian_id,current_relation_id,new_relation_id);
        },

        async updatePatientDemographics(data: any){
              
             const patientData = await PatientService.findByID(data.person_id);           
             this.setPatient(patientData);
             this.setDemographics({ "name":`${data.names[0].given_name} ${data.names[0].family_name}`,
                                    "patient_id": data.person_id,
                                    "gender":data.gender,
                                    "birthdate":data.birthdate,
                                    "phone": data.person_attributes.find( (x:any) => x.person_attribute_type_id == 12)["value"],
                                    "mrn": patientData.patient_identifiers[0].identifier,
                                    "address":`${data.addresses[0].state_province} ${data.addresses[0].township_division} ${data.addresses[0].city_village}`});
        }
    },
});
</script>

<style scoped>

.custom-dropdown .vs__selected-options,
.custom-dropdown .vs__dropdown-option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-dropdown .vs__dropdown-menu {
  max-height: 150px; 
  overflow-y: auto;  
  background-color: red;
}
.PI-cls-1 {
  cursor: pointer;
}
.lbl-tl {
    min-width: 20px;
    color: #b3b3b3 !important;
    white-space: nowrap;
}
.form-row {
  display: flex;
  align-items: center;
}
.lbl-ct {
    white-space: nowrap;
    color: #636363;
    flex: 1;
}
pim-cls-1 {
    --background: #ffff;
}
.custom-toolbar-cls {
    --background: #ffff;
}
ion-footer {
    --ion-toolbar-background: #fff;
}
ion-modal {
    --width: 94%;
    --height: 70%;
    --border-radius: 10px;
}
.dashed-hr {
    border: none;
    border-top: 1px dashed #b3b3b3;
    margin: 20px 0; 
}
.modal_wrapper {
    padding: 0px 1px;
    background: #fff;
}
.PI-cls-1 {
    color: #1f2221d4;
}

</style>

