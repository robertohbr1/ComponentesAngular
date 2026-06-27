# Regras de Acessibilidade (a11y)

Para todos os componentes criados neste projeto, as seguintes diretrizes de acessibilidade devem ser rigorosamente seguidas:

1. **Semântica HTML**:
   - Utilize sempre elementos HTML semânticos nativos (como `<button>`, `<nav>`, `<header>`) em vez de divs genéricas com manipuladores de clique, a menos que seja estritamente necessário.
   - Botões devem sempre ter o atributo `type="button"` explícito para evitar submissões de formulários indesejadas.

2. **Navegação por Teclado**:
   - Elementos interativos devem ser navegáveis via teclado usando a tecla `Tab`.
   - Elementos interativos personalizados devem gerenciar o foco visualmente e aceitar interação com `Space` e `Enter`.

3. **Atributos ARIA (Accessible Rich Internet Applications)**:
   - Grupos de controles semelhantes devem usar `role="group"` e ter uma etiqueta de acessibilidade (`aria-label` ou `aria-labelledby`).
   - Controles de alternância (como Chips ativos/inativos) devem ter o atributo `aria-pressed` para indicar o estado selecionado aos leitores de tela.

4. **Contraste e Estilo**:
   - Todos os elementos devem ter indicadores de foco visual nítidos (`:focus-visible`).
   - Manter contraste suficiente entre as cores do texto e do plano de fundo de acordo com o padrão WCAG AA.
