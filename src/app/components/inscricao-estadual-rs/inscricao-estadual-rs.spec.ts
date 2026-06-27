import { TestBed } from '@angular/core/testing';
import { InscricaoEstadualRs } from './inscricao-estadual-rs';

describe('InscricaoEstadualRs Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscricaoEstadualRs],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should format input with slash mask as user types', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // Simula a digitação de "224365"
    inputEl.value = '224365';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('224/365');
    expect(fixture.componentInstance.value()).toBe('224/365');
  });

  it('should validate a correct RS state registration (IE) successfully', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // IE Válida: 224/3658792
    inputEl.value = '2243658792';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isValid()).toBe(true);
    expect(compiled.querySelector('.error-message')).toBeNull();
    expect(inputEl.classList.contains('input-invalid')).toBe(false);
  });

  it('should show error message and highlight field for incorrect RS state registration (IE)', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // IE Inválida: 224/3658793 (DV é 2, digitado 3)
    inputEl.value = '2243658793';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isValid()).toBe(false);
    expect(compiled.querySelector('.error-message')).toBeTruthy();
    expect(compiled.querySelector('.error-message')?.textContent).toContain('Inscrição Estadual inválida');
    expect(inputEl.classList.contains('input-invalid')).toBe(true);
  });

  it('should remove error highlights when the field is cleared', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // Digita IE inválida
    inputEl.value = '2243658793';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isValid()).toBe(false);
    expect(compiled.querySelector('.error-message')).toBeTruthy();

    // Limpa o campo
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isValid()).toBe(true); // Vazio é considerado válido (não bloqueia formulário em branco se opcional)
    expect(compiled.querySelector('.error-message')).toBeNull();
    expect(inputEl.classList.contains('input-invalid')).toBe(false);
  });

  it('should show error for incomplete IE on blur (blur event)', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // Digita incompleto (menos de 10 dígitos)
    inputEl.value = '22436';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Não deve mostrar erro ainda enquanto digita
    expect(component.isValid()).toBe(false);
    expect(compiled.querySelector('.error-message')).toBeNull();
    expect(inputEl.classList.contains('input-invalid')).toBe(false);

    // Dispara blur (touched)
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    // Deve mostrar erro agora que perdeu o foco e está incompleto
    expect(compiled.querySelector('.error-message')).toBeTruthy();
    expect(inputEl.classList.contains('input-invalid')).toBe(true);
  });

  it('should bypass validation and consider field valid if [validate] input is false', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    
    // Configura validação como desligada
    fixture.componentRef.setInput('validate', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // Digita uma IE com DV errado
    inputEl.value = '2243658793';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.isValid()).toBe(true); // Deve considerar válido porque validação está desligada
    expect(compiled.querySelector('.error-message')).toBeNull();
    expect(inputEl.classList.contains('input-invalid')).toBe(false);
  });

  it('should pad with leading zeros on blur and validate successfully if correct', () => {
    const fixture = TestBed.createComponent(InscricaoEstadualRs);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelector('input') as HTMLInputElement;

    // Digita 2 dígitos: 19 (que preenchido com zero fica 000/0000019, que é válido)
    inputEl.value = '19';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Reativamente já deve considerar válido pois a validação preenche com zeros internamente
    expect(component.isValid()).toBe(true);

    // Dispara blur (touched)
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    // O valor no input e o model devem ter sido atualizados com os zeros à esquerda e formatados
    expect(inputEl.value).toBe('000/0000019');
    expect(component.value()).toBe('000/0000019');
    expect(component.isValid()).toBe(true);
    expect(compiled.querySelector('.error-message')).toBeNull();
    expect(inputEl.classList.contains('input-invalid')).toBe(false);
  });
});
