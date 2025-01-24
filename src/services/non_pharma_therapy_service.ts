import { OutcomeService } from "@/services/outcome_service";

export class nonPharmaTherapyService extends OutcomeService {
    constructor() {
        super();
        this.encounterTypeID = 105;
    }
}