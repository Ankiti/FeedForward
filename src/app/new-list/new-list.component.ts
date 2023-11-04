import { Component,OnInit } from '@angular/core';
import { ApprovedListService } from '../approved-list.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  approvedList: any[] = [];

  constructor(private approvedListService: ApprovedListService) {}

  ngOnInit() {
    this.approvedList = this.approvedListService.approvedList;
  }
}