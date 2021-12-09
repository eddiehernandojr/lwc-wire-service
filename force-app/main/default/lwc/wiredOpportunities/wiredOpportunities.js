import { LightningElement, wire } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';

// const DELAY = 300;
const columns = [
    { label: 'Id', fieldName: 'Id'},
    { label: 'Name', fieldName: 'Name'},
    { label: 'Stage', fieldName: 'StageName'},
    { label: 'Close Date', fieldName: 'CloseDate'},
    { label: 'Amount', fieldName: 'Amount', type: 'currency' }
];

export default class WiredOpportunities extends LightningElement {
    searchKey = '';
    columns = columns;

    @wire(getOpportunityList, { searchKey: '$searchKey' })
    opportunities;

    // handleKeyChange(event) {
    //     window.clearTimeout(this.delayTimeout);
    //     const searchKey = event.target.value;
    //     this.delayTimeout = setTimeout(() => {
    //         this.searchKey = searchKey;
    //     }, DELAY);
    // }

    handleChange(event) {
        this.searchKey = event.target.value
    }

    get options() {
        return [
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Value Proposition', value: 'Value Proposition' },
            { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
            { label: 'Perception', value: 'Perception Analysis' },
            { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
            { label: 'Negotiation', value: 'Negotiation/Review' },
            { label: 'Closed/Won', value: 'Closed Won' },
            { label: 'Closed/Lost', value: 'Closed Lost' },
            { label: 'All', value: '%' },
        ];
    }
}