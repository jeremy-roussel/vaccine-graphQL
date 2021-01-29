import { gql } from "apollo-server";

const helloResolver = gql`
  type Hello {
    message: string
  }

  type Query {
    helloWorld: Hello
  }
`;

export default helloResolver;
