import {
  createSchema,
  Type,
  typedModel,
  ExtractDoc,
  ExtractProps
} from 'ts-mongoose';

import { GroupSchema } from './group';

const isRequired = { required: true as const };
const locales = ['en', 'es', 'pt'] as const;
const contactStatus = ['accepted', 'blocked', 'pending'] as const;

export const UserSchema = createSchema({
  // Private properties (client only)
  _id: Type.objectId(isRequired),
  language: Type.string({ ...isRequired, enum: locales }),

  // Public properties (client + contacts)
  avatar: Type.string(isRequired),
  connected: Type.boolean(isRequired),
  lastConnection: Type.number({ ...isRequired, default: null }),
  // Public/display name starts the same as the
  // real (unique) userName, but can be changed
  // by the user.
  userName: Type.string(isRequired),
  publicName: Type.string(isRequired)
});

/*
 * Schema creation is divided in two steps because
 * it includes both a self-reference (contacts) and
 * a circular reference (groups).
 * The `Schema#add()` method can also be used, but
 * it does not modify the original schema type.
 */
const UserRefSchema = createSchema({
  ...UserSchema.definition,
  contacts: Type.array(isRequired).of({
    ref: Type.string({
      ...isRequired,
      unique: true
    }),
    conversation: Type.string({ default: null }),
    // Contacts requests start as 'pending'
    // and can be accepted or blocked.
    status: Type.string({ ...isRequired, enum: contactStatus })
  }),
  groups: Type.array(isRequired).of(
    Type.ref(Type.objectId(isRequired)).to('Group', GroupSchema)
  )
});

export const User = typedModel('User', UserRefSchema);

export type UserDoc = ExtractDoc<typeof UserRefSchema>;
export type UserProps = ExtractProps<typeof UserRefSchema>;
