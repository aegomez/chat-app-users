import { getUserById, getUserByName } from './profiles';
import { PartialUserProps } from '../models';
import { createConversation } from '../../utils';

export async function addContact(
  userId: string,
  contactName: string
): Promise<{
  profile: PartialUserProps;
  conversation: string;
} | null> {
  try {
    // Get sender
    const sender = await getUserById(userId, 'contacts userName');
    if (sender === null) throw Error('sender not found.');

    // Return if contactName is the same as the user name
    if (sender.userName === contactName)
      throw Error('user cannot be added as their own contact!');

    // Check if recipient exists
    const recipient = await getUserByName(contactName);
    if (recipient === null) throw Error('recipient not found.');

    // Return if the recipient is already in contacts
    const added = sender.contacts.some(
      contact => contact.ref.toString() === recipient.id
    );
    if (added) throw Error('contact already added.');

    const convId = await createConversation();
    if (!convId) throw Error('could not createConversation');

    // Add to sender contact list as 'pending'
    sender.contacts.push({
      ref: recipient.id,
      status: 'pending',
      conversation: convId
    });
    await sender.save();

    // Add to recipient contact list as 'pending'
    recipient.contacts.push({
      ref: sender.id,
      status: 'pending',
      conversation: convId
    });
    await recipient.save();

    return {
      profile: {
        _id: recipient.id,
        avatar: recipient.avatar,
        connected: recipient.connected,
        lastConnection: recipient.lastConnection,
        publicName: recipient.publicName,
        userName: recipient.userName
      },
      conversation: convId
    };
    // Search if the destinatary exist and add petition
  } catch (e) {
    console.error('addContact: ', e.message);
    return null;
  }
}

export async function changeContactStatus(
  userId: string,
  contactId: string,
  status: 'accepted' | 'blocked' | 'pending'
): Promise<boolean> {
  try {
    // Get user
    const user = await getUserById(userId, 'contacts');
    if (user === null) throw Error('Could not fetch user.');

    // Look if contact is listed
    const index = user.contacts.findIndex(
      contact => contact.ref.toString() === contactId
    );
    if (index === -1) throw Error('Contact not in list.');

    // Modify contact status
    user.contacts[index].status = status;
    const saved = await user.save();

    return saved !== null;
  } catch (e) {
    console.error('Error: changeContactStatus', e.message);
    return false;
  }
}

export async function deleteContact(
  userId: string,
  contactId: string
): Promise<boolean> {
  try {
    // Get user
    const user = await getUserById(userId, 'contacts');
    if (user === null) throw Error('Could not fetch user.');

    // Look for contact
    const index = user.contacts.findIndex(
      contact => contact.ref.toString() === contactId
    );
    if (index === -1) throw Error('Contact not in list.');

    // Remove from own contacts
    user.contacts.splice(index, 1);
    const saved = await user.save();

    return saved !== null;
  } catch (e) {
    console.error('Error: deleteContact', e.message);
    return false;
  }
}
