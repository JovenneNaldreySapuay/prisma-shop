import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      tweets {
        id
        text
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ data, error, loading }) => {
          console.log("Data?", data);
          
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          
          return (
            <>
              <h4>Names:</h4>
              <ul>
                {
                  data.users && data.users.map((user, index) => {
                    return (
                      <li key={index}> 
                        <p>{user.name}</p>
                        <h4>Tweets:</h4>
                        <ul>
                        {
                          data.users[index].tweets.map((tweet, index) => {
                            console.log(data.users[index]);
                            
                            return (
                                <li key={index}> {tweet.text } </li>
                            );
                          })
                        }
                        </ul>
                      </li> 
                    )  
                  })
                }
              </ul>
            </>
          );
        }}
      </Query> 
    );
  }
}

export default App;
export { USERS_QUERY };
