import { Component, signal } from '@angular/core';
import { Chips } from './components/chips/chips';
import { InscricaoEstadualRs } from './components/inscricao-estadual-rs/inscricao-estadual-rs';
import { PeriodoDatas } from './components/periodo-datas/periodo-datas';
import { ChipsRadio } from './components/chips-radio/chips-radio';

@Component({
  selector: 'app-root',
  imports: [Chips, InscricaoEstadualRs, PeriodoDatas, ChipsRadio],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Estado das seleções dos chips de multi-seleção (formato SQL Server)
  protected readonly selectedLetters = signal<string>('');
  protected readonly selectedCategories = signal<string>('');

  // Estado do validador de Inscrição Estadual (RS)
  protected readonly ieValue = signal<string>('');
  protected readonly ieValid = signal<boolean>(true);
  protected readonly shouldValidate = signal<boolean>(true);

  // Estado do seletor de período (Completo: Dia/Mês/Ano)
  protected readonly startDateDay = signal<string>('2026-06-01');
  protected readonly endDateDay = signal<string>('2026-06-30');
  protected readonly isPeriodDayValid = signal<boolean>(true);

  // Estado do seletor de período (Simplificado: Mês/Ano)
  protected readonly startDateMonth = signal<string>('2026-01');
  protected readonly endDateMonth = signal<string>('2026-06');
  protected readonly isPeriodMonthValid = signal<boolean>(true);

  // Estado das seleções de chips do tipo Radio (seleção única obrigatória)
  protected readonly selectedGender = signal<string>(''); // Vazio inicial para testar a seleção padrão automática
  protected readonly selectedSystem = signal<string>("'LIN'"); // Pre-selecionado 'LIN' (Linux)

  // Opções para o seletor de letras
  protected readonly lettersOptions = [
    { caption: 'A', value: 'A' },
    { caption: 'B', value: 'B' },
    { caption: 'C', value: 'C' },
    { caption: 'D', value: 'D' },
    { caption: 'E', value: 'E' },
  ];

  // Opções para o seletor de categorias
  protected readonly categoriesOptions = [
    { caption: 'Frutas', value: 'FRU' },
    { caption: 'Legumes', value: 'LEG' },
    { caption: 'Verduras', value: 'VER' },
    { caption: 'Carnes', value: 'CAR' },
    { caption: 'Bebidas', value: 'BEB' },
  ];

  // Opções para o seletor de gênero
  protected readonly genderOptions = [
    { caption: 'Masculino', value: 'M' },
    { caption: 'Feminino', value: 'F' },
    { caption: 'Outro', value: 'O' },
  ];

  // Opções para o seletor de S.O.
  protected readonly systemOptions = [
    { caption: 'Windows', value: 'WIN' },
    { caption: 'Linux', value: 'LIN' },
    { caption: 'macOS', value: 'MAC' },
  ];
}
