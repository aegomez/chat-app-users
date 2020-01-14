import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { getGroupMembersQuery } from './groups/queries';
import * as Profiles from './profile/queries';
import * as Contacts from './contacts/mutations';
import * as Groups from './groups/mutations';
import * as Settings from './settings/mutations';

const usersQueryRootType = new GraphQLObjectType({
  name: 'UserQueries',
  description: 'All user profiles, contacts, and groups queries.',
  fields: () => ({
    getUserProfile: Profiles.getUserProfile,
    getUserLists: Profiles.getUserLists,
    getGroupMembers: getGroupMembersQuery
  })
});

const usersMutationRootType = new GraphQLObjectType({
  name: 'UserMutations',
  description: 'All user profiles, contacts, and groups mutations.',
  fields: () => ({
    addContact: Contacts.addMutation,
    deleteContact: Contacts.deleteMutation,
    updateContact: Contacts.updateMutation,

    createGroup: Groups.createMutation,
    addGroupMember: Groups.addMemberMutation,
    deleteGroupMember: Groups.deleteMemberMutation,

    updateUserAvatar: Settings.updateAvatarMutation,
    updateUserConnected: Settings.updateConnectedMutation,
    updateUserLanguage: Settings.updateLanguageMutation,
    updateUserPublicName: Settings.updatePublicNameMutation
  })
});

export const usersSchema = new GraphQLSchema({
  query: usersQueryRootType,
  mutation: usersMutationRootType
});
