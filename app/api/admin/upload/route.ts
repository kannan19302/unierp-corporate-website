import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { requireAdminTenant } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

// Simple local-disk media upload for admin CMS use (hero images, logos, avatars, etc).
// Files are stored under public/uploads/{tenantId}/ so they're served directly by
// Next's static file handling at /uploads/{tenantId}/{filename}.
//
// No cloud storage provider (S3/Cloudinary/Blob) is configured anywhere in this repo
// (checked .env.example and package.json), so this intentionally uses local disk rather
// than introducing a new infra dependency. If a provider is added later, only this route
// needs to change — callers just get back a URL.

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
]);
const EXT_BY_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;
  const { tenantId } = auth.session;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type}". Allowed: PNG, JPEG, WEBP, GIF, SVG, MP4, WEBM.` },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: `File too large. Max size is ${MAX_FILE_BYTES / 1024 / 1024}MB.` }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type] || 'bin';
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  const tenantDir = path.join(process.cwd(), 'public', 'uploads', tenantId);
  await mkdir(tenantDir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(tenantDir, filename), bytes);

  const url = `/uploads/${tenantId}/${filename}`;

  await logAudit(auth.session, 'create', 'media-upload', filename, url);

  return NextResponse.json({ success: true, url, filename, size: file.size, type: file.type });
}
