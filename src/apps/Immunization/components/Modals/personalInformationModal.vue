<template>
    <div v-if="showModal"  class="pim-cls-1 modal_wrapper">
      <div class="ion-padding pim-cls-1">
        <ion-button
              v-if="!editMode"
              id="cbtn"
              class="btnText cbtn"
              fill="solid"
              style="float: right;"
              @click="closeModal">
              X
            </ion-button>
        <div>
          <div class="center text_12">
            <h4 class="PI-cls-1" v-if="viewInfo">Personal Information</h4>
            <div v-if="!editMode" v-show="!editMode">
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

            </div>
            <div v-else>
              <h4 class="PI-cls-1" @click="toggleSection('personalInfo')">Personal Information</h4>
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
  
            <h4 class="PI-cls-1" v-if="viewInfo">Guardian Information</h4>
            <div v-if="!editMode" v-show="!editMode">
              <ion-row>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Full Name:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">Unknown</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Age</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">Unknown</ion-label>
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
                      <ion-label class="lbl-ct">Unknown</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
                <ion-col>
                  <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Contacts</ion-label>

                      </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">Unknown</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
            </div>
            <div v-else>
              <h4 class="PI-cls-1" @click="toggleSection('guardianInfo')">Guardian Information</h4>
              <div v-show="activeSection === 'guardianInfo'">
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Full Name:</ion-label>
                      </ion-col>
                      <ion-col>
                        <ion-input v-model="editableGuardian.name" class="lbl-ct"></ion-input>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Age</ion-label>
                      </ion-col>
                      <ion-col>
                        <ion-input v-model="editableGuardian.age" class="lbl-ct"></ion-input>
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
                        <ion-input v-model="editableGuardian.relationship" class="lbl-ct lbl-text"></ion-input>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">Contacts </ion-label>
                        </ion-col>
                      <ion-col>
                        <ion-input v-model="editableGuardian.contacts" class="lbl-ct lbl-text"></ion-input>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-row>
              </div>
            </div>
  
            <hr class="dashed-hr" />
  
            <h4 class="PI-cls-1" v-if="viewInfo">Current Location</h4>
            <div v-if="!editMode" v-show="!editMode">
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
                <ion-col>
                    <ion-row class="form-row">
                    <ion-col>
                      <ion-label class="lbl-tl">Closet Landmark:</ion-label>
                    </ion-col>
                    <ion-col>
                      <ion-label class="lbl-ct">Unknown</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
            </div>
            <div v-else>
              <h4 class="PI-cls-1" @click="toggleSection('addressInfo')">Current Location</h4>
              <div v-show="activeSection === 'addressInfo'">
                <ion-row>
                  <ion-col>
                    <ion-row class="form-row">
                      <ion-col>
                        <ion-label class="lbl-tl">District:</ion-label>
                      </ion-col>
                      <ion-col>
                            
                        <ion-select v-model="editableAddress.current_district" class="lbl-ct" @ionChange="fetchTraditionalAuthorities($event.detail.value)">
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
                            
                            <ion-select v-model="editableAddress.current_traditional_authority" class="lbl-ct" @ionChange="fetchVillages($event.detail.value)">
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
              v-if="editMode"
              id="cbtn"
              class="btnText cbtn"
              fill="solid"
              style="width: 130px"
              @click="closePopup"
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
                name: "",
                age: 0,
                relationship: "",
                contacts: "",
            }),
          editableAddress : ref({
               current_village: "",
              current_district: "",
              current_traditional_authority: ""
            }),
          editMode :ref(false),
          activeSection :ref('personalInfo'),
             popoverOpen: false,
                   event: null as any,
                viewInfo: true,
                district_id: 0,
                districtList: [] as any,
                taList: [] as any,
                villageList: [] as any
          
        };
    },
    computed: {
        ...mapState(useDemographicsStore, ["demographics","patient"]),
        ...mapState(useRegistrationStore, ["socialHistory","guardianInformation","homeLocation","currentLocation", "closestLandmark"]),
        
    },
    watch: {
        demographics: {
            handler() {
                this.setEditableValues();
                const data = useRegistrationStore();
                data.setSocialHistory(this.socialHistory);
                data.setHomeLocation(this.homeLocation);
                data.setCurrentLocation(this.currentLocation);
                data.setGuardianInformation(this.guardianInformation);
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
            this.taList = [];
            this.villageList = [];

            for (let i of [1, 2, 3]) {
                const districts: any = await LocationService.getDistricts(i);
                this.districtList.push(...districts);
            }
            
            if(this.editableAddress.current_district) {
                const defaultDistrict = this.districtList.find(
                  (districts: any) => districts.name === this.patient.person.addresses[0].state_province
                 );
             
               if (defaultDistrict) {
                    this.editableAddress.current_district = defaultDistrict;
                    this.district_id = defaultDistrict.district_id;

                    const tas: any = await LocationService.getTraditionalAuthorities(this.district_id,"");      
                    this.taList.push(...tas);  
                    
                    for (let i = 0; i < this.taList.length; i++){

                          const villages: any = await LocationService.getVillages(this.taList[i].traditional_authority_id,"");
                          this.villageList.push(...villages);
                    }                    
                    
               }
            }
        },
       
       
        formatBirthdate() {
            return HisDate.getBirthdateAge(this.demographics.birthdate);
        },
        setEditableValues() {
            this.editableDemographics = {
                given_name: this.patient.person.names[0].given_name,
                middle_name: this.patient.person.names[0].middle_name,
                family_name: this.patient.person.names[0].family_name,
                gender: this.demographics.gender,
                birthdate: this.demographics.birthdate,
                phone: this.demographics.phone,
            };
            this.editableGuardian = { ...this.demographics.guardian };
            this.editableAddress = {
                current_village: this.patient.person.addresses[0].city_village,
                current_district: this.patient.person.addresses[0].state_province,
                current_traditional_authority: ""
            };
        },
        async fetchTraditionalAuthorities(district_name: any) {
               const district = this.districtList.find((d:any) => d.name === district_name);
              const selectedDistrictId = district ? district.district_id : '';
              this.editableAddress.current_district = district_name;
              const tas: any = await LocationService.getTraditionalAuthorities(selectedDistrictId,"");      
              this.taList = tas;
      },
      async fetchVillages(ta_name: any) {
                   const villages = this.taList.find((d:any) => d.name === ta_name);
                    const selectedTAId = villages ? villages.traditional_authority_id : '';
                  this.editableAddress.current_traditional_authority = ta_name;
                     const villagelist: any = await LocationService.getVillages(selectedTAId,"");      
                   this.villageList = villagelist;
        },
        toggleEditMode() {
            if (this.editMode) {
                this.saveDetails();
            }
            this.viewInfo = false
            this.editMode = !this.editMode;           
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
                //const updatedGuardian = this.updateGuardian();
                //const updatedAddress = this.updateAddress();
                await this.updatePatientDemographics(updatedDemodata);
                this.setEditableValues(); // Update local data after save   
                toastSuccess("Successfully Updated Patient");            
                this.viewInfo = true;
            } catch (error) {
                toastWarning("Failed to save details");
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
                home_district: "", 
                home_traditional_authority: "", 
                home_village: "", 
                current_district: this.editableAddress.current_district,
                current_traditional_authority: this.editableAddress.current_traditional_authority,
                current_village: this.editableAddress.current_village,
                landmark: "", 
                occupation: "", 
                facility_name: "", 
                patient_type: "", 
            };
            const personService = new PersonService(updatedData);
            const data = await personService.update(this.demographics.patient_id);
            return data
        },
        async updateGuardian() {
            const updatedGuardian = {
                ...this.editableGuardian,
                patient_id: this.demographics.patient_id,
            };
        },
        async updateAddress() {
            const updatedAddress = {
                ...this.editableAddress,
                patient_id: this.demographics.patient_id,
            };
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
