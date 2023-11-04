import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApprovedListService } from '../approved-list.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
})
export class HomeListComponent implements OnInit {
  childrenData: any; // Define a variable to store the JSON data
  sortedChildrenData: any[] = [];


  constructor(private http: HttpClient, private approvedListService: ApprovedListService) {}

  
  reset() {
    this.approvedListService.resetApprovedList();
  }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data) => {
      if (Array.isArray(data)) {
        this.childrenData = data;
        this.sortedChildrenData = data.slice(); // Initialize sortedChildrenData with the original data
      } else {
        // Handle the case where 'data' is not an array, such as converting it to an array if needed.
        console.error('Data is not an array:', data);
      }
    });
  }

  topResultsCount: number = 0; // Default to show all

  showRowsBasedOnImportance(count: number) {
    // Sort the rows based on importance
    this.sortedChildrenData = this.childrenData.slice().sort((a: any, b: any) => b.importance - a.importance);
  
    // Limit the rows displayed to the specified count
    this.sortedChildrenData = this.sortedChildrenData.slice(0, count);
  }

  approveRow(parent: any, child: any, isApproved: boolean) {
    if (!child.isApproved) {
      const approvedRow = {
        child_name: child.child_name,
        birthday: child.birthday,
        school: child.school,
        address: child.address,
        parent_name: parent.parent_name,
        email: parent.email,
        phone_number: parent.phone_number,
        household_income: parent.household_income,
        homeowner: parent.homeowner,
        carowner: parent.carowner,
        DependentKids: parent.DependentKids,
        'Single Parent': parent['Single Parent'],
        importance: parent.importance,
      };

      this.approvedListService.addApprovedRow(approvedRow);
      child.isApproved = true;
    }
  }
}

