import R from 'ramda';
import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLList
} from 'graphql/type';
import cards from './cards.json';

const cardType = new GraphQLObjectType({
	name: 'Card',
	fields: {
		title: {type: GraphQLString},
		subtitle: {type: GraphQLString},
		type: {type: GraphQLString},
		subtypes: {type: new GraphQLList(GraphQLString)}
	}
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			allCards: {
				type: new GraphQLList(cardType),
				description: 'All cards!',
				resolve: () => cards
			},
			card: {
				type: cardType,
				description: 'The card with the entered title',
				args: {
					title: {type: GraphQLString}
				},
				resolve: (root, {title}) => R.find(R.propEq('title', title), cards)
			}
		}
	})
});

export default schema;
