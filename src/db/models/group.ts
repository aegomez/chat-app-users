import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';

import { PartialUserSchema } from './user';

export const GroupSchema = createSchema({
  members: Type.array({ required: true }).of(
    Type.ref(
      Type.objectId({
        required: true
      })
    ).to('User', PartialUserSchema)
  ),
  conversation: Type.string({ required: true }),
  avatar: Type.string({ required: true })
});

export const Group = typedModel('Group', GroupSchema);

export type GroupDoc = ExtractDoc<typeof GroupSchema>;
