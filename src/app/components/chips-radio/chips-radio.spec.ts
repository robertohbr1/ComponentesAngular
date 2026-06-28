import { TestBed } from '@angular/core/testing';
import { ChipsRadio } from './chips-radio';

describe('ChipsRadio Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsRadio],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ChipsRadio);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should select the first option by default when selected model is empty', async () => {
    const fixture = TestBed.createComponent(ChipsRadio);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    
    // Dispara a reatividade
    fixture.detectChanges();
    await fixture.whenStable();

    // Deve selecionar o primeiro por padrão
    expect(component.selected()).toBe("'A'");

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.chip');
    expect(chips[0].classList.contains('active')).toBe(true);
    expect(chips[1].classList.contains('active')).toBe(false);
  });

  it('should preserve a pre-existing selected value if provided', async () => {
    const fixture = TestBed.createComponent(ChipsRadio);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.componentRef.setInput('selected', "'B'");
    
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selected()).toBe("'B'");

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.chip');
    expect(chips[0].classList.contains('active')).toBe(false);
    expect(chips[1].classList.contains('active')).toBe(true);
  });

  it('should select a new option when clicked and release the previous one', async () => {
    const fixture = TestBed.createComponent(ChipsRadio);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.chip');
    const chipB = chips[1] as HTMLButtonElement;

    // Clica no segundo chip (Opção B)
    chipB.click();
    fixture.detectChanges();

    expect(component.selected()).toBe("'B'");
    expect(chips[0].classList.contains('active')).toBe(false);
    expect(chipB.classList.contains('active')).toBe(true);
  });

  it('should not deselect the active option when clicked again (mandatory selection)', async () => {
    const fixture = TestBed.createComponent(ChipsRadio);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [
      { caption: 'Opção A', value: 'A' },
      { caption: 'Opção B', value: 'B' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.chip');
    const chipA = chips[0] as HTMLButtonElement;

    // Clica novamente na opção já ativa
    chipA.click();
    fixture.detectChanges();

    // Deve permanecer selecionado
    expect(component.selected()).toBe("'A'");
    expect(chipA.classList.contains('active')).toBe(true);
  });
});
