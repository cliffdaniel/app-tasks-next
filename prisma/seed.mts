import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            hashedPassword: hashedPassword,
        },
    });

    await prisma.account.create({
        data: {
            userId: user.id,
            type: 'credentials',
            provider: 'credentials',
            providerAccountId: user.email,
        },
    });

    console.log('Seeding complete: User and Account created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
