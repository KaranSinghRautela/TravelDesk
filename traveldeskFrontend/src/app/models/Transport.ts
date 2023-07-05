export class Transport{
    //TransportDetailId:number;
    requestId:number =0;
    internationalTrvel:boolean=false;
    domesticTravel:boolean=false;
    travelDateFrom :any;
    travelDateTo:any;
    travelFrom:any|null;
    travelFromId:number=0;
    travelTo:any|null;
    travelToId:number=0;
    visaNumber:string = "";
    passportNumber:string="";
    //adharCardNo:string="";
    createdBy :any=null;
    createdDate:any;
    modifiedBy:any=null;
    modifiedDate:any=null;
    isActive:boolean=true;
     
}

;