import koa from 'koa';
import logger from 'koa-logger';
import mount from 'koa-mount';
import graphqlHttp from 'koa-graphql';
import schema from './src/schema';

const app = koa();
const PORT = process.env.PORT || 3000;

app.use(logger());

app.use(mount('/graphql', graphqlHttp({
	schema: schema,
	graphiql: true
})));

app.listen(PORT);
