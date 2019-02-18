import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQrcodeComponent } from './project-qrcode.component';

describe('ProjectQrcodeComponent', () => {
  let component: ProjectQrcodeComponent;
  let fixture: ComponentFixture<ProjectQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
