import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagensPage } from './imagens.page';

describe('ImagensPage', () => {
  let component: ImagensPage;
  let fixture: ComponentFixture<ImagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
