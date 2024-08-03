import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output } from '@angular/core';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CustomButtonComponent, AsyncPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationComponent {
  pageTokens = input<{ prevPageToken: string | null; nextPageToken: string | null } | null>(null);

  @Input() itemsPerPage = 10;

  @Input() totalItems = 0;

  @Input() currentPageIndex = 1;

  @Input() isInfinity = false;

  @Input() isLoading = true;

  @Output() tokenChange: EventEmitter<string> = new EventEmitter<string>();

  matAttribute = MAT_ATTRIBUTE;

  moveToPageByToken(token: string | null) {
    if (token) {
      this.tokenChange.emit(token);
    }
  }

  moveToPage(pageIndex: number) {
    if (pageIndex >= 1 && (this.isInfinity || pageIndex <= this.totalPages)) {
      this.currentPageIndex = pageIndex;
      window.scroll(0, 0);
    }
  }

  descendingPageIndex() {
    this.moveToPage(this.currentPageIndex - 1);
  }

  ascendingPageIndex() {
    this.moveToPage(this.currentPageIndex + 1);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
