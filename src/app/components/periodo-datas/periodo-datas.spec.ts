import { TestBed } from '@angular/core/testing';
import { PeriodoDatas } from './periodo-datas';

describe('PeriodoDatas Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodoDatas],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render standard date inputs by default (mode = day)', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    
    expect(inputs.length).toBe(2);
    expect(inputs[0].getAttribute('type')).toBe('date');
    expect(inputs[1].getAttribute('type')).toBe('date');
  });

  it('should render month inputs when mode is configured to month', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    fixture.componentRef.setInput('mode', 'month');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    
    expect(inputs.length).toBe(2);
    expect(inputs[0].getAttribute('type')).toBe('month');
    expect(inputs[1].getAttribute('type')).toBe('month');
  });

  it('should validate a correct date period successfully (start <= end)', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('startDate', '2026-01-01');
    fixture.componentRef.setInput('endDate', '2026-01-15');
    fixture.detectChanges();

    expect(component.isValid()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')).toBeNull();
  });

  it('should invalidate an incorrect date period (start > end) and show error message', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('startDate', '2026-01-15');
    fixture.componentRef.setInput('endDate', '2026-01-01');
    fixture.detectChanges();

    expect(component.isValid()).toBe(false);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')).toBeTruthy();
    expect(compiled.querySelector('.error-message')?.textContent).toContain('A data inicial não pode ser maior');
  });

  it('should validate a correct month period successfully', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('mode', 'month');
    fixture.componentRef.setInput('startDate', '2026-04');
    fixture.componentRef.setInput('endDate', '2026-05');
    fixture.detectChanges();

    expect(component.isValid()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')).toBeNull();
  });

  it('should invalidate an incorrect month period (start > end) and show error message', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    
    fixture.componentRef.setInput('mode', 'month');
    fixture.componentRef.setInput('startDate', '2026-06');
    fixture.componentRef.setInput('endDate', '2026-05');
    fixture.detectChanges();

    expect(component.isValid()).toBe(false);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')).toBeTruthy();
  });

  it('should consider empty date ranges as valid (no dates selected)', () => {
    const fixture = TestBed.createComponent(PeriodoDatas);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isValid()).toBe(true);
  });
});
