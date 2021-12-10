// import { LightningElement, wire } from 'lwc';
// import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';

// // const DELAY = 300;
// const columns = [
//     { label: 'Id', fieldName: 'Id'},
//     { label: 'Name', fieldName: 'Name'},
//     { label: 'Stage', fieldName: 'StageName'},
//     { label: 'Close Date', fieldName: 'CloseDate'},
//     { label: 'Amount', fieldName: 'Amount', type: 'currency' }
// ];

// export default class WiredOpportunities extends LightningElement {
//     searchKey = '';
//     columns = columns;

//     @wire(getOpportunityList, { searchKey: '$searchKey' })
//     opportunities;

//     // handleKeyChange(event) {
//     //     window.clearTimeout(this.delayTimeout);
//     //     const searchKey = event.target.value;
//     //     this.delayTimeout = setTimeout(() => {
//     //         this.searchKey = searchKey;
//     //     }, DELAY);
//     // }

//     handleChange(event) {
//         this.searchKey = event.target.value;
//     }

//     // TODO2: check if we can retrieve these values using Apex
//     get options() {
//         return [
//             { label: 'Prospecting', value: 'Prospecting' },
//             { label: 'Qualification', value: 'Qualification' },
//             { label: 'Needs Analysis', value: 'Needs Analysis' },
//             { label: 'Value Proposition', value: 'Value Proposition' },
//             { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
//             { label: 'Perception', value: 'Perception Analysis' },
//             { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
//             { label: 'Negotiation', value: 'Negotiation/Review' },
//             { label: 'Closed/Won', value: 'Closed Won' },
//             { label: 'Closed/Lost', value: 'Closed Lost' },
//             { label: 'All', value: '%' },
//         ];
//     }
// }

import { LightningElement, wire } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

const columns = [
    { label: 'Id', fieldName: 'Id'},
    { label: 'Name', fieldName: 'Name'},
    { label: 'Stage', fieldName: 'StageName'},
    { label: 'Close Date', fieldName: 'CloseDate'},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' }
];

const picklists = [
    { label: 'All', value: '%' },
];

export default class WiredOpportunities extends LightningElement {
    searchKey = '';
    columns = columns;
    error;
    options;

    @wire(getOpportunityList, { searchKey: '$searchKey' })
    opportunities;

    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    opportunityMetadata;

    @wire(getPicklistValues, {
        recordTypeId: '$opportunityMetadata.data.defaultRecordTypeId',
        fieldApiName: STAGE_FIELD
    })
    getMyPicklistValues({ error, data }) {
        if (data) {
            const newPickLists = data.values.map(stage => {
                const obj = {};
                obj.label = stage.label;
                obj.value = stage.value;
                return obj;
            });
            this.options = newPickLists.concat(picklists);
            this.error = undefined;
        } else if (error){
            this.error = error;
            this.options = undefined;
        }
    }

    handleChange(event) {
        this.searchKey = event.target.value;
    }
}


