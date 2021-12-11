import { LightningElement, wire } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Stage', fieldName: 'StageName' },
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
    getCustomPicklistValues({ error, data }) {
        // TODO2: include no row message
        if (data) {
            const newPickLists = data.values.map(stage => ({ label: stage.label, value: stage.value }));
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