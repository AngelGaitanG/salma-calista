import { Component, OnDestroy, OnInit } from '@angular/core';
import { Story, StoryBlock, StoryBlockType } from '../../core/models/story.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { StoryService } from '../../core/services/story.service';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story-editor',
  imports: [FormsModule, RouterLink, StoryDetailComponent],
  templateUrl: './story-editor.component.html',
  styleUrl: './story-editor.component.scss'
})
export class StoryEditorComponent implements OnInit, OnDestroy{
  isExpanded: boolean = false;
  isPreviewOpen = false;

      title_h1?: string;
      title_label?: string;
      subtitle_label?: string;
      add_block_label?: string;
      add_block_button?: string;
      block_paragraph_label?: string;
      block_image_label?: string;
      block_quote_label?: string;
      block_subtitle_label?: string;
      block_paragraph_placeholder?: string;
      save_button?: string;
      back_button?: string;

  constructor(private storyService: StoryService, private languageService: LanguageService) {}

langSubscription!: Subscription;

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

  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.title_h1 = lang.data.storiesScreen.title_h1 || '';
      this.title_label = lang.data.storyEditorScreen.title_label || '';
      this.subtitle_label = lang.data.storyEditorScreen.subtitle_label || '';
      this.add_block_label = lang.data.storyEditorScreen.add_block_label || '';
      this.add_block_button = lang.data.storyEditorScreen.add_block_button || '';
      this.block_paragraph_label = lang.data.storyEditorScreen.block_paragraph_label || '';
      this.block_image_label = lang.data.storyEditorScreen.block_image_label || '';
      this.block_quote_label = lang.data.storyEditorScreen.block_quote_label || '';
      this.block_subtitle_label = lang.data.storyEditorScreen.block_subtitle_label || '';
      this.block_paragraph_placeholder = lang.data.storyEditorScreen.block_paragraph_placeholder || '';
      this.save_button = lang.data.storyEditorScreen.save_button || '';
      this.back_button = lang.data.storyEditorScreen.back_button || '';
    });
  }

   ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
    


}
