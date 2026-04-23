import  { Request, Response } from 'express';

export default function buildPageUri(
  req: Request,
  page: number,
  size: number,
  sort?: string
): string {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('size', String(size));

  if (sort) {
    params.set('sort', sort);
  }

  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

  return `${baseUrl}?${params.toString()}`;
}
