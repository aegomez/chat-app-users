import { Types } from 'mongoose';

import { CustomResolver } from '../types';
import { getUserById, createUserProfile } from '../../db/controllers';
import { UserProps } from '../../db/models';

export const userProfileResolver: CustomResolver<{
  profile: Omit<UserProps, '_id' | '__v'> | null;
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
      avatar,
      connected,
      contacts,
      groups,
      language,
      lastConnection,
      publicName,
      userName
    } = await user
      .populate({ path: 'contacts', populate: { path: 'ref' } })
      .populate('groups')
      .execPopulate();
    return {
      success: true,
      profile: {
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
    console.error('Warning userProfileResolver', e);
    return {
      profile: null,
      success: false
    };
  }
};
