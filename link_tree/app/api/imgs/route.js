import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const address =  path.join(process.cwd(),"public/images")
  const data = await fs.readdir(address);
  return new Response(JSON.stringify({data}));
}
