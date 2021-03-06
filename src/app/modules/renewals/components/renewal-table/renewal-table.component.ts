import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import { AEMode } from "../../../../models/crud.enum";
import { Renewal } from "../../../../models/renewal.model";

@Component({
  selector: "pa-renewal-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class RenewalTableComponent implements AfterViewInit {
  @Input()
  public rows: Renewal[];
  @Output()
  public selections = new EventEmitter<Renewal>();
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
      { field: "renewalPawnTicket", header: "Pawn Ticket" },
      { field: "newPawnNumber", header: "New Pawn No." },
      { field: "fullname", header: "Pawner" },
      { field: "itemName", header: "Item Name" },
      { field: "renewalDate", header: "Renewal Date" },
      { field: "remarks", header: "Remark" }
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
