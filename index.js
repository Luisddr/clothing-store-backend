const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')


const app = express()

//schemas

const schema = buildSchema(`

    type User{
        id: Int
        name: String
    }

    type Query {
        users: [User]
        user(id: Int): User
    }

    type Mutation{
        addUser(name: String) : User 
    }


`);

const users = []
var counter = 1


// resolvers

const root = {
    users: ()=>{
        return users
},
    user: (data)=>{
        for (let i = 0; i<users.length; i++){
            if(users[i].id === data.id) return users[i]
            
        }
    },

    addUser: (data)=>{
        const us = { 'id': counter, "name": data.name }
        users.push(us);
        counter++;
        return us
    }


}


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000,()=>console.log('server running in port 4000'));






