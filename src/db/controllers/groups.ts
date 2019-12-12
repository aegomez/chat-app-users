import { getUserById } from './profiles';
import { Group, GroupDoc } from '../models';

export async function createNewGroup(
  userId: string
): Promise<{ id: string; conversation: string } | null> {
  try {
    /*
     * Create new conversation
     */
    const result = await Group.create({
      members: [userId]
      // , conversation
    });
    if (!result) throw Error('Group not created');
    return {
      id: result.id,
      conversation: result.conversation
    };
  } catch (e) {
    console.error('Warning createNewgroup', e.message);
    return null;
  }
}

async function getGroupById(groupId: string): Promise<GroupDoc | null> {
  return await Group.findById(groupId);
}

export async function addMemberToGroup(
  groupId: string,
  userId: string
): Promise<boolean> {
  try {
    // Get the group document
    const group = await getGroupById(groupId);
    if (group === null) throw Error('Could not fetch group.');
    // Get user document
    const user = await getUserById(userId, 'groups');
    if (user === null) throw Error('Could not fetch user.');

    // Check if user is already in group
    if (group.members.includes(user._id)) throw Error('User already in group!');

    // Save cross-reference
    group.members.push(user._id);
    group.save();
    user.groups.push(group._id);
    user.save();
    return true;
  } catch (e) {
    console.error('Warning addMemberToGroup', e.message);
    return false;
  }
}

export async function deleteMemberFromGroup(
  groupId: string,
  userId: string
): Promise<boolean> {
  try {
    // Get the group document
    const group = await getGroupById(groupId);
    if (group === null) throw Error('Could not fetch group.');
    // Get user document
    const user = await getUserById(userId, 'groups');
    if (user === null) throw Error('Could not fetch user.');

    // Search indexes
    const membersIndex = group.members.findIndex(id => id === user._id);
    if (membersIndex === -1) throw Error('User not in group.');
    const groupsIndex = user.groups.findIndex(id => id === group._id);
    if (groupsIndex === -1) throw Error('Group not in user.');

    // Remove both references and save the documents
    group.members.splice(membersIndex, 1);
    group.save();
    user.groups.splice(groupsIndex, 1);
    user.save();

    return true;
  } catch (e) {
    console.error('Warning deleteMemberFromGroup', e.message);
    return false;
  }
}

export async function getGroupMembers(
  groupId: string
): Promise<string[] | null> {
  try {
    // Get the group document
    const group = await Group.findById(groupId).populateTs('members');
    if (!group) throw Error('Could not fetch group');
    // Return array of names
    const nameList = group.members.map(user => user.publicName);
    return nameList;
  } catch (e) {
    console.error('Warning getGroupMembers: ', e.message);
    return null;
  }
}
