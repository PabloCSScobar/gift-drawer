import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  page1Visited = false;
  page2Visited = false;
  canEnterPage(pageNo: number) {
    if (pageNo === 1) {
      this.page1Visited = true;
      this.page2Visited = false;
      return true;
    } else if (pageNo === 2) {
      if (this.page1Visited && !this.page2Visited) {
        this.page2Visited = true;
        return true;
      }
    } else if (pageNo === 3) {
      if (this.page1Visited && this.page2Visited) {
        return true;
      }
    }
    return false;
  }

}