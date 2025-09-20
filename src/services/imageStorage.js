// Универсальные хелперы хранения картинок в Supabase.
// Бакеты: avatars, products, contests (public, RLS off for anon read).

import { supabase } from '@/lib/supabaseClient';

// безопасное имя файла: avatar_123456.jpg
function safeName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80);
}

export async function uploadFileToBucket({ bucket, file, path }) {
  if (!supabase) throw new Error('Supabase не инициализирован');
  const key = `${path}/${safeName(file.name || 'image')}`.replace(/\/+/g, '/');

  const { data, error } = await supabase.storage.from(bucket).upload(key, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) throw error;

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return { path: data.path, url: publicUrl.publicUrl };
}

// Загрузка файла по внешнему URL (например, Telegram photo_url)
export async function uploadFromUrl({ bucket, url, fileName, destFolder }) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Не удалось скачать изображение');
  const ct = resp.headers.get('content-type') || 'image/jpeg';
  const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
  const blob = await resp.blob();
  const file = new File([blob], `${safeName(fileName || 'image')}.${ext}`, { type: ct });
  return uploadFileToBucket({ bucket, file, path: destFolder || '' });
}

// Получение публичного URL по известному пути в бакете
export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Профиль пользователя в supabase (таблица `profiles`: id BIGINT PK, username TEXT, avatar_url TEXT)
// upsert: если нет — создаст, если есть — обновит
export async function upsertProfile({ id, username, avatarUrl }) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id, username, avatar_url: avatarUrl || null, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// Проверка, есть ли уже сохранённый аватар в профиле
export async function getProfileRow(id) {
  const { data, error } = await supabase.from('profiles').select('id, username, avatar_url').eq('id', id).single();
  if (error && error.code !== 'PGRST116') throw error; // not found ok
  return data || null;
}
