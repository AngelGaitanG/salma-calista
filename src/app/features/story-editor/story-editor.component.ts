import { Component } from '@angular/core';
import { Story, StoryBlock, StoryBlockType } from '../../core/models/story.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { StoryService } from '../../core/services/story.service';

@Component({
  selector: 'app-story-editor',
  imports: [FormsModule, RouterLink, StoryDetailComponent],
  templateUrl: './story-editor.component.html',
  styleUrl: './story-editor.component.scss'
})
export class StoryEditorComponent {
  isExpanded: boolean = false;
  isPreviewOpen = false;

  constructor(private storyService: StoryService) {}

togglePreview() {
  this.isPreviewOpen = !this.isPreviewOpen;
}


newStory: Story = {
  title: '',
  subtitle: '',
  content: []
};

types: StoryBlockType[] = ['paragraph', 'image', 'quote', 'subtitle'];

addBlock() {
  const newBlock: StoryBlock & { isExpanded?: boolean } = { 
    type: 'paragraph', 
    text: '',
    isExpanded: false
  };
  this.newStory.content.push(newBlock);
}

toggleDropdown(block: StoryBlock & { isExpanded?: boolean }) {
  block.isExpanded = !block.isExpanded;
}

onBlockTypeChange(block: StoryBlock & { isExpanded?: boolean }, newType: StoryBlockType) {
  block.type = newType;
  block.isExpanded = false; // cerrar el dropdown después de elegir
}

removeBlock(index: number) {
  this.newStory.content.splice(index, 1);
}

dragIndex: number | null = null;

onDragStart(index: number) {
  this.dragIndex = index;
}

onDrop(index: number) {
  if (this.dragIndex === null) return;

  const draggedBlock = this.newStory.content[this.dragIndex];
  this.newStory.content.splice(this.dragIndex, 1);
  this.newStory.content.splice(index, 0, draggedBlock);

  this.dragIndex = null;
}

    async saveStory() {
    try {
      await this.storyService.saveStory(this.newStory);
      alert('Historia guardada con éxito 🚀');
      this.newStory = { title: '', subtitle: '', content: [] }; // limpiar formulario
    } catch (error: any) {
      console.error('Error al guardar historia:', error);
      alert('Hubo un error al guardar la historia.');
    }
  }


  goBack() {    // Aquí puedes implementar la lógica para navegar de vuelta a la lista de historias.
    console.log('Navigating back to stories list');
  }


}
