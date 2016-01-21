import {
	GraphQLInterfaceType,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType
} from 'graphql/type';

export const typeEnum = new GraphQLEnumType({
	name: 'Type',
	values: {
		IDENTITY: {value: 0},
		AGENDA: {value: 1},
		ASSET: {value: 2},
		EVENT: {value: 3},
		HARDWARE: {value: 4},
		ICE: {value: 5},
		OPERATION: {value: 6},
		PROGRAM: {value: 7},
		RESOURCE: {value: 8},
		UPGRADE: {value: 9}
	}
});

const cardInterfaceFields = {
	title: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'The title of the playCard'
	},
	type: {
		type: new GraphQLNonNull(typeEnum),
		description: 'The type of the playCard'
	},
	subtypes: {
		type: new GraphQLList(GraphQLString),
		description: 'A list of all the subtypes of a playCard'
	}
};

export const cardInterface = new GraphQLInterfaceType({
	name: 'Card',
	description: 'An interface to represent all types of cards including identities and playable cards',
	fields: cardInterfaceFields,
	resolveType: card => card.type === typeEnum.values.IDENTITY ? identityType : playCardType
});

export const identityType = new GraphQLObjectType({
	name: 'Identity',
	description: 'A card that represents either a runner or corporation identity',
	fields: Object.assign({
		subtitle: {
			type: GraphQLString,
			description: 'The subtitle of the playCard'
		}
	}, cardInterfaceFields),
	interfaces: [cardInterface]
});

export const playCardType = new GraphQLObjectType({
	name: 'PlayCard',
	description: 'A card that any card that can be used by a runner or corporation during play but not an identity',
	fields: cardInterfaceFields,
	interfaces: [cardInterface]
});
