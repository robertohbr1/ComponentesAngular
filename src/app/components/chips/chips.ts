import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-chips',
  imports: [],
  templateUrl: './chips.html',
  styleUrl: './chips.css',
})
export class Chips {
  /**
   * O título descritivo do grupo de chips, exibido acima do seletor.
   */
  readonly title = input<string>('');

  /**
   * Lista de opções disponíveis no seletor.
   * Cada opção contém a legenda exibida e o valor correspondente.
   */
  readonly options = input<Array<{ caption: string; value: string }>>([]);

  /**
   * String de controle com a lista de valores selecionados formatada para SQL Server.
   * Exemplo: "'A','B','C'". Se vazio, a opção "Todos" é considerada selecionada.
   */
  readonly selected = model<string>('');

  /**
   * Sinal reativo que analisa a string SQL 'selected' e retorna um Set de valores puros
   * para rápida verificação de estado ativo no template.
   */
  protected readonly selectedValuesSet = computed(() => {
    const current = this.selected();
    if (!current) {
      return new Set<string>();
    }
    
    // O formato SQL esperado é: 'val1','val2','val3'
    // Removemos as aspas simples iniciais/finais e separamos por vírgula.
    return new Set<string>(
      current.split(',').map(val => val.trim().replace(/^'|'$/g, ''))
    );
  });

  /**
   * Alterna a seleção de uma opção específica.
   * Adiciona o valor se não estiver selecionado ou remove se já estiver.
   */
  protected toggleOption(value: string): void {
    const currentSet = new Set(this.selectedValuesSet());

    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }

    // Se nenhuma opção individual estiver ativa, voltamos ao estado "Todos" (vazio)
    if (currentSet.size === 0) {
      this.selected.set('');
      return;
    }

    // Formata o retorno para o padrão SQL do Server: 'val1','val2'
    const sqlFormat = Array.from(currentSet)
      .map(val => `'${val}'`)
      .join(',');

    this.selected.set(sqlFormat);
  }

  /**
   * Seleciona a opção "Todos", limpando todas as seleções individuais de chips.
   */
  protected selectAll(): void {
    this.selected.set('');
  }
}
