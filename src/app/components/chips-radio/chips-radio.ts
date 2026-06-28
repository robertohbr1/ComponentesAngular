import { Component, input, model, effect } from '@angular/core';

@Component({
  selector: 'app-chips-radio',
  imports: [],
  templateUrl: './chips-radio.html',
  styleUrl: './chips-radio.css',
})
export class ChipsRadio {
  /**
   * O título do seletor.
   */
  readonly title = input<string>('');

  /**
   * Lista de opções com legenda e valor.
   */
  readonly options = input<Array<{ caption: string; value: string }>>([]);

  /**
   * Valor selecionado no formato SQL Server (ex: "'A'").
   * Se vazio inicialmente e houver opções, seleciona o primeiro elemento por padrão.
   */
  readonly selected = model<string>('');

  constructor() {
    // Efeito reativo para garantir que sempre exista pelo menos um elemento selecionado por padrão
    effect(() => {
      const opts = this.options();
      const current = this.selected();
      if (opts.length > 0 && !current) {
        this.selected.set(`'${opts[0].value}'`);
      }
    });
  }

  /**
   * Seleciona uma nova opção.
   * Se for a opção atual, mantém selecionado (garante seleção única e obrigatória).
   */
  protected selectOption(value: string): void {
    this.selected.set(`'${value}'`);
  }
}
