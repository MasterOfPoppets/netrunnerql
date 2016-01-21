import R from 'ramda';
import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLList
} from 'graphql/type';
import {playCardType, typeEnum} from './card';
import {deck} from './deck';
import cards from './cards.json';
import decks from './decks.json';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			allCards: {
				type: new GraphQLList(playCardType),
				description: 'All cards of a particular type',
				args: {
					type: {
						type: typeEnum,
						description: 'The type of cards to return'
					}
				},
				resolve: (root, {type}) => R.filter(R.propEq('type', type), cards)
			},
			card: {
				type: playCardType,
				description: 'The playCard with the entered title',
				args: {
					title: {type: GraphQLString}
				},
				resolve: (root, {title}) => R.find(R.propEq('title', title), cards)
			},
			allDecks: {
				type: new GraphQLList(deck),
				description: 'All available decks',
				resolve: () => decks
			},
			deck: {
				type: deck,
				description: 'The deck with the entered title',
				args: {
					title: {type: GraphQLString}
				},
				resolve: (root, {title}) => R.find(R.propEq('title', title), decks)
			}
		}
	})
});

export default schema;
