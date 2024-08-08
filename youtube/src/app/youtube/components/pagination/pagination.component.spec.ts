import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import PaginationComponent from './pagination.component';

describe('PaginationComponent', () => {
  let pagination: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    pagination = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the pagination', () => {
    expect(pagination).toBeTruthy();
  });

  it(`should have as itemsPerPage '10'`, () => {
    expect(pagination.itemsPerPage).toEqual(10);
  });
});
