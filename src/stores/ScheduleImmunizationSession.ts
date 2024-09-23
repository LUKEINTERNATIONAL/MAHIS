import { defineStore } from "pinia";
import { icons } from "@/utils/svg";
import _ from "lodash";
const initialImmunizationSessions = [
  {
    selectedData: {},
    isFinishBtn: false,
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Session name",
              value: "",
              name: "batch",
              eventType: "input",
              alertsErrorMassage: "",
              valueType: "text",
              validationFunctionName: "required",
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
              inputHeader: "Start Date",
              icon: icons.calenderPrimary,
              value: "",
              name: "start date",
              eventType: "input",
              alertsErrorMassage: "",
              required: true,
              isDatePopover: true,
              minDate: "",
              maxDate: "",
              validationFunctionName: "required",
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
              inputHeader: "End date",
              icon: icons.calenderPrimary,
              value: "",
              name: "end date",
              eventType: "input",
              alertsErrorMassage: "",
              required: true,
              isDatePopover: true,
              minDate: "",
              maxDate: "",
              validationFunctionName: "required",
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
              inputHeader: "Session type",
              icon: icons.search,
              value: "",
              name: "product name",
              eventType: "input",
              alertsErrorMassage: "",
              selectedID: "",
              validationFunctionName: "required",
              isSingleSelect: true,
              trackBy: "id",
              multiSelectData: [
                {
                  id: "1",
                  name: "Static",
                },
                {
                  id: "2",
                  name: "Outreach",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    selectedData: {},
    isFinishBtn: false,
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Repeat",
              icon: icons.search,
              value: "",
              name: "repeat",
              eventType: "input",
              alertsErrorMassage: "",
              selectedID: "",
              validationFunctionName: "required",
              isSingleSelect: true,
              trackBy: "id",
              multiSelectData: [
                {
                  id: "1",
                  name: "Never",
                },
                {
                  id: "2",
                  name: "Daily",
                },
                {
                  id: "3",
                  name: "Weekly",
                },
                {
                  id: "4",
                  name: "Monthly",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    selectedData: {},
    isFinishBtn: false,
    data: {
      rowData: [
        {
          colData: [
            {
              inputHeader: "Assignees",
              icon: icons.search,
              value: [],
              name: "assignees",
              eventType: "input",
              alertsErrorMassage: "",
              selectedID: "",
              validationFunctionName: "required",
              isMultiSelect: true,
              trackBy: "user_id",
              multiSelectData: [],
            },
          ],
        },
      ],
    },
  },
] as any;
export const useImmunizationSessionsStore = defineStore(
  "immunizationSessionsStore",
  {
    state: () => ({
      immunizationSessions: [...initialImmunizationSessions] as any,
    }),
    actions: {
      setImmunizationSessions(data: any) {
        this.immunizationSessions = data;
      },
      getImmunizationSessions() {
        const data = _.cloneDeep(initialImmunizationSessions);
        return [...data];
      },
      resetFieldValues() {
        type value =
          | string
          | number
          | boolean
          | string[]
          | number[]
          | any[]
          | Record<string, unknown>;
        const defaultValues: Record<string, value> = {
          string: "",
          number: 0,
          boolean: false,
          array: new Array(),
          object: {},
        };
        this.immunizationSessions.forEach((session: any) => {
          session.data.rowData.forEach((row: any) => {
            row.colData.forEach((col: any) => {
              col.value =
                defaultValues[
                  typeof Array.isArray(col.value) ? "array" : typeof col.value
                ];
            });
          });
        });
      },
    },
  }
);
