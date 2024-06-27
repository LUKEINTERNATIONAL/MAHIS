<template>
    <div v-if="showModal"  class="pim-cls-1 modal_wrapper">
      <div class="ion-padding pim-cls-1">
        
        <div>
          <div class="center text_12">
            <ion-button style="color:white;background-color:#54B4D3;" class="PI-cls-1" v-if="viewInfo" @click="toggleSection('personalInfo')">Personal Information</ion-button>
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
              
              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Sex:</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label class="lbl-ct">{{ demographics.gender == "M" ? "Male" : "Female" }}</ion-label>
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
                            <ion-label class="lbl-ct">{{ formatBirthdate() }}</ion-label>
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
                        <ion-label class="lbl-ct">{{ demographics.phone }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Religion:</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label class="lbl-ct">{{ editableSocialhistory.religion }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Occupation:</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label class="lbl-ct">{{ editableSocialhistory.occupation }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Marital Status:</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label class="lbl-ct">{{ editableSocialhistory.maritalstatus }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>

              <ion-row>
                <ion-col>                    
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Highest Level of Education:</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label class="lbl-ct">{{ editableSocialhistory.highesteducation }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>               
              </ion-row>

            </div>
            <div v-else>
              <ion-button style="color:white;" class="PI-cls-1" @click="toggleSection('personalInfo')">Personal Information</ion-button>
              <div v-show="activeSection === 'personalInfo'">
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.given_name" class="lbl-tl">First Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <input v-model="editableDemographics.given_name" class="lbl-ct"></input>
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.middle_name" class="lbl-tl">Middle Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <input v-model="editableDemographics.middle_name" class="lbl-ct"></input>
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label v-model="editableDemographics.family_name" class="lbl-tl">Family Name:</ion-label>
                  </ion-col>
                  <ion-col>
                    <input v-model="editableDemographics.family_name" class="lbl-ct"></input>
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col offset="1.6">
                    <ion-label class="lbl-tl">Sex:</ion-label>
                  </ion-col>
                  <ion-col>
                    <select v-model="editableDemographics.gender" class="lbl-ct" style="width:100%;margin-left:-37px">
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </ion-col>
                </ion-row>
                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Date of Birth:</ion-label>
                  </ion-col>
                  <ion-col>
                    <input type="date" v-model="editableDemographics.birthdate" class="lbl-ct" style="width:94%;"></input>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Contacts:</ion-label>
                  </ion-col>
                  <ion-col>
                    <input v-model="editableDemographics.phone" class="lbl-ct"></input>
                  </ion-col>
                </ion-row>

                


              </div>
            </div>
  
            <hr class="dashed-hr" />

            <div v-if="editMode">
              <ion-button style="color:white;width:200px"  class="PI-cls-1" @click="toggleSection('socialHistory')">Social History</ion-button>
              <div v-show="activeSection === 'socialHistory'">

                <ion-row class="form-row">
                  <ion-col >
                    <ion-label class="lbl-tl">Religion:</ion-label>
                  </ion-col>
                  <ion-col>
                          <ion-select v-model="editableSocialhistory.religion" class="lbl-ct" >
                             <ion-select-option v-for="religion in religionData" :key="religion.id" :value="religion.name">
                               {{ religion.name }}
                             </ion-select-option>
                          </ion-select>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Occuption:</ion-label>
                  </ion-col>
                  <ion-col>
                          <ion-select v-model="editableSocialhistory.occupation" class="lbl-ct" >
                             <ion-select-option v-for="occupation in occupationData" :key="occupation.name" :value="occupation.value">
                               {{ occupation.name }}
                             </ion-select-option>
                          </ion-select>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Marital Status:</ion-label>
                  </ion-col>
                  <ion-col>
                          <ion-select v-model="editableSocialhistory.maritalstatus" class="lbl-ct" >
                             <ion-select-option v-for="maritalstatus in maritalStatusData" :key="maritalstatus.name" :value="maritalstatus.value">
                               {{ maritalstatus.name }}
                             </ion-select-option>
                          </ion-select>
                  </ion-col>
                </ion-row>

                <ion-row class="form-row">
                  <ion-col>
                    <ion-label class="lbl-tl">Highest Level of Education:</ion-label>
                  </ion-col>
                  <ion-col>
                          <ion-select v-model="editableSocialhistory.highesteducation" class="lbl-ct" >
                             <ion-select-option v-for="education in educationData" :key="education.name" :value="education.value">
                               {{ education.name }}
                             </ion-select-option>
                          </ion-select>
                  </ion-col>
                </ion-row>

              </div>
              <hr class="dashed-hr" />
            </div>            
  
            <ion-button style="color:white;" class="PI-cls-1" v-if="viewInfo" @click="toggleSection('guardianInfo')">Guardian Information</ion-button>
            <div v-if="!editMode" v-show="activeSection === 'guardianInfo'">
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
              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Relationship:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">{{ editableGuardian.relationship }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ editableGuardian.phone }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
                
              </ion-row>
            </div>
            <div v-else>
              <ion-button style="color:white;" class="PI-cls-1" @click="toggleSection('guardianInfo')">Guardian Information</ion-button>
              <div v-show="activeSection === 'guardianInfo'">
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Given name:</ion-label>
                      </ion-col>
                      <ion-col>
                        <input v-model="editableGuardian.given_name" class="lbl-ct"></input>
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
                        <input v-model="editableGuardian.middle_name" class="lbl-ct lbl-text"></input>
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
                        <input v-model="editableGuardian.family_name" class="lbl-ct"></input>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row> 

                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Contacts </ion-label>
                        </ion-col>
                      <ion-col>
                        <input v-model="editableGuardian.phone" class="lbl-ct lbl-text"></input>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>

                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Relationship:</ion-label>
                      </ion-col>
                      <ion-col>
                        
                        <ion-select v-model="editableGuardian.relationship" class="lbl-ct">
                          <ion-select-option v-for="relationship in relationshipsData" :key="relationship.relationship_type_id" :value="relationship.b_is_to_a">
                            {{ relationship.a_is_to_b }}
                          </ion-select-option>
                        </ion-select> 

                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>

              </div>
            </div>
  
            <hr class="dashed-hr" />
  
            <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" v-if="viewInfo" @click="toggleSection('addressInfo')">Current Location</ion-button>
            <div v-if="!editMode" v-show="activeSection === 'addressInfo'">
              <ion-row>

                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">District:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].state_province }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].township_division }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].city_village }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ editableAddress.landmark }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>

            </div>
            <div v-else>
              <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" @click="toggleSection('addressInfo')">Current Location</ion-button>
              <div v-show="activeSection === 'addressInfo'">
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">District:</ion-label>
                      </ion-col>
                      <ion-col>                            
                        <ion-select v-model="editableAddress.current_district" class="lbl-ct" @ionChange="fetchTraditionalAuthorities($event.detail.value,'current_location')">
                          <ion-select-option v-for="district in districtList" :key="district.district_id" :value="district.value">
                            {{ district.name }}
                          </ion-select-option>
                        </ion-select>                                                                  
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
                            
                            <ion-select v-model="editableAddress.current_traditional_authority" class="lbl-ct" @ionChange="fetchVillages(taList,$event.detail.value,'current_location')">
                         <ion-select-option v-for="ta in taList" :key="ta.current_traditional_authority" :value="ta.value">
                               {{ ta.name }}
                         </ion-select-option>

                      </ion-select>
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
                          <ion-select v-model="editableAddress.current_village" class="lbl-ct" >
                             <ion-select-option v-for="village in villageList" :key="village.village_id" :value="village.value">
                               {{ village.name }}
                             </ion-select-option>
                          </ion-select>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>

                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">ClosestLandmark:</ion-label>
                      </ion-col>
                      <ion-col>
                          <ion-select v-model="editableAddress.landmark" class="lbl-ct" >
                             <ion-select-option v-for="landmark in landMarkData" :key="landmark.id" :value="landmark.name">
                               {{ landmark.name }}
                             </ion-select-option>
                          </ion-select>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>
              </div>
            </div>
               <hr class="dashed-hr" />

            <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" v-if="viewInfo" @click="toggleSection('homeInfo')">Home Location</ion-button>
            <div v-if="!editMode" v-show="activeSection === 'homeInfo'">
              <ion-row>

                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">District:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].address2 }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].county_district }}</ion-label>
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
                      <ion-label class="lbl-ct">{{ patient.person.addresses[0].neighborhood_cell }}</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
              

            </div>
            <div v-else>
              <ion-button  style="color:white;background-color: cadetblue; width:200px" class="PI-cls-1" @click="toggleSection('homeInfo')">Home Location</ion-button>
              <div v-show="activeSection === 'homeInfo'">
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">District:</ion-label>
                      </ion-col>
                      <ion-col>                            
                        <ion-select v-model="editableHomelocation.home_district" class="lbl-ct" @ionChange="fetchTraditionalAuthorities($event.detail.value,'home_location')">
                          <ion-select-option v-for="district in districtList" :key="district.district_id" :value="district.value">
                            {{ district.name }}
                          </ion-select-option>
                        </ion-select>                                                                  
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
                            
                            <ion-select v-model="editableHomelocation.home_traditional_authority" class="lbl-ct" @ionChange="fetchVillages(HometaList,$event.detail.value,'home_location')">
                         <ion-select-option v-for="ta in HometaList" :key="ta.current_traditional_authority" :value="ta.value">
                               {{ ta.name }}
                         </ion-select-option>

                      </ion-select>
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
                          <ion-select v-model="editableHomelocation.home_village" class="lbl-ct" >
                             <ion-select-option v-for="village in HomevillageList" :key="village.village_id" :value="village.value">
                               {{ village.name }}
                             </ion-select-option>
                          </ion-select>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>
              </div>
            </div>
  
            <hr class="dashed-hr" style="margin-bottom: 0px !important" />

          </div>
        </div>
      </div>
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
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonIcon, IonToolbar, IonSearchbar, IonPopover, IonRow, IonCol, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonFooter } from "@ionic/vue";
import { notificationsOutline, personCircleOutline, createOutline } from "ionicons/icons";
import ToolbarSearch from "@/components/ToolbarSearch.vue";
import { useDemographicsStore } from "@/stores/DemographicStore";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { mapState,mapActions } from "pinia";
import HisDate from "@/utils/Date";
import { PersonService } from "@/services/person_service";
import { PatientService } from "@/services/patient_service";
import { RelationshipService } from "@/services/relationship_service";
import { RelationsService } from "@/services/relations_service";
import { LocationService } from "@/services/location_service";
import DynamicButton from "@/components/DynamicButton.vue";
import { toastSuccess, toastWarning } from "@/utils/Alerts";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

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
        vSelect,
    },
    data() {
        return {
                     showModal: true,
         editableDemographics : ref({ given_name: "",
                middle_name: "",
                family_name: "",
                gender: "",
                birthdate: "",
                phone: "",}),
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
                viewInfo: true,
                guardianData: [] as any,
                district_id: 0,
                districtList: [] as any,
                taList: [] as any,
                villageList: [] as any,
                HometaList: [] as any,
                HomevillageList: [] as any,
                religionData: [
                                { id: 1, name: "Christianity" },
                                { id: 2, name: "Islam" },
                                { id: 3, name: "Judaism" },
                                { id: 4, name: "Hinduism" },
                                { id: 5, name: "Buddhism" },
                                { id: 6, name: "Sikhism" },
                                { id: 7, name: "Jainism" },
                                { id: 8, name: "Bahá'í Faith" },
                                { id: 9, name: "Zoroastrianism" },
                                { id: 10, name: "Confucianism" },
                                { id: 11, name: "Taoism" },
                                { id: 12, name: "Shinto" },
                                { id: 13, name: "Baha'i Faith" },
                                { id: 14, name: "Juche" },
                                { id: 15, name: "Rastafari" },
                            ],
                occupationData: [{ name: "Employed",
                                   value: "employed"},
                                 { name: "Student",
                                  value: "Student"},
                                 { name: "Unemployed",
                                  value: "unemployed"},
                                 { name: "Other",
                                  value: "Other"},
                                ],
             maritalStatusData: [
                                    { name: "Single",
                                     value: "single" },
                                    { name: "Married",
                                     value: "married"},
                                    { name: "Widow",
                                     value: "widow"},
                                    { name: "Divorced",
                                     value: "divorced"}
                                ],
               educationData: [
                                { name: "No education",
                                 value: "No education"},
                                { name: "Primary school",
                                 value: "primary school"},
                                { name: "Secondary school",
                                 value: "secondary school"},
                                { name: "Tertiary education",
                                 value: "tertiary education"},
                              ],
                landMarkData: [
                                {   id: 1,name: "Catholic Church"},
                                {   id: 2,name: "CCAP" },
                                {   id: 3,name: "Seventh Day"},
                                {   id: 4,name: "Mosque"},
                                {   id: 5,name: "Primary School"},
                                {   id: 6,name: "Borehole"},
                                {   id: 7,name: "Secondary School"},
                                {   id: 8,name: "College"},
                                {   id: 9,name: "Market"},
                                {   id: 10,name: "Football Ground"},
                              ],
              relationshipsData: [] as any,

          
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics","patient"]),        
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
           this.buildCurrentLocations();                     
    },
    setup() {
          return {notificationsOutline,personCircleOutline,createOutline };
    },
    methods: {
        ...mapActions(useDemographicsStore, ["setDemographics","setPatient"]),
        nav(url: any) {
            this.$router.push(url);
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
                       phone: this.setAttribute(12, this.guardianData[0].relation),
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
                                     landmark: this.setAttribute(19,this.patient.person),
            };
            this.editableHomelocation = {
                              home_village: this.patient.person.addresses[0].neighborhood_cell,
                             home_district: this.patient.person.addresses[0].address2,
                home_traditional_authority: this.patient.person.addresses[0].county_district
            };
            this.editableSocialhistory = {
                                religion: this.setReligion(),
                              occupation: this.setAttribute(13,this.patient.person),
                           maritalstatus: this.setAttribute(5,this.patient.person),
                        highesteducation: this.setAttribute(28,this.patient.person),
            };
        },
        setReligion(){
            
            var str = this.patient.person.person_attributes.find( (x:any) => x.person_attribute_type_id == 29);
            if (str == undefined) return;
            else            
            var jsonObject = str.value.replace(/=>/g, ':');
            if (jsonObject.includes("{")) {
                jsonObject = JSON.parse(jsonObject);
                return jsonObject.name;
              } 
            return str.value
                
        },
        setAttribute(type_id: number|undefined, data:any){
          
            if( Object.keys(data).length === 0 ) return;
            let str = data.person_attributes.find( (x:any) => x.person_attribute_type_id == type_id)
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
        toggleEditMode() {
            if (this.editMode) {
                this.saveDetails();
            }
            this.viewInfo = false
            this.editMode = !this.editMode;           
        },
      handleCancel() {
         if (this.editMode) {
                  this.closePopup();
          } else {
                this.closeModal();
          }
       },
        closePopup() {
            this.editMode = false;
            this.viewInfo = true;
        },
        closeModal(){
          this.showModal = false;
        },
        toggleSection(section: string) {
          this.activeSection = this.activeSection === section ? "" : section;
        },
        async saveDetails() {
            try {
                 const updatedDemodata = await this.updateDemographics(); 
                 const updatedGuardian = await this.updateGuardian();
                 const updatedRelationship = await this.updateRelationship();               
                await this.updatePatientDemographics(updatedDemodata);
                this.setEditableValues(); // Update local data after save   
                toastSuccess("Successfully Updated Patient");            
                this.viewInfo = true;
            } catch (error) {
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

            const guardianDetails = {
                person_id: this.guardianData[0].person_b,
                given_name: this.editableGuardian.given_name,
                family_name: this.editableGuardian.family_name,
                middle_name: this.editableGuardian.middle_name,
                gender: "",
                birthdate: "",
                cell_phone_number: this.editableGuardian.phone,
                birthdate_estimated: false, 
                home_district: "", 
                home_traditional_authority: "", 
                home_village: "", 
                current_district: "",
                current_traditional_authority: "",
                current_village: "",
                landmark:"", 
                occupation:"", 
                religion: "", 
                marital_status:"",
                education_level: "",
                facility_name: "", 
                patient_type: "", 
            };

             const personService = new PersonService(guardianDetails);
             return await personService.update(this.guardianData[0].person_b);
        },

        async updateRelationship() {
                      let patient_id = this.demographics.patient_id
                     let guardian_id = this.guardianData[0].person_b
             let current_relation_id = this.guardianData[0].relationship_id
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
