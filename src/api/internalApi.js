import { internalHttp } from './http';

// AUTH (dev)
export const apiLoginInternal = (payload) => internalHttp.post('/auth/login', payload);

// USER
export const apiUserTasks = () => internalHttp.get('/tasks');
export const apiCompleteTask = (id) => internalHttp.post(`/tasks/${id}/complete`);
export const apiParticipateTask = (id) => internalHttp.post(`/tasks/${id}/participate`);
export const apiNotifications = () => internalHttp.get('/notifications');
export const apiProducts = () => internalHttp.get('/products');

// ADMIN
export const adminListTasks = () => internalHttp.get('/admin/tasks');
export const adminGetTask = (id) => internalHttp.get(`/admin/tasks/${id}`);
export const adminCreateTask = (dto) => internalHttp.post('/admin/tasks', dto);
export const adminUpdateTask = (id, dto) => internalHttp.put(`/admin/tasks/${id}`, dto);
export const adminDeleteTask = (id) => internalHttp.del(`/admin/tasks/${id}`);
export const adminTaskParticipants = (id) =>
  internalHttp.get(`/admin/tasks/${id}/participants`);

export const adminListProducts = () => internalHttp.get('/admin/products');
export const adminGetProduct = (id) => internalHttp.get(`/admin/products/${id}`);
export const adminCreateProduct = (dto) => internalHttp.post('/admin/products', dto);
export const adminUpdateProduct = (id, dto) =>
  internalHttp.put(`/admin/products/${id}`, dto);
export const adminDeleteProduct = (id) => internalHttp.del(`/admin/products/${id}`);
