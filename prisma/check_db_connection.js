const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class CheckingDbConnection {
  static main = async () => {
    try {
      await prisma.$connect();
      console.log('Db Connection successfully');
    } catch (e) {
      console.error('Error trying to connect with db', e);
    } finally {
      await prisma.$disconnect();
    }
  };
}

module.exports = CheckingDbConnection;
