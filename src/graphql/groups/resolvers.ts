import {
  createNewGroup,
  addMemberToGroup,
  deleteMemberFromGroup,
  getGroupMembers
} from '../../db/controllers';
import { CustomResolver } from '../types';

export const createGroupResolver: CustomResolver<
  {
    groupId: string | null;
    conversation: string | null;
  },
  {
    avatar: string;
    name: string;
  }
> = async (_source, args, context) => {
  try {
    const { avatar, name } = args;
    const { _userId } = context;
    const result = await createNewGroup(name, avatar, _userId);
    if (!result) {
      throw Error('Could not create group.');
    } else {
      return {
        success: true,
        groupId: result.id,
        conversation: result.conversation
      };
    }
  } catch (e) {
    console.error('Warning createGroupResolver', e.message);
    return {
      success: false,
      groupId: null,
      conversation: null
    };
  }
};

type UpdateGroupResolver = CustomResolver<
  {},
  {
    groupId: string;
    userId: string;
  }
>;

export const addGroupMemberResolver: UpdateGroupResolver = async (
  _source,
  args
) => {
  try {
    const { groupId, userId } = args;
    const result = await addMemberToGroup(groupId, userId);
    if (!result) {
      throw Error('Could not add group member.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning addGroupMemberResolver', e.message);
    return { success: false };
  }
};

export const deleteGroupMemberResolver: UpdateGroupResolver = async (
  _source,
  args
) => {
  try {
    const { groupId, userId } = args;
    const result = await deleteMemberFromGroup(groupId, userId);
    if (!result) {
      throw Error('Could not delete group member.');
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error('Warning deleteGroupMemberResolver', e.message);
    return { success: false };
  }
};

export const getGroupMembersResolver: CustomResolver<
  { members: string[] | null },
  { groupId: string }
> = async (_source, args) => {
  try {
    const { groupId } = args;
    const result = await getGroupMembers(groupId);
    if (!result) {
      throw Error('Could not get group member');
    } else {
      return {
        success: true,
        members: result
      };
    }
  } catch (e) {
    console.error('Warning deleteGroupMemberResolver', e.message);
    return {
      success: false,
      members: null
    };
  }
};
