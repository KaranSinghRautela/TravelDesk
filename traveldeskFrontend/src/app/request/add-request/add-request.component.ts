import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MealPreference } from 'src/app/models/MealPreference';
import { NoOfMeals } from 'src/app/models/NoOfMeals';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RequestService } from 'src/app/services/request.service';
import { TransportService } from 'src/app/services/transport.service';
import { CommonserviceService } from 'src/app/services/commonservices.service';
import { Request } from 'src/app/models/Request';
import { Transport } from 'src/app/models/Transport';
import { Hotel } from 'src/app/models/Hotel';
import { Manager } from 'src/app/models/Manager';
import { Project } from 'src/app/models/Project';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Cities } from 'src/app/models/Cities';
import { NgToastService } from 'ng-angular-popup';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRequestComponent {
  selectedBookingType: string = '';
  selectedFileName:string = '';
  @ViewChild('fileInput') fileInput: any;



  ngForm!: FormGroup;

  constructor(private _reqService: RequestService, private formBuilder: FormBuilder, private _transportservice: TransportService, private _hotelservice: HotelService,
    private _commonservice: CommonserviceService, private router: Router, private toastService: NgToastService, private authservice: AuthService, private _userService: UserService, private _projService: ProjectService) {
     }


  mealpreference: MealPreference[] = [];
  noofmeals: NoOfMeals[] = [];
  managers: Manager[] = [];
  projects: Project[] = [];
  cities: Cities[] = [];
  requestId = 0;

  ngOnInit(): void {
    this.GetMealPreference();
    this.GetNoOfMeals();
    this.GetManagers();
    this.GetProjects();
    this.GetCities();
    this.ngForm = this.formBuilder.group({
      Reason: [''],
      Adhar: [''],
      Manager:[''],
      Project:[''],
      TypeofBooking:[''],
      Checkin:[''],
      Checkout:[''],
      Mealpreference:[''],
      Mealcombo:[''],
      Departure:[''],
      Return:[''],
      From:[''],
      To:[''],
      Passportnum:[''],
      Passportfile:[''],
      Visanum:[''],
      Visafile:[''],
      FlightSelection:['domestic']
    });
  }

  request = new Request();

  GetMealPreference() {
    this._commonservice.GetMealPreference().subscribe(
      (res) => {
        this.mealpreference = res;
      }
    )
  }
  GetNoOfMeals() {
    this._commonservice.GetNoOfMeals().subscribe(
      (res) => {
        this.noofmeals = res;
      }
    )
  }
  GetManagers() {
    this._userService.GetManagerList().subscribe(
      (res) => {
        this.managers = res;
      }
    )
  }
  GetProjects() {
    this._projService.GetProjects().subscribe(
      (res) => {
        console.log(res);
        this.projects = res;
      }
    )
  }
  GetCities() {
    this._commonservice.GetCities().subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      }
    )
  }

  AddRequest() {
    this.request = {
      requestId: 0,
      userId: this.authservice.getUserId(),
      projectId: this.ngForm.value.Project,
      reasonForTraveling: this.ngForm.value.Reason,
      status: "pending",
      managerId: this.ngForm.value.Manager,
      documentId: 1,
      AadharNumber: this.ngForm.value.Adhar,
      createdBy: this.authservice.getUserName(),
      createdDate: Date.now,
      modifiedBy: this.authservice.getUserName(),
      modifiedDate: Date.now,
      isActive: true,


    }
    this._reqService.AddRequest(this.request).subscribe(res => {
      this.toastService.success({
        detail: 'SUCCESS',
        summary: 'Request Added Successfully',
        duration: 3000,
      });
      console.log(res.requestId);
      console.log(this.ngForm.value);
      this.requestId = res.requestId;
      console.log(this.ngForm.value.TypeofBooking);
      if (this.ngForm.value.TypeofBooking == "Flight") {
        this.AddTransportDetails();
        this.router.navigate(["/requests"]);
      }
      else if (this.ngForm.value.TypeofBooking == "Hotel") {
        this.AddHotelDetails();
        this.router.navigate(["/requests"]);
      }
      else {
        this.AddTransportDetails();
        this.AddHotelDetails();
        this.router.navigate(["/requests"]);
      }

    })

  }


  transport = new Transport();

  AddTransportDetails() {
    console.log(this.ngForm.value);
    var tflag = false;
    if (this.ngForm.value.FlightSelection == "international") {
      tflag = true;
    }


    this.transport = {

      requestId: this.requestId,
      internationalTrvel: tflag,
      domesticTravel: !tflag,
      travelDateFrom: this.ngForm.value.Departure,
      travelDateTo: this.ngForm.value.Return,
      travelFrom: null,
      travelFromId: this.ngForm.value.From,
      travelTo: null,
      travelToId: this.ngForm.value.To,
      visaNumber: this.ngForm.value.Visanum,
      passportNumber: this.ngForm.value.Passportnum,
      // adharCardNo:form.controls.AdhaarCardNumber.value,
      createdBy: this.authservice.getUserName(),
      createdDate: Date.now,
      modifiedBy: this.authservice.getUserName(),
      modifiedDate: Date.now,
      isActive: true


    }
    this._transportservice.AddTransportDetails(this.transport).subscribe(res => {

      console.log(res);

    })

  }



  hotel = new Hotel();
  AddHotelDetails() {
    this.hotel = {
      requestId: this.requestId,
      stayDateFrom: this.ngForm.value.Checkin,
      stayDateTo: this.ngForm.value.Checkout,
      mealPreferenceId: this.ngForm.value.Mealpreference,
      noOfMealsId: this.ngForm.value.Mealcombo,
      createdBy: this.authservice.getUserName(),
      createdDate: Date.now,
      modifiedBy: this.authservice.getUserName(),
      modifiedDate: Date.now,
      isActive: true
    }
    this._hotelservice.AddHotelDetails(this.hotel).subscribe(res => {

      console.log(res);

    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFileName = file.name;
    // Perform necessary operations with the selected file
    console.log('File selected:', file);
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
