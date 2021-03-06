import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewInit} from "@angular/core";
import { AEMode } from "../../../../models/crud.enum";
import { Redemption } from "../../../../models/redemption.mode";

@Component({
  selector: "pa-redemption-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class RedemptionTableComponent implements AfterViewInit {
  @Input()
  public rows: Redemption[];
  @Output()
  public selections = new EventEmitter<Redemption>();
  @Output()
  public editMode = new EventEmitter<AEMode>();
  @Output()
  public onClear = new EventEmitter<AEMode>();
  @Output()
  public pageVar = new EventEmitter<any>();
  @Input()
  public totalRecords: number;
  @Input() public cols: any[];

  public rowIndex: any;
  public selectedRows: any = [];
  public loading: boolean = true;

  @ViewChild("searchTable") searchTable: any;

  constructor(private cdRef: ChangeDetectorRef) {
    this.rowIndex = "id";
    this.cols = [ 
      { field: "id", header: "ID" },
      { field: "redemptionPawnTicket", header: "Pawn Ticket" },
      { field: "fullname", header: "Pawner" },
      { field: "itemName", header: "Item Name" },
      { field: "redemptionDate", header: "Redemption Date" },
      { field: "remarks", header: "remark" }
    ];
  }

  ngAfterViewInit(): void {
    if(this.rows) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

    this.cdRef.detectChanges();
  }

  public onRowSelect(event: any): void {
    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
  }

  public onRowUnselect(): void {
    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
    this.selectedRows = [];
  }

  private actionMode(): AEMode {
    return this.searchTable.selection.length === 1 ? AEMode.edit : AEMode.add;
  }
}
