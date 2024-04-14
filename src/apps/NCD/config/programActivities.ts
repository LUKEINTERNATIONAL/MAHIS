import { TaskInterface } from "@/interfaces/TaskInterface";

["", "", "", "", "", "", ""];
export const NCD_PRIMARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'Vital Signs',
    name: 'Vital Signs',
    icon: 'attributes.png'
  },
  {
    id: 'vitals',
    name: 'Vitals',
    icon: 'vitals.png'
  },
  {
    id: 'Investigations',
    name: 'Investigations',
    icon: 'complaints.png'
  },
  {
    id: 'Diagnosis',
    name: 'Diagnosis',
    icon: 'aids.png',
    encounterTypeName: 'Diagnosis',
    availableOnActivitySelection: false
  },
  {
    id: 'Complications Screening',
    name: 'Complications Screening',
    icon: 'diagnosis.png'
  },
  {
    id: 'Treatment Plan',
    name: 'Treatment Plan',
    icon: 'outcomes.png',
  },
  {
    id: 'Next Appointment',
    name: 'Next Appointment',
    icon: 'clinical-notes.png'
  },
  {
    id: 'Outcome',
    name: 'Outcome',
    icon: 'enter.png',
  },
]

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
  {
    id: 'radiology examination',
    name: 'radiology examination',
    icon: 'radiology_types.png'
  },
]
