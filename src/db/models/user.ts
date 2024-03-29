import {
  createSchema,
  Type,
  typedModel,
  ExtractDoc,
  ExtractProps
} from 'ts-mongoose';

import { GroupSchema } from './group';

const isRequired = { required: true as const };
const locales = ['auto', 'en', 'es', 'pt'] as const;
const contactStatus = ['accepted', 'blocked', 'pending'] as const;

// This schema contains only a part of the
// user data, it is declared to avoid circular
// and self-references.
const partialUserDefinition = {
  // Public properties (visible to contacts
  // and groups).
  _id: Type.objectId(isRequired),
  avatar: Type.string(isRequired),
  connected: Type.boolean(isRequired),
  lastConnection: Type.number({
    ...isRequired,
    default: 0
  }),
  // Public/display name starts the same as the
  // real (unique) userName, but can be changed
  // by the user.
  userName: Type.string(isRequired),
  publicName: Type.string(isRequired)
};
export const PartialUserSchema = createSchema(partialUserDefinition);

export type PartialUserProps = Omit<
  ExtractProps<typeof PartialUserSchema>,
  '__v'
>;

export const UserSchema = createSchema({
  // Public properties
  ...partialUserDefinition,

  // Private properties (client only)
  language: Type.string({ ...isRequired, enum: locales }),

  // ObjectId Arrays
  contacts: Type.array(isRequired).of({
    ref: Type.ref(Type.objectId(isRequired)).to('User', PartialUserSchema),
    conversation: Type.string({ default: null }),
    // Contacts requests start as 'pending'
    // and can be accepted or blocked.
    status: Type.string({ ...isRequired, enum: contactStatus })
  }),
  groups: Type.array(isRequired).of({
    ref: Type.ref(Type.objectId(isRequired)).to('Group', GroupSchema),
    joined: Type.number(isRequired)
  })
});

export const User = typedModel('User', UserSchema);

export type UserDoc = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
