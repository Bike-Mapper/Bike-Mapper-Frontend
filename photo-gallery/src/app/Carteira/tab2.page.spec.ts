import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Carteira } from './tab2.page';

describe('Tab2Page', () => {
  let component: Carteira;
  let fixture: ComponentFixture<Carteira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carteira, IonicModule, ExploreContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Carteira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
