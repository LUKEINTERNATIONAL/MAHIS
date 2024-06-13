import { TaskInterface } from "@/interfaces/TaskInterface";

export const OPD_PRIMARY_ACTIVITIES: TaskInterface[] = [
    {
        id: "Clinical Assessment",
        name: "Clinical Assessment",
        icon: "attributes.png",
    },
    {
        id: "Investigations",
        name: "Investigations",
        icon: "vitals.png",
    },
    {
        id: "Diagnosis",
        name: "Diagnosis",
        icon: "complaints.png",
    },
    {
        id: "Treatment Plan",
        name: "Treatment Plan",
        icon: "outcomes.png",
    },
    {
        id: "Outcome",
        name: "Outcome",
        icon: "diagnosis.png",
    },
];

export const SECONDARY_ACTIVITIES: TaskInterface[] = [
    {
        id: "radiology examination",
        name: "radiology examination",
        icon: "radiology_types.png",
    },
];
