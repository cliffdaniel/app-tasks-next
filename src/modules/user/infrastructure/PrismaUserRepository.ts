import { PrismaClient } from '@prisma/client';
import { UserEntity } from '@/modules/user/domain/UserEntity';
import { UserRepository } from '@/modules/user/domain/UserRepository';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async create(user: UserEntity): Promise<UserEntity> {
        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                hashedPassword: user.hashedPassword,
            },
        });

        if (!createdUser.name || !createdUser.hashedPassword) {
            throw new Error('Invalid data: Name and hashed password cannot be null.');
        }

        return UserEntity.create(
            createdUser.id,
            createdUser.email,
            createdUser.name,
            createdUser.hashedPassword,
        );
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return null;

        if (!user.name || !user.hashedPassword) {
            throw new Error('Invalid data: User must have a name and a hashed password.');
        }

        return UserEntity.fromDatabase(
            user.id,
            user.email,
            user.name,
            user.hashedPassword,
            user.createdAt,
            user.updatedAt,
        );
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        if (!user.name || !user.hashedPassword) {
            throw new Error('Invalid data: User must have a name and a hashed password.');
        }

        return UserEntity.fromDatabase(
            user.id,
            user.email,
            user.name,
            user.hashedPassword,
            user.createdAt,
            user.updatedAt,
        );
    }

    async update(user: UserEntity): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                name: user.name,
                hashedPassword: user.hashedPassword,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}
