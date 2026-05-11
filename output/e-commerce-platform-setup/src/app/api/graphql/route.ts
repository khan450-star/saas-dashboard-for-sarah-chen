import { ApolloServer } from 'apollo-server-micro';
import { NextRequest, NextResponse } from 'next/server';
import { gql } from 'graphql-tag';
import { prisma } from '@/lib/prisma';

// GraphQL Schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String
    price: Float!
    image: String!
    stock: Int!
    category: Category!
    createdAt: String!
    updatedAt: String!
  }
  
  type Category {
    id: ID!
    name: String!
    slug: String!
    image: String
    products: [Product!]!
  }
  
  type User {
    id: ID!
    email: String!
    name: String
  }
  
  type Query {
    products(category: String, search: String): [Product!]!
    product(slug: String!): Product
    categories: [Category!]!
    category(slug: String!): Category
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    products: async (_: any, args: any) => {
      const whereClause: any = {};
      
      if (args.category) {
        whereClause.category = {
          slug: args.category
        };
      }
      
      if (args.search) {
        whereClause.OR = [
          { name: { contains: args.search } },
          { description: { contains: args.search } }
        ];
      }
      
      return await prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
    product: async (_: any, args: any) => {
      return await prisma.product.findUnique({
        where: { slug: args.slug },
        include: {
          category: true,
        },
      });
    },
    categories: async () => {
      return await prisma.category.findMany({
        include: {
          products: true,
        },
      });
    },
    category: async (_: any, args: any) => {
      return await prisma.category.findUnique({
        where: { slug: args.slug },
        include: {
          products: true,
        },
      });
    },
  },
};

let apolloServer: ApolloServer | null = null;

const getApolloServer = () => {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
    });
  }
  return apolloServer;
};

export async function GET(request: NextRequest) {
  try {
    const server = getApolloServer();
    await server.start();
    
    const url = new URL(request.url);
    const response = await server.createHandler({ path: '/api/graphql' })({
      method: 'GET',
      headers: Object.fromEntries(request.headers.entries()),
      url: url.pathname + url.search,
      body: null,
    });
    
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('GraphQL GET error:', error);
    return NextResponse.json(
      { error: 'GraphQL service unavailable' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const server = getApolloServer();
    await server.start();
    
    const body = await request.text();
    const url = new URL(request.url);
    
    const response = await server.createHandler({ path: '/api/graphql' })({
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      url: url.pathname + url.search,
      body,
    });
    
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('GraphQL POST error:', error);
    return NextResponse.json(
      { error: 'GraphQL service unavailable' },
      { status: 500 }
    );
  }
}