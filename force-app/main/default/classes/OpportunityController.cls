public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityList(String searchKey) {     
        return [
            // TODO1: find a way to include Account.Name, Owner.Name
            SELECT Id, Name, StageName, CloseDate, Amount
            FROM Opportunity
            WHERE StageName = :searchKey
            WITH SECURITY_ENFORCED
        ];
    }
}