import { Component, computed, input, model, signal, effect } from '@angular/core';

@Component({
  selector: 'app-inscricao-estadual-rs',
  imports: [],
  templateUrl: './inscricao-estadual-rs.html',
  styleUrl: './inscricao-estadual-rs.css',
})
export class InscricaoEstadualRs {
  /**
   * Configuração para ativar ou desativar a validação do dígito verificador.
   * Por padrão, a validação é executada.
   */
  readonly validate = input<boolean>(true);

  /**
   * Valor bidirecional da Inscrição Estadual (com máscara, ex: '224/3658792').
   */
  readonly value = model<string>('');

  /**
   * Estado de validade do campo exposto de forma bidirecional ao componente pai.
   */
  readonly isValid = model<boolean>(true);

  /**
   * Indica se o usuário interagiu e desfocou (blur) o campo.
   */
  protected readonly isTouched = signal<boolean>(false);

  /**
   * Computa se a Inscrição Estadual atual é válida de acordo com as regras do RS.
   */
  protected readonly checkIsValid = computed(() => {
    const val = this.value();
    const clean = val.replace(/\D/g, '');

    // Se a validação estiver inativa ou o campo estiver limpo, considera-se válido.
    if (!this.validate() || clean.length === 0) {
      return true;
    }

    // Alinha à direita com zeros à esquerda até completar 10 dígitos para validação
    const padded = clean.padStart(10, '0');
    return this.validateDv(padded);
  });

  /**
   * Computa se o erro de validação deve ser destacado visualmente na tela.
   */
  protected readonly showValidationError = computed(() => {
    const val = this.value();
    const clean = val.replace(/\D/g, '');

    // Se o campo estiver limpo (vazio), nunca exibe erro (conforme requisito).
    if (clean.length === 0) {
      return false;
    }

    const valid = this.checkIsValid();
    if (!valid) {
      // Exibe o erro se estiver com 10 dígitos (completo e errado) OU se o usuário já saiu do campo (incompleto)
      return clean.length === 10 || this.isTouched();
    }

    return false;
  });

  constructor() {
    // Sincroniza o model 'isValid' sempre que o estado de validade computado mudar
    effect(() => {
      this.isValid.set(this.checkIsValid());
    });
  }

  /**
   * Manipula a digitação, limpando caracteres não numéricos e aplicando a máscara
   * no formato XXX/XXXXXXX de forma dinâmica.
   */
  protected onInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const raw = inputEl.value;
    const formatted = this.formatValue(raw);

    // Atualiza o valor exibido no input e propaga para o model
    inputEl.value = formatted;
    this.value.set(formatted);
  }

  /**
   * Executado quando o input perde o foco (blur).
   */
  protected onBlur(): void {
    this.isTouched.set(true);

    // Preenche com zeros à esquerda caso o usuário saia do campo com valor incompleto
    const current = this.value();
    const clean = current.replace(/\D/g, '');
    if (clean.length > 0 && clean.length < 10) {
      const padded = clean.padStart(10, '0');
      const formatted = this.formatValue(padded);
      this.value.set(formatted);
    }
  }

  /**
   * Formata uma string de números brutos no formato XXX/XXXXXXX.
   */
  private formatValue(raw: string): string {
    const clean = raw.replace(/\D/g, '').substring(0, 10);
    if (clean.length <= 3) {
      return clean;
    }
    return `${clean.substring(0, 3)}/${clean.substring(3)}`;
  }

  /**
   * Aplica o algoritmo do Módulo 11 para validar o dígito verificador da IE do RS.
   */
  private validateDv(clean: string): boolean {
    const first9 = clean.substring(0, 9);
    const dv = parseInt(clean.charAt(9), 10);

    // Pesos oficiais para validação de IE no Rio Grande do Sul
    const weights = [2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(first9.charAt(i), 10) * weights[i];
    }

    const remainder = sum % 11;
    let calculatedDv = 11 - remainder;
    
    // Regra especial: se o resultado for 10 ou 11, o dígito verificador é 0
    if (calculatedDv === 10 || calculatedDv === 11) {
      calculatedDv = 0;
    }

    return calculatedDv === dv;
  }
}
