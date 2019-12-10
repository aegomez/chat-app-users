import { User, UserDoc, UserProps } from '../models';
import { createIdenticon } from '../../utils';

const profileDefaultProps: Pick<
  UserProps,
  'connected' | 'contacts' | 'groups' | 'language' | 'lastConnection'
> = {
  connected: false,
  contacts: [],
  groups: [],
  language: 'en',
  lastConnection: 0
};

export async function createUserProfile(
  initProps: Pick<UserProps, '_id' | 'userName'>
): Promise<UserDoc | null> {
  try {
    const avatar = await createIdenticon('noname' + initProps.userName);
    const result = await User.create({
      ...profileDefaultProps,
      ...initProps,
      avatar,
      publicName: initProps.userName
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserById(
  userId: string,
  projection?: string
): Promise<UserDoc | null> {
  if (typeof projection === 'string') {
    return await User.findById(userId, projection);
  } else {
    return await User.findById(userId);
  }
}

export async function getUserByName(
  userName: string,
  projection?: string
): Promise<UserDoc | null> {
  if (typeof projection === 'string') {
    return await User.findOne({ userName }, projection);
  } else {
    return await User.findOne({ userName });
  }
}
