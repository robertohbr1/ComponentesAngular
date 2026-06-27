import { Component, computed, input, model, effect } from '@angular/core';

@Component({
  selector: 'app-periodo-datas',
  imports: [],
  templateUrl: './periodo-datas.html',
  styleUrl: './periodo-datas.css',
})
export class PeriodoDatas {
  /**
   * Define o modo do seletor:
   * - 'day': Seleção de Dia/Mês/Ano (usa input type="date")
   * - 'month': Seleção de apenas Mês/Ano (usa input type="month")
   */
  readonly mode = input<'day' | 'month'>('day');

  /**
   * Data Inicial (formato YYYY-MM-DD no modo 'day' ou YYYY-MM no modo 'month').
   */
  readonly startDate = model<string>('');

  /**
   * Data Final (formato YYYY-MM-DD no modo 'day' ou YYYY-MM no modo 'month').
   */
  readonly endDate = model<string>('');

  /**
   * Estado de validade do período, exposto bidirecionalmente para o pai.
   */
  readonly isValid = model<boolean>(true);

  /**
   * Computa se o período selecionado é válido.
   * Retorna true se um dos campos estiver vazio ou se Data Inicial <= Data Final.
   */
  protected readonly isPeriodValid = computed(() => {
    const start = this.startDate();
    const end = this.endDate();

    // Se alguma das pontas não estiver preenchida, não há conflito.
    if (!start || !end) {
      return true;
    }

    // A comparação lexicográfica funciona perfeitamente para datas no formato ISO-8601 (YYYY-MM-DD ou YYYY-MM)
    return start <= end;
  });

  constructor() {
    // Mantém o modelo bidirecional 'isValid' sincronizado reativamente com o estado calculado
    effect(() => {
      this.isValid.set(this.isPeriodValid());
    });
  }

  /**
   * Manipula a mudança da Data Inicial.
   */
  protected onStartChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    this.startDate.set(inputEl.value);
  }

  /**
   * Manipula a mudança da Data Final.
   */
  protected onEndChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    this.endDate.set(inputEl.value);
  }
}
