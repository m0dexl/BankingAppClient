import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePanelComponent } from './employee-panel.component';

describe('EmployeePanelComponent', () => {
  let component: EmployeePanelComponent;
  let fixture: ComponentFixture<EmployeePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePanelComponent]
    });
    fixture = TestBed.createComponent(EmployeePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
