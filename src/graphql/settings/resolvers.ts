import {
  changeUserAvatar,
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
    const url = args.input;
    const result = await changeUserAvatar(_userId, url);
    if (!result) {
      throw Error('avatar value could not be updated.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updateAvatarResolver: ', e);
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
    console.error('Warning updateLanguageResolver: ', e);
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
    const newName = args.input;
    const result = await changeUserPublicName(_userId, newName);
    if (!result) {
      throw Error('publicName value could not be updated.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updatePublicNameResolver: ', e);
    return { success: false };
  }
};
