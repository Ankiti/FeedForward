import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApprovedListService {
  approvedList: any[] = [];

  addApprovedRow(row: any) {
    this.approvedList.push(row);
  }

  resetApprovedList() {
    this.approvedList = [];
  }
}