import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';
import { Option } from '../../../../models/option.model';

@Component({
  selector: 'pa-redemption-new',
  templateUrl: './redemption-new.component.html',
  styleUrls: ['./redemption-new.component.scss']
})
export class RedemptionNewComponent implements OnInit {
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];
  @Input()
  public pawns: Option[];

  @Input()
  public form: FormGroup;

  public mode = AEMode.add;

  constructor() { }

  ngOnInit() { }
}
