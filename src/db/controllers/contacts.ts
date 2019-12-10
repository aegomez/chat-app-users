import { getUserById, getUserByName } from './profiles';

export async function addContact(
  userId: string,
  contactName: string
): Promise<boolean> {
  try {
    // Get sender
    const sender = await getUserById(userId, 'contacts');
    if (sender === null) return false;

    // Check if recipient exists
    const recipient = await getUserByName(contactName);
    if (recipient === null) return false;

    // Return if the recipient is already in contacts
    const added = sender.contacts.some(contact => contact.ref === recipient.id);
    if (added) return false;

    /**
     * createNewConversation()
     */

    // Add to sender contact list as 'pending'
    sender.contacts.push({
      ref: recipient.id,
      status: 'pending',
      conversation: undefined
    });
    await sender.save();

    // Add to recipient contact list as 'pending'
    recipient.contacts.push({
      ref: sender.id,
      status: 'pending',
      conversation: undefined
    });
    await recipient.save();

    return true;
    // Search if the destinatary exist and add petition
  } catch (e) {
    console.error('Error: addContact', e);
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
    if (user === null) return false;

    // Look if contact is listed
    const index = user.contacts.findIndex(contact => contact.ref === contactId);
    if (index === -1) return false;

    // Modify contact status
    user.contacts[index].status = status;
    const saved = await user.save();

    return saved !== null;
  } catch (e) {
    console.error('Error: changeContactStatus', e);
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
    if (user === null) return false;

    // Look for contact
    const index = user.contacts.findIndex(contact => contact.ref === contactId);
    if (index === -1) return false;

    // Remove from own contacts
    user.contacts.splice(index, 1);
    const saved = await user.save();

    return saved !== null;
  } catch (e) {
    console.error('Error: deleteContact', e);
    return false;
  }
}
