import { getUserById } from './profiles';

export async function changeUserConnectedStatus(
  userId: string,
  status: boolean
): Promise<boolean> {
  try {
    const user = await getUserById(userId, 'connected lastConnection');
    if (user === null) return false;
    user.connected = status;
    user.lastConnection = Date.now();
    await user.save();
    return true;
  } catch (e) {
    console.error('Error changeUserConnected', e);
    return false;
  }
}
