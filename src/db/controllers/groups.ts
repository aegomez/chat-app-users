import { getUserById } from './profiles';
import { Group, GroupDoc } from '../models';

export async function createNewGroup(userId: string): Promise<boolean> {
  try {
    /*
     * Create new conversation
     */
    const result = await Group.create({
      members: [userId]
      // , conversation
    });
    return result !== null;
  } catch (e) {
    console.error('Error crateNewgroup', e);
    return false;
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
    if (group === null) return false;
    // Get user document
    const user = await getUserById(userId, 'groups');
    if (user === null) return false;

    // Check if user is already in group
    if (group.members.includes(user._id)) return false;

    // Save cross-reference
    group.members.push(user._id);
    group.save();
    user.groups.push(group._id);
    user.save();
    return true;
  } catch (e) {
    console.error('Error getGroupById', e);
    return false;
  }
}

export async function removeMemberFromGroup(
  groupId: string,
  userId: string
): Promise<boolean> {
  try {
    // Get the group document
    const group = await getGroupById(groupId);
    if (group === null) return false;
    // Get user document
    const user = await getUserById(userId, 'groups');
    if (user === null) return false;

    // Search indexes
    const membersIndex = group.members.findIndex(id => id === user._id);
    if (membersIndex === -1) return false;
    const groupsIndex = user.groups.findIndex(id => id === group._id);
    if (groupsIndex === -1) return false;

    // Remove both references and save the documents
    group.members.splice(membersIndex, 1);
    group.save();
    user.groups.splice(groupsIndex, 1);
    user.save();

    return true;
  } catch (e) {
    console.error('Error getGroupById', e);
    return false;
  }
}
