/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriaService } from './criteria.service';
import { MatTableDataSource } from '@angular/material';

/**
 * Create Criteria Component
 */
@Component({
  selector: 'mifosx-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  dataSource = ['XML', 'JSON', 'SQL'];

  productData = [];


  featureData = [];

  displayedColumns: string[] = ['criteria', 'score'];
  dataTable: MatTableDataSource<CriteriaScoreElement>;

  public criteriaObject = {
    feature: '',
    category: '',
    product: '',
    datasource: '',
    keyvalue: '',
    sqlapi : '',
    scoreCriteria: []
  };
  constructor(private _criteriaService: CriteriaService, private router: Router) {
    this.criteriaObject.scoreCriteria.push({
      criteria: '',
      score: '',
      id: null,
      errorflag: true
    });
  }

  ngOnInit() {
    this.getFeatureCategory();
    this.readallproducts();
  }
  addRow() {
    console.log(JSON.stringify(this.criteriaObject.scoreCriteria));
    this.criteriaObject.scoreCriteria.push(
      {   criteria: '',
      score: '',
      id: null,
      errorflag: true}
    );
    console.log(JSON.stringify(this.criteriaObject.scoreCriteria));
  }

  removeRow() {
    if(this.dataTable.data.length){
      this.dataTable.data.pop();
    }
    this.dataTable.filter="";
  }

public readallproducts(){
const successcallback = (data) => {
  for(let pro of data){
    this.productData.push(pro.name);
  }
};
this._criteriaService.readJSONfile(successcallback);
}
  public getFeatureCategory() {
    const successcallback = data => {
      for(let feat of data){
        let single ={
          id: JSON.parse(feat)['id'],
          feature: JSON.parse(feat)['feature'],
          category: JSON.parse(feat)['category']
        };
        this.featureData.push(single);
      }
    };
    this._criteriaService.getCategoryFeature(successcallback);
  }

  public onFeatureSelection(){
    let y =this.featureData.filter((feat) =>  feat.feature === this.criteriaObject.feature);
    this.criteriaObject.category = y[0].category;
  }

  public submitCriteria(){
    console.log(JSON.stringify(this.criteriaObject));
    const successcallback = (data) => {
      this.router.navigate(['criteriadetails']);
    }
    this._criteriaService.saveCriteria(this.criteriaObject, successcallback);
  }
}

export interface CriteriaScoreElement {
  criteria: string;
  score: string;

}




