import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

/**
 * Usage: {{ 'ui.save' | translate }}
 * Automatically re-renders when the active language changes.
 */
@Pipe({
  name: 'translate',
  pure: false,    // impure so it re-evaluates when language changes
  standalone: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {

  private _sub: Subscription;
  private _lastKey = '';
  private _lastValue = '';

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
  ) {
    this._sub = this.translationService.currentLang$.subscribe(() => {
      // Force re-evaluation of any binding using this pipe.
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    if (key !== this._lastKey) {
      this._lastKey = key;
    }
    this._lastValue = this.translationService.translate(key);
    return this._lastValue;
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
