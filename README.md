# Biblioteca de Componentes Angular

Esta é uma biblioteca de componentes Angular reutilizáveis, modernos e acessíveis, desenvolvida com foco em produtividade, conformidade fiscal e flexibilidade de filtros para consultas de banco de dados.

O projeto utiliza as novas APIs reativas do **Angular 22** (como Signal Inputs e Model Signals) para obter uma integração simples de duas vias (two-way binding) e reatividade de alta performance.

---

## 🛠️ Tecnologias e Padrões

- **Angular 22** (Stand-alone components, Signals, computed, effect)
- **Vitest** para testes unitários de alta velocidade
- **Estilos CSS Puros** encapsulados por componente, com foco em design premium e transições suaves
- **Acessibilidade (a11y)**: Conformidade com especificações WAI-ARIA (`role="group"`, `aria-pressed`, `aria-invalid`, `:focus-visible`)

---

## 🧩 Componentes Disponíveis

### 1. Seletor de Chips (`app-chips`)

Um seletor múltiplo interativo projetado para gerar listas de valores delimitadas por vírgula e aspas simples (ex: `'A','B'`), prontas para uso direto em cláusulas `IN` do SQL Server.

#### ⚙️ Parâmetros (Inputs / Models)
| Propriedade | Tipo | Modo | Descrição |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Input | Título exibido acima do grupo de chips. |
| `options` | `Array<{caption: string, value: string}>` | Input | Lista de opções para renderizar nos botões. |
| `selected` | `string` | Model (Two-way) | Retorna a string formatada em SQL (ex: `'A','B'`). Fica vazia se "Todos" estiver ativo. |

#### 💻 Exemplo de Uso
```html
<app-chips 
  title="Filtrar por Letra Inicial"
  [options]="lettersOptions"
  [(selected)]="selectedLetters">
</app-chips>
```
*Se nenhuma opção for selecionada, o botão **Todos** é ativado automaticamente e a variável de retorno `selectedLetters` fica em branco (`""`).*

---

### 2. Validador de Inscrição Estadual do RS (`app-inscricao-estadual-rs`)

Um campo de entrada fiscal especializado para digitar e validar a Inscrição Estadual (IE) do Rio Grande do Sul (RS).

#### 🛡️ Recursos
- **Máscara Automática**: Aplica formatação `XXX/XXXXXXX` em tempo real durante a digitação.
- **Preenchimento de Zeros**: Se a IE tiver menos de 10 dígitos, alinha-a à direita preenchendo com zeros à esquerda (ex: `19` vira `000/0000019`) no momento de desfocar o campo (blur).
- **Validação Módulo 11 (RS)**: Executa a validação oficial do dígito verificador.
- **Destaque de Erro**: Se inválida, destaca o campo em vermelho e exibe uma mensagem de aviso. O destaque some imediatamente se o campo for corrigido ou limpo (vazio).
- **Opção de Desativar**: Permite pular a validação por meio de configuração.

#### ⚙️ Parâmetros (Inputs / Models)
| Propriedade | Tipo | Modo | Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `validate` | `boolean` | Input | `true` | Se `false`, ignora a validação do dígito verificador. |
| `value` | `string` | Model (Two-way) | `""` | O valor atual da IE formatado. |
| `isValid` | `boolean` | Model (Two-way) | `true` | Indica se o valor atual é válido de acordo com a validação ativa. |

#### 💻 Exemplo de Uso
```html
<app-inscricao-estadual-rs
  [(value)]="ieValue"
  [(isValid)]="ieValid"
  [validate]="shouldValidate">
</app-inscricao-estadual-rs>
```

---

### 3. Seletor de Período de Datas (`app-periodo-datas`)

Um componente para selecionar faixas de data (Data Inicial e Data Final) com validação de período integrada e suporte a agrupamento por mês/ano.

#### 🛡️ Recursos
- **Dois Modos de Exibição**:
  - `day`: Seleção completa de Dia/Mês/Ano (usa `<input type="date">`).
  - `month`: Seleção simplificada de Mês/Ano (usa `<input type="month">`).
- **Validação Automática**: Garante que a Data Inicial seja menor ou igual à Data Final.
- **Aviso de Período Inválido**: Exibe uma mensagem de erro e destaca as bordas dos inputs em vermelho caso a faixa seja inválida.

#### ⚙️ Parâmetros (Inputs / Models)
| Propriedade | Tipo | Modo | Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | `'day' \| 'month'` | Input | `'day'` | Define se o seletor pede dia/mês/ano ou apenas mês/ano. |
| `startDate` | `string` | Model (Two-way) | `""` | Data de início no formato ISO-8601 (`YYYY-MM-DD` ou `YYYY-MM`). |
| `endDate` | `string` | Model (Two-way) | `""` | Data final no formato ISO-8601 (`YYYY-MM-DD` ou `YYYY-MM`). |
| `isValid` | `boolean` | Model (Two-way) | `true` | Indica se o período selecionado é válido. |

#### 💻 Exemplo de Uso
```html
<app-periodo-datas
  mode="month"
  [(startDate)]="startMonth"
  [(endDate)]="endMonth"
  [(isValid)]="isPeriodValid">
</app-periodo-datas>
```

---

## 🚀 Como Executar o Projeto

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start
   ```
3. Acesse `http://localhost:4200` no seu navegador para testar os componentes no painel interativo de showcase.

## 🧪 Executando Testes Unitários
O projeto utiliza o Vitest integrado ao Angular CLI. Para rodar a suite completa de 25 testes:
```bash
npm run test
```
