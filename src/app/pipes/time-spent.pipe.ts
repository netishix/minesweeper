import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpent'
})
export class TimeSpentPipe implements PipeTransform {

  transform(value: number): string {
    let minutes: number = Math.floor(value / 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = (value - minutes * 60).toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

}
