import { defineStore } from 'pinia'
import { icons } from '@/utils/svg';

export const useReasonForVisitStore = defineStore('reasonForVisitStore',{
    state: () => ({
        ReasonForVisit: [
            {
                classDash:'dashed_bottom_border',
                radioBtnContent:
                    {
                        header:{
                            title: '',
                            selectedValue: ''
                        },
                        data:[
                            {
                                value: 'FirstAntenatal',
                                name: 'First antenatal care contact',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                value: 'ScheduledAntenatal',
                                name: 'Scheduled antenatal care contact',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            },
                            {
                                name: 'Specific complaint related to antenatal care',
                                value: 'SpecificComplaint',
                                labelPlacement: 'start',
                                colSize: '7',
                                justify: 'space-between'

                            }
                        ]
                    }

            },

        ] as any
    }),
    actions:{
        setPersonalInformation(data: any){
            this.ReasonForVisit = data
        }
    },
    persist:true,

})