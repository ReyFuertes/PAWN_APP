import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Renewal } from '../../../../models/renewal.model';
import { RenewalService } from '../../renewal.service';
import { Router } from '@angular/router';
import { PrintParams } from '../../../../models/print.model';

@Component({
  selector: 'pa-renewal-print-table',
  templateUrl: './renewal-print-table.component.html',
  styleUrls: ['./renewal-print-table.component.scss']
})
export class RenewalPrintTableComponent implements OnInit, AfterViewInit {
  @Input()
  public printParams: PrintParams;

  public renewals: Renewal[];

  constructor(private router: Router, private renewalService: RenewalService) { }

  ngOnInit(): void { 
    this.loadRenewal();
  }

  ngAfterViewInit(): void {
    
  }

  public loadRenewal(): void {
    this.renewalService.printRenewals(this.printParams).subscribe(response => {
      this.renewals = response.renewals;

      if(this.renewals && this.renewals.length > 0) {
        setTimeout(() => {
          this.print();
        }, 1000);
      }
    });
  }

  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: "Roboto", sans-serif;
              color:#444;
            }
            table tr td:first-child {
              text-align: center;
            }
            table tr td:nth-child(2) {
              width:120px;
            }
            table tr td:nth-child(3) {
              width:120px;
            }
            table tr td:nth-child(4) {
              width:200px;
            }
            table tr td:nth-child(5) {
              width:200px;
            }
            table {
              width:100%;
              border-collapse: collapse;
            }
            table tr td, table tr th {
              padding:5px;
              font-family: "Roboto", sans-serif;
              font-size:12px;
              border: thin #CCC solid;
              collap
            }
            table tr th {
              background:#CCC;
              background-color:#CCC;
            }
            .doNotPrint {
              display:none;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  public onBack(): void {
    this.router.navigateByUrl('dashboard/renewals');
  }

  private maxNum(): number {
    return Math.floor(Math.random() * 150);
  }
}
