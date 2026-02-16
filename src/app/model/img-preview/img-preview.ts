import { ChangeDetectorRef, Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '../../core/common';
import { Snackbar } from '../../service/snackbar';

@Component({
  selector: 'app-img-preview',
  standalone: false,
  templateUrl: './img-preview.html',
  styleUrl: './img-preview.css',
})
export class ImgPreview implements OnInit {
  imageUrl = signal<String>('');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: Common,
    private snackbar: Snackbar,
    private cdr:ChangeDetectorRef
  ) {    
  }

  ngOnInit(): void {
    this.imageUrl.set(this.data.image);
  }

  addCache(url: string) {
    return url ? url + '?t=' + new Date().getTime() : '';
  }

  async upload(event:any) {
    const file = event.target.files[0];
    if (!file) return;
    const url = await this.commonService.uploadImage(file);
    this.imageUrl.set(url.secure_url);
    const data = {
      id: this.data.id,
      image:this.imageUrl()
    }
    this.commonService.updateMaterialItem(data).then(() => {
      this.snackbar.openSnackBar('Image is Uploaded in db...!')
    }).catch((err) => {
      this.snackbar.openSnackBar(err)
    })
  }

  async downloadImage() {
    if (!this.imageUrl) return;
    try {
      const img:any = this.imageUrl();
      const response = await fetch( img, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed', err);
    }
  }
}
