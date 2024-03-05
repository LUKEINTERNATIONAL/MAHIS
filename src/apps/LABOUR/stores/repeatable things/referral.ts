import { defineStore } from 'pinia'
import { icons } from '@/utils/svg'

export const useReferralStore = defineStore('referralStore',{
    state: () => ({

        referral: [

            {
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData:[
                            {
                                colData:    [
                                    {
                                        inputHeader: 'Time of referral',
                                        unit: '',
                                        icon: icons.time,
                                        value: '',
                                        name: 'Time of referral',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'Pick time'
                                    },
                                    {
                                        inputHeader: 'Date of referral',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: ' ',
                                        name: 'Date of referral',
                                        required: true,
                                        datePopover:true,
                                        eventType: 'input',
                                        placeholder:'Pick date'
                                    }
                                ],
                            },
                        ]
                    },
                alerts:[
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        name: '',
                        index: ''
                    }
                ],
            },

            {
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',

                data:
                    {
                        rowData:[
                            {
                                colData: [
                                    {
                                        inputHeader: 'Reason for referral',
                                        unit: '',
                                        icon: icons.editPen,
                                        value: ' Reason for referral',
                                        name: 'reason for referral',
                                        eventType: 'input'
                                    }
                                ],
                            },

                        ]
                    },
            },
            {
                sectionHeader: '',
                classDash: 'dashed_bottom_border _padding',
                data:
                    {
                        rowData:[
                            {
                                colData:    [
                                    {
                                        inputHeader: 'Time transport arrived',
                                        unit: '',
                                        icon: icons.time,
                                        value: '',
                                        name: 'Time transport arrived',
                                        required: true,
                                        eventType: 'input',
                                        placeholder:'Pick time'
                                    },
                                    {
                                        inputHeader: 'Date transport arrived',
                                        unit: '',
                                        icon: icons.calenderPrimary,
                                        value: ' ',
                                        name: 'Date transport arrived',
                                        required: true,
                                        datePopover:true,
                                        eventType: 'input',
                                        placeholder:'Pick date'
                                    }
                                ],
                            },
                        ]
                    },
                alerts:[
                    {
                        backgroundColor: '',
                        status: '',
                        icon: '',
                        textColor: '',
                        value: '',
                        name: '',
                        index: ''
                    }
                ],
            },

        ] as any,
    }),
    actions:{
        setVitals(data: any){
            this.vitals = data
        },
    },
    persist:true,

})