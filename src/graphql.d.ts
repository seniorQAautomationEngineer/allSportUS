// src/types/graphql.d.ts
declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
  }
  
  declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;
    export = Schema;
  }
  