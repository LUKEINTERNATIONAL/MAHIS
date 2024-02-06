import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configurationStore',{
    state: () => ({
        registrationDisplayType: 'list',
        enrollmentDisplayType: 'list',
    }),
    actions:{
        setRegistrationDisplayType(data: any){
            this.registrationDisplayType = data
        },
        setEnrollmentDisplayType(data: any){
            this.enrollmentDisplayType = data
        }
    },
    persist:true,

})