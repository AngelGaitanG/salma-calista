import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NoteColor {
  key: string;     // la palabra que guardamos (ej: 'purple-note')
  name: string;    // nombre legible (ej: 'Purple')
  hex: string;     // color real a mostrar (ej: '#9C27B0')
}

@Component({
  selector: 'app-color-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectComponent {
  // ahora selectedKey guarda la key (p.e. 'purple-note')
  @Input() selectedColor: string = 'green-note'; // por defecto una key
  @Output() colorChange = new EventEmitter<string>();

  isExpanded: boolean = false;

  colors: NoteColor[] = [
    { key: 'green-note', name: 'Green', hex: '#4CAF50' },
    { key: 'purple-note', name: 'Purple', hex: '#9C27B0' }
  ];

  toggleDropdown(): void {
    this.isExpanded = !this.isExpanded;
  }

  selectColor(key: string): void {
    this.selectedColor = key;
    this.colorChange.emit(key); // emitimos la key, no el hex
    this.isExpanded = false;
  }

  // helper para el template: obtener hex desde la key
  getHexFromKey(key: string): string {
    const found = this.colors.find(c => c.key === key);
    return found ? found.hex : '#ffffff';
  }

  getColorName(key: string): string {
    const color = this.colors.find(c => c.key === key);
    return color ? color.name : 'Color';
  }
}
