import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

const medicalHistoryForm = {
    dilationAndCurrettage: {
        name: "Dilation and currettage",
        value: "dilation"
    },
    Myomectomy: {
        name: "Myomectomy",
        value: "myomectomy"
    },
    removalOfOvarianCystst: {
        name: "Removal of ovarian cystst",
        value: "removelOfOvarianCystst"
    },
    Oophorectomy: {
        name: "Oophorectomy",
        value: "oophorectomy"
    },
    Salpingectomy: {
        name: "Salpingectomy",
        value: "salpingectomy"
    },
    cervicalCone: {
        name: "Cervical cone",
        value: "cervicalCone"
    },
    otherSurgerirs: {
        name: "Other",
        value: "otherSurgerirs"
    }
}

const allegiesForm = {
    albendazole: {
        name: "Albendazole",
        value: "albendazole"
    },
    aluminiumHydroxide: {
        name: "Aluminium-hydroxide",
        value: "aluminiumHydroxide"
    },
    calcium: {
        name: "Calcium",
        value: "calcium"
    },
    chamomile: {
        name: "Chamomile",
        value: "chamomile"
    },
    folicAcid: {
        name: "Folic-acid",
        value: "folicAcid"
    },
    ginger: {
        name: "Ginger",
        value: "ginger"
    },
    fish: {
        name: "Fish",
        value: "fish"
    },
    iron: {
        name: "Iron",
        value: "iron"
    },
    malariaMedication: {
        name: "sulfadoxine-pyrimethamine",
        value: "malariaMedication"
    },
    mebendazole: {
        name: "Mebendazole",
        value: "mebendazole"
    },
    penicillin: {
        name: "Penicillin",
        value: "penicillin"
    },
    prEPTenofovirDisoproxilFumarate: {
        name: "PrEP(TDF)",
        value: "prEPTenofovirDisoproxilFumarate"
    },
    otherAllegies: {
        name: "",
        value: "OtherAllergies"
    }
}

const chronicHealthConditionsForm = {
    autoImmuneDesease: {
        name: "Auto immune desease",
        value: "autoImmuneDesease"
    },
    asthma: {
        name: "Asthma",
        value: "asthma"
    },
    diabetes: {
        name: "Diabetes",
        value: "diabetes"
    }
}

const bloodDisorderForm = {
    sickleCell: {
        name: "Sickle cell",
        value: "sickleCell"
    },
    anaemia: {
        name: "Anemia",
        value: "anemia"
    },
    thalassemia: {
        name: "Thalassemia",
        value: "thalassemia"
    }
}

const cancerForm = {

    gynaelogical: {
        name: "Gynaecological",
        value: "gynaecological"
    },
    otherSite: {
        name: "",
        value: "otherSite"
    }
}

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
        value: "gestationalDiabetes"
    },
    preExistingType1: {
        name: "pre-existing type 1",
        value: "pre-existingType1"
    },
    preExistingType2: {
        name: "pre-existing type 2",
        value: "pre-existingType2"
    },
    otherDiabetis: {
        name: "",
        value: "otherDiabetis"
    }
}

const epilespyForm = {

    epilespy: {
        name: "Epilespy",
        value: "epilespy"
    }
}
const hivTestForm = {

    hivTestRequired: {
        name: "HIV test required",
        value: "hivTestRequired"
    },

    hivTestOrdered: {
        name: "HIV test ordered",
        value: "hivTestOrdered"
    },
    hivTestConducted: {
        name: "HIV test conducted",
        value: "hivTestConducted"
    },

    hivTestNotDone: {
        name: "HIV test not done",
        value: "hivTestNotDone"
    },
    testStockOut: {
        name: "Test stock-out",
        value: "testStockOut"
    },
    expiredTests: {
        name: "Expired tests",
        value: " expiredTests"
    },
    hivPositive: {
        name: "HIV Positive",
        value: "hivPositive"
    },
    hivNegative1: {
        name: "HIV Negative 1",
        value: "hivNegative1"
    },
    hivNegative2: {
        name: "HIV Negative 2",
        value: "hivNegative2"
    },
    inconclusive: {
        name: "Inconclusive",
        value: "inconclusive"
    },
    highRiskYes: {
        name: "Yes",
        value: "yes"
    },
    highRiskNo: {
        name: "No",
        value: "no"
    },
    testDate: {
        name: "Test Date",
        value: "testDate"
    },
    reasonsTestNotDone: {
        name: "",
        value: "reasonsTestNotDone"
    }
}

const syphilisForm = {

    syphilisTestConducted: {
        name: "Syphilis test conducted",
        value: "syphilisTestConducted"
    },

    syphilisTestOrdered: {
        name: "Syphilis test ordered",
        value: "syphilisTestOrdered"
    },
    syphilisTestNotDone: {
        name: "Syphilis Test Not Done",
        value: "syphilisTestNotDone"
    },

    rapidSyphilisTest: {
        name: "Rapid syphilis test",
        value: "rapidSyphilisTest"
    },
    offSiteLabTest: {
        name: "Off-site lab test",
        value: "offSiteLabTest"
    },
    treponemaPallidum: {
        name: "TPHA",
        value: "treponemaPallidum"
    },
    testStockOut: {
        name: "Test stock-out",
        value: "testStockOut"
    },
    expiredTests: {
        name: "Expired tests",
        value: "expiredTests"
    },

    other: {
        name: "Other",
        value: "other"
    },
    syphilisPositiveResults: {
        name: "Syphilis positive",
        value: "syphilisPositiveResults"
    },
    syphilisNegativeResults: {
        name: "Syphilis negative",
        value: "syphilisNegativeResults"
    },
    syphilisPositiveDiagnosis: {
        name: "Syphilis positive",
        value: "syphilisPositiveDiagnosis"
    },
    syphilisNegativeDiagnosis: {
        name: "Syphilis Negative",
        value: "syphilisNegativeDiagnosis"
    },
    testDate: {
        name: "Test Date",
        value: "testDate"
    },
    reasonsTestNotDone: {
        name: "Reason",
        value: ""
    }
}

const hypertensionForm = {

    hypertension: {
        name: "Hypertension",
        value: "hypertension"
    }
}
const kidneyForm = {

    kidney: {
        name: "Kidney",
        value: "kidney"
    }
}
const tbForm = {

    tb: {
        name: "TB",
        value: "tb"
    }
}

const mentalIllinessForm = {

    mentalIlliness: {
        name: "Mental  illiness",
        value: "mentalIlliness"
    }
}

export const useMedicalHistoryStore = defineStore('medicalHistoryStore', {
    state: () => ({
        medicalHistory: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: '',


                    },
                    data: [
                        {
                            name: medicalHistoryForm.dilationAndCurrettage.name,
                            value: medicalHistoryForm.dilationAndCurrettage.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: medicalHistoryForm.Myomectomy.name,
                            value: medicalHistoryForm.Myomectomy.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: medicalHistoryForm.removalOfOvarianCystst.name,
                            value: medicalHistoryForm.removalOfOvarianCystst.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: medicalHistoryForm.Oophorectomy.name,
                            value: medicalHistoryForm.Oophorectomy.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: medicalHistoryForm.Salpingectomy.name,
                            value: medicalHistoryForm.Salpingectomy.name,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: medicalHistoryForm.cervicalCone.name,
                            value: medicalHistoryForm.cervicalCone.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: '',
                    },
                    data: [
                        {
                            name: "None",
                            value: "noSurgeries",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Other",
                            value: "otherSurguries",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,

                                    inputHeader: 'Specify',
                                    icon: icons.editPen,
                                    value: medicalHistoryForm.otherSurgerirs.name,
                                    name: "specify",
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },
        ] as any,
        allegy: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: '',

                    },
                    data: [
                        {
                            name: allegiesForm.albendazole.name,
                            disabled: false,
                            value: allegiesForm.albendazole.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.aluminiumHydroxide.name,
                            disabled: false,
                            value: allegiesForm.aluminiumHydroxide.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: allegiesForm.calcium.name,
                            disabled: false,
                            value: allegiesForm.calcium.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.chamomile.name,
                            disabled: false,
                            value: allegiesForm.chamomile.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: allegiesForm.folicAcid.name,
                            disabled: false,
                            value: allegiesForm.folicAcid.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.ginger.name,
                            disabled: false,
                            value: allegiesForm.ginger.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: allegiesForm.fish.name,
                            disabled: false,
                            value: allegiesForm.fish.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.iron.name,
                            disabled: false,
                            value: allegiesForm.iron.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: allegiesForm.malariaMedication.name,
                            disabled: false,
                            value: allegiesForm.malariaMedication.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.mebendazole.name,
                            disabled: false,
                            value: allegiesForm.mebendazole.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [

                        {
                            name: allegiesForm.penicillin.name,
                            disabled: false,
                            value: allegiesForm.penicillin.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: allegiesForm.prEPTenofovirDisoproxilFumarate.name,
                            disabled: false,
                            value: allegiesForm.prEPTenofovirDisoproxilFumarate.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: "None",
                            value: "noAllergies",
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Other",
                            value: "otherAllergies",
                            disabled: false,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'Other(specify)',
                                    icon: icons.editPen,
                                    value: allegiesForm.otherAllegies.name,
                                    name: 'other',
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },
        ] as any,
        exisitingChronicHealthConditions: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: chronicHealthConditionsForm.autoImmuneDesease.name,
                            value: chronicHealthConditionsForm.autoImmuneDesease.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: chronicHealthConditionsForm.asthma.name,
                            value: chronicHealthConditionsForm.asthma.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }


            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: bloodDisorderForm.sickleCell.name,
                            value: bloodDisorderForm.sickleCell.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: cancerForm.gynaelogical.name,
                            value: cancerForm.gynaelogical.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },

                    ],
                }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [

                        {
                            name: bloodDisorderForm.anaemia.name,
                            value: bloodDisorderForm.anaemia.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: bloodDisorderForm.thalassemia.name,
                            value: bloodDisorderForm.thalassemia.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },

                    ],
                }


            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: heartDeseaseForm.ccf.name,
                            value: heartDeseaseForm.rhd.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: heartDeseaseForm.rhd.name,
                            value: heartDeseaseForm.rhd.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                },



            },

            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: diabetesForm.gestationalDiabetes.name,
                            value: diabetesForm.gestationalDiabetes.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: diabetesForm.preExistingType1.name,
                            value: diabetesForm.preExistingType1.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                },



            },
            {
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: diabetesForm.preExistingType2.name,
                            value: diabetesForm.preExistingType2.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: epilespyForm.epilespy.name,
                            value: epilespyForm.epilespy.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: hypertensionForm.hypertension.name,
                            value: hypertensionForm.hypertension.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false

                        },
                        {
                            name: kidneyForm.kidney.name,
                            value: kidneyForm.kidney.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                },



            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: tbForm.tb.name,
                            value: tbForm.tb.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: mentalIllinessForm.mentalIlliness.name,
                            value: mentalIllinessForm.mentalIlliness.value,
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                },



            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: '',
                        name: 'HIV positive'
                    },
                    data: [
                        {
                            name: 'HIV positive',
                            value: 'hiv positive',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: 'Other',
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        }

                    ],
                }


            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                checkboxBtnContent:
                {
                    header: {
                        title: '',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: 'None',
                            value: 'none',
                            labelPlacement: 'start',
                            colSize: '6',
                            justify: 'space-between',
                            checked: false
                        },

                    ],
                }


            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    // displayNone:true,
                                    inputHeader: 'Other',
                                    icon: icons.editPen,
                                    value: diabetesForm.otherDiabetis.name,
                                    name: "Specify",
                                    eventType: 'input',
                                    inputWidth: "82%",
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },
            {

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'HIV test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'HIV test date',
                                    eventType: 'blur',
                                    inputWidth: "89%",
                                    required: true,
                                    isDatePopover: true,
                                    placeholder: 'Pick HIV test date'
                                }

                            ]
                        }
                    ],

                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: 'Is the client on ART',
                        selectedValue: '',
                        name: "Is client on ART",
                        displayNone: true
                    },
                    data: [
                        {
                            name: 'Yes',
                            value: 'yes',
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: 'No',
                            value: 'no',
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                    ]
                }
            },
            {
                db_data: [],
                isFinishBtn: false,
                selectdData: [],
                displayData: [],
                data:
                {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'Facility for ART',
                                    icon: icons.search,
                                    value: '',
                                    name: 'facility for art',
                                    popOver: true,
                                    eventType: 'input',
                                    required: true,
                                    alertsError: false,
                                    alertsErrorMassage: '',
                                    inputWidth: "89%",
                                    placeholder: 'Search for facility',
                                    popOverData: {
                                        filterData: false,
                                        data: []
                                    },
                                    id: '',
                                    idName: 'facility_id'
                                },

                            ],
                            // btns:[
                            //     {
                            //         name: "Save",
                            //         fill: "clear",
                            //         icon: icons.plus
                            //     }
                            // ]
                        }
                    ],

                }

            }

        ] as any,
        hivTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent: {
                    header: {
                        title: 'Was the hiv test conducted?',
                        selectedValue: '',
                        name: "hivOption"
                    },
                    data: [
                        {
                            name: hivTestForm.hivTestRequired.name,
                            value: hivTestForm.hivTestRequired.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.hivTestOrdered.name,
                            value: hivTestForm.hivTestOrdered.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.hivTestConducted.name,
                            value: "hivTestConducted",
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.hivTestNotDone.name,
                            value: "hivTestNotDone",
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                    ]
                }
            },
            {

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'HIV test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'testDate',
                                    eventType: 'blur',
                                    required: true,
                                    isDatePopover: true
                                }

                            ]
                        }
                    ],

                },
            },
            {

                checkboxBtnContent:
                {
                    header: {
                        title: 'Reasons HIV test not done:',
                        selectedValue: '',
                        displayNone: true,
                        name: "hivOutcome",
                    },
                    data: [
                        {
                            name: "Test Stock Out",
                            value: hivTestForm.testStockOut.value,
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                            checked: false
                        },
                        {
                            name: "Expired Tests",
                            value: hivTestForm.expiredTests.value,
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                            checked: false
                        },
                        {

                            name: "Other",
                            value: 'other',
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between',
                            checked: false
                        }


                    ],
                }

            },
            {

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'specify',
                                    icon: icons.editPen,
                                    value: hivTestForm.reasonsTestNotDone.name,
                                    name: hivTestForm.reasonsTestNotDone.value,
                                    eventType: 'input',
                                    inputWidth: "55%",
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent: {
                    header: {
                        title: 'Select the result of HIV test',
                        name: 'test2',
                        selectedValue: '',
                        displayNone: true,
                    },
                    data: [
                        {
                            name: hivTestForm.hivPositive.name,
                            value: hivTestForm.hivPositive.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },

                        {
                            name: hivTestForm.hivNegative1.name,
                            value: hivTestForm.hivNegative1.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.hivNegative2.name,
                            value: hivTestForm.hivNegative2.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.inconclusive.name,
                            value: hivTestForm.inconclusive.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"

                        }
                    ]
                }
            },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        displayNone: true,
                        name: "test1",
                        title: 'Is the woman at high risk of HIV?',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: hivTestForm.highRiskYes.name,
                            value: hivTestForm.highRiskYes.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: hivTestForm.highRiskNo.name,
                            value: hivTestForm.highRiskNo.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                    ]
                }
            },
        ] as any,
        syphilisTest: [
            {
                selectdData: [],
                isFinishBtn: false,
                classDash: 'dashed_bottom_border',
                radioBtnContent: {
                    header: {
                        title: 'Select whether:',
                        name: 'syphilisOption',
                        selectedValue: '',

                    },
                    data: [
                        {
                            name: syphilisForm.syphilisTestConducted.name,
                            value: syphilisForm.syphilisTestConducted.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: syphilisForm.syphilisTestOrdered.name,
                            value: syphilisForm.syphilisTestOrdered.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: syphilisForm.syphilisTestNotDone.name,
                            value: syphilisForm.syphilisTestNotDone.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                    ]
                }
            },
            {

                radioBtnContent:
                {
                    header: {
                        displayNone: true,
                        name: "syphilisDetails",
                        title: 'Select the type of syphilis test that was done',
                        selectedValue: ''
                    },
                    data: [
                        {
                            name: syphilisForm.rapidSyphilisTest.name,
                            value: syphilisForm.rapidSyphilisTest.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between",
                            checked: false
                        },
                        {
                            name: syphilisForm.offSiteLabTest.name,
                            value: syphilisForm.offSiteLabTest.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between",
                            checked: false
                        },
                        {
                            name: syphilisForm.treponemaPallidum.name,
                            value: syphilisForm.treponemaPallidum.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between",
                            checked: false
                        }

                    ],
                }

            },
            {
                selectdData: [],
                isFinishBtn: false,
                radioBtnContent: {
                    header: {
                        title: 'Syphilis test result',
                        selectedValue: '',
                        name: 'syphlisResults',
                        displayNone: true
                    },
                    data: [
                        {
                            name: syphilisForm.syphilisPositiveResults.name,
                            value: syphilisForm.syphilisPositiveResults.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                        {
                            name: syphilisForm.syphilisNegativeResults.name,
                            value: syphilisForm.syphilisNegativeResults.value,
                            labelPlacement: 'start',
                            colSize: "7",
                            justify: "space-between"
                        },
                    ]
                }
            },
            {
                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'Syphilis test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'syphilisDate',
                                    eventType: 'blur',
                                    required: true,
                                    inputWidth: "55%",
                                    isDatePopover: true
                                }

                            ]
                        }
                    ],

                },
            },
            {

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'Syphilis test date',
                                    icon: icons.calenderPrimary,
                                    value: '',
                                    name: 'syphilisDate',
                                    eventType: 'blur',
                                    required: true,
                                    inputWidth: "300px",
                                    isDatePopover: true
                                }

                            ]
                        }
                    ],

                },
            },
            {
                selectdData: [],
                isFinishBtn: false,
                checkboxBtnContent: {
                    header: {
                        title: 'Reason syphilis test not done',
                        selectedValue: '',
                        name: 'notDone',
                        displayNone: true,
                    },
                    data: [
                        {
                            name: syphilisForm.testStockOut.name,
                            value: syphilisForm.testStockOut.value,
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between'

                        },

                        {
                            name: syphilisForm.expiredTests.name,
                            value: syphilisForm.expiredTests.value,
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between'
                        },
                        {
                            name: "Other",
                            value: 'other',
                            checked: false,
                            labelPlacement: 'start',
                            colSize: '9',
                            justify: 'space-between'
                        },
                    ]
                }
            },
            {

                data: {
                    rowData: [
                        {
                            colData: [
                                {
                                    displayNone: true,
                                    inputHeader: 'specify',
                                    icon: icons.editPen,
                                    value: syphilisForm.reasonsTestNotDone.value,
                                    name: 'Reason',
                                    eventType: 'input',
                                    inputWidth: "55%",
                                    required: true
                                }

                            ]
                        }
                    ],

                }

            },
        ] as any,

    }),
    actions: {
        addMedicalHistory(data: any) {
            console.log("sonmething changedS", data)
            this.medicalHistory = data
        },
        addAllegy(data: any) {
            this.allegy = data
        },
        addExisitingChronicHealthConditions(data: any) {
            this.exisitingChronicHealthConditions = data
        },
        addhivTest(data: any) {
            this.hivTest = data
        },
        addSyphilisTest(data: any) {
            this.syphilisTest = data
        },
        // addOtherSite(data:any){
        //     this.otherSite = data
        // }
    },
    // persist:true
});
