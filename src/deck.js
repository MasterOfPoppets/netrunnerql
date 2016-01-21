import R from 'ramda';
import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} from 'graphql/type';
import {identityType, playCardType} from './card';
import cards from './cards.json';

const getCardByTitle = title => R.find(R.propEq('title', title), cards);

const deckCard = new GraphQLObjectType({
	name: 'DeckCard',
	description: 'Information on how a particular card is used within a deck',
	fields: {
		card: {
			type: playCardType,
			description: 'The card',
			resolve: ({card}) => getCardByTitle(card)
		},
		count: {
			type: GraphQLInt,
			description: 'The number of copies of the card included in the deck'
		},
		influenceCost: {
			type: GraphQLInt,
			description: 'The total influence cost of including these cards in the deck'
		}
	}
});

export const deck = new GraphQLObjectType({
	name: 'Deck',
	fields: {
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The deck\'s title'
		},
		identity: {
			type: identityType,
			description: 'The identity of the deck',
			resolve: ({identity}) => getCardByTitle(identity)
		},
		cards: {
			type: new GraphQLList(deckCard),
			description: 'All the cards in the deck excluding the identity',
			resolve: deck => deck.cards//deck => R.map(getCardByTitle, deck.cards)
		}
	}
});
