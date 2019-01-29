import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEditComponent } from './projects-edit.component';

describe('ProjectsEditComponent', () => {
  let component: ProjectsEditComponent;
  let fixture: ComponentFixture<ProjectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
