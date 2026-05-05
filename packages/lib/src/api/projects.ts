import { api } from './client';

export interface Project {
  id: string;
  name: string;
  owner_id: string;
  is_private: boolean;
  details_json: any;
  created_at: string;
  updated_at: string;
  address?: any;
}

export const projectsApi = {
  getProjects: () => api.get<Project[]>('/projects'),
  getProject: (id: string) => api.get<Project>(`/projects/${id}`),
  createProject: (data: any) => api.post<Project>('/projects', data),
  updateProject: (id: string, data: any) => api.put<Project>(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
  
  // Model/Scene graph specific
  getProjectModel: (projectId: string) => api.get<any>(`/projects/${projectId}/model`),
  saveProjectModel: (projectId: string, sceneGraph: any) => 
    api.post(`/projects/${projectId}/model`, { sceneGraph }),
    
  // Thumbnail
  uploadThumbnail: (projectId: string, blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'thumbnail.png');
    return api.post(`/projects/${projectId}/thumbnail`, formData);
  }
};
