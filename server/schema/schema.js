const graphql = require('graphql');
const _ = require('loadsh');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

//dummy data
var books = [
    { name: 'Digital Fortress', genre: 'Mystery', id: '1', authorId: '1'  },
    { name: 'Da Vinci Code', genre: 'History', id: '2', authorId: '1' },
    { name: 'The End of Eternity', genre: 'Sci-Fi', id: '3', authorId: '2' },
    { name: 'Angels & Demons', genre: 'History', id: '4', authorId: '1' },
    { name: 'Deception Point', genre: 'History', id: '5', authorId: '1' },
    { name: 'The Naked Sun', genre: 'Sci-Fi', id: '6', authorId: '2' },
];

var authors = [
    { name: 'Dan Brown', age: 55, id: '1' },
    { name: 'Isaac Asimov', age: 72, id: '2' },
    { name: 'Agatha Christie', age: 124, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db / other source
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})


// book(id: "2") {
//     name
//     genre
// }


