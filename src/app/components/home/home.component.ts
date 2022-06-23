import { Component, OnInit } from '@angular/core';
import { MonthService } from 'src/app/services/month-service.service';

import HolidayJson from '../../../assets/holidays.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public monthService: MonthService) { }

  public weekDaysName : string[] = [];
  public curr_date: number;
  public curr_month: number;
  public curr_year: number;
  public daysInMonth: string[][] = [];

  public curr_month_name : string;
  public selected_month : any;

  public holiday_class: String[][] = [];

  ngOnInit(): void {
    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");

    var d = new Date();
    this.curr_date = d.getDate();
    this.curr_month = d.getMonth()+1;
    this.curr_year = d.getFullYear();
    this.curr_month_name = this.month_switcher(this.curr_month);

    this.configureMonthDays();

    console.log(HolidayJson);
  }

  private month_switcher(month:number):string{
    switch(month){
      case 1: return "January";
      case 2: return "February";
      case 3: return "March";
      case 4: return "April";
      case 5: return "May";
      case 6: return "June";
      case 7: return "July";
      case 8: return "August";
      case 9: return "September";
      case 10: return "October";
      case 11: return "November";
      case 12: return "December";
      default: console.log("Invalid value in month switcher, please check"); return "Null"; 
    }
  }

  public onNextMonth(): void {
    this.curr_month++;
    if (this.curr_month == 13) {
      this.curr_month = 1;
      this.curr_year++;
    }
    this.curr_month_name=this.month_switcher(this.curr_month);
    this.configureMonthDays();
  }

  public onPreviousMonth() : void{
    this.curr_month--;
    if (this.curr_month < 1) {
      this.curr_month = 12;
      this.curr_year--;
    }
    this.curr_month_name=this.month_switcher(this.curr_month);
    this.configureMonthDays();
  }


  private checkHoliday(day: String):Boolean{
    if( Number(day)<=9 )
      day = '0' + day;

    let month = String(this.curr_month);
    if( this.curr_month<=9 )
      month = '0' + String(month);

    console.log(day+'.'+month+'.'+this.curr_year);
    if (HolidayJson.hasOwnProperty(day+'.'+month+'.'+this.curr_year))
      return true
    else
      return false
  }

  public configureMonthDays(){
    this.daysInMonth = this.monthService.prepare_list_days(this.curr_month, this.curr_year)
    for(let i=0; i<7; i++){
      if (this.daysInMonth[5][i]!='')
        break
      if (i==6){
        delete this.daysInMonth[5];
      }
    }

    this.holiday_class = [];
    for (let i=0; i<this.daysInMonth.length; i++){
      let intermideate = [];
      for (let j=0; j<7; j++){
        if (this.checkHoliday(this.daysInMonth[i][j]))
          intermideate.push('holiday');
        else
          intermideate.push('');
      }
      this.holiday_class.push(intermideate);
    }    
  }

  public monthChange(event: any){
    //console.log(this.curr_month);
    console.log(event)
    this.curr_month = Number(event);
    this.curr_month_name = this.month_switcher(this.curr_month);
    this.curr_month_name = this.month_switcher(this.curr_month);
    this.configureMonthDays();
  }

  public yearChange(newYear: any) {
    this.curr_year = newYear;
    this.configureMonthDays();
  }

  public dateChange(event: any) {
    //console.log(event.target.value);
    this.curr_year = Number(event.target.value.substring(0,4));
    this.curr_month = Number(event.target.value.substring(5,7));
    this.curr_month_name = this.month_switcher(this.curr_month);
    this.configureMonthDays();
  }

}
