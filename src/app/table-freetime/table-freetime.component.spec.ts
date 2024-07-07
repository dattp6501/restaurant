import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFreetimeComponent } from './table-freetime.component';

describe('TableFreetimeComponent', () => {
  let component: TableFreetimeComponent;
  let fixture: ComponentFixture<TableFreetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableFreetimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableFreetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
