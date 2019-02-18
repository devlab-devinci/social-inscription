import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubscribeComponent } from './project-subscribe.component';

describe('ProjectSubscribeComponent', () => {
  let component: ProjectSubscribeComponent;
  let fixture: ComponentFixture<ProjectSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
