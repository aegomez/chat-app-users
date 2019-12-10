import {
  createSchema,
  Type,
  typedModel,
  ExtractDoc,
  ExtractProps
} from 'ts-mongoose';

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
  publicName: Type.string(isRequired),

  // ObjectId Arrays
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
  groups: Type.array(isRequired).of(Type.objectId(isRequired))
});

export const User = typedModel('User', UserSchema);

export type UserDoc = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
