import { promises as fs } from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { toPng } from 'jdenticon';

const path = './temp/icon.png';

export async function createIdenticon(value: string): Promise<string> {
  try {
    // Generate an identicon
    const png = toPng(value, 200);
    // Save it as local PNG file
    await fs.writeFile(path, png);
    // Upload file to CDN
    const response = await cloudinary.uploader.upload(path, {
      folder: 'profiles'
    });
    // Return image public_id
    if (response?.public_id) {
      return response.public_id as string;
    } else {
      throw Error('Cloud error, returning default.');
    }
  } catch (error) {
    // Return default image public_id
    return 'xlumdt9qlx21hknlbkyk';
  }
}
