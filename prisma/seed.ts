// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

const booksData = [
  {
    title: 'Gone Girl',
    writer: 'Gillian Flynn',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 10,
    tags: ['fiction', 'Mystery'],
  },
  {
    title: 'The Call of the Wild',
    writer: 'Jack London',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 15,
    tags: ['non-fiction', 'Adventure'],
  },
  {
    title: 'Dune',
    writer: 'Frank Herbert',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 25,
    tags: ['Science Fiction', 'Adventure'],
  },
  {
    title: 'Harry Potter and the Sorcerer`s Stone',
    writer: 'J.K. Rowling',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 35,
    tags: ['Fantasy'],
  },
  {
    title: 'Pride and Prejudice',
    writer: 'Jane Austen',
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
    price: 45,
    tags: ['Romance'],
  },
];

const customers = [
  {
    name: 'Hamza Ashfaq',
    email: 'hamzaashfaq7866@example.com',
    points: 100,
    password: '',
  },
  {
    name: 'Azeem',
    email: 'azeem@example.com',
    points: 100,
    password: '',
  },
];

// async function seedBooks() {
//   for (const bookData of booksData) {
//     await prisma.book.create({
//       data: bookData,
//     });
//   }
// }

async function seedCustomers() {
  const passwordUser123 = await bcrypt.hash('user@123', roundsOfHashing);
  for (const customer of customers) {
    customer.password = passwordUser123;
    await prisma.customer.create({
      data: customer,
    });
  }
}

// execute the main function
seedCustomers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
