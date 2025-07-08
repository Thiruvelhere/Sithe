import fs from 'fs/promises';

export async function writeJson(filePath: string, data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readJson(filePath: string): Promise<any> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
