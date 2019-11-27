import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Slide2confirmComponent } from './slide2confirm.component';

describe('Slide2confirmComponent', () => {
  let component: Slide2confirmComponent;
  let fixture: ComponentFixture<Slide2confirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Slide2confirmComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Slide2confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
