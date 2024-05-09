import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';
import _ from "lodash";

const medicalHistoryForm = {
  dilationAndCurrettage: {
    name: "Dilation and currettage",
    value: "dilation and currettage",
  },
  Myomectomy: {
    name: "Myomectomy",
    value: "myomectomy",
  },
  removalOfOvarianCystst: {
    name: "Removal of ovarian cyst",
    value: "Removal of ovarian cyst",
  },
  Oophorectomy: {
    name: "Oophorectomy",
    value: "oophorectomy",
  },
  Salpingectomy: {
    name: "Salpingectomy",
    value: "salpingectomy",
  },
  cervicalCone: {
    name: "Cervical cone",
    value: "cervical cone",
  },
  otherSurgerirs: {
    name: "Other",
    value: "",
  },
};

const allegiesForm = {
  albendazole: {
    name: "Albendazole",
    value: "albendazole",
  },
  aluminiumHydroxide: {
    name: "Aluminium-hydroxide",
    value: "aluminium-hydroxide",
  },
  calcium: {
    name: "Calcium",
    value: "calcium",
  },
  chamomile: {
    name: "Chamomile",
    value: "chamomile",
  },
  folicAcid: {
    name: "Folic-acid",
    value: "folic-acid",
  },
  ginger: {
    name: "Ginger",
    value: "ginger",
  },
  fish: {
    name: "Fish",
    value: "fish",
  },
  iron: {
    name: "Iron",
    value: "iron",
  },
  malariaMedication: {
    name: "Sulfadoxine-Pyrimethamine",
    value: "sulfadoxine-pyrimethamine",
  },
  mebendazole: {
    name: "Mebendazole",
    value: "mebendazole",
  },
  penicillin: {
    name: "Penicillin",
    value: "penicillin",
  },
  prEPTenofovirDisoproxilFumarate: {
    name: "PrEP(TDF)",
    value: "PrEP(TDF)",
  },
  otherAllegies: {
    name: "Other",
    value: "other",
  },
};

const chronicHealthConditionsForm = {
  autoImmuneDesease: {
    name: "Auto-immune desease",
    value: "auto immune desease",
  },
  asthma: {
    name: "Asthma",
    value: "asthma",
  },
  diabetes: {
    name: "Diabetes",
    value: "diabetes",
  },
};

const bloodDisorderForm = {
  sickleCell: {
    name: "Sickle cell",
    value: "sickle cell",
  },
  anaemia: {
    name: "Anemia",
    value: "anemia",
  },
  thalassemia: {
    name: "Thalassemia",
    value: "thalassemia",
  },
};

const cancerForm = {
  gynaelogical: {
    name: "Gynae Cancer",
    value: "gynae cancer",
  },
  otherSite: {
    name: "",
    value: "otherSite",
  },
};

const heartDeseaseForm = {

    ccf: {
        name: "CCF",
        value: "ccf"
    },
    rhd: {
        name: "RHD",
        value: "rhd"
    }
}

const diabetesForm = {
  gestationalDiabetes: {
    name: "Gestational diabetes",
    value: "gestational diabetes",
  },
  preExistingType1: {
    name: "Diabetes Type 1",
    value: "diabetes type 1",
  },
  preExistingType2: {
    name: "Diabetes Type 2",
    value: "diabetes type 2",
  },
  otherDiabetis: {
    name: "",
    value: "otherDiabetis",
  },
};

const epilespyForm = {
  epilespy: {
    name: "Epilepsy",
    value: "epilepsy",
  },
};
const hivTestForm = {
  hivTestRequired: {
    name: "HIV test required",
    value: "HIV test required",
  },

  hivTestOrdered: {
    name: "HIV test ordered",
    value: "HIV test ordered",
  },
  hivTestConducted: {
    name: "HIV test ordered",
    value: "HIV test ordered",
  },

  hivTestNotDone: {
    name: "HIV test not done",
    value: "HIV test not done",
  },
  testStockOut: {
    name: "Test stock-out",
    value: "Test stock-out",
  },
  expiredTests: {
    name: "Expired tests",
    value: " expired tests",
  },
  hivPositive: {
    name: "HIV Positive",
    value: "HIV Positive",
  },
  hivNegative1: {
    name: "HIV Negative 1",
    value: "HIV Negative 1",
  },
  hivNegative2: {
    name: "HIV Negative 2",
    value: "HIV Negative 2",
  },
  inconclusive: {
    name: "Inconclusive",
    value: "inconclusive",
  },
  highRiskYes: {
    name: "Yes",
    value: "yes",
  },
  highRiskNo: {
    name: "No",
    value: "no",
  },
  testDate: {
    name: "Test Date",
    value: "Test Date",
  },
  reasonsTestNotDone: {
    name: "",
    value: "reasonsTestNotDone",
  },
};

const syphilisForm = {
  syphilisTestConducted: {
    name: "Syphilis test conducted",
    value: "Syphilis test conducted",
  },

  syphilisTestOrdered: {
    name: "Syphilis test ordered",
    value: "Syphilis test ordered",
  },
  syphilisTestNotDone: {
    name: "Syphilis Test Not Done",
    value: "syphilisTestNotDone",
  },

  rapidSyphilisTest: {
    name: "Rapid syphilis test",
    value: "rapid syphilis test",
  },
  offSiteLabTest: {
    name: "Off-site lab test",
    value: "Off-site lab test",
  },
  treponemaPallidum: {
    name: "TPHA",
    value: "TPHA",
  },
  testStockOut: {
    name: "Test stock-out",
    value: "Test stock-out",
  },
  expiredTests: {
    name: "Expired tests",
    value: "Expired tests",
  },

  other: {
    name: "Other",
    value: "other",
  },
  syphilisPositiveResults: {
    name: "Syphilis positive",
    value: "Syphilis positive",
  },
  syphilisNegativeResults: {
    name: "Syphilis Negative",
    value: "syphilis negative",
  },
  syphilisPositiveDiagnosis: {
    name: "Syphilis positive",
    value: "syphilis positive",
  },
  syphilisNegativeDiagnosis: {
    name: "Syphilis Negative",
    value: "syphilis negative",
  },
  testDate: {
    name: "Test Date",
    value: "Test Date",
  },
  reasonsTestNotDone: {
    name: "Reason",
    value: "",
  },
};

const hypertensionForm = {

    hypertension: {
        name: "Hypertension",
        value: "hypertension"
    }
}
const kidneyForm = {
  kidney: {
    name: "Kidney Disease",
    value: "kidney disease",
  },
};
const tbForm = {

    tb: {
        name: "TB",
        value: "tb"
    }
}

const mentalIllinessForm = {
  mentalIlliness: {
    name: "Mental illness",
    value: "mental illness",
  },
};


const initialMedicalHistory=[
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Does the woman have any past surgeries done?",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any past surgeries done?",
      },
      data: [
        {
          name: medicalHistoryForm.dilationAndCurrettage.name,
          value: medicalHistoryForm.dilationAndCurrettage.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: medicalHistoryForm.Myomectomy.name,
          value: medicalHistoryForm.Myomectomy.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Past surgeries done?",
      },
      data: [
        {
          name: medicalHistoryForm.removalOfOvarianCystst.name,
          value: medicalHistoryForm.removalOfOvarianCystst.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: medicalHistoryForm.Oophorectomy.name,
          value: medicalHistoryForm.Oophorectomy.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any past surgeries done?",
      },
      data: [
        {
          name: medicalHistoryForm.Salpingectomy.name,
          value: medicalHistoryForm.Salpingectomy.name,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: medicalHistoryForm.cervicalCone.name,
          value: medicalHistoryForm.cervicalCone.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any past surgeries done?",
      },
      data: [
        {
          name: "None",
          value: "none",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: "Other",
          value: "Other",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    childName:'Other',
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              icon: icons.editPen,
              value: "",
              name: "Other notes",
              valueType: "text",
              eventType: "input",
              inputWidth: "82%",
              required: true,
            },
          ],
        },
      ],
    },
  },
] as any ;

const initialAllergies=[
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Does the woman have any allergies?",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.albendazole.name,
          disabled: false,
          value: allegiesForm.albendazole.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.aluminiumHydroxide.name,
          disabled: false,
          value: allegiesForm.aluminiumHydroxide.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.calcium.name,
          disabled: false,
          value: allegiesForm.calcium.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.chamomile.name,
          disabled: false,
          value: allegiesForm.chamomile.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.folicAcid.name,
          disabled: false,
          value: allegiesForm.folicAcid.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.ginger.name,
          disabled: false,
          value: allegiesForm.ginger.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.fish.name,
          disabled: false,
          value: allegiesForm.fish.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.iron.name,
          disabled: false,
          value: allegiesForm.iron.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.malariaMedication.name,
          disabled: false,
          value: allegiesForm.malariaMedication.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.mebendazole.name,
          disabled: false,
          value: allegiesForm.mebendazole.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: allegiesForm.penicillin.name,
          disabled: false,
          value: allegiesForm.penicillin.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: allegiesForm.prEPTenofovirDisoproxilFumarate.name,
          disabled: false,
          value: allegiesForm.prEPTenofovirDisoproxilFumarate.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "Does the woman have any allergies?",
      },
      data: [
        {
          name: "None",
          value: "none",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: "Other",
          value: "other",
          disabled: false,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    childName:'Other',
    classDash: "dashed_bottom_border",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify",
              icon: icons.editPen,
              value: "",
              name: "Other notes",
              valueType: "text",
              eventType: "input",
              inputWidth: "82%",
              required: true,
            },
          ],
        },
      ],
    },
  },
] as any;

const initialChronicConditions = [
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "Does the woman have existing Chronic Health Conditions*?",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: chronicHealthConditionsForm.autoImmuneDesease.name,
          value: chronicHealthConditionsForm.autoImmuneDesease.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: chronicHealthConditionsForm.asthma.name,
          value: chronicHealthConditionsForm.asthma.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: bloodDisorderForm.sickleCell.name,
          value: bloodDisorderForm.sickleCell.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: cancerForm.gynaelogical.name,
          value: cancerForm.gynaelogical.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: bloodDisorderForm.anaemia.name,
          value: bloodDisorderForm.anaemia.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: bloodDisorderForm.thalassemia.name,
          value: bloodDisorderForm.thalassemia.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },

  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: heartDeseaseForm.ccf.name,
          value: heartDeseaseForm.rhd.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: heartDeseaseForm.rhd.name,
          value: heartDeseaseForm.rhd.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },

  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: diabetesForm.gestationalDiabetes.name,
          value: diabetesForm.gestationalDiabetes.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: diabetesForm.preExistingType1.name,
          value: diabetesForm.preExistingType1.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: diabetesForm.preExistingType2.name,
          value: diabetesForm.preExistingType2.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: epilespyForm.epilespy.name,
          value: epilespyForm.epilespy.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: hypertensionForm.hypertension.name,
          value: hypertensionForm.hypertension.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: kidneyForm.kidney.name,
          value: kidneyForm.kidney.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: tbForm.tb.name,
          value: tbForm.tb.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: mentalIllinessForm.mentalIlliness.name,
          value: mentalIllinessForm.mentalIlliness.value,
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: "HIV positive",
          value: "hiv positive",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: "Other",
          value: "other",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    selectdData: [],
    isFinishBtn: false,
    classDash: "dashed_bottom_border",
    checkboxBtnContent: {
      header: {
        title: "",
        selectedValue: "",
        class: "bold",
        name: "chronic conditions",
      },
      data: [
        {
          name: "HIV negative",
          value: "hiv negative",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
        {
          name: "None",
          value: "none",
          labelPlacement: "start",
          colSize: "6",
          justify: "space-between",
          checked: false,
        },
      ],
    },
  },
  {
    sideColSize: 0,
    classDash: "dashed_bottom_border",
    childName: "Other",
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Specify other chronic conditions",
              icon: icons.editPen,
              valueType: "text",
              value: diabetesForm.otherDiabetis.name,
              name: "Other notes",
              eventType: "input",
              inputWidth: "85%",
              required: true,
            },
          ],
        },
      ],
    },
  },
  {
    classDash: "dashed_bottom_border",
    sideColSize: 0.5,
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "HIV test date",
              icon: icons.calenderPrimary,
              value: "",
              name: "HIV test date",
              eventType: "blur",
              valueType: "text",
              inputWidth: "50%",
              required: true,
              isDatePopover: true,
              placeholder: "Pick date",
            },
          ],
        },
      ],
    },
  },
  {
    childName: "HIV positive",
    sideColSize: 0.5,
    selectdData: [],
    classDash: "dashed_bottom_border",
    isFinishBtn: false,
    radioBtnContent: {
      header: {
        title: "Is the client on ART?",
        selectedValue: "",
        name: "chronic conditions",
        displayNone: true,
        displayNext: "Yes",
      },
      data: [
        {
          name: "Yes",
          value: "Yes",
          colSize: "2.5",
        },
        {
          name: "No",
          value: "no",
          colSize: "2.5",
        },
      ],
    },
  },
  {
    childName: "chronic conditions",
    sideColSize: 0.5,
    db_data: [],
    classDash: "dashed_bottom_border",
    isFinishBtn: false,
    selectdData: [],
    displayData: [],
    data: {
      rowData: [
        {
          colData: [
            {
              displayNone: true,
              inputHeader: "Facility for ART",
              icon: icons.search,
              value: "",
              name: "facility for art",
              popOver: true,
              valueType: "text",
              eventType: "input",
              required: true,
              alertsError: false,
              alertsErrorMassage: "",
              inputWidth: "50%",
              placeholder: "Search for facility",
              popOverData: {
                filterData: false,
                data: [],
              },
              id: "",
              idName: "facility_id",
            },
          ],
          // btns:[
          //     {
          //         name: "Save",
          //         fill: "clear",
          //         icon: icons.plus
          //     }
          // ]
        },
      ],
    },
  },
] as any;
export const useMedicalHistoryStore = defineStore("medicalHistoryStore", {
  state: () => ({
    medicalHistory: [...initialMedicalHistory] as any,
    allegy: [...initialAllergies] as any,
    exisitingChronicHealthConditions: [...initialChronicConditions] as any,
    hivTest: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Was the hiv test conducted?",
            selectedValue: "",
            class: "bold",
            name: "hivOption",
          },
          data: [
            {
              name: hivTestForm.hivTestRequired.name,
              value: hivTestForm.hivTestRequired.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.hivTestOrdered.name,
              value: hivTestForm.hivTestOrdered.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.hivTestConducted.name,
              value: "hivTestConducted",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.hivTestNotDone.name,
              value: "hivTestNotDone",
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  //  displayNone: true,
                  inputHeader: "HIV test date",
                  icon: icons.calenderPrimary,
                  value: "",
                  name: "Test Date",
                  eventType: "blur",
                  required: true,
                  isDatePopover: true,
                },
              ],
            },
          ],
        },
      },
      {
        checkboxBtnContent: {
          header: {
            title: "Reasons HIV test not done:",
            selectedValue: "",
            class: "bold",
            // displayNone: true,
            name: "hivOutcome",
          },
          data: [
            {
              name: "Test Stock Out",
              value: hivTestForm.testStockOut.value,
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
              checked: false,
            },
            {
              name: "Expired Tests",
              value: hivTestForm.expiredTests.value,
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
              checked: false,
            },
            {
              name: "Other",
              value: "other",
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
              checked: false,
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
                  //   displayNone: true,
                  inputHeader: "specify",
                  icon: icons.editPen,
                  value: hivTestForm.reasonsTestNotDone.name,
                  name: hivTestForm.reasonsTestNotDone.value,
                  eventType: "input",
                  inputWidth: "55%",
                  required: true,
                },
              ],
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Select the result of HIV test",
            name: "test2",
            selectedValue: "",
            class: "bold",
            //  displayNone: true,
          },
          data: [
            {
              name: hivTestForm.hivPositive.name,
              value: hivTestForm.hivPositive.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },

            {
              name: hivTestForm.hivNegative1.name,
              value: hivTestForm.hivNegative1.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.hivNegative2.name,
              value: hivTestForm.hivNegative2.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.inconclusive.name,
              value: hivTestForm.inconclusive.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            //  displayNone: true,
            name: "test1",
            title: "Is the woman at high risk of HIV?",
            selectedValue: "",
            class: "bold",
          },
          data: [
            {
              name: hivTestForm.highRiskYes.name,
              value: hivTestForm.highRiskYes.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: hivTestForm.highRiskNo.name,
              value: hivTestForm.highRiskNo.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
    ] as any,
    syphilisTest: [
      {
        selectdData: [],
        isFinishBtn: false,
        classDash: "dashed_bottom_border",
        radioBtnContent: {
          header: {
            title: "Select whether:",
            name: "syphilisOption",
            class: "bold",
            selectedValue: "",
          },
          data: [
            {
              name: syphilisForm.syphilisTestConducted.name,
              value: syphilisForm.syphilisTestConducted.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: syphilisForm.syphilisTestOrdered.name,
              value: syphilisForm.syphilisTestOrdered.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: syphilisForm.syphilisTestNotDone.name,
              value: syphilisForm.syphilisTestNotDone.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
          ],
        },
      },
      {
        radioBtnContent: {
          header: {
            displayNone: true,
            name: "syphilisDetails",
            class: "bold",
            title: "Select the type of syphilis test that was done",
            selectedValue: "",
          },
          data: [
            {
              name: syphilisForm.rapidSyphilisTest.name,
              value: syphilisForm.rapidSyphilisTest.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
              checked: false,
            },
            {
              name: syphilisForm.offSiteLabTest.name,
              value: syphilisForm.offSiteLabTest.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
              checked: false,
            },
            {
              name: syphilisForm.treponemaPallidum.name,
              value: syphilisForm.treponemaPallidum.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
              checked: false,
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        radioBtnContent: {
          header: {
            title: "Syphilis test result",
            class: "bold",
            selectedValue: "",
            name: "syphlisResults",
            // displayNone: true,
          },
          data: [
            {
              name: syphilisForm.syphilisPositiveResults.name,
              value: syphilisForm.syphilisPositiveResults.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
            },
            {
              name: syphilisForm.syphilisNegativeResults.name,
              value: syphilisForm.syphilisNegativeResults.value,
              labelPlacement: "start",
              colSize: "7",
              justify: "space-between",
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
                  //  displayNone: true,
                  inputHeader: "Syphilis test date",
                  icon: icons.calenderPrimary,
                  value: "",
                  name: "syphilisDate",
                  eventType: "blur",
                  required: true,
                  inputWidth: "55%",
                  isDatePopover: true,
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
                  //  displayNone: true,
                  inputHeader: "Syphilis test date",
                  icon: icons.calenderPrimary,
                  value: "",
                  name: "syphilisDate",
                  eventType: "blur",
                  required: true,
                  inputWidth: "300px",
                  isDatePopover: true,
                },
              ],
            },
          ],
        },
      },
      {
        selectdData: [],
        isFinishBtn: false,
        checkboxBtnContent: {
          header: {
            title: "Reason syphilis test not done",
            selectedValue: "",
            name: "notDone",
            class: "bold",
            // displayNone: true,
          },
          data: [
            {
              name: syphilisForm.testStockOut.name,
              value: syphilisForm.testStockOut.value,
              checked: false,
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
            },

            {
              name: syphilisForm.expiredTests.name,
              value: syphilisForm.expiredTests.value,
              checked: false,
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
            },
            {
              name: "Other",
              value: "other",
              checked: false,
              labelPlacement: "start",
              colSize: "9",
              justify: "space-between",
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
                  //  displayNone: true,
                  inputHeader: "specify",
                  icon: icons.editPen,
                  value: syphilisForm.reasonsTestNotDone.value,
                  name: "Reason",
                  eventType: "input",
                  inputWidth: "55%",
                  required: true,
                },
              ],
            },
          ],
        },
      },
    ] as any,
  }),
  actions: {
    addMedicalHistory(data: any) {
      console.log("sonmething changedS", data);
      this.medicalHistory = data;
    },
    addAllegy(data: any) {
      this.allegy = data;
    },
    addExisitingChronicHealthConditions(data: any) {
      this.exisitingChronicHealthConditions = data;
    },
    addhivTest(data: any) {
      this.hivTest = data;
    },
    addSyphilisTest(data: any) {
      this.syphilisTest = data;
    },
    getInitial(){
      const data = _.cloneDeep(initialMedicalHistory);
      return [...data];
    },
    getInitial1(){
      const data = _.cloneDeep(initialAllergies);
      return [...data];
    },
    getInitial2(){
      const data = _.cloneDeep(initialChronicConditions);
      return [...data];
    }
  },
   persist:true
});
