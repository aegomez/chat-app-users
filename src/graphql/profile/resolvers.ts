import { Types } from 'mongoose';

import { CustomResolver } from '../types';
import {
  getUserById,
  createUserProfile,
  getUserLists
} from '../../db/controllers';
import { UserProps } from '../../db/models';

export const userProfileResolver: CustomResolver<{
  profile: Omit<UserProps, '__v'> | null;
}> = async (_source, _args, context) => {
  const { _userId, _userName } = context;

  try {
    let user = await getUserById(_userId);
    // If user has credentials but their profile has
    // not been created yet (first-time only)
    if (user === null) {
      user = await createUserProfile({
        _id: Types.ObjectId(_userId),
        userName: _userName
      });
      if (user === null) throw Error('Could not create profile');
    }
    // If user is authorized and already has profile data
    const {
      _id,
      avatar,
      connected,
      contacts,
      groups,
      language,
      lastConnection,
      publicName,
      userName
    } = await user
      .populate('contacts.ref')
      .populate({ path: 'groups.ref', populate: { path: 'members' } })
      .execPopulate();

    return {
      success: true,
      profile: {
        _id,
        avatar,
        connected,
        contacts,
        groups,
        language,
        lastConnection,
        publicName,
        userName
      }
    };
  } catch (e) {
    console.error('Warning userProfileResolver', e.message);
    return {
      profile: null,
      success: false
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractIds(obj: any): string {
  const ref = obj.ref as Types.ObjectId;
  return ref.toHexString();
}

export const userListsResolver: CustomResolver<{
  contacts: string[] | null;
  groups: string[] | null;
}> = async (_source, _args, context) => {
  try {
    const { _userId } = context;
    const user = await getUserLists(_userId);
    if (user === null) throw Error('Could not get data');

    // Return two arrays of ids
    const contacts = user.contacts.map(extractIds);
    const groups = user.groups.map(extractIds);

    return { success: true, contacts, groups };
  } catch (e) {
    console.error('Warning userGroupsResolver ', e.message);
    return {
      success: false,
      contacts: null,
      groups: null
    };
  }
};
