import { apiService } from './apiService';

interface UploadResponse {
  message: string;
  url: string;
  path: string;
}

class UploadService {
  private readonly baseUrl = '/upload';

  // Upload a single file
  async uploadFile(file: File): Promise<{ url: string }> {
    console.log('UploadService: Starting file upload...');
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      console.log('UploadService: Making API request to', this.baseUrl);
      const response = await apiService.post<UploadResponse>(this.baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('UploadService: API response:', response);
      return { url: response.url };
    } catch (error: any) {
      console.error('UploadService: API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(files: File[]): Promise<{ url: string }[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });

    return await apiService.post<{ url: string }[]>(`${this.baseUrl}/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const uploadService = new UploadService(); 