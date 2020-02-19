import {
  changeUserAvatar,
  changeUserConnectedStatus,
  changeUserLanguage,
  changeUserPublicName
} from '../../db/controllers';
import { InputResolver, CustomResolver } from '../types';

export const updateAvatarResolver: InputResolver = async (
  _source,
  args,
  context
) => {
  try {
    const { _userId } = context;
    const url = '' + args.input;
    if (!url.length || url.length > 2000) {
      throw Error('url is too long/short!');
    }
    const result = await changeUserAvatar(_userId, url);
    if (!result) {
      throw Error('avatar value could not be updated.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updateAvatarResolver: ', e.message);
    return { success: false };
  }
};

export const updateConnectedResolver: CustomResolver<
  {},
  { status: boolean }
> = async (_source, args, context) => {
  try {
    const { _userId, res } = context;
    const { status } = args;
    const result = await changeUserConnectedStatus(_userId, status);
    if (!result) {
      throw Error('connected value could not be updated.');
    }
    if (!status) {
      res?.clearCookie('token');
    }
    return { success: true };
  } catch (e) {
    console.error('Warning updateConnectedResolver:', e.message);
    return { success: false };
  }
};

export const updateLanguageResolver: CustomResolver<
  {},
  { newLanguage: 'en' | 'es' | 'pt' }
> = async (_source, args, context) => {
  try {
    const { _userId } = context;
    const { newLanguage } = args;
    const result = await changeUserLanguage(_userId, newLanguage);
    if (!result) {
      throw Error('language value could not be updated.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updateLanguageResolver: ', e.message);
    return { success: false };
  }
};
export const updatePublicNameResolver: InputResolver = async (
  _source,
  args,
  context
) => {
  try {
    const { _userId } = context;
    const newName = '' + args.input;
    if (newName.length < 1 || newName.length > 60) {
      throw Error('name is too long/short!');
    }
    const result = await changeUserPublicName(_userId, newName);
    if (!result) {
      throw Error('publicName value could not be updated.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updatePublicNameResolver: ', e.message);
    return { success: false };
  }
};
