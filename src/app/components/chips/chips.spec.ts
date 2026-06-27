import { TestBed } from '@angular/core/testing';
import { Chips } from './chips';

describe('Chips Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chips],
    }).compileComponents();
  });

  it('should create the chips component', () => {
    const fixture = TestBed.createComponent(Chips);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the title when provided', () => {
    const fixture = TestBed.createComponent(Chips);
    fixture.componentRef.setInput('title', 'Filtrar por Categoria');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Filtrar por Categoria');
  });

  it('should have "Todos" active by default when selected is empty', () => {
    const fixture = TestBed.createComponent(Chips);
    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const allButton = compiled.querySelector('.chip');
    
    expect(allButton?.textContent?.trim()).toBe('Todos');
    expect(allButton?.classList.contains('active')).toBe(true);

    const otherChips = compiled.querySelectorAll('.chip:not(:first-child)');
    expect(otherChips.length).toBe(2);
    expect(otherChips[0].classList.contains('active')).toBe(false);
    expect(otherChips[1].classList.contains('active')).toBe(false);
  });

  it('should select an option when clicked, deactivate "Todos", and format output as SQL string', () => {
    const fixture = TestBed.createComponent(Chips);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const otherChips = compiled.querySelectorAll('.chip');
    
    // O segundo botão é o primeiro chip de opção ('Opção A')
    const chipA = otherChips[1] as HTMLButtonElement;
    chipA.click();
    fixture.detectChanges();

    // Verifica o estado interno/sinal
    expect(component.selected()).toBe("'A'");

    // Verifica classes CSS ativas
    const allButton = otherChips[0];
    expect(allButton.classList.contains('active')).toBe(false);
    expect(chipA.classList.contains('active')).toBe(true);
  });

  it('should select multiple options and format as comma-separated SQL list', () => {
    const fixture = TestBed.createComponent(Chips);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
      { caption: 'Opção C', value: 'C' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const otherChips = compiled.querySelectorAll('.chip');
    
    const chipA = otherChips[1] as HTMLButtonElement;
    const chipC = otherChips[3] as HTMLButtonElement;

    chipA.click();
    chipC.click();
    fixture.detectChanges();

    // O retorno de selected deve ser "'A','C'" (a ordem depende da inserção, que é Set.from)
    expect(component.selected()).toBe("'A','C'");
  });

  it('should deselect option when clicked again, and select "Todos" if none remain', () => {
    const fixture = TestBed.createComponent(Chips);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const otherChips = compiled.querySelectorAll('.chip');
    
    const chipA = otherChips[1] as HTMLButtonElement;

    // Seleciona A
    chipA.click();
    fixture.detectChanges();
    expect(component.selected()).toBe("'A'");

    // Desmarca A
    chipA.click();
    fixture.detectChanges();

    // Deve voltar a ficar vazio (selecionando "Todos")
    expect(component.selected()).toBe('');
    const allButton = otherChips[0];
    expect(allButton.classList.contains('active')).toBe(true);
  });

  it('should clear selection and select "Todos" when "Todos" button is clicked', () => {
    const fixture = TestBed.createComponent(Chips);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const otherChips = compiled.querySelectorAll('.chip');
    
    const allButton = otherChips[0] as HTMLButtonElement;
    const chipA = otherChips[1] as HTMLButtonElement;
    const chipB = otherChips[2] as HTMLButtonElement;

    // Seleciona A e B
    chipA.click();
    chipB.click();
    fixture.detectChanges();
    expect(component.selected()).toBe("'A','B'");

    // Clica em "Todos"
    allButton.click();
    fixture.detectChanges();

    expect(component.selected()).toBe('');
    expect(allButton.classList.contains('active')).toBe(true);
    expect(chipA.classList.contains('active')).toBe(false);
    expect(chipB.classList.contains('active')).toBe(false);
  });
});
