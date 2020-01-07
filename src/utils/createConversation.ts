import fetch from 'cross-fetch';

export async function createConversation(): Promise<string | null> {
  try {
    const URI = process.env.CHAT_API_URI;
    if (!URI) throw Error('URI is unknown.');

    // POST method is used because library does not
    // accept a body when using GET.
    const response = await fetch(URI, {
      method: 'POST',
      body: JSON.stringify({
        operation: 'createConversation',
        secret: 'temporarysolution'
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (response.status >= 400) {
      throw Error('Bad response from server.');
    }

    const { id } = await response.json();
    return id;
  } catch (e) {
    console.error('createConversation: ', e.message);
    return null;
  }
}
