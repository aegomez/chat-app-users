import { getUserById, getUserByName } from './profiles';
import { createConversation } from '../../utils';

export async function addContact(
  userId: string,
  contactName: string
): Promise<boolean> {
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
    let added = sender.contacts.some(
      contact => contact.ref.toString() === recipient.id
    );
    if (added) throw Error('contact already added.');

    // Retun if the sender is already in
    // the recipient contacts
    added = recipient.contacts.some(
      contact => contact.ref.toString() === sender.id
    );
    if (added) throw Error('contact is pending to be accepted.');

    const convId = await createConversation();
    if (!convId) throw Error('could not createConversation');

    // The contact is not added to the
    // sender's list until the recipient
    // accepts the request.

    // Add to recipient contact list as 'pending'
    recipient.contacts.push({
      ref: sender.id,
      status: 'pending',
      conversation: convId
    });
    const saved = await recipient.save();

    return !!saved;
    // Search if the destinatary exist and add petition
  } catch (e) {
    console.error('addContact: ', e.message);
    return false;
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

    const userContact = user.contacts[index];

    // Return if new and old status are the same
    if (userContact.status === status) {
      return true;
    }

    // Check if contact exist
    const contactDoc = await getUserById(contactId, 'contacts');
    if (!contactDoc) throw Error('Could not fetch contact.');

    // Modify contact status for the user
    userContact.status = status;
    await user.save();

    // If the new status is `accepted`, add
    // to the original sender's contact list
    if (status !== 'accepted') {
      return true;
    }
    contactDoc.contacts.push({
      ref: user.id,
      status: 'accepted',
      conversation: userContact.conversation
    });
    const saved = await contactDoc.save();

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
