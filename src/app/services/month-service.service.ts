import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() { }

  //Calculate year code
  private number_of_last_two_digits(x:number): number {
    if (x<1800)
      return 4
    else if (x<1900)
      return 2
    else if (x<2000)
      return 0
    else if (x<2100)
      return 6
    else if (x>=2100)
      return 4
    else 
      return 0
  }

  private year_code(year: number) : number {
    let last_two_digits = year % 100
    return last_two_digits + Math.floor(last_two_digits/4) + this.number_of_last_two_digits(year)
  }

  //Calculate month code

  /*
  def month_code(M,Y):
    return_code=switcher.get(M)
    if return_code==-1:
        if M=='January':
            return january_leap(Y)
        else:
            return february_leap(Y)
    else:
        return return_code
  */
  private is_leap_year(year:number):boolean{
    if (year%100==0 && year%400==0)
      return true
    else if (year%100==0 && year%400!=0)
      return false
    else if (year%4==0)
      return true
    else
      return false
  }

  private month_switcher(month:number):number{
    switch(month){
      case 1: return -1;
      case 2: return -1;
      case 3: return 4;
      case 4: return 0;
      case 5: return 2;
      case 6: return 5;
      case 7: return 0;
      case 8: return 3;
      case 9: return 6;
      case 10: return 1;
      case 11: return 4;
      case 12: return 6;
      default: console.log("Invalid value in month switcher, please check"); return 0; 
    }
  }

  private month_code(month:number, year:number) : number {
    let month_mapping = this.month_switcher(month);
    if (month_mapping==-1){ //check leap year
      let isLeap = this.is_leap_year(year)

      if (month==1 && isLeap)
        return 0
      else if (month==1 && !isLeap)
        return 1
      else if (month==2 && isLeap)
        return 3
      else
        return 4
    }
    else{
      return month_mapping
    }
  }

  //Day code is simple, just return self

  //Final calculation
  private day_of_week_switcher(day_code:number):number{
    switch(day_code){
      case 0: return 6;
      case 1: return 7;
      case 2: return 1;
      case 3: return 2;
      case 4: return 3;
      case 5: return 4;
      case 6: return 5;
      default: console.log("Invalid value in day of week switcher, please check"); return 0; 
    }
  }
    
  public day_of_week(day:number, month:number, year:number) : number {
    //console.log(day+" "+month+" "+year);
    //console.log("Year code" + this.year_code(year));
    //console.log("Year code" + this.month_code(month,year));
    return this.day_of_week_switcher( (this.year_code(year) + this.month_code(month,year) + day)%7 );
  } 


  //How many days in that month
  private days_in_month_switcher(month:number):number{
    switch(month){
      case 1: return 31;
      case 2: return -1;
      case 3: return 31;
      case 4: return 30;
      case 5: return 31;
      case 6: return 30;
      case 7: return 31;
      case 8: return 31;
      case 9: return 30;
      case 10: return 31;
      case 11: return 30;
      case 12: return 31;
      default: console.log("Invalid value in month switcher, please check"); return 0; 
    }
  }
  


  public prepare_list_days(month:number, year:number) {
    let result = [];
    let first_day = this.day_of_week(1, month, year);
    //console.log("First day:",first_day);
    
    let started = false;
    let counter = 1;
    let days_in_month = this.days_in_month_switcher(month)
    if (days_in_month==-1 && this.is_leap_year(year))
      days_in_month=29
    else if (days_in_month==-1)
      days_in_month=28

    for (let i = 1; i <= 6; i++) {
      let intermideate = [];
      for (let j = 1; j<= 7; j++){
        if (j==first_day && !started){
          intermideate.push(counter.toString());
          counter++;
          started=true;
        }
        else if (!started){
          intermideate.push("");
        }
        else if(counter<=days_in_month){
          intermideate.push(counter.toString());
          counter++;
        }
        else{
          intermideate.push("");
        }
      }
      result.push(intermideate);
    }

    return result
  }

}
