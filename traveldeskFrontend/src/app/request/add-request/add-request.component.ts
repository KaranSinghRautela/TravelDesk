import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent {
  constructor(private _reqService: RequestService, private formBuilder: FormBuilder, private _transportservice: TransportService, private _hotelservice: HotelService,
    private _commonservice: CommonserviceService, private router: Router, private toastService: NgToastService, private authservice: AuthService, private _userService: UserService, private _projService: ProjectService) { }
  mealpreference: MealPreference[] = [];
  noofmeals: NoOfMeals[] = [];
  managers: Manager[] = [];
  projects: Project[] = [];
  cities: Cities[] = [];
  requestId = 0;



  selectedBookingType: string = '';

  ngForm !: FormGroup;

  ngOnInit(): void {
    this.GetMealPreference();
    this.GetNoOfMeals();
    this.GetManagers();
    this.GetProjects();
    this.GetCities();
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
  AddRequest(form: any) {
    this.request = {
      requestId: 0,
      userId: this.authservice.getUserId(),
      projectId: form.controls.project.value,
      reasonForTraveling: form.controls.reason.value,
      status: "pending",
      managerId: form.controls.manager.value,
      documentId: 1,
      AadharNumber: form.controls.adhaar.value,
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
      console.log(form.value);
      this.requestId = res.requestId;
      console.log(form.controls.bookingType.value);
      if (form.controls.bookingType.value == "Flight") {
        this.AddTransportDetails(form);
        this.router.navigate(["/requests"]);
      }
      else if (form.controls.bookingType.value == "Hotel") {
        this.AddHotelDetails(form);
        this.router.navigate(["/requests"]);
      }
      else {
        this.AddTransportDetails(form);
        this.AddHotelDetails(form);
        this.router.navigate(["/requests"]);
      }

    })

  }

  transport = new Transport();

  AddTransportDetails(form: any) {
    console.log(form.value);
    var tflag = false;
    if (form.controls.flightSelection.value == "international") {
      tflag = true;
    }


    this.transport = {

      requestId: this.requestId,
      internationalTrvel: tflag,
      domesticTravel: !tflag,
      travelDateFrom: form.controls.departure.value,
      travelDateTo: form.controls.return.value,
      travelFrom: null,
      travelFromId: form.controls.from.value,
      travelTo: null,
      travelToId: form.controls.to.value,
      visaNumber: form.controls.visaNumber.value,
      passportNumber: form.controls.passportNumber.value,
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
  AddHotelDetails(form: any) {
    this.hotel = {
      requestId: this.requestId,
      stayDateFrom: form.controls.stayingFrom.value,
      stayDateTo: form.controls.stayingTill.value,
      mealPreferenceId: form.controls.mealPreference.value,
      noOfMealsId: form.controls.numberOfMeals.value,
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
}
