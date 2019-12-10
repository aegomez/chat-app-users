import { getUserById } from './profiles';
import { UserDoc } from '../models';

export async function changeUserAvatar(
  userId: string,
  url: string
): Promise<boolean> {
  try {
    const user = await getUserById(userId, 'avatar');
    if (user === null) return false;
    user.avatar = url;
    await user.save();
    return true;
  } catch (e) {
    console.error('Error changeUserAvatar', e);
    return false;
  }
}

export async function changeUserLanguage(
  userId: string,
  newLanguage: UserDoc['language']
): Promise<boolean> {
  try {
    const user = await getUserById(userId, 'language');
    if (user === null) return false;
    user.language = newLanguage;
    await user.save();
    return true;
  } catch (e) {
    console.error('Error changeUserLanguage', e);
    return false;
  }
}

export async function changeUserPublicName(
  userId: string,
  newName: string
): Promise<boolean> {
  try {
    if (newName.length > 40) return false;
    const user = await getUserById(userId, 'newName');
    if (user === null) return false;
    user.publicName = newName;
    await user.save();
    return true;
  } catch (e) {
    console.error('Error changeUserPublicName', e);
    return false;
  }
}
