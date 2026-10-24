import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private readonly cloudName = 'YOUR_CLOUD_NAME';
  private readonly uploadPreset = 'oven2door_profiles';

  async uploadProfileImage(file: File): Promise<string> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPG, PNG, and WebP images are allowed.');
    }

    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Image must be smaller than 2 MB.');
    }

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to upload profile image.');
    }

    const result = await response.json();

    return result.secure_url;
  }
}
