import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService, ProfileData } from '../../../core/services/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './home-header.component.scss',
  templateUrl: './home-header.component.html',
})
export class HomeHeaderComponent implements OnInit {
  profile: ProfileData | null = null;
  editing: boolean = false;
  newPhotoFile?: File;

  constructor(
    private profileService: ProfileService,
    public authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.profile = await this.profileService.getProfile();
  }

  enableEdit(): void {
    this.editing = true;
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newPhotoFile = input.files[0];
    }
  }

  async saveProfile(): Promise<void> {
    if (!this.profile) return;
    this.profile = await this.profileService.updateProfile(this.profile, this.newPhotoFile);
    this.editing = false;
    this.newPhotoFile = undefined;
  }
}
