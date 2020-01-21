import { PartialUserProps } from '../../db/models';
import {
  addContact,
  changeContactStatus,
  deleteContact
} from '../../db/controllers';
import { CustomResolver, InputResolver } from '../types';

export const addContactResolver: CustomResolver<
  { profile: PartialUserProps | null; conversation: string | null },
  { contactName: string }
> = async (_source, args, context) => {
  try {
    const { _userId } = context;
    const { contactName } = args;

    if (!contactName || contactName.length > 40) {
      throw Error('Invalid contact name');
    }

    const contact = await addContact(_userId, contactName);
    if (contact === null) {
      throw Error('contact could not be added');
    } else {
      return {
        success: true,
        profile: contact.profile,
        conversation: contact.conversation
      };
    }
  } catch (e) {
    console.error('Warning addContactResolver: ', e.message);
    return {
      success: false,
      profile: null,
      conversation: null
    };
  }
};

export const updateContactResolver: CustomResolver<
  {},
  {
    targetId: string;
    newStatus: 'accepted' | 'blocked' | 'pending';
  }
> = async (_source, args, context) => {
  try {
    const { _userId } = context;
    const { targetId, newStatus } = args;

    const result = await changeContactStatus(_userId, targetId, newStatus);
    if (!result) {
      throw Error('status could not be updated');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning updateContactResolver: ', e.message);
    return { success: false };
  }
};

export const deleteContactResolver: InputResolver = async (
  _source,
  args,
  context
) => {
  try {
    const { _userId } = context;
    const targetId = args.input;

    const result = await deleteContact(_userId, targetId);
    if (!result) {
      throw Error('contact could not be deleted');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning deleteContactResolver: ', e.message);
    return { success: false };
  }
};
